import React from 'react';

export default function Expertise() {
  const stats = [
    { number: '100%', title: 'Tailored Solutions' },
    { number: 'Rapid', title: 'Development' },
    { number: 'Timely', title: 'Delivery' },
    { number: '100%', title: 'Transparency' }
  ];

  return (
    <section className="experties">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-small">
            <div className="experties-contant-wrapper">
              {stats.map((stat, idx) => (
                <div key={idx} className="experties-card" style={{ opacity: 1, transform: 'none' }}>
                  <h4>{stat.number}</h4>
                  <div className="experties-title-text"><div>{stat.title}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="experties-glow-block"></div>
    </section>
  );
}
