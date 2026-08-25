// Standalone Supabase REST Client Adapter (Zero-dependency, Vite-friendly)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hbcpxaavhlblceqjlyza.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_RL0Buoy8YpRGlSFvo7U4wQ_vAca-t9E';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey &&
  supabaseUrl !== 'https://placeholder.supabase.co'
);

const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Native fetch headers with explicit JWT session access token injection
function getHeaders(sessionToken = null) {
  const activeToken = sessionToken || localStorage.getItem('supabase_access_token') || supabaseServiceKey || supabaseAnonKey;
  return {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${activeToken}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase URL/Key is not set in .env');
      }
      const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error_description || data.msg || 'Authentication failed');
      
      // Persist access token for server-side RLS enforcement
      if (data.access_token) {
        localStorage.setItem('supabase_access_token', data.access_token);
      }

      return { data: { user: { id: data.user.id, email: data.user.email }, access_token: data.access_token }, error: null };
    },

    resetPasswordForEmail: async (email, options = {}) => {
      if (!isSupabaseConfigured) {
        return { data: {}, error: null };
      }
      const res = await fetch(`${supabaseUrl}/auth/v1/recover`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, ...options })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error_description || 'Password reset request failed');
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
            let url = `${supabaseUrl}/rest/v1/${tableName}?select=${columns}`;
            if (orderClause) url += `&${orderClause}`;
            const res = await fetch(url, { headers: getHeaders() });
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

      upsert: async (records) => {
        if (!isSupabaseConfigured) {
          return { data: records, error: null };
        }
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
            method: 'POST',
            headers: {
              ...getHeaders(),
              'Prefer': 'resolution=merge-duplicates,return=representation'
            },
            body: JSON.stringify(records)
          });
          const data = await res.json();
          if (!res.ok) {
            const errorMsg = data.message || data.hint || data.details || 'Error updating data';
            return { data: null, error: new Error(errorMsg) };
          }
          return { data, error: null };
        } catch (err) {
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
