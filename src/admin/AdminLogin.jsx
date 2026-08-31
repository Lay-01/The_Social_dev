import React, { useState, useEffect } from 'react';
import { useSiteContent, ALLOWED_ADMIN_EMAILS } from '../context/SiteContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import SecurityCaptcha from './components/SecurityCaptcha';
import AdminForgotPassword from './AdminForgotPassword';
import './admin.css';

export default function AdminLogin({ onLoginSuccess }) {
  const { login, updateAdminPassword } = useSiteContent();
  const detectRecoveryMode = () => {
    const href = (window.location.href || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    return (
      href.includes('type=recovery') ||
      search.includes('type=recovery') ||
      hash.includes('type=recovery') ||
      href.includes('access_token') ||
      href.includes('token_hash') ||
      href.includes('code=')
    );
  };

  const [view, setView] = useState(() => (detectRecoveryMode() ? 'reset' : 'login')); // 'login' | 'forgot' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (detectRecoveryMode()) {
      setView('reset');
    }

    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setView('reset');
        }
      });
      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, []);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanEmail = (email || '').trim().toLowerCase();

    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
      setError('Access denied: Email address is not authorized for Admin Access.');
      return;
    }

    if (!captchaValid) {
      setError('Please solve the security challenge (CAPTCHA) before logging in.');
      return;
    }

    setSubmitting(true);

    try {
      await login(cleanEmail, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your new password.');
      return;
    }

    if (!captchaValid) {
      setError('Please solve the security challenge (CAPTCHA) before proceeding.');
      return;
    }

    setSubmitting(true);

    try {
      await updateAdminPassword(newPassword);
      setSuccessMsg('Your password has been updated successfully! You can now log in with your new password.');
      setView('login');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setSubmitting(false);
    }
  };

  if (view === 'forgot') {
    return <AdminForgotPassword onBackToLogin={() => setView('login')} />;
  }

  if (view === 'reset') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7fb',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '1rem'
      }}>
        <div className="adminkit-card" style={{ width: '100%', maxWidth: '440px', padding: '0.5rem' }}>
          <div className="adminkit-card-body" style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                backgroundColor: '#222e3c',
                color: '#ffa260',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                marginBottom: '1rem'
              }}>
                <i className="ri-lock-password-line"></i>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#212529' }}>Set New Admin Password</h2>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.25rem' }}>
                Enter your new password below to update your account
              </p>
            </div>

            {error && (
              <div className="adminkit-alert" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                <i className="ri-error-warning-line"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleResetPasswordSubmit}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">New Password</label>
                <input
                  type="password"
                  className="adminkit-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  required
                  minLength={6}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Confirm New Password</label>
                <input
                  type="password"
                  className="adminkit-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <SecurityCaptcha onValidate={setCaptchaValid} />

              <button
                type="submit"
                className="adminkit-btn adminkit-btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}
                disabled={submitting || !captchaValid}
              >
                {submitting ? (
                  <>
                    <i className="ri-loader-4-line ri-spin"></i> Updating Password...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i> Save New Password
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setView('login')}
                style={{ background: 'none', border: 'none', fontSize: '0.825rem', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f7fb',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '1rem'
    }}>
      <div className="adminkit-card" style={{ width: '100%', maxWidth: '440px', padding: '0.5rem' }}>
        <div className="adminkit-card-body" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              backgroundColor: '#222e3c',
              color: '#ffa260',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              marginBottom: '1rem'
            }}>
              <i className="ri-shield-keyhole-line"></i>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#212529' }}>Social Dev Panel</h2>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.25rem' }}>
              Sign in to manage site content & settings
            </p>
          </div>

          {successMsg && (
            <div className="adminkit-alert adminkit-alert-success">
              <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
              <span>{successMsg}</span>
            </div>
          )}

          {error && (
            <div className="adminkit-alert" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
              <i className="ri-error-warning-line"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="adminkit-form-group">
              <label className="adminkit-label">Admin Email</label>
              <input
                type="email"
                className="adminkit-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="adminkit-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label className="adminkit-label" style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                className="adminkit-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                required
              />
            </div>

            <SecurityCaptcha onValidate={setCaptchaValid} />

            <button
              type="submit"
              className="adminkit-btn adminkit-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}
              disabled={submitting || !captchaValid}
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line ri-spin"></i> Authenticating...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line"></i> Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a href={window.location.pathname.replace(/\/admin\/?$/i, '') || '/'} style={{ fontSize: '0.825rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
              &larr; Back to Main Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
