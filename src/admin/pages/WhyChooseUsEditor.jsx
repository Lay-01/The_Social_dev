import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import ImageUploader from '../components/ImageUploader';

export default function WhyChooseUsEditor() {
  const { content, updateWhyChooseUs, saveStatus } = useSiteContent();
  const [formData, setFormData] = useState(content.whyChooseUs || {});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMetricChange = (index, field, value) => {
    const updatedMetrics = [...(formData.metrics || [])];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value };
    setFormData(prev => ({ ...prev, metrics: updatedMetrics }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWhyChooseUs(formData);
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Edit Why Choose Us Section</h1>
          <p className="adminkit-page-subtitle">Customize section copy, paragraphs, and metric highlights (e.g. 100% Quality).</p>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>Why Choose Us section saved successfully! Changes are live on the public site.</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="adminkit-card">
          <div className="adminkit-card-header">
            <h3 className="adminkit-card-title">Main Section Copy</h3>
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
            <h3 className="adminkit-card-title">Metric Highlights</h3>
          </div>
          <div className="adminkit-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {(formData.metrics || []).map((metric, idx) => (
                <div key={metric.id || idx} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#1e293b' }}>
                    Metric #{idx + 1}
                  </div>
                  <div className="adminkit-form-group">
                    <label className="adminkit-label">Stat / Highlight (e.g. 100%)</label>
                    <input
                      type="text"
                      className="adminkit-input"
                      value={metric.value || ''}
                      onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    />
                  </div>
                  <div className="adminkit-form-group">
                    <label className="adminkit-label">Title Label (e.g. Quality)</label>
                    <input
                      type="text"
                      className="adminkit-input"
                      value={metric.label || ''}
                      onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    />
                  </div>
                  <div className="adminkit-form-group" style={{ marginBottom: 0 }}>
                    <label className="adminkit-label">Description</label>
                    <input
                      type="text"
                      className="adminkit-input"
                      value={metric.description || ''}
                      onChange={(e) => handleMetricChange(idx, 'description', e.target.value)}
                    />
                  </div>
                  <div className="adminkit-form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                    <label className="adminkit-label">Metric Icon/Image</label>
                    <ImageUploader 
                      value={metric.icon || ''}
                      onChange={(url) => handleMetricChange(idx, 'icon', url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="adminkit-btn adminkit-btn-primary">
            <i className="ri-save-line"></i> Save Why Choose Us Section
          </button>
        </div>
      </form>
    </div>
  );
}
