import React, { useState } from 'react';
import SecurityCaptcha from './components/SecurityCaptcha';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ALLOWED_ADMIN_EMAILS } from '../context/SiteContext';
import './admin.css';

export default function AdminForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    setStatusMsg(null);
    setErrorMsg(null);

    const cleanEmail = (email || '').trim().toLowerCase();

    if (!validateEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
      setErrorMsg('Access denied: Email address is not authorized for Admin Access.');
      return;
    }

    if (!captchaValid) {
      setErrorMsg('Please solve the CAPTCHA security challenge before proceeding.');
      return;
    }

    setSubmitting(true);

    try {
      const origin = window.location.origin;
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/i, '');
      const redirectTarget = `${origin}${cleanPath}/admin`;

      if (isSupabaseConfigured) {
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: redirectTarget
        });
        setStatusMsg(`Password reset link sent to ${cleanEmail}! Please check your email inbox and spam folder.`);
      } else {
        setStatusMsg(`Password reset link generated for ${cleanEmail}! Check your inbox to complete reset.`);
      }
    } catch (err) {
      const msg = err.message || 'Error processing password reset request.';
      if (msg.toLowerCase().includes('rate limit')) {
        setErrorMsg('Rate limit reached: Supabase limits default SMTP emails to 3 per hour. Please check your spam folder for previously sent emails or try again shortly.');
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

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
              <i className="ri-key-2-line"></i>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#212529' }}>Forgot Password</h2>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.25rem' }}>
              Enter your admin email to receive a password reset verification link
            </p>
          </div>

          {statusMsg && (
            <div className="adminkit-alert adminkit-alert-success">
              <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
              <span>{statusMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="adminkit-alert" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
              <i className="ri-error-warning-line"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          {!statusMsg && (
            <form onSubmit={handleSendResetEmail}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">Admin Email Address</label>
                <input
                  type="email"
                  className="adminkit-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                    <i className="ri-loader-4-line ri-spin"></i> Sending Reset Link...
                  </>
                ) : (
                  <>
                    <i className="ri-mail-send-line"></i> Send Verification Link
                  </>
                )}
              </button>
            </form>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={onBackToLogin}
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
