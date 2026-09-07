import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Ventures from './components/Ventures';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';

import { SiteProvider, useSiteContent } from './context/SiteContext';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './admin/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function MainLandingPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { content } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentEmail = content?.contactEmail || 'the.social.dev12@gmail.com';

  return (
    <div className="page-wrapper">
      <SEOHead
        title="The Social Dev | Custom Web & Software Development"
        description="The Social Dev builds high-performance custom websites, React web applications, UI/UX designs, and aesthetic social media content for growing brands."
        canonicalUrl="https://thesocialdev.co.in/"
      />
      <Navbar onToast={showToast} />

      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <Services />
        <Ventures />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <FAQ />
        <Contact onSubmitSuccess={showToast} />
      </main>

      <Footer />

      {/* Floating Action Button (FAB) / Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="react-fab-top"
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#ffa260',
            color: '#07090e',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255, 162, 96, 0.4)',
            zIndex: 99,
            transition: 'transform 0.25s ease'
          }}
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="react-toast-container">
          <div className="react-toast">
            <i className="ri-checkbox-circle-fill" style={{ color: '#ffa260', fontSize: '1.4rem' }}></i>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function RouterApp() {
  const getRouteState = () => ({
    path: window.location.pathname,
    hash: window.location.hash,
  });

  const [routeState, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const onLocationChange = () => setRouteState(getRouteState());
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const { path, hash } = routeState;
  const pathLower = path.toLowerCase();
  const hashLower = hash.toLowerCase();

  // Detect admin route:
  // - Local dev: /admin
  // - GitHub Pages: /The_Social_dev/admin
  // - Hash routes from 404 redirect: #/admin or #admin
  const isAdminRoute =
    pathLower.endsWith('/admin') ||
    pathLower.includes('/admin/') ||
    hashLower === '#/admin' ||
    hashLower.startsWith('#/admin/') ||
    hashLower === '#admin' ||
    hashLower.startsWith('#admin/');

  if (isAdminRoute) {
    return (
      <ProtectedRoute>
        <SEOHead
          title="Admin Dashboard | The Social Dev"
          description="Administrative dashboard for managing The Social Dev website content."
          canonicalUrl="https://thesocialdev.co.in/admin"
          noindex={true}
        />
        <AdminLayout />
      </ProtectedRoute>
    );
  }

  if (pathLower.includes('/privacy-policy') || hashLower.includes('privacy-policy')) {
    return <PrivacyPolicy />;
  }

  if (pathLower.includes('/terms-of-service') || hashLower.includes('terms-of-service')) {
    return <TermsOfService />;
  }

  return <MainLandingPage />;
}

export default function App() {
  return (
    <SiteProvider>
      <RouterApp />
    </SiteProvider>
  );
}
