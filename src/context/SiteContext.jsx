import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sanitizeString, sanitizeUrl, validateEmail, generateUUID } from '../utils/sanitize';

const SiteContext = createContext();

const LOCAL_STORAGE_KEY = 'the_social_dev_site_content_v2';
const LOCAL_AUTH_KEY = 'the_social_dev_admin_session_v1';

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
      return savedAuth ? JSON.parse(savedAuth) : null;
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

      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      const { data: venturesData } = await supabase
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
        // Source of truth: dedicated `services` table FIRST (it reflects hard
        // deletes), then the site_settings JSON mirror, then local cache.
        const fetchedServices = (servicesData && servicesData.length > 0)
          ? servicesData.map(s => ({
              id: s.id,
              title: s.title,
              description: s.description,
              icon: s.icon,
              isActive: s.is_active !== false,
              sortOrder: s.sort_order
            }))
          : ((settingsMap.services && Array.isArray(settingsMap.services) && settingsMap.services.length > 0)
              ? settingsMap.services
              : (prev.services && prev.services.length > 0 ? prev.services : DEFAULT_SITE_CONTENT.services));

        // Source of truth: dedicated `ventures` table FIRST (it reflects hard
        // deletes), then the site_settings JSON mirror, then local cache.
        const fetchedVentures = (venturesData && venturesData.length > 0)
          ? venturesData.map(v => ({
              id: v.id,
              title: v.title,
              description: v.description,
              url: v.url,
              image: v.image,
              isActive: v.is_active !== false,
              sortOrder: v.sort_order
            }))
          : ((settingsMap.ventures && Array.isArray(settingsMap.ventures) && settingsMap.ventures.length > 0)
              ? settingsMap.ventures
              : (prev.ventures && prev.ventures.length > 0 ? prev.ventures : DEFAULT_SITE_CONTENT.ventures));

        const updated = {
          ...prev,
          contactEmail: settingsMap.contactEmail || prev.contactEmail || DEFAULT_SITE_CONTENT.contactEmail,
          socialLinks: (settingsMap.socialLinks && Array.isArray(settingsMap.socialLinks) && settingsMap.socialLinks.length > 0)
            ? settingsMap.socialLinks
            : (prev.socialLinks && prev.socialLinks.length > 0 ? prev.socialLinks : DEFAULT_SITE_CONTENT.socialLinks),
          about: settingsMap.about || prev.about || DEFAULT_SITE_CONTENT.about,
          whyChooseUs: settingsMap.whyChooseUs || prev.whyChooseUs || DEFAULT_SITE_CONTENT.whyChooseUs,
          services: fetchedServices,
          ventures: fetchedVentures
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
          if (event.data === 'revalidate') {
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

    // Broadcast update signal to all open tabs on the browser
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const bc = new BroadcastChannel('the_social_dev_channel');
        bc.postMessage('revalidate');
        bc.close();
      } catch {}
    }

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
          { key: 'services', value: newContent.services }
        ], { onConflict: 'key' });

        if (settingsErr) {
          cloudSyncFailed = true;
          console.error('Supabase site_settings upsert FAILED:', settingsErr);
        }

        // Ensure every item carries a STABLE database-compatible UUID BEFORE
        // saving. Previously a fresh random UUID was generated on every save
        // for legacy non-UUID ids, creating duplicate rows in Supabase and
        // breaking deletion reconciliation.
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
        const stableServices = ensureStableIds(newContent.services);
        const stableVentures = ensureStableIds(newContent.ventures);

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

        // Reconcile the dedicated tables against the saved lists by HARD-DELETING
        // any DB row that is no longer present. Upsert alone never removes rows,
        // so deleted ventures/services would otherwise survive as orphaned rows
        // and reappear on other browsers/devices that fetch from these tables.
        // This also heals any pre-existing orphaned rows on the next save.
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

      // Surface real cloud-sync failures to the admin UI instead of silently
      // reporting success while the database was never actually updated.
      setSaveStatus(cloudSyncFailed ? 'error' : 'success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Auth Methods with Seamless Fallback
  const login = async (emailInput, passwordInput) => {
    const cleanEmail = sanitizeString(emailInput || import.meta.env.VITE_ADMIN_DEFAULT_EMAIL || 'the.social.dev12@gmail.com', 100);
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!validateEmail(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }

    // 1. If Supabase Cloud is configured, attempt cloud authentication first
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: passwordInput });
        if (!error && data?.user) {
          const adminUser = { email: data.user.email, id: data.user.id };
          setUser(adminUser);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminUser));
          return adminUser;
        }
      } catch {
        // Fallback to VITE_ADMIN_PASSWORD if cloud user is not registered yet
      }
    }

    // 2. Local environment password validation check
    if (envPassword) {
      if (passwordInput === envPassword) {
        const adminUser = { email: cleanEmail, id: 'admin-local-1' };
        setUser(adminUser);
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminUser));
        return adminUser;
      } else {
        throw new Error('Incorrect admin password');
      }
    }

    // 3. Fallback check for any 4+ character password if no env password specified
    if (!passwordInput || passwordInput.length < 4) {
      throw new Error('Password must be at least 4 characters long');
    }

    const adminUser = { email: cleanEmail, id: 'admin-local-1' };
    setUser(adminUser);
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(adminUser));
    return adminUser;
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

  const resetToDefaults = () => {
    saveContent(DEFAULT_SITE_CONTENT);
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
