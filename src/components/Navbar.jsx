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
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Ventures', href: '#ventures' },
    { label: 'Why Us', href: '#why' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
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
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            type="button"
          >
            <i className={mobileOpen ? "ri-close-line" : "ri-menu-line"} />
          </button>

        </div>
      </div>

      {/* Original Webflow Mobile Slide-out Drawer */}
      {mobileOpen && (
        <>
          <div className="nav-mobile-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="nav-mobile-drawer open">
            <div className="nav-mobile-header">
              <a href="/" className="navbar-brand">
                <div className="brand-logo-box">
                  <img src={logo} alt="The Social Dev Logo" className="brand-logo-img" />
                </div>
                <span className="brand-logo-text">
                  The_<span className="brand-accent">Social_Dev</span>
                </span>
              </a>
              <button className="nav-mobile-close-btn" onClick={() => setMobileOpen(false)} type="button">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="nav-mobile-links">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="nav-mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const targetId = link.href.replace('#', '');
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.hash = link.href;
                  }}
                >
                  <i className="ri-arrow-right-s-line" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            <div className="nav-mobile-actions">
              <button onClick={handleCopyEmail} className="btn-copy-email mobile-full" type="button">
                <i className={copied ? "ri-check-line" : "ri-mail-line"} />
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
              <a href="#contact" onClick={handleGetInTouch} className="btn-get-in-touch mobile-full">
                Get In Touch <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}



