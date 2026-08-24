import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import ImageUploader from '../components/ImageUploader';

export default function AboutEditor() {
  const { content, updateAbout, saveStatus } = useSiteContent();
  const [formData, setFormData] = useState(content.about);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAbout(formData);
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Edit About Us Section</h1>
          <p className="adminkit-page-subtitle">Customize the title, subtitle, main body paragraphs, labels, and CDN image references.</p>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>About Us section content saved successfully! Changes are live on the public site.</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title">Main Headlines & Copy</h3>
          </div>
          <div className="adminkit-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">Section Caption</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.caption || ''}
                  onChange={(e) => handleChange('caption', e.target.value)}
                  required
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Main Heading</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.heading || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                  required
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Subheading</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.subheading || ''}
                  onChange={(e) => handleChange('subheading', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="adminkit-form-group">
              <label className="adminkit-label">First Description Paragraph</label>
              <textarea
                className="adminkit-textarea"
                rows={4}
                value={formData.description1 || ''}
                onChange={(e) => handleChange('description1', e.target.value)}
                required
              />
            </div>

            <div className="adminkit-form-group">
              <label className="adminkit-label">Second Description Paragraph</label>
              <textarea
                className="adminkit-textarea"
                rows={4}
                value={formData.description2 || ''}
                onChange={(e) => handleChange('description2', e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">CTA Button Label</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.ctaLabel || ''}
                  onChange={(e) => handleChange('ctaLabel', e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">CTA Link Destination</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.ctaLink || ''}
                  onChange={(e) => handleChange('ctaLink', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title">Feature Badge Labels</h3>
          </div>
          <div className="adminkit-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">Performance Pill</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.labels?.performance || ''}
                  onChange={(e) => handleNestedChange('labels', 'performance', e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Audience Pill</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.labels?.audience || ''}
                  onChange={(e) => handleNestedChange('labels', 'audience', e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Satisfaction Motto Pill</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.labels?.satisfaction || ''}
                  onChange={(e) => handleNestedChange('labels', 'satisfaction', e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Growth Pill</label>
                <input
                  type="text"
                  className="adminkit-input"
                  value={formData.labels?.growth || ''}
                  onChange={(e) => handleNestedChange('labels', 'growth', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title">Image Asset URLs & Uploads</h3>
          </div>
          <div className="adminkit-card-body">
            <ImageUploader
              label="Growth Chart Image"
              value={formData.images?.growthChart || ''}
              onChange={(val) => handleNestedChange('images', 'growthChart', val)}
              placeholder="Paste URL (https://...) or upload image file"
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <ImageUploader
                label="Avatar 1 Image"
                value={formData.images?.avatar1 || ''}
                onChange={(val) => handleNestedChange('images', 'avatar1', val)}
                placeholder="URL or upload file"
              />

              <ImageUploader
                label="Avatar 2 Image"
                value={formData.images?.avatar2 || ''}
                onChange={(val) => handleNestedChange('images', 'avatar2', val)}
                placeholder="URL or upload file"
              />

              <ImageUploader
                label="Avatar 3 Image"
                value={formData.images?.avatar3 || ''}
                onChange={(val) => handleNestedChange('images', 'avatar3', val)}
                placeholder="URL or upload file"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="adminkit-btn adminkit-btn-primary">
            <i className="ri-save-line"></i> Save About Us Section
          </button>
        </div>
      </form>
    </div>
  );
}
