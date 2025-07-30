'use client'
import React, { useState } from 'react'

const Awards = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (index, award) => {
    setEditingIndex(index);
    setEditingData({ ...award });
  };

  const handleSave = (index) => {
    const updatedAwards = [...(selectedResume?.awards || [])];
    updatedAwards[index] = editingData;
    updateResumeSection('awards', updatedAwards);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    const updatedAwards = [...(selectedResume?.awards || [])];
    updatedAwards.splice(index, 1);
    updateResumeSection('awards', updatedAwards);
  };

  const handleAddAward = () => {
    const newAward = {
      title: '',
      issuer: '',
      year: '',
      description: ''
    };
    const updatedAwards = [...(selectedResume?.awards || []), newAward];
    updateResumeSection('awards', updatedAwards);
    setEditingIndex(updatedAwards.length - 1);
    setEditingData(newAward);
  };

  const handleInputChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="resume-outer theme-yellow">
      <div className="upper-title">
        <h4>Awards & Certifications</h4>
        {isEditing && (
          <button 
            type="button" 
            className="add-info-btn"
            onClick={handleAddAward}
          >
            <span className="icon flaticon-plus"></span> Add Award
          </button>
        )}
      </div>
      
      {selectedResume?.awards?.map((award, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">{award.title?.charAt(0) || 'A'}</span>
            <div className="title-box">
              <div className="info-box">
                {editingIndex === index ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      placeholder="Award/Certification Title"
                      value={editingData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Issuing Organization"
                      value={editingData.issuer || ''}
                      onChange={(e) => handleInputChange('issuer', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Year (e.g., 2023)"
                      value={editingData.year || ''}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="form-control mb-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={editingData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-control mb-2"
                      rows={3}
                    />
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
                  <>
                    <h3>{award.title}</h3>
                    {award.issuer && <span>{award.issuer}</span>}
                  </>
                )}
              </div>
              <div className="edit-box">
                {!isEditing || editingIndex === index ? (
                  <span className="year">{award.year}</span>
                ) : (
                  <div className="edit-btns">
                    <button
                      type="button"
                      onClick={() => handleEdit(index, award)}
                    >
                      <span className="la la-pencil"></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="ms-2"
                    >
                      <span className="la la-trash"></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {award.description && (
              <div className="text">
                {award.description}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Display certifications if they exist */}
      {selectedResume?.certifications?.map((certification, index) => (
        <div className="resume-block" key={`cert-${index}`}>
          <div className="inner">
            <span className="name">{certification?.charAt(0) || 'C'}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{certification}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Awards;
