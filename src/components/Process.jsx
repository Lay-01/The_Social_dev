import React from 'react';
import { handleImageError } from '../utils/imageFallback';

export default function Process() {
  const steps = [
    {
      step_number: 1,
      title: "Discovery",
      description: "We sit to understand your business goals, target audience, and the content you are looking for.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fb795eb7cff2dcee5_process-card-01.svg"
    },
    {
      step_number: 2,
      title: "Strategy & Design",
      description: "We create a roadmap, sample UI, and define the content aesthetic.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fa98b39950ae5b008_process-card-02.svg"
    },
    {
      step_number: 3,
      title: "Development & Execution",
      description: "We build your website or craft your content strategy, keeping you in the loop with regular updates.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fe82a6f61fbea3843_process-card-04.svg"
    },
    {
      step_number: 4,
      title: "Launch & Refinement",
      description: "We deploy your project and perform final adjustments to ensure everything functions perfectly.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95f65969933d7eefa31_process-card-03.svg"
    }
  ];

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="process-contant-wrapper">
              <div className="section-top-block">
                <div className="section-caption-block"><div>Work Process</div></div>
                <div className="process-title-block">
                  <h2>Our Proven 4-Step <span className="section-sub-heading">Development Process</span></h2>
                </div>
              </div>

              <div className="process-wrapper" style={{ opacity: 1 }}>
                <div className="proces-card-bg-line"><div className="proces-card-bg-line-active"></div></div>
                <div className="process-top-logo-block">
                  <img
                    src="https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f4b42b77efc5d07db25926_branding-icon-02.svg"
                    loading="lazy"
                    alt="Icon"
                    className="process-top-logo-image"
                    onError={(e) => handleImageError(e, 'serviceIcon')}
                  />
                </div>

                <div className="process-cards-wrapper">
                  <div className="process-cards-block">
                    {steps.slice(0, 2).map((st, i) => (
                      <div key={st.step_number} className={`process-card ${i === 0 ? 'process-card-left-01' : 'process-card-right-01'}`}>
                        <div className="process-card-icon-block">
                          <img
                            src={st.icon}
                            loading="lazy"
                            alt={st.title}
                            className="process-icon"
                            onError={(e) => handleImageError(e, 'serviceIcon')}
                          />
                        </div>
                        <div className="process-card-info-block">
                          <h3 className="heading-style-h6 process-card-title">{st.step_number}. {st.title}</h3>
                          <div className="proces-card-description-block">
                            <div>{st.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="process-cards-block">
                    {steps.slice(2, 4).map((st, i) => (
                      <div key={st.step_number} className={`process-card ${i === 0 ? 'process-card-left-02' : 'process-card-right-02'}`}>
                        <div className="process-card-icon-block">
                          <img
                            src={st.icon}
                            loading="lazy"
                            alt={st.title}
                            className="process-icon"
                            onError={(e) => handleImageError(e, 'serviceIcon')}
                          />
                        </div>
                        <div className="process-card-info-block">
                          <h3 className="heading-style-h6 process-card-title">{st.step_number}. {st.title}</h3>
                          <div className="proces-card-description-block">
                            <div>{st.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="process-bg-glow"></div>
    </section>
  );
}
