import React from 'react';

export default function Pricing() {
  const offerings = [
    {
      category: "Development",
      service: "Website Development",
      pricing_model: "at Pocket Friendly Price",
      details: "Pricing depends on functionality, page count, and other criteria's. Every project starts with a custom consultation.",
      btnText: "Inquiry"
    },
    {
      category: "Creative & Content",
      service: "Social Media Content",
      pricing_model: "Get a Quote",
      details: "Tailored strategies based on posting frequency and creative requirements.",
      btnText: "Request Quote"
    }
  ];

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
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="section-top-block">
              <div className="section-caption-block"><div>Pricing</div></div>
              <div className="process-title-block">
                <h2>Flexible Offerings <span className="section-sub-heading">For Ambitious Ventures</span></h2>
              </div>
            </div>

            <div className="custom-pricing-grid">
              {offerings.map((item, index) => (
                <div key={index} className="custom-pricing-card">
                  <div>
                    <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#ffa260', fontWeight: 700, marginBottom: '8px' }}>
                      {item.category}
                    </div>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#fff' }}>{item.service}</h3>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>{item.pricing_model}</div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '24px' }}>
                      {item.details}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="button-primary w-inline-block"
                    style={{ marginTop: 'auto' }}
                  >
                    <div className="button-primary-glow-wrapper" style={{ display: 'flex', opacity: 1 }}>
                      <div className="button-primary-glow"></div>
                    </div>
                    <div className="button-primary-border"></div>
                    <div className="button-primary-inner">
                      <div className="button-primary-text">{item.btnText}</div>
                    </div>
                    <div className="button-primary-hover"></div>
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <div className="pricing-glow-block"></div>
    </section>
  );
}
