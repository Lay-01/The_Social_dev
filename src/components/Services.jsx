import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import { handleImageError } from '../utils/imageFallback';

export default function Services() {
  const { content } = useSiteContent();
  const servicesList = (content?.services || []).filter(srv => srv.isActive !== false);

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section id="services" className="service">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="service-contant-wrapper">
              <div className="section-top-block service-section">
                <div className="section-caption-block"><div>Services</div></div>
                <div className="service-title-block">
                  <h2>End-to-End Web & Digital Solutions <span className="section-sub-heading">For Business Growth</span></h2>
                </div>
              </div>

              <div className="service-cards-block" style={{ opacity: 1, transform: 'none' }}>
                {servicesList.map((srv) => (
                  <a
                    key={srv.id}
                    href="#contact"
                    className="service-card"
                    style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block' }}
                    onClick={handleScrollToContact}
                    title={`Inquire about ${srv.title} services`}
                    aria-label={`Inquire about ${srv.title} services`}
                  >
                    <div className="service-card-logo-block">
                      <img
                        src={srv.icon}
                        loading="lazy"
                        decoding="async"
                        alt={`${srv.title} icon`}
                        onError={(e) => handleImageError(e, 'serviceIcon')}
                      />
                    </div>
                    <div className="service-card-info-block">
                      <h3 className="service-card-title-text">{srv.title}</h3>
                      <div className="service-card-description-block">
                        <div className="text-block">{srv.description}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-bg-glow"></div>
    </section>
  );
}
