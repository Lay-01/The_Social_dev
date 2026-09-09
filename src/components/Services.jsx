import React from 'react';
import { useSiteContent } from '../context/SiteContext';

export default function Services() {
  const { content } = useSiteContent();
  const rawServices = (content?.services || []).filter(srv => srv.isActive !== false);

  // Exact 4 services & color themes matching reference screenshot
  const defaultServices = [
    {
      id: 'srv-1',
      title: 'Website Development',
      description: 'Fast, responsive, and SEO-friendly landing pages and custom web applications built using React, Next.js, or PHP.',
      themeClass: 'theme-blue',
      iconSymbol: 'ri-code-s-slash-line'
    },
    {
      id: 'srv-2',
      title: 'Aesthetic Social Media Content',
      description: 'High-quality, visually cohesive social media posts and creative campaigns designed to elevate your brand identity, increase follower engagement, and build a strong visual presence across Instagram, LinkedIn, and other platforms.',
      themeClass: 'theme-purple',
      iconSymbol: 'ri-palette-line'
    },
    {
      id: 'srv-3',
      title: 'UI/UX Design & Branding',
      description: 'Conversion-focused interface design paired with complete brand identities—including logo, color palettes, and style guidelines.',
      themeClass: 'theme-orange',
      iconSymbol: 'ri-layout-4-line'
    },
    {
      id: 'srv-4',
      title: 'Designing',
      description: 'T-shirt designs, Flyers, Posters, Printables.',
      themeClass: 'theme-teal',
      iconSymbol: 'ri-megaphone-line'
    }
  ];

  const themeClasses = ['theme-blue', 'theme-purple', 'theme-orange', 'theme-teal'];
  const iconSymbols = ['ri-code-s-slash-line', 'ri-palette-line', 'ri-layout-4-line', 'ri-megaphone-line'];
  const servicesToRender = rawServices.length > 0 
    ? rawServices.map((srv, index) => ({
        id: srv.id,
        title: srv.title,
        description: srv.description,
        themeClass: srv.themeClass || themeClasses[index % themeClasses.length],
        iconSymbol: (srv.icon && srv.icon.startsWith('ri-')) 
          ? srv.icon 
          : iconSymbols[index % iconSymbols.length],
        iconImage: (srv.icon && (srv.icon.startsWith('http://') || srv.icon.startsWith('https://') || srv.icon.startsWith('/'))) 
          ? srv.icon 
          : null
      }))
    : defaultServices;

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="services-main-grid">
              
              {/* Left Side — Intro Header Block */}
              <div className="services-intro-col">
                <div className="services-pill-badge">
                  <span className="services-pill-dot"></span>
                  <span>Our Services</span>
                </div>

                <h2 className="services-main-title">
                  Comprehensive <br />
                  Web &amp; Design <br />
                  <span className="section-sub-heading">Solutions</span>
                </h2>

                <p className="services-intro-desc">
                  From custom full-stack web applications to conversion-focused UI/UX design and aesthetic social media content — we build digital platforms built to scale.
                </p>

                <div className="services-accent-line"></div>

                <a 
                  href="#contact" 
                  className="button-primary services-cta-btn"
                  onClick={handleScrollToContact}
                >
                  <div className="button-primary-text">
                    <div>Get Started Today</div>
                  </div>
                  <div className="button-primary-icon-block">
                    <i className="ri-arrow-right-line" style={{ fontSize: '1.1rem', color: '#07090e' }}></i>
                  </div>
                </a>
              </div>

              {/* Right Side — Services Dashboard Panel */}
              <div className="services-dashboard-wrapper">
                <div className="services-dashboard-panel">
                  
                  {/* Panel Header */}
                  <div className="services-panel-header">
                    <div className="services-panel-title-group">
                      <span className="services-panel-bar-accent"></span>
                      <h3 className="services-panel-title">Our Services</h3>
                    </div>
                    <div className="services-panel-nav">
                      <span className="services-nav-counter">01 / {String(servicesToRender.length).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Services 2x2 Grid */}
                  <div className="services-grid-2x2">
                    {servicesToRender.map((srv) => (
                      <a
                        key={srv.id}
                        href="#contact"
                        className={`service-dash-card ${srv.themeClass}`}
                        onClick={handleScrollToContact}
                        title={`Inquire about ${srv.title}`}
                        aria-label={`Inquire about ${srv.title}`}
                      >
                        <div className="service-icon-box">
                          {srv.iconImage ? (
                            <img src={srv.iconImage} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                          ) : (
                            <i className={srv.iconSymbol}></i>
                          )}
                        </div>

                        <div>
                          <h3 className="service-dash-title">{srv.title}</h3>
                          <p className="service-dash-desc">{srv.description}</p>
                        </div>

                        <div className="service-card-bottom">
                          <div className="service-mini-accent"></div>
                          <div className="service-arrow-btn">
                            <i className="ri-arrow-right-line"></i>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="service-bg-glow" style={{ opacity: 0.5 }}></div>
    </section>
  );
}
