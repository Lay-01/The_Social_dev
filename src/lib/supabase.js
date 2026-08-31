// Standalone Supabase REST Client Adapter (Zero-dependency, Vite-friendly)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey &&
  supabaseUrl !== 'https://placeholder.supabase.co'
);

// Native fetch headers with explicit JWT session access token injection & cache control
function getHeaders(sessionToken = null) {
  const activeToken = sessionToken || localStorage.getItem('supabase_access_token') || supabaseAnonKey;
  return {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${activeToken}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };
}

// Auth-aware fetch: retries ONCE without the stored access token when it is
// expired/invalid (401), so a stale Supabase session can never permanently
// block admin saves. Falls back cleanly to anonymous (RLS-governed) requests.
async function authFetch(url, options = {}) {
  const send = () => fetch(url, { ...options, headers: { ...getHeaders(), ...(options.headers || {}) }, cache: 'no-store' });
  let res = await send();
  if (res.status === 401 && localStorage.getItem('supabase_access_token')) {
    localStorage.removeItem('supabase_access_token');
    res = await send();
  }
  return res;
}

export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase URL/Key is not set in .env');
      }
      const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password&_t=${Date.now()}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
        cache: 'no-store'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error_description || data.msg || 'Authentication failed');
      
      // Persist access token for server-side RLS enforcement
      if (data.access_token) {
        localStorage.setItem('supabase_access_token', data.access_token);
      }

      return { data: { user: { id: data.user.id, email: data.user.email }, access_token: data.access_token }, error: null };
    },

    signUp: async ({ email, password, options = {} }) => {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase URL/Key is not set in .env');
      }
      const redirectTo = options.redirectTo || `${window.location.origin}/admin`;
      const res = await fetch(`${supabaseUrl}/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
        cache: 'no-store'
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: new Error(data.msg || data.error_description || 'Signup failed') };
      }
      return { data, error: null };
    },

    resetPasswordForEmail: async (email, options = {}) => {
      if (!isSupabaseConfigured) {
        return { data: {}, error: null };
      }
      const redirectTo = options.redirectTo || `${window.location.origin}/admin`;

      const res = await fetch(`${supabaseUrl}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email }),
        cache: 'no-store'
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.msg || data.error_description || 'Password reset request failed';
        if (errorMsg.toLowerCase().includes('rate limit') || res.status === 429) {
          throw new Error('Supabase email limit exceeded (3 emails per hour on default SMTP). Please wait a few minutes before requesting another link, or check your spam folder for links already sent.');
        }
        throw new Error(errorMsg);
      }
      return { data, error: null };
    },

    signOut: async () => {
      localStorage.removeItem('supabase_access_token');
      return { error: null };
    },

    onAuthStateChange: (callback) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },

  from: (tableName) => {
    return {
      select: (columns = '*') => {
        let orderClause = '';

        const executeQuery = async () => {
          if (!isSupabaseConfigured) {
            return { data: null, error: null };
          }
          try {
            // NOTE: no cache-busting nonce here - PostgREST parses every
            // query param as a filter, so extra params like &_t=... cause
            // 400 "failed to parse filter". Caching is prevented via headers.
            let url = `${supabaseUrl}/rest/v1/${tableName}?select=${columns}`;
            if (orderClause) url += `&${orderClause}`;
            const res = await authFetch(url);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error fetching data');
            return { data, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        };

        const chain = {
          order: (column, { ascending = true } = {}) => {
            orderClause = `order=${column}.${ascending ? 'asc' : 'desc'}`;
            return {
              then: (resolve, reject) => executeQuery().then(resolve, reject)
            };
          },
          then: (resolve, reject) => executeQuery().then(resolve, reject)
        };

        return chain;
      },

      // Hard-delete rows matching an equality filter.
      // Usage: await supabase.from('ventures').delete().eq('id', someUuid)
      delete: () => {
        const filters = [];

        const executeDelete = async () => {
          if (!isSupabaseConfigured) {
            return { data: null, error: null };
          }
          if (filters.length === 0) {
            const err = new Error('DELETE requires at least one .eq() filter to prevent full-table deletion');
            console.error(`Supabase delete error on ${tableName}:`, err.message);
            return { data: null, error: err };
          }
          try {
            const query = filters
              .map(({ column, value }) => `${encodeURIComponent(column)}=eq.${encodeURIComponent(value)}`)
              .join('&');
            const res = await authFetch(`${supabaseUrl}/rest/v1/${tableName}?${query}`, {
              method: 'DELETE'
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              const errorMsg = data.message || data.hint || data.details || 'Error deleting data';
              console.error(`Supabase delete error on ${tableName}:`, errorMsg);
              return { data: null, error: new Error(errorMsg) };
            }
            return { data: null, error: null };
          } catch (err) {
            console.error(`Supabase delete exception on ${tableName}:`, err);
            return { data: null, error: err };
          }
        };

        return {
          eq: (column, value) => {
            filters.push({ column, value });
            return executeDelete();
          }
        };
      },

      upsert: async (records, options = {}) => {
        if (!isSupabaseConfigured) {
          return { data: records, error: null };
        }
        try {
          const conflictCol = options.onConflict ? options.onConflict : (tableName === 'site_settings' ? 'key' : 'id');
          const res = await authFetch(`${supabaseUrl}/rest/v1/${tableName}?on_conflict=${conflictCol}`, {
            method: 'POST',
            headers: {
              'Prefer': 'resolution=merge-duplicates,return=representation'
            },
            body: JSON.stringify(records)
          });
          const data = await res.json();
          if (!res.ok) {
            const errorMsg = data.message || data.hint || data.details || 'Error updating data';
            console.error(`Supabase upsert error on ${tableName}:`, errorMsg);
            return { data: null, error: new Error(errorMsg) };
          }
          return { data, error: null };
        } catch (err) {
          console.error(`Supabase upsert exception on ${tableName}:`, err);
          return { data: null, error: err };
        }
      }
    };
  }
};

export const SQL_SCHEMA_SETUP = `-- Supabase SQL Setup Queries for The_Social_Dev Admin Dashboard

-- 1. Create site_settings table (for key-value pairs like email, about, whyChooseUs, ventures, services)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create services table (for Services CRUD)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create ventures table (for Our Ventures CRUD)
CREATE TABLE IF NOT EXISTS ventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Row Level Security Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;

-- Allow public read access across all tables
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read services" ON services;
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read ventures" ON ventures;
CREATE POLICY "Public read ventures" ON ventures FOR SELECT USING (true);

-- Allow site management write access for admin updates
DROP POLICY IF EXISTS "Admin write site_settings" ON site_settings;
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin write services" ON services;
CREATE POLICY "Admin write services" ON services FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin write ventures" ON ventures;
CREATE POLICY "Admin write ventures" ON ventures FOR ALL USING (true);
`;
