import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContext';

const defaultProcessSteps = [
  {
    id: '01',
    number: '01',
    category: 'DISCOVERY',
    title: 'Discovery',
    subtitle: 'Goal & Audience Mapping',
    description: 'We sit to understand your business goals, target audience, and the content you are looking for.',
    tags: ['Goal Alignment', 'Target Audience', 'Requirements'],
    visualType: 'discovery'
  },
  {
    id: '02',
    number: '02',
    category: 'STRATEGY & DESIGN',
    title: 'Strategy & Design',
    subtitle: 'Roadmap & Visual UI',
    description: 'We create a roadmap, sample UI, and define the content aesthetic.',
    tags: ['UX Roadmap', 'Sample UI', 'Content Aesthetic'],
    visualType: 'strategy'
  },
  {
    id: '03',
    number: '03',
    category: 'DEVELOPMENT & EXECUTION',
    title: 'Development & Execution',
    subtitle: 'Build & Continuous Updates',
    description: 'We build your website or craft your content strategy, keeping you in the loop with regular updates.',
    tags: ['Clean Code', 'Regular Updates', 'Execution'],
    visualType: 'development'
  },
  {
    id: '04',
    number: '04',
    category: 'LAUNCH & REFINEMENT',
    title: 'Launch & Refinement',
    subtitle: 'Deployment & Final Polish',
    description: 'We deploy your project and perform final adjustments to ensure everything functions perfectly.',
    tags: ['Production Deploy', 'Final Adjustments', 'QA Polish'],
    visualType: 'launch'
  }
];

export default function Process() {
  const { content } = useSiteContent();
  const rawSteps = (content?.processSteps || []).filter(st => st.isActive !== false);
  const processSteps = rawSteps.length > 0 ? rawSteps : defaultProcessSteps;

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const totalSteps = processSteps.length;


  const nextStep = () => {
    setActiveIndex((prev) => (prev + 1) % totalSteps);
  };

  const prevStep = () => {
    setActiveIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextStep();
    if (e.key === 'ArrowLeft') prevStep();
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextStep();
    } else if (distance < -minSwipeDistance) {
      prevStep();
    }
  };

  // Helper indices for wrapping circularly
  const prevIndex = (activeIndex - 1 + totalSteps) % totalSteps;
  const nextIndex = (activeIndex + 1) % totalSteps;

  const currentStep = processSteps[activeIndex];
  const prevStepData = processSteps[prevIndex];
  const nextStepData = processSteps[nextIndex];

  const processHeader = content?.processHeader || {
    pill: "Work Process",
    headingLine1: "Our Proven 4-Step",
    headingLine2: "Web Development",
    italicAccent: "Process",
    description: "A structured, transparent engineering workflow designed to bring your vision to life seamlessly from start to finish."
  };

  return (
    <section 
      id="process" 
      className="process-carousel-section"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Our Development Process"
    >
      <div className="process-bg-elements">
        <div className="process-glow-orb orb-1"></div>
        <div className="process-glow-orb orb-2"></div>
        <div className="process-grid-pattern"></div>
      </div>

      <div className="container">
        <div className="process-inner-container">
          
          {/* TOP LAYOUT: LEFT INTRO + RIGHT CAROUSEL */}
          <div className="process-main-grid">
            
            {/* LEFT COLUMN: INTRO & BRANDING */}
            <div className="process-left-intro">
              <div className="process-pill-badge">
                <span className="process-pill-dot"></span>
                <span>{processHeader.pill}</span>
              </div>

              <h2 className="process-main-title">
                {processHeader.headingLine1} <br />
                {processHeader.headingLine2} <br />
                <span className="process-italic-copper">{processHeader.italicAccent}</span>
              </h2>

              <p className="process-intro-desc">
                {processHeader.description}
              </p>

              <div className="process-accent-line"></div>


              {/* CONTROLS */}
              <div className="process-nav-controls">
                <button 
                  onClick={prevStep} 
                  className="process-control-btn"
                  aria-label="Previous step"
                  title="Previous Step"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <div className="process-step-indicator">
                  <span className="step-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="step-divider">/</span>
                  <span className="step-total">{String(totalSteps).padStart(2, '0')}</span>
                </div>
                <button 
                  onClick={nextStep} 
                  className="process-control-btn active-control"
                  aria-label="Next step"
                  title="Next Step"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D CAROUSEL COMPOSITION */}
            <div 
              className="process-carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="process-carousel-stage">
                
                {/* PREVIOUS STEP CARD (SURROUNDING) */}
                <div 
                  className="process-side-card card-previous"
                  onClick={prevStep}
                  title={`Go to step ${prevStepData.number}: ${prevStepData.title}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="side-card-badge">{prevStepData.number} / {String(totalSteps).padStart(2, '0')}</div>
                  <div className="side-card-category">{prevStepData.category}</div>
                  <h4 className="side-card-title">{prevStepData.title}</h4>
                  <div className="side-card-preview">{prevStepData.subtitle}</div>
                </div>

                {/* ACTIVE CENTER CARD */}
                <div className="process-active-card">
                  {/* Giant Faint Step Number in Background */}
                  <div className="active-card-bg-number">{currentStep.number}</div>
                  
                  {/* Glowing corner accents */}
                  <div className="card-corner-glow top-left"></div>
                  <div className="card-corner-glow bottom-right"></div>

                  <div className="active-card-body">
                    <div className="active-card-content">
                      
                      {/* CARD HEADER */}
                      <div className="card-top-meta">
                        <span className="card-step-badge">{currentStep.number} / {String(totalSteps).padStart(2, '0')}</span>
                        <span className="card-category-badge">{currentStep.category}</span>
                      </div>

                      {/* MAIN TITLE & SUBTITLE */}
                      <h3 className="card-main-heading">{currentStep.title}</h3>
                      <div className="card-subtitle">{currentStep.subtitle}</div>

                      {/* DESCRIPTION */}
                      <p className="card-description-text">{currentStep.description}</p>

                      {/* FEATURE TAGS */}
                      <div className="card-tags-group">
                        {currentStep.tags.map((tag, i) => (
                          <span key={i} className="card-feature-tag">
                            <span className="tag-bracket">[</span>
                            {tag}
                            <span className="tag-bracket">]</span>
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* RIGHT SIDE VISUAL GRAPHIC PANEL */}
                    <div className="active-card-visual-panel">
                      <ProcessVisualGraphic type={currentStep.visualType} icon={currentStep.icon} />
                    </div>


                    {/* CIRCULAR NEXT ARROW BUTTON ON CARD */}
                    <button 
                      onClick={nextStep}
                      className="card-action-circle-btn"
                      aria-label={`Advance to step ${nextStepData.number}`}
                      title={`Next: ${nextStepData.title}`}
                    >
                      <i className="ri-arrow-right-line"></i>
                      <div className="btn-pulse-ring"></div>
                    </button>

                  </div>
                </div>

                {/* NEXT STEP CARD (SURROUNDING) */}
                <div 
                  className="process-side-card card-next"
                  onClick={nextStep}
                  title={`Go to step ${nextStepData.number}: ${nextStepData.title}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="side-card-badge">{nextStepData.number} / {String(totalSteps).padStart(2, '0')}</div>
                  <div className="side-card-category">{nextStepData.category}</div>
                  <h4 className="side-card-title">{nextStepData.title}</h4>
                  <div className="side-card-preview">{nextStepData.subtitle}</div>
                </div>

              </div>
            </div>

          </div>

          {/* BOTTOM PROCESS NAVIGATION: JOURNEY RAIL */}
          <div className="process-bottom-journey-rail">
            <div className="journey-rail-track">
              <div 
                className="journey-rail-progress-fill"
                style={{ width: `${(activeIndex / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>

            <div className="journey-nodes-wrapper">
              {processSteps.map((step, idx) => {
                const isActive = idx === activeIndex;
                const isPassed = idx < activeIndex;

                return (
                  <button
                    key={step.id}
                    className={`journey-node-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to Step ${step.number}: ${step.title}`}
                    title={`Step ${step.number}: ${step.title}`}
                  >
                    {isActive && <div className="active-upward-indicator"></div>}
                    <div className="node-circle">
                      {isActive ? (
                        <div className="node-active-core"></div>
                      ) : (
                        <span className="node-number">{step.number}</span>
                      )}
                    </div>
                    <span className="node-label">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* DYNAMIC ABSTRACT VISUAL COMPONENT FOR ACTIVE CARDS */
function ProcessVisualGraphic({ type, icon }) {
  if (icon && (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/'))) {
    return (
      <div className="visual-graphic-container custom-icon-visual">
        <div className="graphic-glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <img src={icon} alt="Step icon" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
        </div>
      </div>
    );
  }

  if (icon && icon.startsWith('ri-')) {
    return (
      <div className="visual-graphic-container custom-icon-visual">
        <div className="graphic-glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <i className={icon} style={{ fontSize: '3.5rem', color: '#ffa260' }}></i>
        </div>
      </div>
    );
  }

  switch (type) {

    case 'discovery':
      return (
        <div className="visual-graphic-container discovery-visual">
          <div className="graphic-glass-card">
            <div className="graphic-node-grid">
              <svg className="node-connect-lines" viewBox="0 0 160 120">
                <path d="M 30 30 L 130 30 L 130 90 L 30 90 Z" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="30" cy="30" r="4" fill="#ffa260" />
                <circle cx="130" cy="30" r="4" fill="#06b6d4" />
                <circle cx="130" cy="90" r="4" fill="#8b5cf6" />
                <circle cx="30" cy="90" r="4" fill="#38bdf8" />
              </svg>
            </div>
            <div className="graphic-meta-pill">
              <i className="ri-compass-3-line"></i>
              <span>Goal Analysis</span>
            </div>
          </div>
        </div>
      );

    case 'strategy':
      return (
        <div className="visual-graphic-container strategy-visual">
          <div className="graphic-wireframe-stack">
            <div className="wireframe-layer layer-back"></div>
            <div className="wireframe-layer layer-middle"></div>
            <div className="wireframe-layer layer-front">
              <div className="wf-header-line"></div>
              <div className="wf-grid-boxes">
                <div className="wf-box"></div>
                <div className="wf-box accent"></div>
              </div>
              <div className="wf-footer-bar"></div>
            </div>
          </div>
        </div>
      );

    case 'development':
      return (
        <div className="visual-graphic-container dev-visual">
          <div className="graphic-code-ide">
            <div className="ide-top-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="ide-file-name">App.jsx</span>
            </div>
            <div className="ide-code-body">
              <div className="code-line"><span className="keyword">const</span> website = <span className="function">buildApp</span>();</div>
              <div className="code-line indent"><span className="prop">responsive:</span> <span className="bool">true</span>,</div>
              <div className="code-line indent"><span className="prop">updates:</span> <span className="string">"regular"</span>,</div>
              <div className="code-line"><span className="keyword">return</span> &lt;<span className="component">Success</span> /&gt;;</div>
            </div>
          </div>
        </div>
      );

    case 'launch':
    default:
      return (
        <div className="visual-graphic-container launch-visual">
          <div className="graphic-launch-card">
            <div className="launch-rocket-icon">
              <i className="ri-rocket-2-fill"></i>
            </div>
            <div className="launch-status-pill">
              <span className="status-live-dot"></span>
              <span>LIVE & DEPLOYED</span>
            </div>
            <div className="launch-url-badge">https://thesocialdev.co.in</div>
          </div>
        </div>
      );
  }
}
