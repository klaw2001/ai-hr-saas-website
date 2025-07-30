

'use client'

import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import JobseekerServices from "@/apiServices/JobseekerServices";
import { useEffect, useState } from "react";
import StaticResumeWrapper from "./StaticResumeWrapper";
import { toast } from "react-toastify";
import ResumePreview from "./ResumePreview";
import { useRouter } from "next/navigation";

const index = () => {
  const [savedResumes, setSavedResumes] = useState([
    
  ]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editableResume, setEditableResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSavedResumes = async () => {
      const response = await JobseekerServices.getAllSavedResumes();
      if(response.data.status){
        setSavedResumes([{ jr_id: "", jr_name: "Select resume" }, ...response.data.data]);
      }
    };
    fetchSavedResumes();
  }, []);

  const handleSelectResume = async (id) => {
    if (!id) {
      setSelectedResume(null);
      setEditableResume(null);
      setSelectedResumeId("");
      return;
    }
    
    const response = await JobseekerServices.getSingleSavedResume(id);
    if(response.data.status){
      const resumeJson = JSON.parse(response.data.data.jr_resume_obj);
      setSelectedResume(resumeJson);
      setEditableResume(JSON.parse(JSON.stringify(resumeJson))); // Create a deep copy for editing
      setSelectedResumeId(id);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // When entering edit mode, create a fresh copy
      setEditableResume(JSON.parse(JSON.stringify(selectedResume)));
    }
  };

  
  const handleSave = async () => {
    if (!selectedResumeId || !editableResume) return;
    
    setIsSaving(true);
    try {
      const payload = {
        jr_id: selectedResumeId,
        jr_resume_obj: JSON.stringify(editableResume)
      };
      
      const response = await JobseekerServices.updateSavedResumeManually(payload);
      if (response.data.status) {
        setSelectedResume(editableResume);
        setIsEditing(false);
        toast.success("Resume updated successfully!");
      } else {
        toast.error("Failed to update resume. Please try again.");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Error saving resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableResume(JSON.parse(JSON.stringify(selectedResume))); // Reset to original
  };

  const handlePreviewToggle = () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume first");
      return;
    }
    router.push(`/candidates-dashboard/my-resume/preview?id=${selectedResumeId}`);
  };

  const generateProfessionalHTML = (resume) => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resume.full_name || 'Resume'}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 32px;
            background: #fff;
            color: #333;
            line-height: 1.6;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
          }
          .name {
            font-weight: 700;
            font-size: 36px;
            color: #333;
            margin: 0;
          }
          .contact-info {
            color: #444;
            margin-bottom: 16px;
            font-size: 16px;
          }
          .contact-info span {
            margin-right: 16px;
          }
          hr {
            margin: 24px 0;
            border: none;
            border-top: 1px solid #e5e7eb;
          }
          .section-header {
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 8px;
            font-weight: 600;
          }
          .section-content {
            margin-bottom: 24px;
          }
          .experience-item, .education-item, .project-item, .award-item {
            margin-bottom: 16px;
          }
          .company-name, .institution-name, .project-name, .award-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
          }
          .duration, .course {
            color: #888;
            font-size: 15px;
            margin-bottom: 8px;
          }
          .description {
            margin-top: 8px;
          }
          .description ul {
            margin: 8px 0;
            padding-left: 20px;
          }
          .description li {
            margin-bottom: 4px;
          }
          .skills-container {
            margin-bottom: 24px;
          }
          .skill-tag {
            display: inline-block;
            background: #e0e7ff;
            color: #2563eb;
            border-radius: 8px;
            padding: 4px 12px;
            margin: 0 8px 8px 0;
            font-size: 15px;
          }
          .link {
            color: #2563eb;
            text-decoration: none;
          }
          .link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${resume.full_name || 'Your Name'}</h1>
        </div>
        
        <div class="contact-info">
          <span>${resume.email || 'email@example.com'}</span>
          <span>${resume.phone || 'Phone Number'}</span>
          <span>${resume.location || 'Location'}</span>
        </div>
        
        <hr>
        
        ${resume.summary ? `
          <div class="section-content">
            <h2 class="section-header">Professional Summary</h2>
            <div>${resume.summary}</div>
          </div>
        ` : ''}
        
        ${resume.experience && resume.experience.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Work Experience</h2>
            ${resume.experience.map(exp => `
              <div class="experience-item">
                <div class="company-name">${exp.company || exp.title || 'Company'}</div>
                <div class="duration">${exp.duration || ''}</div>
                ${exp.description ? `
                  <div class="description">
                    <ul>
                      ${exp.description.split('\n').map(line => `<li>${line}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resume.education && resume.education.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Education</h2>
            ${resume.education.map(edu => `
              <div class="education-item">
                <div class="institution-name">${edu.institution || ''}</div>
                <div class="duration">${edu.duration || ''}</div>
                <div class="course">${edu.course || ''}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resume.skills && resume.skills.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Technical Skills</h2>
            <div class="skills-container">
              ${resume.skills.map(skill => `
                <span class="skill-tag">${skill}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${resume.projects && resume.projects.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Projects</h2>
            ${resume.projects.map(proj => `
              <div class="project-item">
                <div class="project-name">${proj.name || ''}</div>
                <div class="description">${proj.description || ''}</div>
                ${proj.link ? `<a href="${proj.link}" class="link" target="_blank">${proj.link}</a>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resume.portfolio && resume.portfolio.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Portfolio</h2>
            ${resume.portfolio.map(item => `
              <div class="project-item">
                <div class="project-name">${item.title || ''}</div>
                <div class="description">${item.description || ''}</div>
                ${item.url ? `<a href="${item.url}" class="link" target="_blank">${item.url}</a>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resume.awards && resume.awards.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Awards & Certifications</h2>
            ${resume.awards.map(award => `
              <div class="award-item">
                <div class="award-title">${award.title || ''}</div>
                ${award.issuer ? `<div class="duration">${award.issuer}</div>` : ''}
                ${award.year ? `<div class="duration">${award.year}</div>` : ''}
                ${award.description ? `<div class="description">${award.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resume.certifications && resume.certifications.length > 0 ? `
          <div class="section-content">
            <h2 class="section-header">Certifications</h2>
            ${resume.certifications.map(cert => `
              <div class="award-item">
                <div>${cert}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </body>
      </html>
    `;
    
    return html;
  };

  const handleDownload = async () => {
    if (!selectedResume) {
      toast.error("No resume selected for download");
      return;
    }

    setIsDownloading(true);
    try {
      // Generate professional HTML template
      const professionalHTML = generateProfessionalHTML(selectedResume);
      
      // Try the new styled endpoint first
      let response;
      try {
        response = await JobseekerServices.downloadResumeWithStyling({ 
          resumeJson: selectedResume,
          htmlTemplate: professionalHTML
        });
      } catch (error) {
        // If the new endpoint doesn't exist, fall back to the original endpoint
        console.log("Styled endpoint not available, using fallback");
        response = await JobseekerServices.downloadResume({ resumeJson: selectedResume });
      }
      
      const result = await response.data;
      
      if (result.status && result.data.file) {
        const fileUrl = `http://localhost:8000${result.data.file}`;
        const a = document.createElement("a");
        a.href = fileUrl;
        a.target = "_blank";
        a.download = "resume.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("Resume downloaded successfully!");
      } else {
        toast.error("Failed to generate PDF. Please try again.");
        console.error("Download Error:", result.message || result);
      }
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Something went wrong while downloading the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const updateResumeSection = (section, data) => {
    if (!editableResume) return;
    
    setEditableResume(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="default-form resume-editor" onClick={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Select Your CV</label>
          <select 
            className="chosen-single form-select" 
            value={selectedResumeId}
            onChange={(e) => handleSelectResume(e.target.value)}
          >
            {savedResumes.map((resume) => (
              <option key={resume.jr_id} value={resume.jr_id}>
                {resume.jr_name}
              </option>
            ))}
          </select>
        </div>

        {selectedResume && (
          <div className="form-group col-lg-6 col-md-12">
            <div className="d-flex justify-content-end">
              {!isEditing ? (
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="theme-btn btn-style-one"
                    onClick={handlePreviewToggle}
                  >
                    <span className="icon flaticon-eye"></span> Preview Resume
                  </button>
                  <button 
                    type="button" 
                    className="theme-btn btn-download"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      "Downloading..."
                    ) : (
                      <>
                        <span className="icon flaticon-download"></span> Download PDF
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="theme-btn btn-style-one"
                    onClick={handleEditToggle}
                  >
                    Edit Resume
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="theme-btn btn-style-two"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="theme-btn btn-style-one"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedResume ? (
          <div>
            <StaticResumeWrapper 
              selectedResume={isEditing ? editableResume : selectedResume}
              isEditing={isEditing}
              updateResumeSection={updateResumeSection}
            />
          </div>
        ) : (
          <div className="col-lg-12 col-md-12 text-center mt-5">
            <h3>No resume selected</h3>
            <p>Please select a resume to view the details</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default index;
