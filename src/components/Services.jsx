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

  const servicesToRender = rawServices.length >= 4 
    ? rawServices.slice(0, 4).map((srv, index) => ({
        id: srv.id,
        title: srv.title,
        description: srv.description,
        themeClass: themeClasses[index % themeClasses.length],
        iconSymbol: iconSymbols[index % iconSymbols.length]
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
    <section id="services" className="services-section">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="services-contant-wrapper">
              
              {/* Left Side — Introduction */}
              <div className="services-intro-left">
                <div className="services-pill-badge">
                  <span className="services-pill-dot"></span>
                  <span>Our Services</span>
                </div>

                <h2 className="services-heading">
                  End-to-End<br />
                  Web &amp; Digital<br />
                  Solutions <span className="section-sub-heading">For<br />Business Growth</span>
                </h2>

                <p className="services-intro-desc">
                  We help businesses build their digital presence with modern websites, creative designs and smart digital solutions that drive real results.
                </p>

                <div className="services-accent-line"></div>
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
                      <span className="services-nav-counter">01 / 04</span>
                      <button className="services-nav-btn" aria-label="Previous services page" title="Previous page">
                        <i className="ri-arrow-left-s-line"></i>
                      </button>
                      <button className="services-nav-btn" aria-label="Next services page" title="Next page">
                        <i className="ri-arrow-right-s-line"></i>
                      </button>
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
                          <i className={`${srv.iconSymbol}`}></i>
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
