import React from 'react';

export default function WhyChooseUs() {
  return (
    <section id="why" className="why">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="why-contant-wrapper">
              <div className="why-text-content-block">
                <div className="why-details-block" style={{ opacity: 1, transform: 'none' }}>
                  <div className="section-caption-block"><div>Why Choose Us?</div></div>
                  <div className="why-title-block">
                    <h2>Built Around<br /><span className="section-sub-heading">Your Business</span></h2>
                  </div>
                  <div className="why-description-block">
                    <div>
                      We don’t believe in one-size-fits-all websites. We create custom, niche-focused websites that match your brand, connect with your audience, and support your business goals. From modern design and smooth functionality to SEO-friendly structure, we focus on every detail.
                      Most importantly, we value clear communication, quality work, and customer satisfaction—because your success is the real measure of ours.
                    </div>
                    <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                      Our development approach combines cutting-edge technologies like React, Node.js, and modern CSS with proven UI/UX principles. We ensure every website loads fast, ranks well on search engines, and provides an intuitive experience across all devices and screen sizes.
                    </div>
                  </div>
                </div>
                <div className="why-button-block" style={{ opacity: 1 }}>
                  <a href="#pricing" className="button-secondary w-inline-block"><div>See Pricing</div></a>
                </div>
              </div>

              <div className="why-graphics-items-wrapper">
                <div className="why-images-wrapper">
                  <div className="why-image-card-01">
                    <div className="why-image-icon-block" style={{ transform: 'none' }}>
                      <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc4966053f45e919d6cc5_why-grap-01.svg" loading="lazy" alt="Graph" />
                    </div>
                    <div className="why-image-card-01-info-block" style={{ opacity: 1 }}>
                      <div className="heading-style-h4 font-size-decrase-mobile">100%</div>
                      <div className="body-text-b1 font-size-decrase-mobile">Quality</div>
                    </div>
                  </div>
                  <div className="why-images-wrapper-inner">
                    <div className="why-image-card-02">
                      <div className="body-text-b1 font-size-decrase-mobile">Modern UI</div>
                      <div className="why-card-image-block" style={{ opacity: 1 }}>
                        <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc6b764f391f6e6d46b23_why-%20chart.svg" loading="lazy" alt="Chart" className="why-card-chart-image" />
                      </div>
                    </div>
                    <div className="why-image-card-03">
                      <div className="why-image-card-03-info-block" style={{ opacity: 1 }}>
                        <div className="body-text-b1 font-size-decrase-mobile">Brand Growth</div>
                        <div className="heading-style-h4 font-size-decrase-mobile"></div>
                      </div>
                      <div className="why-card-image-block" style={{ opacity: 1 }}>
                        <img src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfc7b13494e491bdefb567_why-chart-01.svg" loading="lazy" alt="Chart" className="why-card-graph-image" />
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
