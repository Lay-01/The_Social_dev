import React from 'react';

export default function Services() {
  const servicesList = [
    {
      id: 1,
      title: "Website Development",
      description: "From sleek landing pages to functional, database-driven web applications using PHP, React, Node.js, and vanilla JavaScript. We focus on user needs, responsive layouts, SEO optimization, and exceptional user experience across all devices.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfd1dcc5b0275fa8dddfd3_service-logo-01.svg"
    },
    {
      id: 2,
      title: "Aesthetic Social Media Content",
      description: "High-quality, visually cohesive social media posts and creative campaigns designed to elevate your brand identity, increase follower engagement, and build a strong visual presence across Instagram, LinkedIn, and other platforms.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfd1dc769d5d9b9c2129fb_service-logo-02.svg"
    },
    {
      id: 3,
      title: "UI/UX Design & Branding",
      description: "Modern, conversion-focused interface design paired with strategic brand identity development. We craft memorable logos, color palettes, typography systems, and digital brand guidelines that resonate with your target audience.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfd1dcc5b0275fa8dddfd3_service-logo-01.svg"
    }
  ];

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
                  <h2>End-to-End Solutions <span className="section-sub-heading">For Digital Growth</span></h2>
                </div>
              </div>

              <div className="service-cards-block" style={{ opacity: 1, transform: 'none' }}>
                {servicesList.map((srv) => (
                  <div
                    key={srv.id}
                    className="service-card"
                    style={{ cursor: 'pointer' }}
                    onClick={handleScrollToContact}
                  >
                    <div className="service-card-logo-block">
                      <img src={srv.icon} loading="lazy" alt={srv.title} />
                    </div>
                    <div className="service-card-info-block">
                      <h3 className="service-card-title-text">{srv.title}</h3>
                      <div className="service-card-description-block">
                        <div className="text-block">{srv.description}</div>
                      </div>
                    </div>
                  </div>
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
