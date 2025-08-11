'use client'
import React, { useState } from 'react'

const AddPortfolio = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (index, portfolio) => {
    setEditingIndex(index);
    setEditingData({ ...portfolio });
  };

  const handleSave = async (index) => {
    // Basic validation
    if (!editingData.title?.trim()) {
      alert('Please enter a project title');
      return;
    }
    
    if (!editingData.description?.trim()) {
      alert('Please enter a project description');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const updatedPortfolio = [...(selectedResume?.portfolio || [])];
      updatedPortfolio[index] = editingData;
      updateResumeSection('portfolio', updatedPortfolio);
      setEditingIndex(null);
      setEditingData({});
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      alert('Error saving portfolio item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this portfolio item? This action cannot be undone.')) {
      const updatedPortfolio = [...(selectedResume?.portfolio || [])];
      updatedPortfolio.splice(index, 1);
      updateResumeSection('portfolio', updatedPortfolio);
    }
  };

  const handleAddPortfolio = () => {
    const newPortfolio = {
      title: '',
      description: '',
      url: '',
      type: 'project'
    };
    const updatedPortfolio = [...(selectedResume?.portfolio || []), newPortfolio];
    updateResumeSection('portfolio', updatedPortfolio);
    setEditingIndex(updatedPortfolio.length - 1);
    setEditingData(newPortfolio);
  };

  const handleInputChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="uploading-outer portfolio-section">
      {/* Portfolio Header */}
      <div className="upper-title">
        <h4>Portfolio</h4>
        {isEditing && (
          <button 
            type="button" 
            className="add-info-btn"
            onClick={handleAddPortfolio}
          >
            <span className="icon flaticon-plus"></span> Add Portfolio Item
          </button>
        )}
      </div>

      {/* Portfolio Items List */}
      <div className="portfolio-items-container">
        {selectedResume?.portfolio && selectedResume.portfolio.length > 0 ? (
          selectedResume.portfolio.map((item, index) => (
            <div className="portfolio-item" key={index}>
              {editingIndex === index ? (
                // Edit Form
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        placeholder="Enter project title"
                        value={editingData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="optional">Project Type</label>
                      <select
                        value={editingData.type || 'project'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="form-control"
                      >
                        <option value="project">Project</option>
                        <option value="website">Website</option>
                        <option value="app">Application</option>
                        <option value="design">Design</option>
                        <option value="research">Research</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Project Description *</label>
                    <textarea
                      placeholder="Describe your project, technologies used, and your role..."
                      value={editingData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-control"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="optional">Project URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://example.com or GitHub repository link"
                      value={editingData.url || ''}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      className="form-control"
                    />
                    <small className="form-text text-muted">
                      Add a link to your live project, GitHub repository, or portfolio showcase
                    </small>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => handleSave(index)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="portfolio-display">
                  <div className="portfolio-header">
                    <div className="portfolio-info">
                      <h5 className="portfolio-title">{item.title || 'Untitled Project'}</h5>
                      <span className="portfolio-type">{item.type || 'project'}</span>
                    </div>
                    {isEditing && (
                      <div className="portfolio-actions">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(index, item)}
                          title="Edit portfolio item"
                        >
                          <i className="icon flaticon-edit"></i> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(index)}
                          title="Delete portfolio item"
                        >
                          <i className="icon flaticon-dustbin"></i> Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <p className="portfolio-description">{item.description}</p>
                  )}
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="portfolio-link"
                    >
                      <i className="icon flaticon-unlink"></i> View Project
                    </a>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          // Empty State
          <div className="portfolio-empty-state">
            <p>No portfolio items yet. Click "Add Portfolio Item" to get started.</p>
          </div>
        )}
      </div>

      {/* File Upload Section */}
      {isEditing && (
        <div className="upload-section">
          <h5>Attachments</h5>
          <div className="uploadButton">
            <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/*, application/pdf"
              id="upload"
              multiple
            />
            <label className="uploadButton-button ripple-effect" htmlFor="upload">
              Upload Files
            </label>
            <span className="uploadButton-file-name"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPortfolio;
