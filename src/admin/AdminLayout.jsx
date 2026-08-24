import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContext';
import AdminOverview from './pages/AdminOverview';
import AboutEditor from './pages/AboutEditor';
import ServicesEditor from './pages/ServicesEditor';
import WhyChooseUsEditor from './pages/WhyChooseUsEditor';
import ContactSettings from './pages/ContactSettings';
import './admin.css';

export default function AdminLayout({ initialTab = 'overview' }) {
  const { user, logout } = useSiteContent();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'why':
        return <WhyChooseUsEditor />;
      case 'contact':
        return <ContactSettings />;
      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'about': return 'About Us Editor';
      case 'services': return 'Services Management (CRUD)';
      case 'why': return 'Why Choose Us Editor';
      case 'contact': return 'Contact Email Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className="adminkit-wrapper">
      {/* AdminKit Sidebar */}
      <aside className="adminkit-sidebar" style={{ display: sidebarOpen ? 'flex' : 'none' }}>
        <div className="adminkit-brand">
          <i className="ri-dashboard-3-line"></i>
          <span>Social Dev Panel</span>
        </div>

        <div className="adminkit-nav-header">Main Menu</div>
        <ul className="adminkit-nav">
          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
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
              onClick={() => setActiveTab('about')}
            >
              <i className="ri-user-star-line"></i>
              <span>About Us</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <i className="ri-layout-grid-line"></i>
              <span>Services (CRUD)</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'why' ? 'active' : ''}`}
              onClick={() => setActiveTab('why')}
            >
              <i className="ri-thumb-up-line"></i>
              <span>Why Choose Us</span>
            </button>
          </li>
        </ul>

        <div className="adminkit-nav-header">Settings & Tools</div>
        <ul className="adminkit-nav">
          <li className="adminkit-nav-item">
            <button
              className={`adminkit-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <i className="ri-mail-send-line"></i>
              <span>Contact Email</span>
            </button>
          </li>

          <li className="adminkit-nav-item">
            <a href="/" className="adminkit-nav-link" target="_blank" rel="noreferrer">
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#475569', cursor: 'pointer' }}
              title="Toggle Sidebar"
            >
              <i className="ri-menu-line"></i>
            </button>
            <div className="adminkit-breadcrumbs">
              <span>Social Dev Panel</span>
              <span>/</span>
              <span className="active">{getBreadcrumbTitle()}</span>
            </div>
          </div>

          <div className="adminkit-nav-actions">
            <a href="/" className="adminkit-btn adminkit-btn-outline adminkit-btn-sm">
              <i className="ri-global-line"></i> View Site
            </a>
            <button className="adminkit-btn adminkit-btn-secondary adminkit-btn-sm" onClick={logout}>
              <i className="ri-logout-box-r-line"></i> Sign Out
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
