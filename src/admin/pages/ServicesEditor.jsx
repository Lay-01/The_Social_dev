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
                      <td style={{ fontWeight: 600, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {srv.icon && srv.icon.startsWith('ri-') ? (
                            <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid rgba(255,162,96,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <i className={srv.icon} style={{ fontSize: '1.2rem', color: '#ffa260' }}></i>
                            </div>
                          ) : (srv.icon && (srv.icon.startsWith('http://') || srv.icon.startsWith('https://') || srv.icon.startsWith('/'))) ? (
                            <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                              <img src={srv.icon} alt="" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                            </div>
                          ) : (
                            <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid rgba(255,162,96,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <i className="ri-layout-grid-line" style={{ fontSize: '1.2rem', color: '#ffa260' }}></i>
                            </div>
                          )}
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{srv.title}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                              {srv.icon && srv.icon.startsWith('ri-')
                                ? srv.icon
                                : srv.icon && srv.icon.startsWith('data:')
                                ? 'Uploaded Image File'
                                : srv.icon && srv.icon.startsWith('http')
                                ? 'Custom Image URL'
                                : 'Icon Asset'}
                            </div>
                          </div>

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
                        <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-primary"
                            onClick={() => handleStartEdit(srv)}
                            title="Edit Service"
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-danger"
                            onClick={() => setDeletingId(srv.id)}
                            title="Delete Service"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
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

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Icon Class or Image URL</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    {[
                      { icon: 'ri-code-s-slash-line', label: 'Code' },
                      { icon: 'ri-palette-line', label: 'Palette' },
                      { icon: 'ri-layout-4-line', label: 'UI/UX' },
                      { icon: 'ri-megaphone-line', label: 'Megaphone' },
                      { icon: 'ri-smartphone-line', label: 'Mobile' },
                      { icon: 'ri-global-line', label: 'Web' }
                    ].map((item) => (
                      <button
                        key={item.icon}
                        type="button"
                        className={`adminkit-btn ${newIcon === item.icon ? 'adminkit-btn-primary' : 'adminkit-btn-outline'}`}
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        onClick={() => setNewIcon(item.icon)}
                      >
                        <i className={item.icon} style={{ marginRight: '4px' }}></i> {item.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. ri-code-s-slash-line or https://..."
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                  />
                </div>
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

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Icon Class or Image URL</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    {[
                      { icon: 'ri-code-s-slash-line', label: 'Code' },
                      { icon: 'ri-palette-line', label: 'Palette' },
                      { icon: 'ri-layout-4-line', label: 'UI/UX' },
                      { icon: 'ri-megaphone-line', label: 'Megaphone' },
                      { icon: 'ri-smartphone-line', label: 'Mobile' },
                      { icon: 'ri-global-line', label: 'Web' }
                    ].map((item) => (
                      <button
                        key={item.icon}
                        type="button"
                        className={`adminkit-btn ${editIcon === item.icon ? 'adminkit-btn-primary' : 'adminkit-btn-outline'}`}
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        onClick={() => setEditIcon(item.icon)}
                      >
                        <i className={item.icon} style={{ marginRight: '4px' }}></i> {item.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. ri-code-s-slash-line or https://..."
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                  />
                </div>


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
