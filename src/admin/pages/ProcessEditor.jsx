import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContext';

export default function ProcessEditor() {
  const { content, updateProcessHeader, addProcessStep, editProcessStep, deleteProcessStep, saveStatus } = useSiteContent();

  // Header State
  const headerData = content.processHeader || {
    pill: 'Work Process',
    headingLine1: 'Our Proven 4-Step',
    headingLine2: 'Web Development',
    italicAccent: 'Process',
    description: 'A structured, transparent engineering workflow designed to bring your vision to life seamlessly from start to finish.'
  };

  const [headerPill, setHeaderPill] = useState(headerData.pill || '');
  const [headingLine1, setHeadingLine1] = useState(headerData.headingLine1 || '');
  const [headingLine2, setHeadingLine2] = useState(headerData.headingLine2 || '');
  const [italicAccent, setItalicAccent] = useState(headerData.italicAccent || '');
  const [headerDesc, setHeaderDesc] = useState(headerData.description || '');

  useEffect(() => {
    if (content.processHeader) {
      setHeaderPill(content.processHeader.pill || '');
      setHeadingLine1(content.processHeader.headingLine1 || '');
      setHeadingLine2(content.processHeader.headingLine2 || '');
      setItalicAccent(content.processHeader.italicAccent || '');
      setHeaderDesc(content.processHeader.description || '');
    }
  }, [content.processHeader]);

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    updateProcessHeader({
      pill: headerPill,
      headingLine1: headingLine1,
      headingLine2: headingLine2,
      italicAccent: italicAccent,
      description: headerDesc
    });
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // New Step State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newVisualType, setNewVisualType] = useState('development');

  // Edit Step State
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editVisualType, setEditVisualType] = useState('development');
  const [editIsActive, setEditIsActive] = useState(true);

  const steps = content.processSteps || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    addProcessStep({
      title: newTitle,
      category: newCategory || 'WORK PROCESS',
      subtitle: newSubtitle,
      description: newDescription,
      icon: newIcon,
      tags: newTags,
      visualType: newVisualType
    });

    setNewTitle('');
    setNewCategory('');
    setNewSubtitle('');
    setNewDescription('');
    setNewIcon('');
    setNewTags('');
    setIsAddModalOpen(false);
  };

  const handleStartEdit = (step) => {
    setEditingItem(step);
    setEditTitle(step.title || '');
    setEditCategory(step.category || '');
    setEditSubtitle(step.subtitle || '');
    setEditDescription(step.description || '');
    setEditIcon(step.icon || '');
    setEditTags(Array.isArray(step.tags) ? step.tags.join(', ') : (step.tags || ''));
    setEditVisualType(step.visualType || 'development');
    setEditIsActive(step.isActive !== false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    editProcessStep(editingItem.id, {
      title: editTitle,
      category: editCategory,
      subtitle: editSubtitle,
      description: editDescription,
      icon: editIcon,
      tags: editTags,
      visualType: editVisualType,
      isActive: editIsActive
    });

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteProcessStep(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">Work Process Management</h1>
          <p className="adminkit-page-subtitle">
            Update section titles, headings, intro copy, and edit or add process steps in the 3D Interactive Process Carousel.
          </p>
        </div>
        <button className="adminkit-btn adminkit-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="ri-add-line"></i> Add Process Step
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>Work process changes saved successfully! Live on public website.</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="adminkit-alert" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)' }}>
          <i className="ri-error-warning-fill" style={{ fontSize: '1.2rem', color: '#ef4444' }}></i>
          <span style={{ color: '#ef4444' }}>Failed to save work process settings. Please try again.</span>
        </div>
      )}

      {/* SECTION HEADER EDIT CARD */}
      <div className="adminkit-card" style={{ marginBottom: '1.75rem' }}>
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title"><i className="ri-text" style={{ color: '#ffa260' }}></i> Process Section Title &amp; Intro Copy</h3>
        </div>
        <div className="adminkit-card-body">
          <form onSubmit={handleHeaderSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="adminkit-form-group">
                <label className="adminkit-label">Pill Badge Text</label>
                <input
                  type="text"
                  className="adminkit-input"
                  placeholder="e.g. Work Process"
                  value={headerPill}
                  onChange={(e) => setHeaderPill(e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Heading Line 1</label>
                <input
                  type="text"
                  className="adminkit-input"
                  placeholder="e.g. Our Proven 4-Step"
                  value={headingLine1}
                  onChange={(e) => setHeadingLine1(e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Heading Line 2</label>
                <input
                  type="text"
                  className="adminkit-input"
                  placeholder="e.g. Web Development"
                  value={headingLine2}
                  onChange={(e) => setHeadingLine2(e.target.value)}
                />
              </div>

              <div className="adminkit-form-group">
                <label className="adminkit-label">Italic Accent Word</label>
                <input
                  type="text"
                  className="adminkit-input"
                  placeholder="e.g. Process (or It All)"
                  value={italicAccent}
                  onChange={(e) => setItalicAccent(e.target.value)}
                />
              </div>
            </div>

            <div className="adminkit-form-group" style={{ marginBottom: '1rem' }}>
              <label className="adminkit-label">Supporting Section Description</label>
              <textarea
                className="adminkit-textarea"
                rows="2"
                placeholder="A structured, transparent engineering workflow..."
                value={headerDesc}
                onChange={(e) => setHeaderDesc(e.target.value)}
              ></textarea>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button type="submit" className="adminkit-btn adminkit-btn-primary">
                <i className="ri-save-line"></i> Save Section Header
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Steps Table */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title">All Process Steps ({steps.length})</h3>
        </div>
        <div className="adminkit-card-body" style={{ padding: 0 }}>
          {steps.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
              No process steps found. Click <strong>"Add Process Step"</strong> above to create one!
            </div>
          ) : (
            <div className="adminkit-table-container">
              <table className="adminkit-table">
                <thead>
                  <tr>
                    <th>Step #</th>
                    <th>Icon / Visual</th>
                    <th>Category &amp; Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((st) => (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, fontFamily: 'monospace', color: '#ffa260' }}>
                        {st.number || '01'}
                      </td>
                      <td>
                        {st.icon && st.icon.startsWith('http') ? (
                          <img src={st.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        ) : st.icon && st.icon.startsWith('ri-') ? (
                          <i className={st.icon} style={{ fontSize: '1.4rem', color: '#ffa260' }}></i>
                        ) : (
                          <span className="adminkit-badge adminkit-badge-neutral" style={{ textTransform: 'capitalize' }}>
                            {st.visualType || 'development'}
                          </span>
                        )}
                      </td>
                      <td style={{ minWidth: '180px' }}>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700 }}>
                          {st.category}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{st.title}</div>
                        {st.subtitle && (
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{st.subtitle}</div>
                        )}
                      </td>
                      <td style={{ color: '#475569', maxWidth: '320px', fontSize: '0.88rem' }}>
                        {st.description.length > 90 ? `${st.description.substring(0, 90)}...` : st.description}
                      </td>
                      <td>
                        <button
                          className={`adminkit-badge ${st.isActive !== false ? 'adminkit-badge-success' : 'adminkit-badge-warning'}`}
                          style={{ border: 'none', cursor: 'pointer' }}
                          onClick={() => editProcessStep(st.id, { isActive: st.isActive === false })}
                        >
                          {st.isActive !== false ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-primary"
                            onClick={() => handleStartEdit(st)}
                            title="Edit Step"
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-danger"
                            onClick={() => setDeletingId(st.id)}
                            title="Delete Step"
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

      {/* ADD STEP MODAL */}
      {isAddModalOpen && (
        <div className="adminkit-modal-backdrop">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3>Add New Process Step</h3>
              <button className="adminkit-modal-close" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Step Title *</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. Discovery"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Category Badge</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. DISCOVERY"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Subtitle / Tagline</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. Goal & Audience Mapping"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Description *</label>
                  <textarea
                    className="adminkit-textarea"
                    rows="3"
                    placeholder="We sit to understand your business goals..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Custom Icon URL or Remixicon Class</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. https://.../icon.svg or ri-compass-3-line"
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Feature Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. Goal Alignment, Target Audience, Requirements"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Visual Motif Type (Fallback Graphic)</label>
                  <select
                    className="adminkit-input"
                    value={newVisualType}
                    onChange={(e) => setNewVisualType(e.target.value)}
                  >
                    <option value="discovery">Discovery (Blueprint Grid)</option>
                    <option value="strategy">Strategy (Wireframe Stack)</option>
                    <option value="development">Development (Code IDE)</option>
                    <option value="testing">Testing (Audit Meter)</option>
                    <option value="launch">Launch (Rocket &amp; Status)</option>
                    <option value="growth">Growth (Analytics Chart)</option>
                  </select>
                </div>
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  Save Process Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STEP MODAL */}
      {editingItem && (
        <div className="adminkit-modal-backdrop">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3>Edit Process Step: {editingItem.title}</h3>
              <button className="adminkit-modal-close" onClick={() => setEditingItem(null)}>&times;</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="adminkit-modal-body">
                <div className="adminkit-form-group">
                  <label className="adminkit-label">Step Title *</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Category Badge</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Subtitle / Tagline</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Description *</label>
                  <textarea
                    className="adminkit-textarea"
                    rows="3"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Custom Icon URL or Remixicon Class</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    placeholder="e.g. https://.../icon.svg or ri-compass-3-line"
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Feature Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                  />
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-label">Visual Motif Type (Fallback Graphic)</label>
                  <select
                    className="adminkit-input"
                    value={editVisualType}
                    onChange={(e) => setEditVisualType(e.target.value)}
                  >
                    <option value="discovery">Discovery (Blueprint Grid)</option>
                    <option value="strategy">Strategy (Wireframe Stack)</option>
                    <option value="development">Development (Code IDE)</option>
                    <option value="testing">Testing (Audit Meter)</option>
                    <option value="launch">Launch (Rocket &amp; Status)</option>
                    <option value="growth">Growth (Analytics Chart)</option>
                  </select>
                </div>

                <div className="adminkit-form-group">
                  <label className="adminkit-checkbox-label">
                    <input
                      type="checkbox"
                      checked={editIsActive}
                      onChange={(e) => setEditIsActive(e.target.checked)}
                    />
                    <span>Step is Active on Public Website</span>
                  </label>
                </div>
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setEditingItem(null)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  Update Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingId && (
        <div className="adminkit-modal-backdrop">
          <div className="adminkit-modal" style={{ maxWidth: '420px' }}>
            <div className="adminkit-modal-header">
              <h3>Confirm Deletion</h3>
              <button className="adminkit-modal-close" onClick={() => setDeletingId(null)}>&times;</button>
            </div>
            <div className="adminkit-modal-body">
              <p style={{ margin: 0, color: '#475569' }}>
                Are you sure you want to delete this process step? This action will immediately remove it from the public carousel.
              </p>
            </div>
            <div className="adminkit-modal-footer">
              <button className="adminkit-btn adminkit-btn-secondary" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
              <button className="adminkit-btn adminkit-btn-danger" onClick={handleConfirmDelete}>
                Delete Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
