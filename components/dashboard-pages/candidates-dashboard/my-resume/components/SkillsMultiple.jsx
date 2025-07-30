
'use client'

import Select from "react-select";
import { useState, useEffect } from "react";

const SkillsMultiple = ({ selectedResume, isEditing, updateResumeSection }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Initialize skills from selectedResume
  useEffect(() => {
    if (selectedResume?.skills) {
      const skillsOptions = selectedResume.skills.map((skill) => ({
        value: skill,
        label: skill
      }));
      setSelectedSkills(skillsOptions);
    }
  }, [selectedResume]);

  const handleSkillsChange = (newValue) => {
    setSelectedSkills(newValue || []);
    const skillsArray = (newValue || []).map(option => option.value);
    updateResumeSection('skills', skillsArray);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newSkill = { value: inputValue.trim(), label: inputValue.trim() };
      const updatedSkills = [...selectedSkills, newSkill];
      setSelectedSkills(updatedSkills);
      const skillsArray = updatedSkills.map(option => option.value);
      updateResumeSection('skills', skillsArray);
      setInputValue('');
      event.preventDefault();
    }
  };

  const customOption = ({ innerProps, isDisabled }) => {
    if (isDisabled) return null;
    return (
      <div {...innerProps} className="custom-option">
        <span>Press Enter to add "{inputValue}"</span>
      </div>
    );
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <Select
            value={selectedSkills}
            onChange={handleSkillsChange}
            isMulti
            name="skills"
            options={selectedSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Type and press Enter to add skills..."
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            components={{
              Option: customOption
            }}
            isClearable
            isSearchable
            createOptionPosition="first"
          />
          <small className="text-muted">
            Type a skill and press Enter to add it to your resume
          </small>
        </div>
      ) : (
        <div className="skills-display">
          {selectedResume?.skills?.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
          {(!selectedResume?.skills || selectedResume.skills.length === 0) && (
            <span className="text-muted">No skills added</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsMultiple;
