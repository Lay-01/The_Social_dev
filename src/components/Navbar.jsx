import React, { useState, useEffect } from 'react';
import { copyEmailToClipboard, TARGET_EMAIL } from '../utils/mailto';
import logo from '../../images/socdev.jpg';

export default function Navbar({ onToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section scroll spy
      const sections = ['about', 'services', 'why', 'process', 'pricing', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetInTouch = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    copyEmailToClipboard().then(() => {
      if (onToast) {
        onToast(`Email copied: ${TARGET_EMAIL}`);
      }
    });
  };

  return (
    <div className="navbar w-nav" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <div className="nav-container">
        <a href="/" aria-current="page" className="nav-brand w-nav-brand w--current">
          <div className="brand-title-logo">
            <img src={logo} alt="The Social Dev logo" className="brand-logo" />
            <span>The_<span className="brand-accent">Social_Dev</span></span>
          </div>
        </a>

        <nav role="navigation" className={`nav-menu-block w-nav-menu ${mobileOpen ? 'w--open' : ''}`}>
          <div className="nav-menu-block-inner">
            <div className="nav-menu-top-block">
              <div className="brand-title-logo">
                <img src={logo} alt="The Social Dev logo" className="brand-logo" />
                <span>The_<span className="brand-accent">Social_Dev</span></span>
              </div>
            </div>
            <div className="nav-links-wrapper">
              <a href="#about" className={`nav-link w-nav-link ${activeSection === 'about' ? 'w--current' : ''}`} onClick={() => setMobileOpen(false)}>About Us</a>
              <a href="#services" className={`nav-link w-nav-link ${activeSection === 'services' ? 'w--current' : ''}`} onClick={() => setMobileOpen(false)}>Services</a>
              <a href="#why" className={`nav-link w-nav-link ${activeSection === 'why' ? 'w--current' : ''}`} onClick={() => setMobileOpen(false)}>Why Us</a>
              <a href="#process" className={`nav-link w-nav-link ${activeSection === 'process' ? 'w--current' : ''}`} onClick={() => setMobileOpen(false)}>Process</a>
              <a href="#pricing" className={`nav-link w-nav-link ${activeSection === 'pricing' ? 'w--current' : ''}`} onClick={() => setMobileOpen(false)}>Pricing</a>
            </div>
            
            <div className="nav-button-block-mobile">
              <a href="#contact" className="nav-button w-inline-block" onClick={handleGetInTouch}>
                <div>Get In Touch</div>
              </a>
              <button 
                onClick={handleCopyEmail}
                style={{ 
                  background: 'none', 
                  border: '1px solid rgba(255,162,96,0.3)', 
                  color: '#ffa260', 
                  padding: '8px 16px', 
                  borderRadius: '10px', 
                  fontSize: '0.8rem', 
                  cursor: 'pointer',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <i className="ri-file-copy-line"></i> Copy Email
              </button>
            </div>
          </div>
        </nav>

        <div className="nav-button-block-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(252,252,244,0.15)',
              color: 'rgba(255,255,255,0.8)',
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <i className="ri-file-copy-line" style={{ color: '#ffa260' }}></i> Copy Email
          </button>

          <a href="#contact" className="nav-button w-inline-block" onClick={handleGetInTouch}>
            <div>Get In Touch</div>
          </a>
        </div>

        <div className="nav-menu-button w-nav-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e82572987ff97b2840c2e9_nav-menu-bar.svg" loading="lazy" alt="Nav bar icon" className="nav-menu-open-icon" style={{ display: mobileOpen ? 'none' : 'block' }}/>
          <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e82572f29a4db721b3f46d_nav-menu-close-icon.svg" loading="lazy" alt="Navbar close icon" className="nav-menu-close-icon" style={{ display: mobileOpen ? 'block' : 'none' }}/>
        </div>
      </div>
      <div className="nav-bg-in-scroll" style={{ opacity: scrolled ? 1 : 0 }}></div>
    </div>
  );
}
