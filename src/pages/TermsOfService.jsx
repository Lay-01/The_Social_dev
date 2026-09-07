import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function TermsOfService() {
  return (
    <div className="page-wrapper">
      <SEOHead
        title="Terms of Service | The Social Dev"
        description="Terms of Service for The Social Dev. Read our client service agreements, intellectual property rights, and website usage terms."
        canonicalUrl="https://thesocialdev.co.in/terms-of-service"
      />
      <Navbar />

      <main id="main-content" style={{ padding: '120px 0 80px 0', minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '8px' }}>Terms of Service</h1>
          <p style={{ color: '#ffa260', fontSize: '0.9rem', marginBottom: '36px' }}>Last Updated: March 2026</p>

          <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>1. Agreement to Terms</h2>
              <p>
                By accessing or using <strong>https://thesocialdev.co.in/</strong> or engaging <strong>The Social Dev</strong> for custom web development, UI/UX design, or digital marketing services, you agree to be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>2. Services & Project Scope</h2>
              <p>
                The Social Dev provides custom web software development, responsive website engineering, branding, and social media content creation. Detailed deliverables, timelines, and payment structures are finalized via custom proposals prior to project kickoff.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>3. Intellectual Property Rights</h2>
              <p>
                Upon final payment for custom web development projects, full ownership of client-specific code, visual assets, and content is transferred to the client. The Social Dev retains the right to display completed project screenshots in our portfolio unless specified under a non-disclosure agreement (NDA).
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>4. Limitation of Liability</h2>
              <p>
                The Social Dev shall not be liable for any indirect, incidental, or consequential damages resulting from website downtime, third-party hosting failures, or external API service interruptions beyond our direct control.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>5. Governing Law & Contact</h2>
              <p>
                These terms are governed by the laws of India. For any inquiries regarding our terms, please contact us at{' '}
                <a href="mailto:the.social.dev12@gmail.com" style={{ color: '#ffa260', textDecoration: 'underline' }}>
                  the.social.dev12@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
