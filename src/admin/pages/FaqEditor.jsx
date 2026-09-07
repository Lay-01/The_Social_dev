import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';

export default function FaqEditor() {
  const { content, addFaq, editFaq, deleteFaq, saveStatus } = useSiteContent();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form States
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const faqsList = content.faqs || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    addFaq({
      question: newQuestion,
      answer: newAnswer
    });

    setNewQuestion('');
    setNewAnswer('');
    setIsAddModalOpen(false);
  };

  const handleStartEdit = (faq) => {
    setEditingItem(faq);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setEditIsActive(faq.isActive !== false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    editFaq(editingItem.id, {
      question: editQuestion,
      answer: editAnswer,
      isActive: editIsActive
    });

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteFaq(deletingId);
      setDeletingId(null);
    }
  };

  const handleToggleActive = (faq) => {
    editFaq(faq.id, { isActive: faq.isActive === false });
  };

  return (
    <div>
      <div className="adminkit-page-header">
        <div>
          <h1 className="adminkit-page-title">FAQ Management (CRUD)</h1>
          <p className="adminkit-page-subtitle">Add, edit, remove, or toggle visibility of Frequently Asked Questions shown on the website.</p>
        </div>
        <button className="adminkit-btn adminkit-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="ri-add-line"></i> Add New FAQ
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="adminkit-alert adminkit-alert-success">
          <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.2rem' }}></i>
          <span>FAQs updated successfully! Changes are live on the public site and synced.</span>
        </div>
      )}

      {/* FAQ Table */}
      <div className="adminkit-card">
        <div className="adminkit-card-header">
          <h3 className="adminkit-card-title">All FAQ Questions ({faqsList.length})</h3>
        </div>
        <div className="adminkit-card-body" style={{ padding: 0 }}>
          {faqsList.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
              No FAQ items found. Click "Add New FAQ" above to create your first question!
            </div>
          ) : (
            <div className="adminkit-table-container">
              <table className="adminkit-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>Question & Answer</th>
                    <th style={{ width: '120px' }}>Status</th>
                    <th style={{ width: '150px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqsList.map((faq, index) => (
                    <tr key={faq.id || index}>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>{index + 1}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px', fontSize: '0.95rem' }}>
                          {faq.question}
                        </div>
                        <div style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.5, maxWidth: '640px' }}>
                          {faq.answer}
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(faq)}
                          className={`adminkit-badge ${faq.isActive !== false ? 'adminkit-badge-success' : 'adminkit-badge-warning'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Click to toggle visibility"
                        >
                          {faq.isActive !== false ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-primary"
                            onClick={() => handleStartEdit(faq)}
                            title="Edit FAQ"
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            className="adminkit-btn-icon adminkit-btn-icon-danger"
                            onClick={() => setDeletingId(faq.id)}
                            title="Delete FAQ"
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

      {/* Modal: Add New FAQ */}
      {isAddModalOpen && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Add New FAQ Item</h3>
              <button className="adminkit-modal-close" onClick={() => setIsAddModalOpen(false)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="adminkit-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="adminkit-label">Question <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="adminkit-input"
                    placeholder="e.g. How long does a website project take?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="adminkit-label">Answer <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea
                    className="adminkit-textarea"
                    rows={4}
                    placeholder="Provide a clear, helpful answer for prospective clients..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="adminkit-modal-footer">
                <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="adminkit-btn adminkit-btn-primary">
                  <i className="ri-save-line"></i> Add FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit FAQ */}
      {editingItem && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal">
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Edit FAQ Item</h3>
              <button className="adminkit-modal-close" onClick={() => setEditingItem(null)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="adminkit-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="adminkit-label">Question <span style={{ color: '#ef4444' }}>*</span></label>
                  <input
                    type="text"
                    className="adminkit-input"
                    value={editQuestion}
                    onChange={(e) => setEditQuestion(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="adminkit-label">Answer <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea
                    className="adminkit-textarea"
                    rows={4}
                    value={editAnswer}
                    onChange={(e) => setEditAnswer(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="editFaqActive"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                  />
                  <label htmlFor="editFaqActive" style={{ color: '#334155', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>
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

      {/* Modal: Delete Confirmation */}
      {deletingId && (
        <div className="adminkit-modal-overlay">
          <div className="adminkit-modal" style={{ maxWidth: '420px' }}>
            <div className="adminkit-modal-header">
              <h3 className="adminkit-modal-title">Delete FAQ Item</h3>
              <button className="adminkit-modal-close" onClick={() => setDeletingId(null)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="adminkit-modal-body">
              <p style={{ color: '#475569', margin: 0 }}>
                Are you sure you want to delete this FAQ question? This action will remove it from the live website.
              </p>
            </div>
            <div className="adminkit-modal-footer">
              <button type="button" className="adminkit-btn adminkit-btn-secondary" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
              <button type="button" className="adminkit-btn adminkit-btn-danger" onClick={handleConfirmDelete}>
                <i className="ri-delete-bin-line"></i> Delete FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
