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
                <a href="#about" className="footer-nav-brand w-inline-block" title="The Social Dev - Home">
                  <div className="brand-title-logo">
                    <img src={logo} alt="The Social Dev - Web Development & Digital Solutions Agency Logo" decoding="async" className="brand-logo" />
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
                          title={`Visit our ${item.name} page`}
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
                          {item.icon && (item.icon.startsWith('http') || item.icon.startsWith('data:')) ? (
                            <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                          ) : (
                            <i className={item.icon || 'ri-global-line'}></i>
                          )}
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
                    <a href="#about" className="footer-link" title="About Our Web Development Agency">About Our Agency</a>
                    <a href="#services" className="footer-link" title="Explore Our Web & Digital Services">Web & Digital Services</a>
                    <a href="#ventures" className="footer-link" title="View Our Live Web Projects">Featured Web Projects</a>
                    <a href="#why" className="footer-link" title="Why Choose The Social Dev">Why Choose Us</a>
                    <a href="#process" className="footer-link" title="Our 4-Step Web Development Process">Development Process</a>
                    <a href="#faq" className="footer-link" title="Frequently Asked Questions">FAQ</a>
                    <a href="#pricing" className="footer-link" title="Web Development Packages & Pricing">Pricing Packages</a>
                  </div>
                </div>
                <div className="footer-nav-block">
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '14px', fontWeight: 600 }}>Our Services</h3>
                  <div className="footer-nav-link-block">
                    <a href="#services" className="footer-link" title="Custom Web Development Services">Website & Web App Development</a>
                    <a href="#services" className="footer-link" title="Aesthetic Social Media Branding">Aesthetic Social Media Content</a>
                    <a href="#services" className="footer-link" title="UI/UX Design Services">UI/UX Design & Branding</a>
                    <a href="#contact" className="footer-link" title="Contact Us for Digital Solutions">Contact Web Developers</a>
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
