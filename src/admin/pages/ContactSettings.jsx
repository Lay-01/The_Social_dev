import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';

const PRESET_ICONS = [
  { name: 'Instagram', icon: 'ri-instagram-line' },
  { name: 'GitHub', icon: 'ri-github-fill' },
  { name: 'WhatsApp', icon: 'ri-whatsapp-line' },
  { name: 'X / Twitter', icon: 'ri-twitter-x-fill' },
  { name: 'LinkedIn', icon: 'ri-linkedin-fill' },
  { name: 'YouTube', icon: 'ri-youtube-fill' },
  { name: 'Facebook', icon: 'ri-facebook-circle-fill' },
  { name: 'Discord', icon: 'ri-discord-fill' },
  { name: 'Telegram', icon: 'ri-telegram-line' },
  { name: 'Website / Portfolio', icon: 'ri-global-line' }
];

export default function ContactSettings() {
  const { content, updateContactEmail, addSocialLink, deleteSocialLink, saveStatus } = useSiteContent();
  const [email, setEmail] = useState(content.contactEmail || '');

  // Add Social Link Form State
  const [newPlatformName, setNewPlatformName] = useState('Instagram');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('ri-instagram-line');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    updateContactEmail(email);
  };

  const handlePresetSelect = (presetName) => {
    setNewPlatformName(presetName);
    const matched = PRESET_ICONS.find(p => p.name === presetName);
    if (matched) {
      setNewIcon(matched.icon);
    }
  };

  const handleAddSocialLink = (e) => {
    e.preventDefault();
    if (!newPlatformName.trim() || !newUrl.trim()) return;

    addSocialLink({
      name: newPlatformName,
      url: newUrl,
      icon: newIcon
    });

    setNewUrl('');
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Contact & Social Media Settings</h1>
          <p className="adminkit-page-subtitle">Manage primary contact email and customize footer social media buttons dynamically.</p>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>Settings saved successfully! Changes are live on the public site.</span>
        </div>
      )}

      {/* Primary Contact Email Section */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title"><i className="ri-mail-send-line" style={{ color: '#3b82f6' }}></i> Primary Recipient Email</h3>
        </div>
        <div className="adminkit-card-body">
          <form onSubmit={handleEmailSubmit}>
            <div className="adminkit-form-group">
              <label className="adminkit-label">Contact Email Address</label>
              <input
                type="email"
                className="adminkit-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter contact email"
                required
              />
              <div className="adminkit-help-text">
                Submissions from the main website contact form will prepare emails targeting this address.
              </div>
            </div>

            <button type="submit" className="adminkit-btn adminkit-btn-primary">
              <i className="ri-save-line"></i> Save Email Address
            </button>
          </form>
        </div>
      </div>

      {/* Dynamic Social Media Manager Section */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title"><i className="ri-share-line" style={{ color: '#d97706' }}></i> Social Media Buttons (Footer)</h3>
        </div>
        <div className="adminkit-card-body">
          {/* Active Links Table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="adminkit-label">Active Footer Social Buttons ({content.socialLinks?.length || 0})</label>
            {(!content.socialLinks || content.socialLinks.length === 0) ? (
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', color: '#64748b', fontSize: '0.875rem' }}>
                No social media buttons configured. Use the form below to add your links!
              </div>
            ) : (
              <table className="adminkit-table" style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Platform</th>
                    <th>URL Destination</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {content.socialLinks.map((link) => (
                    <tr key={link.id}>
                      <td style={{ width: '40px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: '#222e3c',
                          color: '#ffa260',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.1rem'
                        }}>
                          <i className={link.icon || 'ri-global-line'}></i>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{link.name}</td>
                      <td style={{ color: '#3b82f6', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <a href={link.url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>
                          {link.url}
                        </a>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="adminkit-btn adminkit-btn-danger adminkit-btn-sm"
                          onClick={() => deleteSocialLink(link.id)}
                          title="Remove social link"
                        >
                          <i className="ri-delete-bin-line"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Add New Social Link Form */}
          <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1rem 0', color: '#1e293b' }}>
              + Add New Social Media Button
            </h4>

            <form onSubmit={handleAddSocialLink}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Preset Platform</label>
                  <select
                    className="adminkit-select"
                    value={newPlatformName}
                    onChange={(e) => handlePresetSelect(e.target.value)}
                  >
                    {PRESET_ICONS.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Custom">Custom Platform</option>
                  </select>
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Platform Name</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={newPlatformName}
                    onChange={(e) => setNewPlatformName(e.target.value)}
                    placeholder="e.g. Instagram, WhatsApp"
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Profile / Page URL</label>
                  <input
                    type="url"
                    className="adminkit-input"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                    required
                  />
                </div>
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Icon Class (Remix Icon)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    placeholder="ri-instagram-line"
                    required
                  />
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    backgroundColor: '#222e3c',
                    color: '#ffa260',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    <i className={newIcon}></i>
                  </div>
                </div>
              </div>

              <button type="submit" className="adminkit-btn adminkit-btn-primary">
                <i className="ri-add-line"></i> Add Social Button
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
