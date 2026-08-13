import React, { useState } from 'react';
import { openMailClient, copyEmailToClipboard, TARGET_EMAIL } from '../utils/mailto';

export default function Contact({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    openMailClient({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    });
    if (onSubmitSuccess) {
      onSubmitSuccess(`Opening Gmail Composer for ${TARGET_EMAIL}...`);
    }
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleCopyEmail = () => {
    copyEmailToClipboard().then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      if (onSubmitSuccess) {
        onSubmitSuccess(`Email copied: ${TARGET_EMAIL}`);
      }
    });
  };

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#07090e', position: 'relative' }}>
      <div className="container">
        <div className="page-vertical-padding">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>

            {/* Header Title */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-caption-block" style={{ margin: '0 auto 12px auto' }}>
                <div>Contact Us</div>
              </div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '16px', fontFamily: '"Instrument Serif", Georgia, serif' }}>
                Let's Build Something <span className="section-sub-heading" style={{ color: '#ffa260' }}>Great</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '1rem', margin: '0 auto', maxWidth: '540px' }}>
                Ready to bring your vision to life? Fill in your details below and tell us about your project. Whether you need a custom website, social media strategy, or brand identity, our team is here to help you grow your digital presence and achieve your business goals.
              </p>
            </div>

            {/* Client Details Form */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(16px)'
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Row 1: Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                      Your Name <span style={{ color: '#ffa260' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="react-form-input"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                      Email Address <span style={{ color: '#ffa260' }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="react-form-input"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Service (Text box) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      className="react-form-input"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                      Service Required
                    </label>
                    <input
                      type="text"
                      className="react-form-input"
                      placeholder="e.g. Web Dev, Branding, SaaS"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                    Project Brief / Message <span style={{ color: '#ffa260' }}>*</span>
                  </label>
                  <textarea
                    className="react-form-textarea"
                    rows={4}
                    placeholder="Tell us about your project requirements, goals, timeline, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Single Submit Button */}
                <button
                  type="submit"
                  className="button-primary w-inline-block"
                  style={{ width: '100%', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, marginTop: '6px' }}
                >
                  <div
                    className="button-primary-inner"
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <div className="button-primary-text" style={{ color: 'white', fontWeight: 700, fontSize: '0.98rem' }}>
                      Send Message
                    </div>
                    <i className="ri-send-plane-fill" style={{ color: '#ffa260', fontSize: '1.1rem' }}></i>
                  </div>
                </button>
              </form>

              {/* Direct Email Copy Option */}
              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
                  Or email us directly anytime:
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: 'rgba(255, 162, 96, 0.08)',
                    border: '1px solid rgba(255, 162, 96, 0.3)',
                    color: '#ffa260',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className="ri-mail-line"></i> {TARGET_EMAIL}
                  <span style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', background: 'rgba(255, 162, 96, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                    {copied ? '✓ Copied!' : 'Click to copy'}
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
