import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <div className="page-wrapper">
      <SEOHead
        title="Privacy Policy | The Social Dev"
        description="Privacy Policy for The Social Dev. Learn how we collect, use, and protect your information when visiting our website or submitting inquiries."
        canonicalUrl="https://thesocialdev.co.in/privacy-policy"
      />
      <Navbar />

      <main id="main-content" style={{ padding: '120px 0 80px 0', minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '8px' }}>Privacy Policy</h1>
          <p style={{ color: '#ffa260', fontSize: '0.9rem', marginBottom: '36px' }}>Last Updated: March 2026</p>

          <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>1. Introduction</h2>
              <p>
                At <strong>The Social Dev</strong> ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard data when you visit <strong>https://thesocialdev.co.in/</strong> or contact us for custom web development services.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>2. Information We Collect</h2>
              <p>We only collect personal information that you voluntarily provide to us when submitting an inquiry form or contacting us via email. This information may include:</p>
              <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                <li>Your name and business name</li>
                <li>Your email address and phone number</li>
                <li>Project scope, requirements, and communication history</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>3. How We Use Your Information</h2>
              <p>The information we collect is used strictly to:</p>
              <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                <li>Respond to client inquiries and project quote requests</li>
                <li>Deliver web development, UI/UX design, and digital agency services</li>
                <li>Improve our website performance and user experience</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>4. Data Protection & Security</h2>
              <p>
                We implement strict technical security measures, including HTTPS encryption and secure database controls, to ensure your information is protected against unauthorized access, alteration, or disclosure. We do not sell, rent, or trade your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>5. Contact Us</h2>
              <p>
                If you have any questions regarding this Privacy Policy, please email us directly at{' '}
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
