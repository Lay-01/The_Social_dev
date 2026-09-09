import React, { useRef } from 'react';
import { useSiteContent } from '../context/SiteContext';
import { handleImageError } from '../utils/imageFallback';

export default function Ventures() {
  const { content } = useSiteContent();
  const venturesList = (content?.ventures || []).filter(vtr => vtr.isActive !== false);
  const scrollRef = useRef(null);

  const getThumbnailSrc = (vtr) => {
    if (vtr.image && vtr.image.trim()) {
      return vtr.image;
    }
    if (vtr.url && vtr.url.trim()) {
      return `https://api.microlink.io/?url=${encodeURIComponent(vtr.url)}&screenshot=true&embed=screenshot.url`;
    }
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
  };

  const handleScrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -240, behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 240, behavior: 'smooth' });
    }
  };

  return (
    <section id="ventures" className="ventures-section">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="service-contant-wrapper">
              
              {/* Left Section Heading Block */}
              <div className="ventures-header-left">
                <div className="ventures-pill-badge">
                  <span className="ventures-pill-dot"></span>
                  <span>Our Ventures</span>
                </div>
                
                <h2 className="ventures-heading">
                  Featured Web<br />
                  Development<br />
                  Projects <span className="section-sub-heading">&amp; Live<br />Sites</span>
                </h2>

                <div className="ventures-accent-line"></div>

                <p className="ventures-subtitle">
                  A collection of real-world projects, built with modern technologies and a focus on performance, design and user experience.
                </p>
              </div>

              {/* Right Showcase Panel Frame (Previous 2-Column Grid Frame System) */}
              <div className="ventures-showcase-wrapper">
                {(!venturesList || venturesList.length === 0) ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                    <p>No venture projects currently active.</p>
                  </div>
                ) : (
                  <div className="ventures-showcase-frame">
                    
                    {/* Frame Header Bar */}
                    <div className="ventures-frame-header">
                      <div className="ventures-frame-title">
                        <i className="ri-layout-grid-line" style={{ color: '#ffa260', fontSize: '1.1rem' }}></i>
                        <span>Projects</span>
                      </div>
                      <div className="ventures-frame-counter">
                        1 / {venturesList.length}
                      </div>
                    </div>

                    {/* Frame Scrollable Cards Grid (2 columns) */}
                    <div className="ventures-scroll-list" ref={scrollRef}>
                      {venturesList.map((vtr) => (
                        <div
                          key={vtr.id}
                          className="venture-card"
                          style={{
                            backgroundColor: 'rgba(13, 20, 36, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.25s ease',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 162, 96, 0.4)';
                            e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {/* Browser Window Header Mockup */}
                          <div
                            style={{
                              backgroundColor: 'rgba(20, 29, 47, 0.9)',
                              padding: '0.4rem 0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                            </div>
                            <div
                              style={{
                                fontSize: '0.65rem',
                                color: '#94a3b8',
                                fontFamily: 'monospace',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '110px'
                              }}
                            >
                              {vtr.title}
                            </div>
                            <i className="ri-menu-line" style={{ fontSize: '0.72rem', color: '#64748b' }}></i>
                          </div>

                          {/* Site Preview Thumbnail Container */}
                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '125px',
                              backgroundColor: '#090d16',
                              overflow: 'hidden'
                            }}
                          >
                            <img
                              src={getThumbnailSrc(vtr)}
                              alt={`${vtr.title} web development project preview`}
                              loading="lazy"
                              decoding="async"
                              width="300"
                              height="125"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease'
                              }}
                              onError={(e) => handleImageError(e, 'serviceIcon')}
                            />
                          </div>

                          {/* Content Info Block */}
                          <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                            <div>
                              <h3
                                style={{
                                  fontSize: '0.98rem',
                                  fontWeight: 700,
                                  color: '#fff',
                                  marginBottom: '0.25rem',
                                  lineHeight: 1.25
                                }}
                              >
                                {vtr.title}
                              </h3>
                              <p
                                style={{
                                  fontSize: '0.78rem',
                                  color: '#94a3b8',
                                  lineHeight: 1.4,
                                  marginBottom: '0.85rem',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {vtr.description}
                              </p>
                            </div>

                            {/* URL Link Button CTA Bar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.3rem' }}>
                              {vtr.url ? (
                                <a
                                  href={vtr.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`Visit ${vtr.title} live web project`}
                                  aria-label={`Visit ${vtr.title} live web project`}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 162, 96, 0.08)',
                                    color: '#ffa260',
                                    border: '1px solid rgba(255, 162, 96, 0.35)',
                                    fontWeight: 600,
                                    fontSize: '0.78rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffa260';
                                    e.currentTarget.style.color = '#07090e';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 162, 96, 0.08)';
                                    e.currentTarget.style.color = '#ffa260';
                                  }}
                                >
                                  <span>Visit Venture</span>
                                  <i className="ri-external-link-line" style={{ fontSize: '0.75rem' }}></i>
                                </a>
                              ) : (
                                <div></div>
                              )}
                              <i className="ri-arrow-right-up-line" style={{ fontSize: '1rem', color: '#64748b' }}></i>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Frame Navigation Scroll Controls */}
                    <div className="ventures-frame-footer">
                      <button onClick={handleScrollUp} className="ventures-control-btn" aria-label="Scroll projects up" title="Scroll up">
                        <i className="ri-arrow-up-s-line"></i>
                      </button>
                      <button onClick={handleScrollDown} className="ventures-control-btn" aria-label="Scroll projects down" title="Scroll down">
                        <i className="ri-arrow-down-s-line"></i>
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="service-bg-glow" style={{ opacity: 0.6 }}></div>
    </section>
  );
}
