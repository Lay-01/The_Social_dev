import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContext';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { content } = useSiteContent();

  const rawFaqs = content?.faqs || [];
  const faqData = rawFaqs.filter(item => item.isActive !== false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data JSON-LD for Google Search Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="faq-section" style={{ padding: '80px 0', position: 'relative' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container">
        <div className="page-vertical-padding">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            
            {/* Section Title Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="section-caption-block" style={{ margin: '0 auto 12px auto' }}>
                <div>Frequently Asked Questions</div>
              </div>
              <h2 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '16px' }}>
                Everything You Need To Know <span className="section-sub-heading" style={{ color: '#ffa260' }}>About Our Web Services</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
                Clear answers regarding our web development process, services offered, technical stack, and client delivery timelines.
              </p>
            </div>

            {/* Accordion Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqData.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)'
                    }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: '#ffffff',
                        textAlign: 'left',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        gap: '16px',
                        outline: 'none'
                      }}
                    >
                      <span style={{ flex: 1, lineHeight: 1.4 }}>{item.question}</span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: isOpen ? '#ffa260' : 'rgba(255, 255, 255, 0.06)',
                          color: isOpen ? '#07090e' : '#ffa260',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          flexShrink: 0,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '0 24px 22px 24px',
                          color: 'rgba(255, 255, 255, 0.72)',
                          fontSize: '0.96rem',
                          lineHeight: 1.7,
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                          marginTop: '4px',
                          paddingTop: '16px'
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      <div className="why-bg-glow" style={{ opacity: 0.4 }}></div>
    </section>
  );
}
