-- ============================================================
-- The_Social_Dev — Supabase Database Repair Script
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query
--
-- What it does:
--   1. Creates the missing `ventures` table
--   2. Re-enables RLS on all three content tables
--   3. Restores public READ policies and write policies so the
--      deployed site's admin panel can save again
-- Safe to re-run (IF NOT EXISTS / IF EXISTS everywhere).
-- ============================================================

-- 1. Create ventures table (Our Ventures CRUD)
CREATE TABLE IF NOT EXISTS public.ventures (
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

-- 2. Ensure RLS is enabled on all content tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventures ENABLE ROW LEVEL SECURITY;

-- 3. Public read access (visitors can load site content)
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read ventures" ON public.ventures;
CREATE POLICY "Public read ventures" ON public.ventures FOR SELECT USING (true);

-- 4. Write access for admin saves (auth is handled by the admin panel)
DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write services" ON public.services;
CREATE POLICY "Admin write services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write ventures" ON public.ventures;
CREATE POLICY "Admin write ventures" ON public.ventures FOR ALL USING (true) WITH CHECK (true);
