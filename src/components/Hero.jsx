import React from 'react';

export default function Hero() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = 'contact';
  };

  const handleScrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = 'services';
  };

  return (
    <section className="hero hero-react-override" id="hero">
      <div className="hero-inner">
        <div className="container">
          <div className="hero-two-col-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="hero-left-col">
              <div className="hero-line-badge">
                <span className="hero-line-dash" />
                <span className="hero-line-label">CUSTOM WEB DEVELOPMENT AGENCY</span>
              </div>

              <div className="hero-info-block">
                <h1>
                  WHERE TECH<br />
                  MEETS <span className="section-sub-heading">Aesthetic</span>
                </h1>
                <div className="hero-description-block">
                  <div>
                    The Social Dev is a premier web development agency in India.
                    We bridge high-performance technical engineering, custom web
                    application development, React web application development, UI/UX design,
                    and captivating social media storytelling for ambitious startups and
                    growing brands worldwide.
                  </div>
                </div>
              </div>

              <div className="hero-cta-row">
                <a
                  href="#contact"
                  onClick={handleScrollToContact}
                  title="Contact our web development team"
                  aria-label="Get in touch for web development services"
                  className="hero-btn-primary"
                >
                  Get In Touch <span className="hero-btn-arrow" aria-hidden="true">→</span>
                </a>
                <a
                  href="#services"
                  onClick={handleScrollToServices}
                  title="View our web development services"
                  aria-label="View our services"
                  className="hero-btn-secondary"
                >
                  Our Services
                </a>
              </div>
            </div>

            {/* ── RIGHT COLUMN — 3D Laptop Mockup Scene ── */}
            <div className="hero-right-col" aria-hidden="true">
              <div className="hero-mockup-scene">

                {/* Ambient background glowing arch & grid */}
                <div className="laptop-glow-arch" />
                <div className="laptop-glow" />

                {/* ── MAIN LAPTOP FRAME ── */}
                <div className="laptop-frame">
                  <div className="laptop-screen">
                    {/* Screen chrome / traffic lights */}
                    <div className="screen-chrome">
                      <div className="dots-wrap">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="react-brand-icon">
                        <i className="ri-reactjs-line"></i>
                      </div>
                    </div>

                    {/* Code Editor body */}
                    <div className="code-editor">
                      {/* Sidebar */}
                      <div className="editor-sidebar">
                        <div className="sidebar-label">src</div>
                        <div className="sidebar-folder">
                          <span className="folder-icon">⊡</span> components
                        </div>
                        <div className="sidebar-folder">
                          <span className="folder-icon">⊡</span> pages
                        </div>
                        <div className="sidebar-folder">
                          <span className="folder-icon">⊡</span> assets
                        </div>
                        <div className="sidebar-folder">
                          <span className="folder-icon">⊡</span> api
                        </div>
                        <div className="sidebar-folder">
                          <span className="folder-icon">⊡</span> utils
                        </div>
                        <div className="sidebar-file active-file">App.jsx</div>
                        <div className="sidebar-file">index.jsx</div>
                      </div>

                      {/* Code area */}
                      <div className="editor-code">
                        <div className="code-line"><span className="ln">1</span><span className="kw">import</span> {'{ useState }'} <span className="kw">from</span> <span className="str">'react'</span></div>
                        <div className="code-line"><span className="ln">2</span></div>
                        <div className="code-line"><span className="ln">3</span><span className="kw">export default function</span> <span className="fn">Hero</span>() {'{'}</div>
                        <div className="code-line"><span className="ln">4</span>  <span className="kw">const</span> [open, setOpen] = <span className="fn">useState</span>(<span className="nm">false</span>)</div>
                        <div className="code-line"><span className="ln">5</span></div>
                        <div className="code-line"><span className="ln">6</span>  <span className="kw">return</span> {'('}</div>
                        <div className="code-line"><span className="ln">7</span>    {'<'}<span className="tag">section</span> <span className="attr">className</span>=<span className="str">"hero"</span>{'>'}</div>
                        <div className="code-line"><span className="ln">8</span>      {'<'}<span className="tag">h1</span>{'>'}Build Better{'</'}<span className="tag">h1</span>{'>'}</div>
                        <div className="code-line"><span className="ln">9</span>      {'<'}<span className="tag">p</span>{'>'}Web · Apps · Brand{'</'}<span className="tag">p</span>{'>'}</div>
                        <div className="code-line"><span className="ln">10</span>     {'<'}<span className="tag">button</span> <span className="attr">className</span>=<span className="str">"btn"</span>{'>'}</div>
                        <div className="code-line"><span className="ln">11</span>       Get Started</div>
                        <div className="code-line"><span className="ln">12</span>     {'</'}<span className="tag">button</span>{'>'}</div>
                        <div className="code-line"><span className="ln">13</span>    {'</'}<span className="tag">section</span>{'>'}</div>
                        <div className="code-line"><span className="ln">14</span>  {')'}</div>
                        <div className="code-line"><span className="ln">15</span>{'}'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop keyboard/base */}
                  <div className="laptop-base">
                    <div className="laptop-keyboard">
                      {[...Array(4)].map((_, row) => (
                        <div key={row} className="kb-row">
                          {[...Array(row === 3 ? 3 : 12)].map((_, k) => (
                            <div key={k} className={`kb-key ${row === 3 && k === 1 ? 'kb-space' : ''}`} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── FLOATING CARD 1: Modern Websites (top-right) ── */}
                <div className="float-card float-card-top-right">
                  <div className="fc-header">
                    <div className="fc-icon-box"><i className="ri-edit-box-line" /></div>
                    <div className="fc-head-text">
                      <div className="fc-title">Modern Websites</div>
                      <div className="fc-subtitle">Fast. Responsive. Scalable.</div>
                    </div>
                    <div className="fc-arrow"><i className="ri-arrow-up-right-line" /></div>
                  </div>
                </div>

                {/* ── FLOATING CARD 2: Phone Mockup (far right) ── */}
                <div className="float-card float-card-phone">
                  <div className="phone-screen">
                    <div className="phone-header">
                      <span className="phone-notch" />
                      <i className="ri-menu-line" />
                    </div>
                    <div className="phone-content">
                      <div className="phone-line-sm">Your Ideas</div>
                      <div className="phone-line-lg">Our Code</div>
                      <div className="phone-accent-bar" />
                    </div>
                  </div>
                </div>

                {/* ── FLOATING CARD 3: Services list (right vertical stack) ── */}
                <div className="float-card float-card-services">
                  <div className="fc-service-item">
                    <span className="fc-svc-icon orange-bg"><i className="ri-code-s-slash-line" /></span>
                    <span className="fc-svc-name">Web Development</span>
                  </div>
                  <div className="fc-service-item">
                    <span className="fc-svc-icon blue-bg"><i className="ri-reactjs-line" /></span>
                    <span className="fc-svc-name">React Development</span>
                  </div>
                  <div className="fc-service-item">
                    <span className="fc-svc-icon orange-bg"><i className="ri-quill-pen-line" /></span>
                    <span className="fc-svc-name">UI/UX Design</span>
                  </div>
                  <div className="fc-service-item">
                    <span className="fc-svc-icon orange-bg"><i className="ri-chat-smile-3-line" /></span>
                    <span className="fc-svc-name">Branding &amp; Content</span>
                  </div>
                </div>

                {/* ── FLOATING CARD 4: Ideas → Products (bottom-left) ── */}
                <div className="float-card float-card-ideas">
                  <div className="fc-ideas-row">
                    <span className="fc-ideas-icon"><i className="ri-bar-chart-grouped-line" /></span>
                    <span className="fc-ideas-text">Ideas → Products</span>
                  </div>
                  <div className="fc-ideas-bar">
                    <div className="fc-ideas-progress" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="hero-bg-glow" />
    </section>
  );
}

