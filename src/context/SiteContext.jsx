import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SiteContext = createContext();

const LOCAL_STORAGE_KEY = 'the_social_dev_site_content_v2';
const LOCAL_AUTH_KEY = 'the_social_dev_admin_session_v1';

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

  // Sync to Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchFromSupabase = async () => {
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

        if (!settingsErr && settingsData && settingsData.length > 0) {
          const settingsMap = settingsData.reduce((acc, row) => {
            acc[row.key] = row.value;
            return acc;
          }, {});

          setContent(prev => ({
            ...prev,
            contactEmail: settingsMap.contactEmail || prev.contactEmail,
            socialLinks: settingsMap.socialLinks || prev.socialLinks,
            about: settingsMap.about || prev.about,
            whyChooseUs: settingsMap.whyChooseUs || prev.whyChooseUs,
            services: servicesData && servicesData.length > 0 ? servicesData : (settingsMap.services || prev.services),
            ventures: venturesData && venturesData.length > 0 ? venturesData.map(v => ({
              ...v,
              isActive: v.is_active !== false,
              sortOrder: v.sort_order
            })) : (settingsMap.ventures || prev.ventures)
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch notice: using fallback content.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFromSupabase();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email, id: session.user.id });
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ email: session.user.email, id: session.user.id }));
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Save changes locally and to Supabase
  const saveContent = async (newContent) => {
    setContent(newContent);
    setSaveStatus('saving');
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));

      if (isSupabaseConfigured) {
        await supabase.from('site_settings').upsert([
          { key: 'contactEmail', value: newContent.contactEmail },
          { key: 'socialLinks', value: newContent.socialLinks },
          { key: 'about', value: newContent.about },
          { key: 'whyChooseUs', value: newContent.whyChooseUs },
          { key: 'ventures', value: newContent.ventures }
        ]);

        if (newContent.services && newContent.services.length > 0) {
          await supabase.from('services').upsert(
            newContent.services.map((srv, idx) => ({
              id: srv.id,
              title: srv.title,
              description: srv.description,
              icon: srv.icon,
              is_active: srv.isActive !== false,
              sort_order: idx + 1
            }))
          );
        }

        if (newContent.ventures && newContent.ventures.length > 0) {
          await supabase.from('ventures').upsert(
            newContent.ventures.map((vtr, idx) => ({
              id: vtr.id,
              title: vtr.title,
              description: vtr.description,
              url: vtr.url,
              image: vtr.image,
              is_active: vtr.isActive !== false,
              sort_order: idx + 1
            }))
          );
        }
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      setSaveStatus('error');
    }
  };

  // Auth Methods with Seamless Fallback
  const login = async (emailInput, passwordInput) => {
    const targetEmail = emailInput || import.meta.env.VITE_ADMIN_DEFAULT_EMAIL || 'the.social.dev12@gmail.com';
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // 1. If Supabase Cloud is configured, attempt cloud authentication first
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: targetEmail, password: passwordInput });
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
        const adminUser = { email: targetEmail, id: 'admin-local-1' };
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

    const adminUser = { email: targetEmail, id: 'admin-local-1' };
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

  // Content Mutators
  const updateAbout = (aboutData) => {
    saveContent({ ...content, about: aboutData });
  };

  const updateServices = (newServicesList) => {
    saveContent({ ...content, services: newServicesList });
  };

  const addService = (serviceItem) => {
    const newService = {
      id: `srv-${Date.now()}`,
      title: serviceItem.title,
      description: serviceItem.description,
      icon: serviceItem.icon || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfd1dcc5b0275fa8dddf33_service-logo-01.svg",
      isActive: true,
      sortOrder: (content.services || []).length + 1
    };
    saveContent({ ...content, services: [...(content.services || []), newService] });
  };

  const editService = (id, updatedFields) => {
    const updatedList = (content.services || []).map(srv => 
      srv.id === id ? { ...srv, ...updatedFields } : srv
    );
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
      id: `vtr-${Date.now()}`,
      title: ventureItem.title,
      description: ventureItem.description,
      url: ventureItem.url || '',
      image: ventureItem.image || '',
      isActive: true,
      sortOrder: (content.ventures || []).length + 1
    };
    saveContent({ ...content, ventures: [...(content.ventures || []), newVenture] });
  };

  const editVenture = (id, updatedFields) => {
    const updatedList = (content.ventures || []).map(vtr => 
      vtr.id === id ? { ...vtr, ...updatedFields } : vtr
    );
    saveContent({ ...content, ventures: updatedList });
  };

  const deleteVenture = (id) => {
    const updatedList = (content.ventures || []).filter(vtr => vtr.id !== id);
    saveContent({ ...content, ventures: updatedList });
  };

  const updateWhyChooseUs = (whyData) => {
    saveContent({ ...content, whyChooseUs: whyData });
  };

  const updateContactEmail = (newEmail) => {
    saveContent({ ...content, contactEmail: newEmail });
  };

  const updateSocialLinks = (newLinks) => {
    saveContent({ ...content, socialLinks: newLinks });
  };

  const addSocialLink = (linkItem) => {
    const newLink = {
      id: `soc-${Date.now()}`,
      name: linkItem.name,
      url: linkItem.url,
      icon: linkItem.icon || 'ri-global-line'
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
