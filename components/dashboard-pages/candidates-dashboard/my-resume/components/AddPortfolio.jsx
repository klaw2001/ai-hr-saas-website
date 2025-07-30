'use client'
import React, { useState } from 'react'

const AddPortfolio = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (index, portfolio) => {
    setEditingIndex(index);
    setEditingData({ ...portfolio });
  };

  const handleSave = (index) => {
    const updatedPortfolio = [...(selectedResume?.portfolio || [])];
    updatedPortfolio[index] = editingData;
    updateResumeSection('portfolio', updatedPortfolio);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    const updatedPortfolio = [...(selectedResume?.portfolio || [])];
    updatedPortfolio.splice(index, 1);
    updateResumeSection('portfolio', updatedPortfolio);
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
    <div className="uploading-outer">
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

      {selectedResume?.portfolio?.map((item, index) => (
        <div className="portfolio-item" key={index}>
          {editingIndex === index ? (
            <div className="edit-form">
              <input
                type="text"
                placeholder="Project Title"
                value={editingData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="form-control mb-2"
              />
              <textarea
                placeholder="Project Description"
                value={editingData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="form-control mb-2"
                rows={3}
              />
              <input
                type="url"
                placeholder="Project URL (optional)"
                value={editingData.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="form-control mb-2"
              />
              <select
                value={editingData.type || 'project'}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="form-control mb-2"
              >
                <option value="project">Project</option>
                <option value="website">Website</option>
                <option value="app">Application</option>
                <option value="design">Design</option>
              </select>
              <div className="edit-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleSave(index)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="portfolio-display">
              <h5>{item.title}</h5>
              {item.description && <p>{item.description}</p>}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                  View Project
                </a>
              )}
              {isEditing && (
                <div className="portfolio-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(index, item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {isEditing && (
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
      )}
    </div>
  );
};

export default AddPortfolio;
