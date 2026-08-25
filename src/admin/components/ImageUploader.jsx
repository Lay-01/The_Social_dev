import React, { useRef } from 'react';

export default function ImageUploader({ label, value, onChange, placeholder = 'https://... or upload a file' }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Check size limit (max 5MB recommended for inline base64 Data URLs)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size is too large (max 5MB allowed). Please select a smaller image or use a URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        onChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (val) => {
    let cleanVal = val.trim();

    // Auto-convert Icons8 webpage URLs (e.g. https://icons8.com/icon/XnHBz2LnhELw/dashboard-layout)
    // into direct PNG CDN URLs (https://img.icons8.com/?size=100&id=XnHBz2LnhELw&format=png)
    const icons8Match = cleanVal.match(/icons8\.com\/icon\/([a-zA-Z0-9_-]+)/);
    if (icons8Match && icons8Match[1]) {
      cleanVal = `https://img.icons8.com/?size=100&id=${icons8Match[1]}&format=png`;
    }

    onChange(cleanVal);
  };

  return (
    <div className="adminkit-form-group" style={{ marginBottom: '1.25rem' }}>
      {label && <label className="adminkit-label">{label}</label>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {/* Dual Input Row: URL input + Upload Button */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            className="adminkit-input"
            value={value || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            style={{ flex: 1 }}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="adminkit-btn adminkit-btn-outline"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 0.9rem',
              fontSize: '0.85rem'
            }}
            title="Upload image from computer"
          >
            <i className="ri-upload-cloud-2-line" style={{ color: '#3b82f6', fontSize: '1rem' }}></i>
            <span>Upload File</span>
          </button>

          {value && (
            <button
              type="button"
              className="adminkit-btn adminkit-btn-secondary"
              onClick={handleClear}
              style={{ padding: '0.55rem 0.75rem' }}
              title="Clear Image"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>

        {/* Live Image Preview Thumbnail */}
        {value && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.6rem',
            backgroundColor: '#f8fafc',
            border: '1px dashed #cbd5e1',
            borderRadius: '8px',
            marginTop: '0.2rem'
          }}>
            <img
              src={value}
              alt="Preview"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                borderRadius: '6px',
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                padding: '2px'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div style={{ fontSize: '0.8rem', color: '#64748b', wordBreak: 'break-all' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Preview Active</span>
              <br />
              {value.startsWith('data:') ? 'Uploaded Local Image (Base64 Data)' : 'External Image URL'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
