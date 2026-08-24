import React, { useState, useEffect } from 'react';
import { copyEmailToClipboard } from '../utils/mailto';
import logo from '../../images/socdev.jpg';
import { useSiteContent } from '../context/SiteContext';

export default function Navbar({ onToast }) {
  const { content } = useSiteContent();
  const targetEmail = content?.contactEmail || 'the.social.dev12@gmail.com';

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
          if (rect.top <= 140 && rect.bottom >= 140) {
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

  // Lock body scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
    copyEmailToClipboard(targetEmail).then(() => {
      if (onToast) {
        onToast(`Email copied: ${targetEmail}`);
      }
    });
  };

  return (
    <>
      <header className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="/" aria-current="page" className="nav-brand w-nav-brand w--current">
            <div className="brand-title-logo">
              <img src={logo} alt="The Social Dev logo" className="brand-logo" />
              <span>The_<span className="brand-accent">Social_Dev</span></span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop-menu">
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Us</a>
            <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
            <a href="#why" className={`nav-link ${activeSection === 'why' ? 'active' : ''}`}>Why Us</a>
            <a href="#process" className={`nav-link ${activeSection === 'process' ? 'active' : ''}`}>Process</a>
            <a href="#pricing" className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}>Pricing</a>
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="nav-button-block-desktop">
            <button 
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="btn-copy-email"
            >
              <i className="ri-file-copy-line" style={{ color: '#ffa260' }}></i> Copy Email
            </button>

            <a href="#contact" className="nav-button-cta" onClick={handleGetInTouch}>
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="nav-hamburger-btn" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <i className={mobileOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`nav-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="nav-mobile-header">
          <div className="brand-title-logo">
            <img src={logo} alt="The Social Dev logo" className="brand-logo" />
            <span>The_<span className="brand-accent">Social_Dev</span></span>
          </div>
          <button className="nav-mobile-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <i className="ri-close-line"></i>
          </button>
        </div>

        <nav className="nav-mobile-links">
          <a href="#about" className={`nav-mobile-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-information-line"></i> About Us
          </a>
          <a href="#services" className={`nav-mobile-link ${activeSection === 'services' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-service-line"></i> Services
          </a>
          <a href="#why" className={`nav-mobile-link ${activeSection === 'why' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-star-line"></i> Why Us
          </a>
          <a href="#process" className={`nav-mobile-link ${activeSection === 'process' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-git-commit-line"></i> Process
          </a>
          <a href="#pricing" className={`nav-mobile-link ${activeSection === 'pricing' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            <i className="ri-price-tag-3-line"></i> Pricing
          </a>
        </nav>

        <div className="nav-mobile-actions">
          <a href="#contact" className="nav-button-cta mobile-full" onClick={handleGetInTouch}>
            Get In Touch
          </a>
          <button onClick={handleCopyEmail} className="btn-copy-email mobile-full">
            <i className="ri-file-copy-line"></i> Copy Email
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileOpen && (
        <div className="nav-mobile-backdrop" onClick={() => setMobileOpen(false)}></div>
      )}
    </>
  );
}
