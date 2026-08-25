import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../context/SiteContext';
import AdminOverview from './pages/AdminOverview';
import AboutEditor from './pages/AboutEditor';
import ServicesEditor from './pages/ServicesEditor';
import WhyChooseUsEditor from './pages/WhyChooseUsEditor';
import ContactSettings from './pages/ContactSettings';
import VenturesEditor from './pages/VenturesEditor';
import './admin.css';

export default function AdminLayout({ initialTab = 'overview' }) {
  const { user, logout } = useSiteContent();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 992;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectTab = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={selectTab} />;
      case 'about':
        return <AboutEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'why':
        return <WhyChooseUsEditor />;
      case 'ventures':
        return <VenturesEditor />;
      case 'contact':
        return <ContactSettings />;
      default:
        return <AdminOverview setActiveTab={selectTab} />;
    }
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'about': return 'About Us Editor';
      case 'services': return 'Services Management';
      case 'why': return 'Why Choose Us Editor';
      case 'ventures': return 'Our Ventures Editor';
      case 'contact': return 'Contact Email Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className="adminkit-wrapper">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div className="adminkit-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* AdminKit Sidebar */}
      <aside className={`adminkit-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="adminkit-brand">
          <i className="ri-dashboard-3-line"></i>
          <span>Social Dev Panel</span>
          <button
            className="adminkit-sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="adminkit-nav-header">Main Menu</div>
        <ul className="adminkit-nav">
          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => selectTab('overview')}
            >
              <i className="ri-line-chart-line"></i>
              <span>Dashboard</span>
            </button>
          </li>
        </ul>

        <div className="adminkit-nav-header">Content Management</div>
        <ul className="adminkit-nav">
          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => selectTab('about')}
            >
              <i className="ri-user-star-line"></i>
              <span>About Us</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => selectTab('services')}
            >
              <i className="ri-layout-grid-line"></i>
              <span>Services (CRUD)</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'why' ? 'active' : ''}`}
              onClick={() => selectTab('why')}
            >
              <i className="ri-thumb-up-line"></i>
              <span>Why Choose Us</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'ventures' ? 'active' : ''}`}
              onClick={() => selectTab('ventures')}
            >
              <i className="ri-rocket-2-line"></i>
              <span>Our Ventures</span>
            </button>
          </li>
        </ul>

        <div className="adminkit-nav-header">Settings & Tools</div>
        <ul className="adminkit-nav">
          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => selectTab('contact')}
            >
              <i className="ri-mail-send-line"></i>
              <span>Contact Email</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <a href={window.location.pathname.replace(/\/admin\/?$/i, '') || '/'} className="adminkit-nav-link" target="_blank" rel="noreferrer">
              <i className="ri-external-link-line"></i>
              <span>View Live Website ↗</span>
            </a>
          </li>
        </ul>

        {/* User Footer */}
        <div className="adminkit-sidebar-footer">
          <div className="adminkit-avatar">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="adminkit-user-info">
            <div className="adminkit-user-name">{user?.email || 'Admin User'}</div>
            <div className="adminkit-user-role">Administrator</div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="adminkit-main">
        {/* Top Navbar */}
        <header className="adminkit-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="adminkit-menu-toggle-btn"
              title="Toggle Sidebar"
              aria-label="Toggle Navigation Sidebar"
            >
              <i className="ri-menu-line"></i>
            </button>
            <div className="adminkit-breadcrumbs">
              <span className="adminkit-breadcrumb-prefix">Panel</span>
              <span className="adminkit-breadcrumb-divider">/</span>
              <span className="active">{getBreadcrumbTitle()}</span>
            </div>
          </div>

          <div className="adminkit-nav-actions">
            <a href={window.location.pathname.replace(/\/admin\/?$/i, '') || '/'} className="adminkit-btn adminkit-btn-outline adminkit-btn-sm" target="_blank" rel="noreferrer">
              <i className="ri-global-line"></i> <span className="adminkit-btn-text">View Site</span>
            </a>
            <button className="adminkit-btn adminkit-btn-secondary adminkit-btn-sm" onClick={logout}>
              <i className="ri-logout-box-r-line"></i> <span className="adminkit-btn-text">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Body Canvas */}
        <main className="adminkit-content">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
