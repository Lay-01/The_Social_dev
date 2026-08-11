import React, { useState } from 'react';
import { openMailClient, TARGET_EMAIL } from '../utils/mailto';

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
            Send your inquiry directly to <strong style={{ color: '#ffa260' }}>{TARGET_EMAIL}</strong>.
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

          <div style={{ marginBottom: '20px' }}>
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

          <button type="submit" className="button-primary w-inline-block" style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'transparent', padding: 0 }}>
            <div className="button-primary-inner" style={{ width: '100%', textAlign: 'center', padding: '14px 20px', borderRadius: '12px', background: 'linear-gradient(135deg, #ffa260, #8b5cf6)' }}>
              <div className="button-primary-text" style={{ color: '#000', fontWeight: 700 }}>
                Send to {TARGET_EMAIL} <i className="ri-send-plane-fill" style={{ marginLeft: '6px' }}></i>
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
