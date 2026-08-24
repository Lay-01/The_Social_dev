import React, { useState } from 'react';
import { copyEmailToClipboard, TARGET_EMAIL } from '../utils/mailto';

export default function FloatingActionButton({ onToast }) {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    copyEmailToClipboard().then(() => {
      setOpen(false);
      if (onToast) onToast(`Email copied: ${TARGET_EMAIL}`);
    });
  };

  const handleScrollToContact = () => {
    setOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <div className="fab-container">
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', alignItems: 'flex-end' }}>
          <button 
            onClick={handleCopy}
            style={{
              background: '#0d111a',
              border: '1px solid var(--border-glass)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
            }}
          >
            <i className="ri-file-copy-line" style={{ color: 'var(--brand-accent)' }}></i> Copy Email
          </button>
          
          <button 
            onClick={handleScrollToContact}
            style={{
              background: '#0d111a',
              border: '1px solid var(--border-glass)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
            }}
          >
            <i className="ri-mail-send-line" style={{ color: 'var(--brand-accent)' }}></i> Contact Form
          </button>
        </div>
      )}

      <button 
        className="fab-main-btn" 
        onClick={() => setOpen(!open)}
        aria-label="Quick Actions"
        title="Quick Contact Actions"
      >
        <i className={open ? 'ri-close-line' : 'ri-chat-3-line'}></i>
      </button>
    </div>
  );
}
