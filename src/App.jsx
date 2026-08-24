import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { SiteProvider, useSiteContent } from './context/SiteContext';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './admin/ProtectedRoute';

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
      <Navbar onToast={showToast} />

      <main className="main-wrapper" style={{ paddingTop: '80px' }}>
        <Hero />
        <About />
        <Expertise />
        <Services />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <Contact
          onSubmitSuccess={(msg) =>
            showToast(msg.includes('copied') ? msg : `Preparing email to ${currentEmail}...`)
          }
        />
      </main>

      <Footer />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 999,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#0d111a',
            border: '1px solid #ffa260',
            color: '#ffa260',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            transition: 'all 0.3s ease'
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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Simple client-side route matcher
  if (currentPath.startsWith('/admin')) {
    return (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    );
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
