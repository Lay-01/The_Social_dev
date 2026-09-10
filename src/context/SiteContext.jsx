import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sanitizeString, sanitizeUrl, validateEmail, generateUUID } from '../utils/sanitize';
import { ALLOWED_ADMIN_EMAILS } from '../config/adminConfig';
export { ALLOWED_ADMIN_EMAILS };

const SiteContext = createContext();

const LOCAL_STORAGE_KEY = 'the_social_dev_site_content_v2';
const LOCAL_AUTH_KEY = 'the_social_dev_admin_session_v1';
const TAB_ID = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

// RFC 4122 UUID v4 pattern used to detect real database-backed records
const SUPABASE_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


export function SiteProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          socialLinks: parsed.socialLinks || DEFAULT_SITE_CONTENT.socialLinks,
          ventures: parsed.ventures || DEFAULT_SITE_CONTENT.ventures
        };
      }
      return DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(LOCAL_AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        const cleanEmail = (parsed?.email || '').toLowerCase().trim();
        if (ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'

  // Fetch and revalidate content from Supabase backend
  const fetchFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const { data: settingsData, error: settingsErr } = await supabase
        .from('site_settings')
        .select('*');

      const { data: servicesData, error: servicesErr } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      const { data: venturesData, error: venturesErr } = await supabase
        .from('ventures')
        .select('*')
        .order('sort_order', { ascending: true });

      let settingsMap = {};
      if (!settingsErr && settingsData && settingsData.length > 0) {
        settingsMap = settingsData.reduce((acc, row) => {
          acc[row.key] = row.value;
          return acc;
        }, {});
      }

      setContent(prev => {
        // Dedicated `services` table check: if query succeeded (data is array), map rows.
        let fetchedServices;
        if (!servicesErr && Array.isArray(servicesData)) {
          fetchedServices = servicesData.map(s => ({
            id: s.id,
            title: s.title,
            description: s.description,
            icon: s.icon,
            isActive: s.is_active !== false,
            sortOrder: s.sort_order
          }));
        } else if (!settingsErr && Array.isArray(settingsMap.services)) {
          fetchedServices = settingsMap.services;
        } else {
          fetchedServices = prev.services || DEFAULT_SITE_CONTENT.services;
        }

        // Dedicated `ventures` table check: if query succeeded (data is array), map rows.
        let fetchedVentures;
        if (!venturesErr && Array.isArray(venturesData)) {
          fetchedVentures = venturesData.map(v => ({
            id: v.id,
            title: v.title,
            description: v.description,
            url: v.url,
            image: v.image,
            isActive: v.is_active !== false,
            sortOrder: v.sort_order
          }));
        } else if (!settingsErr && Array.isArray(settingsMap.ventures)) {
          fetchedVentures = settingsMap.ventures;
        } else {
          fetchedVentures = prev.ventures || DEFAULT_SITE_CONTENT.ventures;
        }

        const updated = {
          ...prev,
          contactEmail: settingsMap.contactEmail || prev.contactEmail || DEFAULT_SITE_CONTENT.contactEmail,
          socialLinks: (!settingsErr && Array.isArray(settingsMap.socialLinks))
            ? settingsMap.socialLinks
            : (prev.socialLinks || DEFAULT_SITE_CONTENT.socialLinks),
          about: settingsMap.about || prev.about || DEFAULT_SITE_CONTENT.about,
          whyChooseUs: settingsMap.whyChooseUs || prev.whyChooseUs || DEFAULT_SITE_CONTENT.whyChooseUs,
          services: fetchedServices,
          ventures: fetchedVentures,
          faqs: (!settingsErr && Array.isArray(settingsMap.faqs))
            ? settingsMap.faqs
            : (prev.faqs || DEFAULT_SITE_CONTENT.faqs),
          processHeader: settingsMap.processHeader || prev.processHeader || DEFAULT_SITE_CONTENT.processHeader,
          processSteps: (!settingsErr && Array.isArray(settingsMap.processSteps))
            ? settingsMap.processSteps
            : (prev.processSteps || DEFAULT_SITE_CONTENT.processSteps)
        };

        // Cache remote data back into LocalStorage to guarantee instant availability
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        } catch {}

        return updated;
      });
    } catch (err) {
      console.warn('Supabase fetch notice: using cached content.', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync to Supabase on mount and listen to cross-window storage events
  useEffect(() => {
    fetchFromSupabase();

    const handleStorageChange = (e) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setContent(parsed);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    let channel;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('the_social_dev_channel');
        channel.onmessage = (event) => {
          const isRevalidate = event.data === 'revalidate' || event.data?.type === 'revalidate';
          const isOtherTab = !event.data?.senderId || event.data.senderId !== TAB_ID;
          if (isRevalidate && isOtherTab) {
            fetchFromSupabase();
          }
        };
      } catch {}
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email, id: session.user.id });
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ email: session.user.email, id: session.user.id }));
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (channel) channel.close();
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchFromSupabase]);

  // Save changes locally and to Supabase
  const saveContent = async (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch {}

    setSaveStatus('saving');

    try {
      let cloudSyncFailed = false;
      if (isSupabaseConfigured) {
        const { error: settingsErr } = await supabase.from('site_settings').upsert([
          { key: 'contactEmail', value: newContent.contactEmail },
          { key: 'socialLinks', value: newContent.socialLinks },
          { key: 'about', value: newContent.about },
          { key: 'whyChooseUs', value: newContent.whyChooseUs },
          { key: 'ventures', value: newContent.ventures },
          { key: 'services', value: newContent.services },
          { key: 'faqs', value: newContent.faqs },
          { key: 'processHeader', value: newContent.processHeader },
          { key: 'processSteps', value: newContent.processSteps }
        ], { onConflict: 'key' });

        if (settingsErr) {
          cloudSyncFailed = true;
          console.error('Supabase site_settings upsert FAILED:', settingsErr);
        }

        // Ensure every item carries a STABLE database-compatible UUID BEFORE
        // saving.
        let idsNormalized = false;
        const ensureStableIds = (items) => {
          (items || []).forEach(item => {
            if (item && item.id && !SUPABASE_UUID_REGEX.test(item.id)) {
              item.id = generateUUID();
              idsNormalized = true;
            }
          });
          return items || [];
        };

        const dedupeByTitle = (items) => {
          const list = items || [];
          const winner = new Map();
          list.forEach(item => {
            const key = (item?.title || '').trim().toLowerCase();
            if (key) winner.set(key, item);
          });
          const deduped = list.filter(item => {
            const key = (item?.title || '').trim().toLowerCase();
            return !key || winner.get(key) === item;
          });
          if (deduped.length !== list.length) idsNormalized = true;
          return deduped;
        };
        const stableServices = dedupeByTitle(ensureStableIds(newContent.services));
        const stableVentures = dedupeByTitle(ensureStableIds(newContent.ventures));

        if (stableServices.length > 0) {
          const formattedServices = stableServices.map((srv, idx) => ({
            id: srv.id,
            title: srv.title,
            description: srv.description,
            icon: srv.icon,
            is_active: srv.isActive !== false,
            sort_order: idx + 1
          }));
          const { error: servicesErr } = await supabase.from('services').upsert(formattedServices, { onConflict: 'id' });
          if (servicesErr) {
            cloudSyncFailed = true;
            console.error('Supabase services upsert FAILED:', servicesErr);
          }
        }

        if (stableVentures.length > 0) {
          const formattedVentures = stableVentures.map((vtr, idx) => ({
            id: vtr.id,
            title: vtr.title,
            description: vtr.description,
            url: vtr.url || '',
            image: vtr.image || '',
            is_active: vtr.isActive !== false,
            sort_order: idx + 1
          }));
          const { error: venturesErr } = await supabase.from('ventures').upsert(formattedVentures, { onConflict: 'id' });
          if (venturesErr) {
            cloudSyncFailed = true;
            console.error('Supabase ventures upsert FAILED:', venturesErr);
          }
        }

        // Persist newly assigned UUIDs locally so future saves reuse them
        if (idsNormalized) {
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...newContent, services: stableServices, ventures: stableVentures }));
          } catch {}
        }

        const reconcileHardDeletes = async (tableName, keptItems) => {
          try {
            const { data: existingRows, error: fetchErr } = await supabase.from(tableName).select('id');
            if (fetchErr || !Array.isArray(existingRows)) {
              if (fetchErr) {
                cloudSyncFailed = true;
                console.error(`Supabase ${tableName} reconcile read FAILED:`, fetchErr);
              }
              return;
            }
            const keptIds = new Set(
              keptItems
                .filter(item => item && item.id)
                .map(item => String(item.id))
            );
            const staleRows = existingRows.filter(row => !keptIds.has(String(row.id)));
            for (const row of staleRows) {
              const { error: delErr } = await supabase.from(tableName).delete().eq('id', row.id);
              if (delErr) {
                cloudSyncFailed = true;
                console.error(`Supabase ${tableName} hard-delete FAILED:`, delErr);
              }
            }
          } catch (err) {
            cloudSyncFailed = true;
            console.error(`Supabase ${tableName} reconcile exception:`, err);
          }
        };

        await reconcileHardDeletes('services', stableServices);
        await reconcileHardDeletes('ventures', stableVentures);
      }

      // Broadcast update signal to ALL OTHER open tabs AFTER cloud sync completes
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          const bc = new BroadcastChannel('the_social_dev_channel');
          bc.postMessage({ type: 'revalidate', senderId: TAB_ID });
          bc.close();
        } catch {}
      }

      // Surface real cloud-sync failures to the admin UI
      setSaveStatus(cloudSyncFailed ? 'error' : 'success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Auth Methods with Strict Email Whitelist & Password Validation
  const login = async (emailInput, passwordInput) => {
    const cleanEmail = (emailInput || '').trim().toLowerCase();

    if (!validateEmail(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }

    if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
      throw new Error('Access denied: Email address is not authorized for Admin Access.');
    }

    if (!passwordInput) {
      throw new Error('Please enter your admin password.');
    }

    // 1. If Supabase Cloud is configured, attempt cloud authentication first
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: passwordInput
        });
        if (!error && data?.user) {
          const adminUser = { email: data.user.email, id: data.user.id };
          setUser(adminUser);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminUser));
          return adminUser;
        }
      } catch {
        // Fallback to local password check if cloud user is not created yet
      }
    }

    // 2. Password Validation Check (uses custom updated password or environment variable)
    const customPassword = localStorage.getItem('the_social_dev_custom_admin_password');
    const expectedPassword = customPassword || import.meta.env.VITE_ADMIN_PASSWORD;

    if (expectedPassword && passwordInput === expectedPassword) {
      const adminUser = { email: cleanEmail, id: 'admin-local-1' };
      setUser(adminUser);
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminUser));
      return adminUser;
    }


    throw new Error('Incorrect admin password. Please try again.');
  };

  const updateAdminPassword = async (newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    // 1. If Supabase is configured, update the cloud user password
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          console.warn('Supabase password update note:', error.message);
        }
      } catch (err) {
        console.warn('Supabase password update error:', err);
      }
    }

    // 2. Persist custom password in localStorage for immediate fallback login
    localStorage.setItem('the_social_dev_custom_admin_password', newPassword);
    return true;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
    localStorage.removeItem(LOCAL_AUTH_KEY);
  };

  // Content Mutators with Sanitization
  const updateAbout = (aboutData) => {
    const sanitizedAbout = {
      ...aboutData,
      caption: sanitizeString(aboutData.caption, 200),
      heading: sanitizeString(aboutData.heading, 300),
      subheading: sanitizeString(aboutData.subheading, 500),
      description1: sanitizeString(aboutData.description1, 3000),
      description2: sanitizeString(aboutData.description2, 3000),
      ctaLabel: sanitizeString(aboutData.ctaLabel, 100),
      ctaLink: sanitizeUrl(aboutData.ctaLink),
      labels: aboutData.labels ? {
        performance: sanitizeString(aboutData.labels.performance, 100),
        audience: sanitizeString(aboutData.labels.audience, 100),
        satisfaction: sanitizeString(aboutData.labels.satisfaction, 100),
        growth: sanitizeString(aboutData.labels.growth, 100)
      } : {},
      images: aboutData.images ? {
        growthChart: sanitizeUrl(aboutData.images.growthChart),
        avatar1: sanitizeUrl(aboutData.images.avatar1),
        avatar2: sanitizeUrl(aboutData.images.avatar2),
        avatar3: sanitizeUrl(aboutData.images.avatar3)
      } : {}
    };
    saveContent({ ...content, about: sanitizedAbout });
  };

  const updateServices = (newServicesList) => {
    saveContent({ ...content, services: newServicesList });
  };

  const addService = (serviceItem) => {
    const newService = {
      id: generateUUID(),
      title: sanitizeString(serviceItem.title, 200),
      description: sanitizeString(serviceItem.description, 2000),
      icon: sanitizeUrl(serviceItem.icon) || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfd1dcc5b0275fa8dddf33_service-logo-01.svg",
      isActive: true,
      sortOrder: (content.services || []).length + 1
    };
    saveContent({ ...content, services: [...(content.services || []), newService] });
  };

  const editService = (id, updatedFields) => {
    const updatedList = (content.services || []).map(srv => {
      if (srv.id !== id) return srv;
      return {
        ...srv,
        ...updatedFields,
        title: updatedFields.title !== undefined ? sanitizeString(updatedFields.title, 200) : srv.title,
        description: updatedFields.description !== undefined ? sanitizeString(updatedFields.description, 2000) : srv.description,
        icon: updatedFields.icon !== undefined ? sanitizeUrl(updatedFields.icon) : srv.icon,
        isActive: updatedFields.isActive !== undefined ? Boolean(updatedFields.isActive) : srv.isActive
      };
    });
    saveContent({ ...content, services: updatedList });
  };

  const deleteService = (id) => {
    const updatedList = (content.services || []).filter(srv => srv.id !== id);
    saveContent({ ...content, services: updatedList });
  };

  // Ventures Mutators
  const updateVentures = (newVenturesList) => {
    saveContent({ ...content, ventures: newVenturesList });
  };

  const addVenture = (ventureItem) => {
    const newVenture = {
      id: generateUUID(),
      title: sanitizeString(ventureItem.title, 200),
      description: sanitizeString(ventureItem.description, 2000),
      url: sanitizeUrl(ventureItem.url),
      image: sanitizeUrl(ventureItem.image),
      isActive: true,
      sortOrder: (content.ventures || []).length + 1
    };
    saveContent({ ...content, ventures: [...(content.ventures || []), newVenture] });
  };

  const editVenture = (id, updatedFields) => {
    const updatedList = (content.ventures || []).map(vtr => {
      if (vtr.id !== id) return vtr;
      return {
        ...vtr,
        ...updatedFields,
        title: updatedFields.title !== undefined ? sanitizeString(updatedFields.title, 200) : vtr.title,
        description: updatedFields.description !== undefined ? sanitizeString(updatedFields.description, 2000) : vtr.description,
        url: updatedFields.url !== undefined ? sanitizeUrl(updatedFields.url) : vtr.url,
        image: updatedFields.image !== undefined ? sanitizeUrl(updatedFields.image) : vtr.image,
        isActive: updatedFields.isActive !== undefined ? Boolean(updatedFields.isActive) : vtr.isActive
      };
    });
    saveContent({ ...content, ventures: updatedList });
  };

  const deleteVenture = (id) => {
    const updatedList = (content.ventures || []).filter(vtr => vtr.id !== id);
    saveContent({ ...content, ventures: updatedList });
  };

  const updateWhyChooseUs = (whyData) => {
    const sanitizedWhy = {
      ...whyData,
      caption: sanitizeString(whyData.caption, 200),
      heading: sanitizeString(whyData.heading, 300),
      subheading: sanitizeString(whyData.subheading, 500),
      description1: sanitizeString(whyData.description1, 3000),
      description2: sanitizeString(whyData.description2, 3000),
      ctaLabel: sanitizeString(whyData.ctaLabel, 100),
      ctaLink: sanitizeUrl(whyData.ctaLink),
      metrics: Array.isArray(whyData.metrics) ? whyData.metrics.map(m => ({
        ...m,
        value: sanitizeString(m.value, 100),
        label: sanitizeString(m.label, 200),
        description: sanitizeString(m.description, 500),
        icon: sanitizeUrl(m.icon)
      })) : []
    };
    saveContent({ ...content, whyChooseUs: sanitizedWhy });
  };

  const updateContactEmail = (newEmail) => {
    const cleanEmail = sanitizeString(newEmail, 150);
    if (!validateEmail(cleanEmail)) {
      throw new Error('Invalid email address format');
    }
    saveContent({ ...content, contactEmail: cleanEmail });
  };

  const updateSocialLinks = (newLinks) => {
    saveContent({ ...content, socialLinks: newLinks });
  };

  const addSocialLink = (linkItem) => {
    const newLink = {
      id: generateUUID(),
      name: sanitizeString(linkItem.name, 100),
      url: sanitizeUrl(linkItem.url),
      icon: sanitizeString(linkItem.icon, 500) || 'ri-global-line'
    };
    saveContent({ ...content, socialLinks: [...(content.socialLinks || []), newLink] });
  };

  const deleteSocialLink = (id) => {
    const updatedList = (content.socialLinks || []).filter(link => link.id !== id);
    saveContent({ ...content, socialLinks: updatedList });
  };

  // FAQ Mutators
  const updateFaqs = (newFaqsList) => {
    saveContent({ ...content, faqs: newFaqsList });
  };

  const addFaq = (faqItem) => {
    const newFaq = {
      id: generateUUID(),
      question: sanitizeString(faqItem.question, 500),
      answer: sanitizeString(faqItem.answer, 3000),
      isActive: true,
      sortOrder: (content.faqs || DEFAULT_SITE_CONTENT.faqs || []).length + 1
    };
    saveContent({ ...content, faqs: [...(content.faqs || DEFAULT_SITE_CONTENT.faqs || []), newFaq] });
  };

  const editFaq = (id, updatedFields) => {
    const currentList = content.faqs || DEFAULT_SITE_CONTENT.faqs || [];
    const updatedList = currentList.map(faq => {
      if (faq.id !== id) return faq;
      return {
        ...faq,
        ...updatedFields,
        question: updatedFields.question !== undefined ? sanitizeString(updatedFields.question, 500) : faq.question,
        answer: updatedFields.answer !== undefined ? sanitizeString(updatedFields.answer, 3000) : faq.answer,
        isActive: updatedFields.isActive !== undefined ? Boolean(updatedFields.isActive) : faq.isActive
      };
    });
    saveContent({ ...content, faqs: updatedList });
  };

  const deleteFaq = (id) => {
    const currentList = content.faqs || DEFAULT_SITE_CONTENT.faqs || [];
    const updatedList = currentList.filter(faq => faq.id !== id);
    saveContent({ ...content, faqs: updatedList });
  };

  const resetToDefaults = () => {
    saveContent(DEFAULT_SITE_CONTENT);
  };

  const updateProcessHeader = (headerData) => {
    const sanitizedHeader = {
      ...content.processHeader,
      ...headerData,
      pill: sanitizeString(headerData.pill, 100),
      headingLine1: sanitizeString(headerData.headingLine1, 200),
      headingLine2: sanitizeString(headerData.headingLine2, 200),
      italicAccent: sanitizeString(headerData.italicAccent, 100),
      description: sanitizeString(headerData.description, 1000)
    };
    saveContent({ ...content, processHeader: sanitizedHeader });
  };

  const updateProcessSteps = (newProcessSteps) => {
    saveContent({ ...content, processSteps: newProcessSteps });
  };

  const addProcessStep = (stepItem) => {
    const currentSteps = content.processSteps || [];
    const nextNum = String(currentSteps.length + 1).padStart(2, '0');
    const newStep = {
      id: generateUUID(),
      number: nextNum,
      category: sanitizeString(stepItem.category, 100) || 'WORK PROCESS',
      title: sanitizeString(stepItem.title, 200),
      subtitle: sanitizeString(stepItem.subtitle, 200) || '',
      description: sanitizeString(stepItem.description, 2000),
      icon: sanitizeUrl(stepItem.icon) || '',
      tags: Array.isArray(stepItem.tags)
        ? stepItem.tags
        : (stepItem.tags || '').split(',').map(t => t.trim()).filter(Boolean),
      visualType: stepItem.visualType || 'development',
      isActive: true,
      sortOrder: currentSteps.length + 1
    };
    saveContent({ ...content, processSteps: [...currentSteps, newStep] });
  };

  const editProcessStep = (id, updatedFields) => {
    const updated = (content.processSteps || []).map(step => {
      if (step.id === id) {
        return {
          ...step,
          ...updatedFields,
          category: updatedFields.category !== undefined ? sanitizeString(updatedFields.category, 100) : step.category,
          title: updatedFields.title !== undefined ? sanitizeString(updatedFields.title, 200) : step.title,
          subtitle: updatedFields.subtitle !== undefined ? sanitizeString(updatedFields.subtitle, 200) : step.subtitle,
          description: updatedFields.description !== undefined ? sanitizeString(updatedFields.description, 2000) : step.description,
          icon: updatedFields.icon !== undefined ? sanitizeUrl(updatedFields.icon) : step.icon,
          tags: updatedFields.tags !== undefined
            ? (Array.isArray(updatedFields.tags) ? updatedFields.tags : updatedFields.tags.split(',').map(t => t.trim()).filter(Boolean))
            : step.tags
        };
      }
      return step;
    });
    saveContent({ ...content, processSteps: updated });
  };

  const deleteProcessStep = (id) => {
    const filtered = (content.processSteps || []).filter(step => step.id !== id);
    const renumbered = filtered.map((step, index) => ({
      ...step,
      number: String(index + 1).padStart(2, '0'),
      sortOrder: index + 1
    }));
    saveContent({ ...content, processSteps: renumbered });
  };

  return (
    <SiteContext.Provider
      value={{
        content,
        user,
        loading,
        saveStatus,
        login,
        logout,
        updateAdminPassword,
        revalidateContent: fetchFromSupabase,
        updateAbout,
        updateServices,
        addService,
        editService,
        deleteService,
        updateVentures,
        addVenture,
        editVenture,
        deleteVenture,
        updateWhyChooseUs,
        updateContactEmail,
        updateSocialLinks,
        addSocialLink,
        deleteSocialLink,
        updateFaqs,
        addFaq,
        editFaq,
        deleteFaq,
        updateProcessHeader,
        updateProcessSteps,
        addProcessStep,
        editProcessStep,
        deleteProcessStep,
        resetToDefaults
      }}
    >
      {children}
    </SiteContext.Provider>
  );


}

export function useSiteContent() {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within a SiteProvider');
  }
  return ctx;
}
