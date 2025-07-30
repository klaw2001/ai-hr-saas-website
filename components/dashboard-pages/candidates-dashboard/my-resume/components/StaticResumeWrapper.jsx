'use client'
import React, { useState, useEffect } from 'react'
import SkillsMultiple from './SkillsMultiple'
import Education from './Education'
import Experiences from './Experiences'
import AddPortfolio from './AddPortfolio'
import Awards from './Awards'
import ResumePreview from './ResumePreview'

const StaticResumeWrapper = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [summary, setSummary] = useState(selectedResume?.summary || '');

  useEffect(() => {
    setSummary(selectedResume?.summary || '');
  }, [selectedResume]);

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    updateResumeSection('summary', newSummary);
  };

  // If not editing, show the professional preview
  if (!isEditing) {
    return <ResumePreview resume={selectedResume} />;
  }

  // If editing, show the form-based editing interface
  return (
    <>
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea 
            placeholder="Enter your summary"
            value={summary}
            onChange={handleSummaryChange}
            rows={4}
          ></textarea>
        </div>
        {/* <!-- About Company --> */}

        <div className="form-group col-lg-12 col-md-12">
          <Education 
            selectedResume={selectedResume} 
            isEditing={isEditing}
            updateResumeSection={updateResumeSection}
          />
          {/* <!-- Resume / Education --> */}

          <Experiences 
            selectedResume={selectedResume} 
            isEditing={isEditing}
            updateResumeSection={updateResumeSection}
          />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio 
            selectedResume={selectedResume} 
            isEditing={isEditing}
            updateResumeSection={updateResumeSection}
          />
        </div>
        {/* <!-- End more portfolio upload --> */}

        <div className="form-group col-lg-12 col-md-12">
          {/* <!-- Resume / Awards --> */}
          <Awards 
            selectedResume={selectedResume} 
            isEditing={isEditing}
            updateResumeSection={updateResumeSection}
          />
        </div>
        {/* <!-- End Award --> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple 
            selectedResume={selectedResume} 
            isEditing={isEditing}
            updateResumeSection={updateResumeSection}
          />
        </div>
        {/* <!-- Multi Selectbox --> */}
    </>
  )
}

export default StaticResumeWrapper