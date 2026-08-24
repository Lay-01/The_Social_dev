import React, { useState } from 'react';
import { openWhatsAppChat } from '../utils/whatsapp';

export default function ContactModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  if (!isOpen) return null;

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
    onClose();
  };

  return (
    <div className={`react-modal-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="react-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="react-modal-close" onClick={onClose} aria-label="Close modal">
          <i className="ri-close-line"></i>
        </button>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '6px', color: '#fff' }}>
            Partner With <span className="brand-accent">The_Social_Dev</span>
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Send your project inquiry directly to our WhatsApp chat.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
              Email Address <span style={{ color: '#ffa260' }}>*</span>
            </label>
            <input 
              type="email" 
              className="react-form-input" 
              placeholder="alex@startup.com"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                Phone Number
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
                placeholder="e.g. Web Dev, Branding"
                value={formData.service} 
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
              Project Brief / Goals <span style={{ color: '#ffa260' }}>*</span>
            </label>
            <textarea 
              className="react-form-textarea" 
              rows={4}
              placeholder="Tell us about your target audience, timeframe, and goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Integrated Icon & Status Button */}
          <div>
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
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'uppercase'
                }}>
                  SEND VIA WHATSAPP
                </div>

                {/* Vertical Divider */}
                <div style={{ width: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }}></div>

                {/* Right Integrated Icon Badge */}
                <div style={{
                  backgroundColor: '#16a34a',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.2rem',
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
      </div>
    </div>
  );
}
