import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import ImageUploader from '../components/ImageUploader';

export default function VenturesEditor() {
  const { content, addVenture, editVenture, deleteVenture, saveStatus } = useSiteContent();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // New Venture Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newImage, setNewImage] = useState('');

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    addVenture({
      title: newTitle,
      description: newDescription,
      url: newUrl,
      image: newImage
    });

    setNewTitle('');
    setNewDescription('');
    setNewUrl('');
    setNewImage('');
    setIsAddModalOpen(false);
  };

  const handleStartEdit = (venture) => {
    setEditingItem(venture);
    setEditTitle(venture.title);
    setEditDescription(venture.description);
    setEditUrl(venture.url || '');
    setEditImage(venture.image || '');
    setEditIsActive(venture.isActive !== false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    editVenture(editingItem.id, {
      title: editTitle,
      description: editDescription,
      url: editUrl,
      image: editImage,
      isActive: editIsActive
    });

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteVenture(deletingId);
      setDeletingId(null);
    }
  };

  const ventures = content.ventures || [];

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Our Ventures</h1>
          <p className="adminkit-page-subtitle">
            Add, edit or remove your featured project ventures. Each entry shows a site thumbnail, title, description, and URL on the public website.
          </p>
        </div>
        <button className="adminkit-btn adminkit-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="ri-add-line"></i> Add New Venture
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>Ventures updated successfully! Changes are live on the public site.</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="adminkit-alert" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)' }}>
          <i className="ri-error-warning-fill" style={{ fontSize: '1.2rem', color: '#ef4444' }}></i>
          <span style={{ color: '#ef4444' }}>Failed to save. Please try again.</span>
        </div>
      )}

      {/* Ventures Table */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title">All Ventures ({ventures.length})</h3>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Thumbnail previews are shown from the uploaded image or URL.
          </span>
        </div>
        <div className="adminkit-card-body" style={{ padding: 0 }}>
          {ventures.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
              <i className="ri-rocket-2-line" style={{ fontSize: '2.5rem', opacity: 0.4, marginBottom: '0.75rem', display: 'block' }}></i>
              No ventures found. Click <strong>"Add New Venture"</strong> to showcase your first project!
            </div>
          ) : (
            <div className="adminkit-table-container">
              <table className="adminkit-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Title</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ventures.map((vtr) => (
                    <tr key={vtr.id}>
                      <td style={{ width: '80px', minWidth: '80px' }}>
                        <div
                          style={{
                            width: '72px',
                            height: '48px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: '#0f172a',
                            border: '1px solid rgba(255,255,255,0.08)',
                            flexShrink: 0
                          }}
                        >
                          {vtr.image ? (
                            <img
                              src={vtr.image}
                              alt={vtr.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                              <i className="ri-image-line" style={{ fontSize: '1.25rem', color: '#475569' }}></i>
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, minWidth: '160px' }}>
                        <div>{vtr.title}</div>
                        <div style={{ fontSize: '0.79rem', color: '#94a3b8', fontWeight: 400, marginTop: '2px', maxWidth: '260px' }}>
                          {vtr.description?.length > 80 ? `${vtr.description.substring(0, 80)}...` : vtr.description}
                        </div>
                      </td>
                      <td style={{ color: '#60a5fa', maxWidth: '200px' }}>
                        {vtr.url ? (
                          <a
                            href={vtr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#60a5fa',
                              textDecoration: 'none',
                              fontSize: '0.82rem',
                              wordBreak: 'break-all',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <i className="ri-external-link-line"></i>
                            {vtr.url.replace(/^https?:\/\//i, '').slice(0, 30)}{vtr.url.length > 33 ? '...' : ''}
                          </a>
                        ) : (
                          <span style={{ color: '#475569', fontSize: '0.82rem' }}>— No URL —</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`adminkit-badge ${vtr.isActive !== false ? 'adminkit-badge-success' : 'adminkit-badge-warning'}`}
                          style={{ border: 'none', cursor: 'pointer' }}
                          onClick={() => editVenture(vtr.id, { isActive: vtr.isActive === false })}
                        >
                          {vtr.isActive !== false ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          className="adminkit-btn adminkit-btn-outline adminkit-btn-sm"
                          style={{ marginRight: '0.5rem' }}
                          onClick={() => handleStartEdit(vtr)}
                        >
                          <i className="ri-pencil-line"></i> Edit
                        </button>
                        <button
                          className="adminkit-btn adminkit-btn-danger adminkit-btn-sm"
                          onClick={() => setDeletingId(vtr.id)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="adminkit-card" style={{ marginTop: '1.5rem' }}>
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title" style={{ fontSize: '0.95rem' }}>
            <i className="ri-information-line" style={{ marginRight: '0.4rem', color: '#ffa260' }}></i>
            How to Add Site Thumbnails
          </h3>
        </div>
        <div className="adminkit-card-body" style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.7 }}>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Upload a screenshot PNG/JPG file using the <strong>Upload File</strong> button (max 5MB).</li>
            <li>Or paste any external direct image URL (e.g. from AWS S3, Cloudinary, Unsplash, etc.)</li>
            <li>Leave the image field empty and a fallback placeholder will be used on the public site.</li>
          </ul>
        </div>
      </div>

      {/* ADD VENTURE MODAL */}
      {isAddModalOpen && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal" style={{ maxWidth: '560px' }}>
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">
                <i className="ri-rocket-2-line" style={{ marginRight: '0.5rem', color: '#ffa260' }}></i>
                Add New Venture
              </h3>
              <button className="adminkit-modal-close" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Project / Venture Title <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g., Optirise Digital Agency"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Short Description <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea
                    className="adminkit-textarea"
                    rows={3}
                    placeholder="Briefly describe this venture or project..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Live Site URL</label>
                  <input
                    type="url"
                    className="adminkit-input"
                    placeholder="https://your-project.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>

                <ImageUploader
                  label="Site Thumbnail / Screenshot"
                  value={newImage}
                  onChange={setNewImage}
                  placeholder="Upload a screenshot or paste image URL..."
                />
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  <i className="ri-check-line"></i> Create Venture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT VENTURE MODAL */}
      {editingItem && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal" style={{ maxWidth: '560px' }}>
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">
                <i className="ri-edit-2-line" style={{ marginRight: '0.5rem', color: '#ffa260' }}></i>
                Edit: {editingItem.title}
              </h3>
              <button className="adminkit-modal-close" onClick={() => setEditingItem(null)}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Project / Venture Title <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Short Description <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea
                    className="adminkit-textarea"
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Live Site URL</label>
                  <input
                    type="url"
                    className="adminkit-input"
                    placeholder="https://your-project.com"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                  />
                </div>

                <ImageUploader
                  label="Site Thumbnail / Screenshot"
                  value={editImage}
                  onChange={setEditImage}
                  placeholder="Upload screenshot or paste image URL..."
                />

                <div className="adminkit-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="editVentureIsActive"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="editVentureIsActive" className="adminkit-label" style={{ margin: 0, cursor: 'pointer' }}>
                    Active (Visible on public site)
                  </label>
                </div>
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setEditingItem(null)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  <i className="ri-save-line"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal" style={{ maxWidth: '420px' }}>
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Confirm Deletion</h3>
              <button className="adminkit-modal-close" onClick={() => setDeletingId(null)}>×</button>
            </div>
            <div className="adminkit-modal-body">
              <p style={{ margin: 0, color: '#334155' }}>
                Are you sure you want to delete this venture? It will be removed from the public website immediately.
              </p>
            </div>
            <div className="adminkit-modal-footer">
              <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
              <button type="button" className="adminkit-btn adminkit-btn-danger" onClick={handleConfirmDelete}>
                <i className="ri-delete-bin-line"></i> Delete Venture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
