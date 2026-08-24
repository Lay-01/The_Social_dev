import React, { useState } from 'react';
import { copyEmailToClipboard } from '../utils/mailto';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useSiteContent } from '../context/SiteContext';

export default function Contact({ onSubmitSuccess }) {
  const { content } = useSiteContent();
  const targetEmail = content?.contactEmail || 'the.social.dev12@gmail.com';

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
    openWhatsAppChat({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    });

    if (onSubmitSuccess) {
      onSubmitSuccess('Redirecting to WhatsApp...');
    }
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleCopyEmail = () => {
    copyEmailToClipboard(targetEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      if (onSubmitSuccess) {
        onSubmitSuccess(`Email copied: ${targetEmail}`);
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
                Ready to bring your vision to life? Fill in your details below and submit to launch a direct WhatsApp conversation with our team.
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

                {/* Row 2: Phone & Service */}
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

                {/* Integrated Icon & Status WhatsApp Button */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                      INTEGRATED ICON & STATUS
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                      Active
                    </span>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      outline: 'none'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}>
                      {/* Left Main Green Section */}
                      <div style={{
                        flex: 1,
                        backgroundColor: '#22c55e',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        letterSpacing: '0.06em',
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'uppercase'
                      }}>
                        SEND VIA WHATSAPP
                      </div>

                      {/* Vertical Divider */}
                      <div style={{ width: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }}></div>

                      {/* Right Integrated Icon & Wave Badge */}
                      <div style={{
                        backgroundColor: '#16a34a',
                        padding: '12px 22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          border: '1.5px solid rgba(255, 255, 255, 0.4)',
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: '1.3rem',
                          boxShadow: '0 0 12px rgba(255, 255, 255, 0.3)'
                        }}>
                          <i className="ri-whatsapp-fill"></i>
                        </div>
                      </div>
                    </div>
                  </button>

                  <div style={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    marginTop: '6px',
                    fontWeight: 500
                  }}>
                    Ready
                  </div>
                </div>

              </form>

              {/* Direct Email Copy Option */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
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
                  <i className="ri-mail-line"></i> {targetEmail}
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
