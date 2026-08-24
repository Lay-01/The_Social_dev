import React from 'react';
import { useSiteContent } from '../../context/SiteContext';
import { isSupabaseConfigured, SQL_SCHEMA_SETUP } from '../../lib/supabase';

export default function AdminOverview({ setActiveTab }) {
  const { content, resetToDefaults } = useSiteContent();

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SETUP);
    alert('Supabase SQL setup script copied to clipboard!');
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Dashboard Overview</h1>
          <p className="adminkit-page-subtitle">Welcome back! Manage and edit all core dynamic sections of your website.</p>
        </div>
        <button className="adminkit-btn adminkit-btn-outline" onClick={resetToDefaults}>
          <i className="ri-refresh-line"></i> Reset All to Defaults
        </button>
      </div>

      {/* Stat Cards */}
      <div className="adminkit-stat-grid">
        <div className="adminkit-stat-card">
          <div className="adminkit-stat-icon">
            <i className="ri-information-line"></i>
          </div>
          <div>
            <div className="adminkit-stat-value">About Us</div>
            <div className="adminkit-stat-label">Title & Copy Configured</div>
          </div>
        </div>

        <div className="adminkit-stat-card">
          <div className="adminkit-stat-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            <i className="ri-service-line"></i>
          </div>
          <div>
            <div className="adminkit-stat-value">{content.services?.length || 0} Services</div>
            <div className="adminkit-stat-label">{content.services?.filter(s => s.isActive !== false).length || 0} Active on site</div>
          </div>
        </div>

        <div className="adminkit-stat-card">
          <div className="adminkit-stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
            <i className="ri-heart-pulse-line"></i>
          </div>
          <div>
            <div className="adminkit-stat-value">Why Choose Us</div>
            <div className="adminkit-stat-label">{content.whyChooseUs?.metrics?.length || 0} Metrics Cards</div>
          </div>
        </div>

        <div className="adminkit-stat-card">
          <div className="adminkit-stat-icon" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            <i className="ri-mail-check-line"></i>
          </div>
          <div>
            <div className="adminkit-stat-value">Contact Email</div>
            <div className="adminkit-stat-label">{content.contactEmail}</div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title"><i className="ri-user-star-line" style={{ color: '#3b82f6' }}></i> About Us Section</h3>
          </div>
          <div className="adminkit-card-body">
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Update your agency's motto, title ("Powered by Us"), subheadings, two main story paragraphs, and visual badge labels.
            </p>
            <button className="adminkit-btn adminkit-btn-primary adminkit-btn-sm" onClick={() => setActiveTab('about')}>
              Edit About Section →
            </button>
          </div>
        </div>

        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title"><i className="ri-layout-grid-line" style={{ color: '#d97706' }}></i> Services Management</h3>
          </div>
          <div className="adminkit-card-body">
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Add new service offerings, edit descriptions and icons, reorder items, or toggle active visibility.
            </p>
            <button className="adminkit-btn adminkit-btn-primary adminkit-btn-sm" onClick={() => setActiveTab('services')}>
              Manage Services (CRUD) →
            </button>
          </div>
        </div>

        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title"><i className="ri-thumb-up-line" style={{ color: '#4f46e5' }}></i> Why Choose Us</h3>
          </div>
          <div className="adminkit-card-body">
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Modify section headings, description paragraphs, and metric highlights (e.g., 100% Quality, Brand Growth).
            </p>
            <button className="adminkit-btn adminkit-btn-primary adminkit-btn-sm" onClick={() => setActiveTab('why')}>
              Edit Why Choose Us →
            </button>
          </div>
        </div>

        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title"><i className="ri-mail-send-line" style={{ color: '#15803d' }}></i> Primary Contact Email</h3>
          </div>
          <div className="adminkit-card-body">
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Change the email address used for contact form submissions, Gmail compose redirection, and Navbar copy action.
            </p>
            <button className="adminkit-btn adminkit-btn-primary adminkit-btn-sm" onClick={() => setActiveTab('contact')}>
              Update Contact Email →
            </button>
          </div>
        </div>
      </div>

      {/* Database Connection Status Box */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title"><i className="ri-database-2-line"></i> Backend & Supabase Status</h3>
          <span className={`adminkit-badge ${isSupabaseConfigured ? 'adminkit-badge-success' : 'adminkit-badge-warning'}`}>
            {isSupabaseConfigured ? 'Supabase Connected' : 'Local Persistence (Active)'}
          </span>
        </div>
        <div className="adminkit-card-body">
          {isSupabaseConfigured ? (
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#166534' }}>
              <i className="ri-checkbox-circle-fill"></i> Supabase backend is configured and syncing changes in real-time.
            </p>
          ) : (
            <div>
              <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: 0 }}>
                Currently operating in <strong>Local Storage Persistence mode</strong>. All edits made in this dashboard update your site in real-time across browser reloads.
              </p>
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155', margin: '0 0 0.5rem 0' }}>
                  To link to a live Supabase PostgreSQL database:
                </p>
                <ol style={{ fontSize: '0.8rem', color: '#64748b', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer">supabase.com</a>.</li>
                  <li>Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file.</li>
                  <li>Run the SQL Schema Script in your Supabase SQL Editor.</li>
                </ol>
                <button
                  className="adminkit-btn adminkit-btn-outline adminkit-btn-sm"
                  style={{ marginTop: '0.75rem' }}
                  onClick={handleCopySQL}
                >
                  <i className="ri-file-copy-line"></i> Copy Supabase SQL Setup Script
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
