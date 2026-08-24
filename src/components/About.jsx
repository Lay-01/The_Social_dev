import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import { handleImageError } from '../utils/imageFallback';

export default function About() {
  const { content } = useSiteContent();
  const about = content?.about || {};

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="about-contant-wrapper">
              <div className="about-text-content-block">
                <div className="about-details-block" style={{ opacity: 1, transform: 'none' }}>
                  <div className="section-caption-block"><div>{about.caption || 'About Us'}</div></div>
                  <div className="about-title-block">
                    <h2>
                      {about.heading || 'Powered by Us'}
                      <span className="section-sub-heading">
                        <br />
                        {about.subheading || 'Built on Customer Needs'}
                      </span>
                    </h2>
                  </div>
                  <div className="about-description-block">
                    <div>
                      {about.description1}
                    </div>
                    <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                      {about.description2}
                    </div>
                  </div>
                </div>
                <div className="about-button-block" style={{ opacity: 1 }}>
                  <a href={about.ctaLink || '#services'} className="button-secondary w-inline-block">
                    <div>{about.ctaLabel || 'Our Services'}</div>
                  </a>
                </div>
              </div>

              <div className="about-image-cards-block">
                <div className="about-image-card">
                  <div className="about-image-card-01-title" style={{ opacity: 1 }}>
                    {about.labels?.performance || 'Performance & Visibility'}
                  </div>
                  <div className="about-chart-block" style={{ opacity: 1 }}>
                    <img
                      src={about.images?.growthChart || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfaa9940ba14c0f21e85fb_about-chart.svg"}
                      loading="lazy"
                      alt="Growth chart"
                      className="about-image-card-01-image"
                      onError={(e) => handleImageError(e, 'growthChart')}
                    />
                  </div>
                </div>
                <div className="about-image-card">
                  <div className="about-image-card-02-avatar-block">
                    <img
                      src={about.images?.avatar1 || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bc70ca14a61b4cc7a0_about-image-card-02-avater-01.avif"}
                      loading="lazy"
                      style={{ transform: 'none' }}
                      alt="Client 1"
                      className="about-image-card-avater"
                      onError={(e) => handleImageError(e, 'avatar')}
                    />
                    <img
                      src={about.images?.avatar2 || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcec871d961392581c_about-image-card-02-avater-02.avif"}
                      loading="lazy"
                      alt="Client 2"
                      className="about-image-card-avater margin-left--12px"
                      onError={(e) => handleImageError(e, 'avatar')}
                    />
                    <img
                      src={about.images?.avatar3 || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcdd5971319d41ad96_about-image-card-02-avater-03.avif"}
                      loading="lazy"
                      alt="Client 3"
                      className="about-image-card-avater margin-left--12px"
                      onError={(e) => handleImageError(e, 'avatar')}
                    />
                  </div>
                  <div className="about-card-bottom-block">
                    <div className="about-image-card-text" style={{ opacity: 1 }}>
                      {about.labels?.audience || 'Startups & Brands'}
                    </div>
                    <div className="about-image-card-02-ratting-block" style={{ opacity: 1 }}>
                      <img
                        src={about.images?.starIcon || "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfac7f22d52b417b05ec6c_star-logo.svg"}
                        loading="lazy"
                        alt="Star icon"
                        className="icon-16px"
                        onError={(e) => handleImageError(e, 'serviceIcon')}
                      />
                      <div>{about.labels?.satisfaction || 'Motto: Customer Satisfaction'}</div>
                    </div>
                  </div>
                </div>
                <div className="about-image-card">
                  <div className="about-image-card-03-arrow-block" style={{ transform: 'none' }}>
                    <img
                      src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfad4ec963e2fea811de6f_about-arrow.svg"
                      loading="lazy"
                      alt="Arrow"
                      onError={(e) => handleImageError(e, 'serviceIcon')}
                    />
                  </div>
                  <div className="about-image-card-text" style={{ opacity: 1 }}>
                    {about.labels?.growth || 'Scale Ambitious Ventures'}
                  </div>
                </div>
                <div className="about-boost-image-block">
                  <img
                    src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfae58af96e37837d4ed40_about-logo.svg"
                    loading="lazy"
                    alt="Boost icon"
                    className="about-boost-image"
                    onError={(e) => handleImageError(e, 'serviceIcon')}
                  />
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
