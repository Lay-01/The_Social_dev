import React from 'react';
import logo from '../../images/socdev.jpg';
import { useSiteContent } from '../context/SiteContext';
import { sanitizeUrl } from '../utils/security';

export default function Footer() {
  const { content } = useSiteContent();
  const socialLinks = content?.socialLinks || [];

  return (
    <footer className="footer">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="footer-contant-wrapper" style={{ opacity: 1 }}>
            <div className="footer-info-wrapper">
              <div className="footer-info-block">
                <a href="#about" className="footer-nav-brand w-inline-block">
                  <div className="brand-title-logo">
                    <img src={logo} alt="The Social Dev logo" className="brand-logo" />
                    <span>The_<span className="brand-accent">Social_Dev</span></span>
                  </div>
                </a>
                <div className="footer-description-block">
                  <div className="body-text-b2">Where Tech Meets Aesthetic</div>
                  <div className="body-text-b4" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                    Bridging technical performance with visual storytelling
                  </div>
                </div>

                {/* Dynamic Social Media Links with Security Protocol Sanitization */}
                {socialLinks.length > 0 && (
                  <div className="footer-social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                    {socialLinks.map((item) => {
                      const safeUrl = sanitizeUrl(item.url);
                      return (
                        <a
                          key={item.id || item.name}
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit our ${item.name} page`}
                          title={item.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#ffa260',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <i className={item.icon || 'ri-global-line'}></i>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="footer-nav-blocks-wrapper">
                <div className="footer-nav-block">
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '14px', fontWeight: 600 }}>Quick Links</h3>
                  <div className="footer-nav-link-block">
                    <a href="#about" className="footer-link">About Us</a>
                    <a href="#services" className="footer-link">Services</a>
                    <a href="#why" className="footer-link">Why Choose Us</a>
                    <a href="#process" className="footer-link">Process</a>
                    <a href="#pricing" className="footer-link">Pricing</a>
                  </div>
                </div>
                <div className="footer-nav-block">
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '14px', fontWeight: 600 }}>Services</h3>
                  <div className="footer-nav-link-block">
                    <a href="#services" className="footer-link">Web Development</a>
                    <a href="#services" className="footer-link">Aesthetic Social Media</a>
                    <a href="#services" className="footer-link">UI/UX Design</a>
                    <a href="#services" className="footer-link">Brand Strategy</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-devider-block"></div>
            <div className="footer-bottom-link">
              <div className="body-text-b3">&copy; 2026 The_Social_Dev. All rights reserved.</div>
              <div className="body-text-b3">Where Tech Meets Aesthetic</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bg-glow"></div>
    </footer>
  );
}
