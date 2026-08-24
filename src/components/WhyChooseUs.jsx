import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import { handleImageError, FALLBACK_SVGS } from '../utils/imageFallback';

export default function WhyChooseUs() {
  const { content } = useSiteContent();
  const why = content?.whyChooseUs || {};
  const metrics = why.metrics || [];

  return (
    <section id="why" className="why">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="why-contant-wrapper">
              <div className="why-text-content-block">
                <div className="why-details-block" style={{ opacity: 1, transform: 'none' }}>
                  <div className="section-caption-block"><div>{why.caption || 'Why Choose Us?'}</div></div>
                  <div className="why-title-block">
                    <h2>
                      {why.heading || 'Built Around'}
                      <br />
                      <span className="section-sub-heading">{why.subheading || 'Your Business'}</span>
                    </h2>
                  </div>
                  <div className="why-description-block">
                    <div>
                      {why.description1}
                    </div>
                    <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                      {why.description2}
                    </div>
                  </div>
                </div>
                <div className="why-button-block" style={{ opacity: 1 }}>
                  <a href={why.ctaLink || '#pricing'} className="button-secondary w-inline-block">
                    <div>{why.ctaLabel || 'See Pricing'}</div>
                  </a>
                </div>
              </div>

              <div className="why-graphics-items-wrapper">
                <div className="why-images-wrapper">
                  {/* Card 1: 100% Quality */}
                  <div className="why-image-card-01">
                    <div className="why-image-icon-block" style={{ transform: 'none' }}>
                      <img
                        src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc4966053f45e919d6cc5_why-grap-01.svg"
                        loading="lazy"
                        alt="Graph"
                        onError={(e) => handleImageError(e, 'whyChart1')}
                      />
                    </div>
                    <div className="why-image-card-01-info-block" style={{ opacity: 1 }}>
                      <div className="heading-style-h4 font-size-decrase-mobile">{metrics[0]?.value || '100%'}</div>
                      <div className="body-text-b1 font-size-decrase-mobile">{metrics[0]?.label || 'Quality'}</div>
                    </div>
                  </div>

                  <div className="why-images-wrapper-inner">
                    {/* Card 2: Modern UI */}
                    <div className="why-image-card-02">
                      <div className="body-text-b1 font-size-decrase-mobile">{metrics[1]?.value || 'Modern UI'}</div>
                      <div className="why-card-image-block" style={{ opacity: 1 }}>
                        <img
                          src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc6b764f391f6e6d46b23_why-chart.svg"
                          loading="lazy"
                          alt="Chart"
                          className="why-card-chart-image"
                          onError={(e) => handleImageError(e, 'whyChart2')}
                        />
                      </div>
                    </div>

                    {/* Card 3: Brand Growth */}
                    <div className="why-image-card-03">
                      <div className="why-image-card-03-info-block" style={{ opacity: 1 }}>
                        <div className="body-text-b1 font-size-decrase-mobile">{metrics[2]?.value || 'Brand Growth'}</div>
                        <div className="heading-style-h4 font-size-decrase-mobile">{metrics[2]?.label || 'Impact'}</div>
                      </div>
                      <div className="why-card-image-block" style={{ opacity: 1 }}>
                        <img
                          src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc7b13494e491bdefb567_why-chart-01.svg"
                          loading="lazy"
                          alt="Chart"
                          className="why-card-graph-image"
                          onError={(e) => handleImageError(e, 'whyChart3')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="why-bg-glow"></div>
    </section>
  );
}
