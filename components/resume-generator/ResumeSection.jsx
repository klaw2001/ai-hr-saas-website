'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ResumeSection = ({ section, content, setResume }) => {
  const [editing, setEditing] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');

  const handleUpdate = async () => {
    try {
      const res = await axios.post('/api/updateResumeSection', {
        section,
        prompt: newPrompt
      });
      if (res.data.success) {
        setResume(prev => ({
          ...prev,
          [section]: res.data.data.updatedSection
        }));
      }
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update section.');
    }
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title text-capitalize">{section}</h5>

        {!editing ? (
          <>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {Array.isArray(content) ? JSON.stringify(content, null, 2) : content}
            </pre>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditing(true)}>
              Edit Section
            </button>
          </>
        ) : (
          <>
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder={`Enter prompt to update ${section}`}
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
            />
            <button className="btn btn-sm btn-success me-2" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn btn-sm btn-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
