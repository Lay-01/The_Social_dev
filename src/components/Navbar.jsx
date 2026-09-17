import React, { useState, useEffect } from 'react';
import logo from '../../images/socdev.jpg';

export default function Navbar({ onToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scrolling when mobile menu overlay is open
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
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = 'contact';
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = 'the.social.dev12@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      if (onToast) onToast('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      if (onToast) onToast('Email: the.social.dev12@gmail.com');
    });
  };

  const navLinks = [
    { label: 'About Us', href: '#about', icon: 'ri-user-star-line' },
    { label: 'Services', href: '#services', icon: 'ri-code-s-slash-line' },
    { label: 'Our Ventures', href: '#ventures', icon: 'ri-rocket-2-line' },
    { label: 'Why Us', href: '#why', icon: 'ri-shield-check-line' },
    { label: 'Process', href: '#process', icon: 'ri-git-merge-line' },
    { label: 'Pricing', href: '#pricing', icon: 'ri-price-tag-3-line' },
  ];

  return (
    <header className={`custom-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          
          {/* Logo Brand */}
          <a href="/" className="navbar-brand">
            <div className="brand-logo-box">
              <img src={logo} alt="The Social Dev Logo" className="brand-logo-img" />
            </div>
            <span className="brand-logo-text">
              The_<span className="brand-accent">Social_Dev</span>
            </span>
          </a>

          {/* Nav Links Desktop */}
          <nav className="navbar-menu">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = link.href.replace('#', '');
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = link.href;
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons Right Desktop */}
          <div className="navbar-actions">
            <button
              onClick={handleCopyEmail}
              className="btn-copy-email"
              title="Copy email to clipboard"
              type="button"
            >
              <i className={copied ? "ri-check-line" : "ri-mail-line"} />
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
            <a href="#contact" onClick={handleGetInTouch} className="btn-get-in-touch">
              Get In Touch <span className="arrow">→</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Navigation Menu"
            type="button"
          >
            <i className="ri-menu-3-line" />
          </button>

        </div>
      </div>

      {/* Full-Screen Solid Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="mobile-overlay-menu">
          <div className="mobile-overlay-header">
            <a href="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
              <div className="brand-logo-box">
                <img src={logo} alt="The Social Dev Logo" className="brand-logo-img" />
              </div>
              <span className="brand-logo-text">
                The_<span className="brand-accent">Social_Dev</span>
              </span>
            </a>
            <button
              className="mobile-overlay-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close Navigation Menu"
              type="button"
            >
              <i className="ri-close-line" />
            </button>
          </div>

          <div className="mobile-overlay-body">
            <div className="mobile-overlay-links">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="mobile-overlay-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const targetId = link.href.replace('#', '');
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.hash = link.href;
                  }}
                >
                  <div className="mobile-overlay-icon">
                    <i className={link.icon} />
                  </div>
                  <span className="mobile-overlay-label">{link.label}</span>
                  <i className="ri-arrow-right-line mobile-overlay-arrow" />
                </a>
              ))}
            </div>

            <div className="mobile-overlay-actions">
              <button onClick={handleCopyEmail} className="btn-copy-email mobile-full" type="button">
                <i className={copied ? "ri-check-line" : "ri-mail-line"} />
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
              <a href="#contact" onClick={handleGetInTouch} className="btn-get-in-touch mobile-full">
                Get In Touch <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}




