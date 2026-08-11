import React from 'react';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="about-contant-wrapper">
              <div className="about-text-content-block">
                <div className="about-details-block" style={{ opacity: 1, transform: 'none' }}>
                  <div className="section-caption-block"><div>About Us</div></div>
                  <div className="about-title-block">
                    <h2>Powered by Us<span className="section-sub-heading"><br />Built on Customer Needs</span></h2>
                  </div>
                  <div className="about-description-block">
                    <div>
                      At The_Social_Dev, we create custom websites tailored to your business niche, goals, and audience. From modern designs to SEO-friendly website structures, we focus on building digital experiences that look great and perform effectively. Customer satisfaction is our motto, and we strive to turn every vision into a website you’re proud of.
                    </div>
                  </div>
                </div>
                <div className="about-button-block" style={{ opacity: 1 }}>
                  <a href="#services" className="button-secondary w-inline-block"><div>Our Services</div></a>
                </div>
              </div>

              <div className="about-image-cards-block">
                <div className="about-image-card">
                  <div className="about-image-card-01-title" style={{ opacity: 1 }}>Performance &amp; Visiblity</div>
                  <div className="about-chart-block" style={{ opacity: 1 }}>
                    <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfaa9940ba14c0f21e85fb_about-chart.svg" loading="lazy" alt="Growth chart" className="about-image-card-01-image" />
                  </div>
                </div>
                <div className="about-image-card">
                  <div className="about-image-card-02-avatar-block">
                    <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bc70ca14a61b4cc7a0_about-image-card-02-avater-01.avif" loading="lazy" style={{ transform: 'none' }} alt="Client 1" className="about-image-card-avater" />
                    <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcec871d961392581c_about-image-card-02-avater-02.avif" loading="lazy" alt="Client 2" className="about-image-card-avater margin-left--12px" />
                    <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcdd5971319d41ad96_about-image-card-02-avater-03.avif" loading="lazy" alt="Client 3" className="about-image-card-avater margin-left--12px" />
                  </div>
                  <div className="about-card-bottom-block">
                    <div className="about-image-card-text" style={{ opacity: 1 }}>Startups &amp; Brands</div>
                    <div className="about-image-card-02-ratting-block" style={{ opacity: 1 }}>
                      <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfac7f22d52b417b05ec6c_star-logo.svg" loading="lazy" alt="Star icon" className="icon-16px" />
                      <div>Motto: Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="about-image-card">
                  <div className="about-image-card-03-arrow-block" style={{ transform: 'none' }}>
                    <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfad4ec963e2fea811de6f_about-arrow.svg" loading="lazy" alt="Arrow" />
                  </div>
                  <div className="about-image-card-text" style={{ opacity: 1 }}>Scale Ambitious Ventures</div>
                </div>
                <div className="about-boost-image-block">
                  <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfae58af96e37837d4ed40_about-logo.svg" loading="lazy" alt="Boost icon" className="about-boost-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-glow-block"></div>
    </section>
  );
}
