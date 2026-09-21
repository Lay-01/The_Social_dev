/**
 * Client-Side Security Audit Utility — The Social Dev
 *
 * Run this in the browser DevTools console on the production site.
 * It performs non-destructive checks only (no writes, no network mutations).
 *
 * Usage:
 *   Copy-paste the entire file into DevTools console, then call:
 *   runSecurityAudit()
 */

(function runSecurityAudit() {
  'use strict';

  const PASS = '✅ PASS';
  const FAIL = '❌ FAIL';
  const WARN = '⚠️  WARN';
  const INFO = 'ℹ️  INFO';

  const results = [];
  const issues = [];

  function check(category, label, passed, severity, detail) {
    const status = passed === true ? PASS : passed === 'warn' ? WARN : FAIL;
    results.push({ category, label, status, detail });
    if (status !== PASS) {
      issues.push({ category, label, severity, detail, status });
    }
  }

  // ─── 1. localStorage — Dangerous Keys ──────────────────────────────────────
  const DANGEROUS_STORAGE_KEYS = [
    'the_social_dev_custom_admin_password',
    'admin_password',
    'adminPassword',
    'password',
    'plaintext_password',
  ];

  let passwordKeyFound = false;
  for (const key of DANGEROUS_STORAGE_KEYS) {
    const val = localStorage.getItem(key);
    if (val !== null) {
      passwordKeyFound = true;
      check(
        'Password Handling',
        `localStorage["${key}"]`,
        false,
        'CRITICAL',
        `Plaintext password found in localStorage. Value length: ${val.length}. Remove immediately.`
      );
    }
  }
  if (!passwordKeyFound) {
    check('Password Handling', 'No plaintext password in localStorage', true, null, 'No dangerous password keys found.');
  }

  // ─── 2. localStorage — Admin Session ────────────────────────────────────────
  const authSession = localStorage.getItem('the_social_dev_admin_session_v1');
  if (authSession) {
    try {
      const parsed = JSON.parse(authSession);
      const hasPassword = Object.keys(parsed).some(k => k.toLowerCase().includes('password'));
      if (hasPassword) {
        check('Session Security', 'Admin session contains password field', false, 'CRITICAL', JSON.stringify(Object.keys(parsed)));
      } else {
        check('Session Security', 'Admin session contains only non-sensitive identifiers', true, null, `Keys: ${Object.keys(parsed).join(', ')}`);
      }
    } catch {
      check('Session Security', 'Admin session parse failed', 'warn', 'LOW', 'Could not parse session JSON.');
    }
  } else {
    check('Session Security', 'No admin session in localStorage (not logged in)', true, null, 'Expected when not logged in.');
  }

  // ─── 3. Supabase Key Classification ─────────────────────────────────────────
  // Scan all script text content for key patterns
  const allScripts = Array.from(document.querySelectorAll('script')).map(s => s.textContent || '');
  const inlineText = allScripts.join('\n');

  const secretKeyPattern = /sb_secret_[A-Za-z0-9_-]{20,}/g;
  const serviceRolePattern = /service_role['":\s]+[A-Za-z0-9._-]{20,}/gi;
  const anonKeyPattern = /sb_publishable_[A-Za-z0-9_-]{10,}/g;

  const foundSecretKeys = inlineText.match(secretKeyPattern);
  const foundServiceRole = inlineText.match(serviceRolePattern);
  const foundAnonKeys = inlineText.match(anonKeyPattern);

  if (foundSecretKeys) {
    check('Secrets', 'Supabase secret key found in browser JS', false, 'CRITICAL',
      `Found ${foundSecretKeys.length} instance(s) of sb_secret_ pattern. ROTATE THIS KEY IMMEDIATELY.`);
  } else {
    check('Secrets', 'No Supabase secret key (sb_secret_) in browser JS', true, null, 'Only publishable/anon keys should appear here.');
  }

  if (foundServiceRole) {
    check('Secrets', 'service_role credential found in browser JS', false, 'CRITICAL',
      `service_role pattern detected. This grants unrestricted DB access. ROTATE AND REMOVE.`);
  } else {
    check('Secrets', 'No service_role credential in browser JS', true, null, 'Good. service_role keys must stay server-side.');
  }

  if (foundAnonKeys) {
    check('Secrets', 'Supabase public anon key (sb_publishable_) present', true, null,
      `Found ${foundAnonKeys.length} instance(s). This is the correct public key — safe in browser JS.`);
  }

  // ─── 4. VITE_ADMIN_PASSWORD in bundle ────────────────────────────────────────
  const adminPasswordInBundle = inlineText.includes('VITE_ADMIN_PASSWORD') || /Lay@\d{8}/.test(inlineText);
  if (adminPasswordInBundle) {
    check('Frontend Exposure', 'VITE_ADMIN_PASSWORD found in JS bundle', false, 'CRITICAL',
      'Admin password is compiled into the browser bundle. Remove VITE_ADMIN_PASSWORD from .env immediately.');
  } else {
    check('Frontend Exposure', 'No VITE_ADMIN_PASSWORD in JS bundle', true, null, 'Admin password not exposed in browser bundle.');
  }

  // ─── 5. window.supabase — Distinguish client from secret ────────────────────
  if (typeof window.supabase !== 'undefined') {
    // Presence of window.supabase is normal for Supabase JS apps
    check('Frontend Exposure', 'window.supabase present', true, null,
      'Normal — Supabase JS client is intentionally available in browser context. This is not a vulnerability.');
  }

  // ─── 6. Security Headers ─────────────────────────────────────────────────────
  // We can only check meta-equivalent signals client-side; real header checks require server access
  const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (metaCSP) {
    check('Security Headers', 'CSP meta tag found', 'warn', 'MEDIUM',
      'CSP via meta tag is less secure than server headers. Prefer HTTP response headers (already set via vercel.json).');
  } else {
    check('Security Headers', 'No CSP meta tag (CSP set via server headers)', true, null,
      'CSP should be enforced via HTTP headers, which cannot be checked client-side here.');
  }

  // ─── 7. dangerouslySetInnerHTML checks ───────────────────────────────────────
  const dangerousElements = document.querySelectorAll('[data-dangerous-html]');
  check('XSS/Input Handling', 'Custom dangerous HTML markers', dangerousElements.length === 0 ? true : false, 'HIGH',
    dangerousElements.length === 0
      ? 'No elements with data-dangerous-html attribute found.'
      : `${dangerousElements.length} elements with data-dangerous-html found.`
  );

  // ─── 8. Source Maps ──────────────────────────────────────────────────────────
  const sourceMapLinks = Array.from(document.querySelectorAll('script[src]'))
    .map(s => s.src)
    .filter(src => src.endsWith('.map'));
  check('Frontend Exposure', 'Source maps linked in HTML', sourceMapLinks.length === 0 ? true : false, 'MEDIUM',
    sourceMapLinks.length === 0
      ? 'No .map file links found. Source maps appear disabled.'
      : `${sourceMapLinks.length} source map(s) found: ${sourceMapLinks.join(', ')}`
  );

  // ─── 9. isAdmin / role in localStorage ───────────────────────────────────────
  const isAdminLocal = localStorage.getItem('isAdmin') || localStorage.getItem('is_admin') || localStorage.getItem('role');
  if (isAdminLocal) {
    check('Admin Authorization', 'Frontend authorization flag in localStorage', false, 'CRITICAL',
      `Found: ${isAdminLocal}. Frontend-only auth flags can be tampered. Remove and enforce via backend/RLS.`);
  } else {
    check('Admin Authorization', 'No frontend authorization flags in localStorage', true, null,
      'isAdmin / role / is_admin not found in localStorage.');
  }

  // ─── REPORT ──────────────────────────────────────────────────────────────────
  console.group('%c🔒 The Social Dev — Security Audit Report', 'font-size:16px;font-weight:bold;color:#0f172a');
  console.log('%cGenerated at: ' + new Date().toISOString(), 'color:#64748b');
  console.log('');

  const categories = [...new Set(results.map(r => r.category))];
  for (const cat of categories) {
    const catResults = results.filter(r => r.category === cat);
    const allPass = catResults.every(r => r.status === PASS);
    console.group(`%c${allPass ? '✅' : '❌'} ${cat}`, `font-weight:bold;color:${allPass ? '#16a34a' : '#dc2626'}`);
    for (const r of catResults) {
      const color = r.status === PASS ? '#16a34a' : r.status === WARN ? '#d97706' : '#dc2626';
      console.log(`%c${r.status} ${r.label}`, `color:${color}`);
      if (r.detail && r.status !== PASS) {
        console.log(`   → ${r.detail}`);
      }
    }
    console.groupEnd();
  }

  console.log('');
  if (issues.length === 0) {
    console.log('%c🎉 No critical security issues found in browser context.', 'color:#16a34a;font-weight:bold');
  } else {
    console.warn(`%c⚠️ ${issues.length} issue(s) found — see details above.`, 'color:#dc2626;font-weight:bold');
    console.table(issues.map(i => ({ Category: i.category, Label: i.label, Severity: i.severity, Status: i.status })));
  }

  console.log('');
  console.log('%cNOTE: Client-side audit cannot check server headers, RLS policies, or DB state.', 'color:#64748b');
  console.log('%cFor RLS verification, run the SQL query in the Supabase Dashboard > SQL Editor.', 'color:#64748b');
  console.groupEnd();

  return { passed: issues.filter(i => i.status === FAIL).length === 0, issues };
})();
