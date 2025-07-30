'use client'
import React, { useState } from 'react'

const Experiences = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (index, experience) => {
    setEditingIndex(index);
    setEditingData({ ...experience });
  };

  const handleSave = (index) => {
    const updatedExperience = [...(selectedResume?.experience || [])];
    updatedExperience[index] = editingData;
    updateResumeSection('experience', updatedExperience);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    const updatedExperience = [...(selectedResume?.experience || [])];
    updatedExperience.splice(index, 1);
    updateResumeSection('experience', updatedExperience);
  };

  const handleAddExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    const updatedExperience = [...(selectedResume?.experience || []), newExperience];
    updateResumeSection('experience', updatedExperience);
    setEditingIndex(updatedExperience.length - 1);
    setEditingData(newExperience);
  };

  const handleInputChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        {isEditing && (
          <button 
            type="button" 
            className="add-info-btn"
            onClick={handleAddExperience}
          >
            <span className="icon flaticon-plus"></span> Add Work
          </button>
        )}
      </div>
      
      {selectedResume?.experience?.map((experience, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">{experience.title?.charAt(0) || experience.company?.charAt(0) || 'E'}</span>
            <div className="title-box">
              <div className="info-box">
                {editingIndex === index ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={editingData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={editingData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2020-2023)"
                      value={editingData.duration || ''}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="form-control mb-2"
                    />
                    <textarea
                      placeholder="Job Description"
                      value={editingData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="form-control mb-2"
                      rows={4}
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
                    {experience.title && <h3>{experience.title}</h3>}
                    <span>{experience.company}</span>
                  </>
                )}
              </div>
              <div className="edit-box">
                {!isEditing || editingIndex === index ? (
                  <span className="year">{experience.duration}</span>
                ) : (
                  <div className="edit-btns">
                    <button
                      type="button"
                      onClick={() => handleEdit(index, experience)}
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
            {experience.description && (
              <div className="text">
                {experience.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
