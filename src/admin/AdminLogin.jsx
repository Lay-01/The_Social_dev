import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContext';
import { isSupabaseConfigured } from '../lib/supabase';
import SecurityCaptcha from './components/SecurityCaptcha';
import AdminForgotPassword from './AdminForgotPassword';
import './admin.css';

export default function AdminLogin({ onLoginSuccess }) {
  const { login } = useSiteContent();
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!captchaValid) {
      setError('Please solve the security challenge (CAPTCHA) before logging in.');
      return;
    }

    setSubmitting(true);

    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setSubmitting(false);
    }
  };

  if (view === 'forgot') {
    return <AdminForgotPassword onBackToLogin={() => setView('login')} />;
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

            {/* Free Visual Math CAPTCHA Challenge */}
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
            <a href="/" style={{ fontSize: '0.825rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
              ← Return to Main Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
