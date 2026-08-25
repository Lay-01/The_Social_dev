import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import ImageUploader from '../components/ImageUploader';

export default function ServicesEditor() {
  const { content, addService, editService, deleteService, saveStatus } = useSiteContent();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // New Service Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIcon, setNewIcon] = useState('https://cdn.prod.website-files.com/67dfd1dcc5b0275fa8dddf26/67dfd1dcc5b0275fa8dddf33_service-logo-01.svg');

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    addService({
      title: newTitle,
      description: newDescription,
      icon: newIcon
    });

    setNewTitle('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const handleStartEdit = (service) => {
    setEditingItem(service);
    setEditTitle(service.title);
    setEditDescription(service.description);
    setEditIcon(service.icon || '');
    setEditIsActive(service.isActive !== false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    editService(editingItem.id, {
      title: editTitle,
      description: editDescription,
      icon: editIcon,
      isActive: editIsActive
    });

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteService(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Services Management (CRUD)</h1>
          <p className="adminkit-page-subtitle">Add new service offerings, edit descriptions, toggle visibility, or remove services.</p>
        </div>
        <button className="adminkit-btn adminkit-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="ri-add-line"></i> Add New Service
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>Services updated successfully! Changes are live on the public site.</span>
        </div>
      )}

      {/* Services Table */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title">All Service Offerings ({content.services?.length || 0})</h3>
        </div>
        <div className="adminkit-card-body" style={{ padding: 0 }}>
          {(!content.services || content.services.length === 0) ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              No services found. Click "Add New Service" above to create one!
            </div>
          ) : (
            <div className="adminkit-table-container">
              <table className="adminkit-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {content.services.map((srv) => (
                    <tr key={srv.id}>
                      <td style={{ fontWeight: 600, minWidth: '180px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          {srv.icon && (
                            <img src={srv.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                          )}
                          <span>{srv.title}</span>
                        </div>
                      </td>
                      <td style={{ color: '#475569', maxWidth: '350px' }}>
                        {srv.description.length > 90 ? `${srv.description.substring(0, 90)}...` : srv.description}
                      </td>
                      <td>
                        <button
                          className={`adminkit-badge ${srv.isActive !== false ? 'adminkit-badge-success' : 'adminkit-badge-warning'}`}
                          style={{ border: 'none', cursor: 'pointer' }}
                          onClick={() => editService(srv.id, { isActive: srv.isActive === false })}
                        >
                          {srv.isActive !== false ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          className="adminkit-btn adminkit-btn-outline adminkit-btn-sm"
                          style={{ marginRight: '0.5rem' }}
                          onClick={() => handleStartEdit(srv)}
                        >
                          <i className="ri-pencil-line"></i> Edit
                        </button>
                        <button
                          className="adminkit-btn adminkit-btn-danger adminkit-btn-sm"
                          onClick={() => setDeletingId(srv.id)}
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

      {/* ADD SERVICE MODAL */}
      {isAddModalOpen && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Add New Service Offering</h3>
              <button className="adminkit-modal-close" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Service Title</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g., Mobile App Development"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Description</label>
                  <textarea
                    className="adminkit-textarea"
                    rows={4}
                    placeholder="Describe what is included in this service offering..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  />
                </div>

                <ImageUploader
                  label="Icon / Service Image"
                  value={newIcon}
                  onChange={setNewIcon}
                  placeholder="Paste URL (https://...) or upload image file"
                />
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  <i className="ri-check-line"></i> Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingItem && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Edit Service: {editingItem.title}</h3>
              <button className="adminkit-modal-close" onClick={() => setEditingItem(null)}>×</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Service Title</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Description</label>
                  <textarea
                    className="adminkit-textarea"
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  />
                </div>

                <ImageUploader
                  label="Icon / Service Image"
                  value={editIcon}
                  onChange={setEditIcon}
                  placeholder="Paste URL (https://...) or upload image file"
                />

                <div className="adminkit-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="editIsActive" className="adminkit-label" style={{ margin: 0, cursor: 'pointer' }}>
                    Active (Show on public website)
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
                Are you sure you want to delete this service? This action will remove it from your public website.
              </p>
            </div>
            <div className="adminkit-modal-footer">
              <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
              <button type="button" className="adminkit-btn adminkit-btn-danger" onClick={handleConfirmDelete}>
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
