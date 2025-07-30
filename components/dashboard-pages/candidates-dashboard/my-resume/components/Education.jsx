'use client'
import React, { useState } from 'react'

const Education = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (index, education) => {
    setEditingIndex(index);
    setEditingData({ ...education });
  };

  const handleSave = (index) => {
    const updatedEducation = [...(selectedResume?.education || [])];
    updatedEducation[index] = editingData;
    updateResumeSection('education', updatedEducation);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    const updatedEducation = [...(selectedResume?.education || [])];
    updatedEducation.splice(index, 1);
    updateResumeSection('education', updatedEducation);
  };

  const handleAddEducation = () => {
    const newEducation = {
      course: '',
      institution: '',
      duration: '',
      description: ''
    };
    const updatedEducation = [...(selectedResume?.education || []), newEducation];
    updateResumeSection('education', updatedEducation);
    setEditingIndex(updatedEducation.length - 1);
    setEditingData(newEducation);
  };

  const handleInputChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        {isEditing && (
          <button 
            type="button" 
            className="add-info-btn"
            onClick={handleAddEducation}
          >
            <span className="icon flaticon-plus"></span> Add Education
          </button>
        )}
      </div>
      
      {selectedResume?.education?.map((education, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">{education.course?.charAt(0) || 'E'}</span>
            <div className="title-box">
              <div className="info-box">
                {editingIndex === index ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      placeholder="Course/Degree"
                      value={editingData.course || ''}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={editingData.institution || ''}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2018-2022)"
                      value={editingData.duration || ''}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
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
                    <h3>{education.course}</h3>
                    <span>{education.institution}</span>
                  </>
                )}
              </div>
              <div className="edit-box">
                {!isEditing || editingIndex === index ? (
                  <span className="year">{education.duration}</span>
                ) : (
                  <div className="edit-btns">
                    <button
                      type="button"
                      onClick={() => handleEdit(index, education)}
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
            {education.description && (
              <div className="text">
                {education.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
