import React from 'react';

export default function Expertise() {
  const items = [
    {
      highlight: '100%',
      title: 'Tailored Solutions',
      desc: 'Every project is custom-built around your unique business requirements and target audience.',
    },
    {
      highlight: 'Rapid',
      title: 'Development',
      desc: 'Fast turnaround without cutting corners, leveraging modern frameworks and agile workflows.',
    },
    {
      highlight: 'Timely',
      title: 'Delivery',
      desc: 'We respect deadlines and keep you informed at every stage of the development lifecycle.',
    },
    {
      highlight: '100%',
      title: 'Transparency',
      desc: 'Clear communication, honest pricing, and full visibility into project progress from day one.',
    },
  ];

  return (
    <section className="experties" id="why" aria-label="Our Core Expertise and Values">
      <div className="container">
        <div className="page-vertical-padding">
          <h2 className="expertise-main-title">Our Core Expertise and Values</h2>
          <div className="expertise-cards-grid">
            {items.map((item, idx) => (
              <div className="expertise-card" key={idx}>
                <span className="expertise-card-highlight">{item.highlight}</span>
                <h3 className="expertise-card-title">{item.title}</h3>
                <p className="expertise-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="experties-glow-block"></div>
    </section>
  );
}

