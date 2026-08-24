import React from 'react';
import { handleImageError } from '../utils/imageFallback';

export default function Hero() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="container">
          <div className="page-vertical-padding">
            <div className="hero-contant-wrapper">
              <div className="hero-top-block">
                <div className="hero-caption-block" style={{ opacity: 1 }}>
                  <img
                    src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67b6d7c210598e4a1faf8511_logo-01.svg"
                    loading="lazy"
                    alt="The Social Dev Creative Web Development & Digital Agency Icon"
                    className="icon-20px"
                    onError={(e) => handleImageError(e, 'serviceIcon')}
                  />
                  <div className="body-text-b4">THE SOCIAL DEV | CREATIVE AGENCY</div>
                </div>
                <div className="hero-info-block" style={{ opacity: 1, transform: 'none' }}>
                  <h1>WHERE TECH MEETS <span className="section-sub-heading">Aesthetic</span></h1>
                  <div className="hero-description-block">
                    <div>
                      At The Social Dev, we bridge the gap between high-performance technical engineering, custom web development, visual branding, and captivating social media storytelling for ambitious ventures, startups, and growing brands worldwide.
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-button-block" style={{ opacity: 1, transform: 'none' }}>
                <a
                  href="#contact"
                  onClick={handleScrollToContact}
                  className="button-primary w-inline-block"
                >
                  <div className="button-primary-glow-wrapper" style={{ display: 'flex', opacity: 1 }}>
                    <div className="button-primary-glow"></div>
                  </div>
                  <div className="button-primary-border"></div>
                  <div className="button-primary-inner">
                    <div className="button-primary-text">Get In Touch</div>
                  </div>
                  <div className="button-primary-hover"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg-glow"></div>
    </section>
  );
}
