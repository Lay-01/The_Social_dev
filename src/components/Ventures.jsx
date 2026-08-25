import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import { handleImageError } from '../utils/imageFallback';

export default function Ventures() {
  const { content } = useSiteContent();
  const venturesList = (content?.ventures || []).filter(vtr => vtr.isActive !== false);

  const getThumbnailSrc = (vtr) => {
    if (vtr.image && vtr.image.trim()) {
      return vtr.image;
    }
    if (vtr.url && vtr.url.trim()) {
      return `https://api.microlink.io/?url=${encodeURIComponent(vtr.url)}&screenshot=true&embed=screenshot.url`;
    }
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <section id="ventures" className="ventures-section" style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0' }}>
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-large">
            <div className="service-contant-wrapper">
              
              {/* Section Header */}
              <div className="section-top-block service-section">
                <div className="section-caption-block">
                  <div>Our Ventures</div>
                </div>
                <div className="service-title-block">
                  <h2>
                    Featured Projects <span className="section-sub-heading">& Live Sites</span>
                  </h2>
                </div>
              </div>

              {/* Ventures Grid */}
              {(!venturesList || venturesList.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                  <p>No venture projects currently active.</p>
                </div>
              ) : (
                <div
                  className="ventures-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginTop: '2.5rem'
                  }}
                >
                  {venturesList.map((vtr) => (
                    <div
                      key={vtr.id}
                      className="venture-card"
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 162, 96, 0.4)';
                        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Browser Window Header Mockup */}
                      <div
                        style={{
                          backgroundColor: 'rgba(30, 41, 59, 0.9)',
                          padding: '0.6rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                        </div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: '#94a3b8',
                            fontFamily: 'monospace',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '180px'
                          }}
                        >
                          {vtr.url ? vtr.url.replace(/^https?:\/\//i, '') : 'live-preview'}
                        </div>
                        <i className="ri-lock-line" style={{ fontSize: '0.8rem', color: '#64748b' }}></i>
                      </div>

                      {/* Site Preview Thumbnail Container */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '210px',
                          backgroundColor: '#090d16',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={getThumbnailSrc(vtr)}
                          alt={vtr.title}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          onError={(e) => handleImageError(e, 'serviceIcon')}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 60%)',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>

                      {/* Content Info Block */}
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          <h3
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: '#fff',
                              marginBottom: '0.6rem',
                              lineHeight: 1.3
                            }}
                          >
                            {vtr.title}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.92rem',
                              color: '#cbd5e1',
                              lineHeight: 1.6,
                              marginBottom: '1.25rem'
                            }}
                          >
                            {vtr.description}
                          </p>
                        </div>

                        {/* URL Link Button CTA */}
                        {vtr.url && (
                          <a
                            href={vtr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              padding: '0.65rem 1.25rem',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(255, 162, 96, 0.12)',
                              color: '#ffa260',
                              border: '1px solid rgba(255, 162, 96, 0.3)',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              transition: 'all 0.25s ease',
                              marginTop: 'auto'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#ffa260';
                              e.currentTarget.style.color = '#07090e';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 162, 96, 0.12)';
                              e.currentTarget.style.color = '#ffa260';
                            }}
                          >
                            <span>Visit Venture</span>
                            <i className="ri-external-link-line"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <div className="service-bg-glow" style={{ opacity: 0.6 }}></div>
    </section>
  );
}
