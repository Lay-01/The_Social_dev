import React from 'react';

export default function Expertise() {
  const stats = [
    { number: '100%', title: 'Tailored Solutions', desc: 'Every project is custom-built around your unique business requirements and target audience.' },
    { number: 'Rapid', title: 'Development', desc: 'Fast turnaround without cutting corners, leveraging modern frameworks and agile workflows.' },
    { number: 'Timely', title: 'Delivery', desc: 'We respect deadlines and keep you informed at every stage of the development lifecycle.' },
    { number: '100%', title: 'Transparency', desc: 'Clear communication, honest pricing, and full visibility into project progress from day one.' }
  ];

  return (
    <section className="experties" aria-label="Our Expertise">
      <div className="container">
        <div className="page-vertical-padding">
          <div className="section-padding-small">
            <h2 className="sr-only">Our Core Expertise and Values</h2>
            <div className="experties-contant-wrapper">
              {stats.map((stat, idx) => (
                <div key={idx} className="experties-card" style={{ opacity: 1, transform: 'none' }}>
                  <h3 style={{ fontSize: 'inherit', margin: 0 }}>{stat.number}</h3>
                  <div className="experties-title-text"><div>{stat.title}</div></div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '8px', lineHeight: 1.5 }}>{stat.desc}</p>
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

