import React from 'react';

export default function Features() {
  const featuresList = [
    {
      title: "Data-Driven Strategy",
      description: "We use in-depth analytics and performance metrics to craft customized full-stack digital solutions.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa2196fbb6181bf66448_features-logo-01.svg"
    },
    {
      title: "Performance & UX",
      description: "From database query optimization to responsive UI design, we enhance site speed and user experience.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa2109d57079219df357_features-logo-02.svg"
    },
    {
      title: "Full-Stack Excellence",
      description: "We build with modern frameworks (MERN, PHP/MySQL) adhering to strict web performance and security standards.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa2208a01d2426de3fdf_features-logo-03.svg"
    },
    {
      title: "Content & Aesthetic",
      description: "Our creative direction crafts visually cohesive social content and reels that elevate your brand story.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa21e11f0c21a6b8e92c_features-logo-04.svg"
    },
    {
      title: "Scalable Architecture",
      description: "Whether building a startup MVP or scaling an established venture, our code and design scale seamlessly.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa22de89e03317ee0dde_features-logo-05.svg"
    },
    {
      title: "Agile Continuous Delivery",
      description: "With rapid iteration cycles and open transparency, we refine digital assets for sustained growth.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67bbfa219a2fbbc097eff62d_features-logo-06.svg"
    }
  ];

  return (
    <section id="feature" className="features">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="features-contant-wrapper">
              <div className="section-top-block">
                <div className="section-caption-block"><div>Features</div></div>
                <div className="features-title-block">
                  <h2>Tailored Strategies <span className="section-sub-heading">For Lasting Impact</span></h2>
                </div>
              </div>

              <div className="features-card-block">
                {featuresList.map((item, idx) => (
                  <div key={idx} className="features-card">
                    <div className="features-logo-block">
                      <img src={item.icon} loading="lazy" alt={item.title} className="features-icon"/>
                    </div>
                    <div className="features-info-block">
                      <h3 className="heading-style-h6">{item.title}</h3>
                      <div className="features-card-description-block">
                        <div>{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features-glow-block"></div>
    </section>
  );
}
