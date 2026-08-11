import React from 'react';
import logo from '../../images/socdev.jpg';

export default function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="footer-contant-wrapper" style={{ opacity: 1 }}>
            <div className="footer-info-wrapper">
              <div className="footer-info-block">
                <a href="#hero" className="footer-nav-brand w-inline-block">
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
              </div>

              <div className="footer-nav-blocks-wrapper">
                <div className="footer-nav-block">
                  <div className="heading-style-h5">Navigation</div>
                  <div className="footer-nav-link-block">
                    <a href="#about" className="footer-link">About Us</a>
                    <a href="#services" className="footer-link">Services</a>
                    <a href="#why" className="footer-link">Why Choose Us</a>
                    <a href="#process" className="footer-link">Process</a>
                    <a href="#pricing" className="footer-link">Pricing</a>
                  </div>
                </div>
                <div className="footer-nav-block">
                  <div className="heading-style-h5">Services</div>
                  <div className="footer-nav-link-block">
                    <a href="#services" className="footer-link">Web Development</a>
                    <a href="#services" className="footer-link">Aesthetic Social Media</a>

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
    </section>
  );
}
