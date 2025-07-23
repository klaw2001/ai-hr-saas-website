"use client";
import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import JobseekerServices from "@/apiServices/JobseekerServices";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "../header/DashboardCandidatesSidebar";
import BreadCrumb from "../dashboard-pages/BreadCrumb";

const examplePrompts = [
  "I'm Rahul Mehta, a full-stack developer based in Bangalore. I have 4 years of experience working with JavaScript, React, Node.js, and PostgreSQL. I currently work at TuringTech since 2022, where I built a scalable dashboard system for managing client analytics. Before that, I was at DevCrate from 2020 to 2022 as a junior developer. I completed my B.Tech in Computer Engineering from VIT in 2019. I’ve also built a personal budgeting app using Next.js and Firebase. My key skills include React, Node.js, Git, Docker, and AWS. I’m certified in AWS Developer Associate. You can reach me at rahul.m@email.com or 9876543210.",
  "My name is Ayesha Khan. I’ve been working in digital marketing for over 6 years, currently employed as a Marketing Manager at BrandNest since 2021. I specialize in SEO, PPC, and social media growth. Before that, I worked at BuzzLabs as a content strategist from 2018 to 2021. I hold an MBA in Marketing from NMIMS, completed in 2017. Some of my notable projects include growing an e-commerce Instagram page from 5K to 100K followers in 9 months. My tools include Google Ads, SEMrush, Meta Ads, and HubSpot. I'm also HubSpot Inbound Certified. I live in Mumbai and can be contacted at ayesha.khan@gmail.com, 9812345678.",
  "Hi, I’m Saurabh Jain, a recent graduate with a BSc in Statistics from Delhi University, batch of 2023. I’m passionate about data analytics and visualization. During my college years, I interned at AnalytIQ where I worked on customer churn prediction using Python and Excel. I also completed a capstone project on analyzing COVID-19 data trends using Tableau. I’m proficient in SQL, Python, Excel, and Tableau. I’ve completed the Google Data Analytics Certificate. I’m currently looking for junior data analyst roles in Delhi NCR. You can reach me at saurabh.jain@email.com or 9898989898.",
];

const templates = [
  {
    key: "modern",
    label: "Modern",
    description: "Clean and contemporary design",
    img: "/images/templates/modern.png", // Use your own image paths or placeholder
  },
  {
    key: "classic",
    label: "Classic",
    description: "Traditional and professional",
    img: "/images/templates/classic.png",
  },
  {
    key: "creative",
    label: "Creative",
    description: "Unique and eye-catching",
    img: "/images/templates/creative.png",
  },
];

const RESUME_SECTIONS = [
  { key: 'summary', label: 'Professional Summary' },
  { key: 'experience', label: 'Work Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Technical Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
];

function ResumePreview({ resume, onEditSection, showTopEdit, onTopEdit, onTopConfirm }) {
  if (!resume) return null;
  return (
    <div style={{ background: "#fff", padding: 32, position: 'relative' }}>
      {showTopEdit && (
        <div style={{ position: 'absolute', top: 16, right: 24, zIndex: 2, display: 'flex', gap: 8 }}>
          <button onClick={onTopEdit} style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: 6, border: '1px solid #2d6cdf', background: '#f4f8ff', color: '#2d6cdf', fontWeight: 600 }}>Edit</button>
          <button onClick={onTopConfirm} style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: 6, border: '1px solid #16a34a', background: '#f0fdf4', color: '#16a34a', fontWeight: 600 }}>Confirm</button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontWeight: 700, fontSize: 36 }}>{resume.full_name}</h1>
        
      </div>
      <div style={{ color: "#444", marginBottom: 16 }}>
        <span>{resume.email}</span> &nbsp;|&nbsp;
        <span>{resume.phone}</span> &nbsp;|&nbsp;
        <span>{resume.location}</span>
        
      </div>
      <hr style={{ margin: "24px 0" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Professional Summary
        </h2>
        
      </div>
      <div style={{ marginBottom: 24 }}>{resume.summary}</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Work Experience
        </h2>
      </div>
      {resume.experience &&
        resume.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>{exp.company}</div>
            <div style={{ color: "#888", fontSize: 15 }}>{exp.duration}</div>
            <ul>
              {exp.description &&
                exp.description
                  .split("\n")
                  .map((line, idx) => <li key={idx}>{line}</li>)}
            </ul>
          </div>
        ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Education
        </h2>
      </div>
      {resume.education &&
        resume.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>{edu.institution}</div>
            <div style={{ color: "#888", fontSize: 15 }}>{edu.duration}</div>
            <div>{edu.course}</div>
          </div>
        ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Technical Skills
        </h2>
        
      </div>
      <div style={{ marginBottom: 24 }}>
        {resume.skills &&
          resume.skills.map((skill, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                background: "#e0e7ff",
                color: "#2563eb",
                borderRadius: 8,
                padding: "4px 12px",
                margin: "0 8px 8px 0",
                fontSize: 15,
              }}
            >
              {skill}
            </span>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Projects
        </h2>
        
      </div>
      {resume.projects &&
        resume.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>{proj.name}</div>
            <div>{proj.description}</div>
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                {proj.link}
              </a>
            )}
          </div>
        ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
          Certifications
        </h2>
      </div>
      <div>
        {resume.certifications &&
          resume.certifications.map((cert, i) => <div key={i}>{cert}</div>)}
      </div>
    </div>
  );
}

const ResumeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeHtml, setResumeHtml] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editSection, setEditSection] = useState(null); // { section, currentText, tagLabel }
  const [editPrompt, setEditPrompt] = useState("");
  const [resumeJson, setResumeJson] = useState(null);
  const [score, setScore] = useState(0);
  const [logId, setLogId] = useState(null);
  const [scoreReason, setScoreReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [templateAccordionOpen, setTemplateAccordionOpen] = useState(true);
  const [showTopEdit, setShowTopEdit] = useState(true);
  const [bulkEditSection, setBulkEditSection] = useState(null); // { section, currentText, tagLabel }
  const [bulkEditPrompt, setBulkEditPrompt] = useState("");
  const [showBulkEditPopup, setShowBulkEditPopup] = useState(false);

  const handleScoreResume = async () => {
    const response = await JobseekerServices.scoreResume({ logId });
    setScore(response.data.data.score);
    setScoreReason(response.data.data.reason);
  };
  const handleGenerate = async () => {
    setIsGenerating(true);
    setResumeHtml("");
    setResumeJson(null);

    // const response = await JobseekerServices.generateResume({ prompt });

    const responseArray = await JobseekerServices.generateResumeArray({
      prompt,
    });

    // const data = await response.data;
    const dataArray = await responseArray.data.data;
    // setResumeHtml(data.html);
    setResumeJson(dataArray.resume);
    setLogId(dataArray.log_id);
    setIsGenerating(false);
    handleScoreResume();
  };

  const handlePdfDownload = async () => {
    try {
      const response = await JobseekerServices.downloadResume({ resumeJson });
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
      } else {
        alert("Failed to generate PDF. Please try again.");
        console.error("Download Error:", result.message || result);
      }
    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("Something went wrong while downloading the PDF.");
    }
  };

  const handleEditSection = (section, currentText, tagLabel) => {
    setEditSection({ section, currentText, tagLabel });
    setEditPrompt("");
    setShowPopup(true);
  };

  const handleSaveEdit = async () => {
    if (!resumeJson || !editSection?.section) {
      alert("Missing resume data or section.");
      return;
    }
    try {
      const response = await JobseekerServices.updateResumeSection({
        section: editSection.section,
        prompt: editPrompt,
        currentResume: resumeJson,
      });
      // Assume backend returns updated resume JSON
      if (response.data.status) {
        setResumeJson(response.data.data.resume);
        setShowPopup(false);
        setEditSection(null);
        setEditPrompt("");
      }
    } catch (err) {
      alert("Failed to update section. Try again.");
    }
  };

  const handleBulkEdit = () => {
    setBulkEditSection(null);
    setBulkEditPrompt("");
    setShowBulkEditPopup(true);
  };

  const handleBulkSectionChange = (e) => {
    const sectionKey = e.target.value;
    const sectionMeta = RESUME_SECTIONS.find(s => s.key === sectionKey);
    let currentText = null;
    if (resumeJson) {
      if (sectionKey === 'summary') currentText = resumeJson.summary;
      else if (sectionKey === 'experience') currentText = resumeJson.experience;
      else if (sectionKey === 'education') currentText = resumeJson.education;
      else if (sectionKey === 'skills') currentText = resumeJson.skills;
      else if (sectionKey === 'projects') currentText = resumeJson.projects;
      else if (sectionKey === 'certifications') currentText = resumeJson.certifications;
    }
    setBulkEditSection({ section: sectionKey, tagLabel: sectionMeta.label, currentText });
    setBulkEditPrompt("");
  };

  const handleBulkSaveEdit = async () => {
    if (!resumeJson || !bulkEditSection?.section) {
      alert("Missing resume data or section.");
      return;
    }
    try {
      const response = await JobseekerServices.updateResumeSection({
        section: bulkEditSection.section,
        prompt: bulkEditPrompt,
        currentResume: resumeJson,
      });
      if (response.data.status) {
        setResumeJson(response.data.data.resume);
        setShowBulkEditPopup(false);
        setBulkEditSection(null);
        setBulkEditPrompt("");
      }
    } catch (err) {
      alert("Failed to update section. Try again.");
    }
  };

  const handleBulkCancel = () => {
    setShowBulkEditPopup(false);
    setBulkEditSection(null);
    setBulkEditPrompt("");
  };

  const handleTopConfirm = async () => {
    try {
      const response = await JobseekerServices.saveResume({ resume_obj: JSON.stringify(resumeJson) });
      if (response.data && response.data.status) {
        toast.success('Resume saved successfully!');
        setShowTopEdit(false); // Optionally hide edit mode
      } else {
        alert('Failed to save resume.');
      }
    } catch (err) {
      toast.error('Error saving resume.');
    }
  };

  return (
    <div>
      <DashboardCandidatesHeader />
      {/* <DashboardCandidatesSidebar /> */}
      <div style={{ margin: "5rem", background: "#fff", overflow: "hidden" }}>
        <div style={{ display: "flex", minHeight: 600 }}>
          {/* Left column */}
          <div
            style={{
              flex: "0 0 350px",
              borderRight: "1px solid #eee",
              padding: "2rem",
            }}
          >
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Generate Resume</h2>
            <label
              style={{ fontWeight: 500, marginBottom: 8, display: "block" }}
            >
              Describe your background and desired position
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., I'm a software engineer with 3 years experience in React, Node.js, and AWS. I want to apply for senior developer positions..."
              maxLength={500}
              rows={5}
              style={{
                width: "100%",
                marginBottom: 12,
                borderRadius: 6,
                border: "1px solid #ccc",
                padding: 10,
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "#2d6cdf",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 24,
                cursor: isGenerating ? "not-allowed" : "pointer",
              }}
            >
              {isGenerating ? "Generating..." : "Generate Resume"}
            </button>
            <div>
              <div style={{ fontWeight: 500, marginBottom: 8 }}>
                Example prompts:
              </div>
              {examplePrompts.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "#f3f6fa",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 12px",
                    marginBottom: 8,
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 32, color: "#888", fontSize: 15 }}>
              <div>Resume Score: {score}</div>
              {scoreReason && (
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "none",
                    color: "#007bff",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "inherit",
                  }}
                  onClick={async () => {
                    setShowReasonModal(true);
                  }}
                >
                  Why?
                </button>
              )}
            </div>
          </div>
          {/* Right column */}
          <div style={{ flex: 1, padding: "2rem" }}>
            {/* Template Selector Accordion */}
            {/* <div style={{
              marginBottom: 32,
              background: "#fafbfc",
              borderRadius: 12,
              border: "1px solid #eee",
              overflow: "hidden"
            }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "2rem",
                  borderBottom: templateAccordionOpen ? "1px solid #eee" : "none",
                  userSelect: "none"
                }}
                onClick={() => setTemplateAccordionOpen((open) => !open)}
              >
                <h5 style={{ margin: 0, flex: 1 }}>Select Template</h5>
                <span style={{ fontSize: 22, color: "#2d6cdf", transition: "transform 0.2s", transform: templateAccordionOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                  ▶
                </span>
              </div>
              <div
                style={{
                  maxHeight: templateAccordionOpen ? 500 : 0,
                  transition: "max-height 0.3s cubic-bezier(.4,0,.2,1)",
                  overflow: "hidden",
                  padding: templateAccordionOpen ? "2rem" : "0 2rem",
                  background: templateAccordionOpen ? "#fafbfc" : "#fafbfc"
                }}
              >
                {templateAccordionOpen && (
                  <div style={{ display: "flex", gap: 16 }}>
                    {templates.map((tpl) => (
                      <div
                        key={tpl.key}
                        onClick={() => setSelectedTemplate(tpl.key)}
                        style={{
                          flex: 1,
                          border: selectedTemplate === tpl.key ? "2px solid #2d6cdf" : "1px solid #ddd",
                          borderRadius: 10,
                          background: selectedTemplate === tpl.key ? "#f4f8ff" : "#fff",
                          cursor: "pointer",
                          padding: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          boxShadow: selectedTemplate === tpl.key ? "0 2px 8px #2d6cdf22" : "none"
                        }}
                      >
                        <img src={tpl.img} alt={tpl.label} style={{ width: 48, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 18 }}>{tpl.label}</div>
                          <div style={{ color: "#888", fontSize: 15 }}>{tpl.description}</div>
                        </div>
                        {selectedTemplate === tpl.key && (
                          <span style={{ marginLeft: "auto", color: "#2d6cdf", fontWeight: 700, fontSize: 20 }}>✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div> */}
            {/* Resume Preview */}
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Resume Preview</h2>
            <div
              style={{
                minHeight: 400,
                background: "#f7f9fb",
                border: "1px dashed #ccc",
                borderRadius: 8,
                position: "relative",
              }}
            >
              {!resumeJson ? (
                <div style={{ textAlign: "center", color: "#bbb" }}>
                  <FaRegFileAlt size={48} style={{ marginBottom: 12 }} />
                  <div>Enter a prompt to generate your resume</div>
                </div>
              ) : (
                <ResumePreview
                  resume={resumeJson}
                  onEditSection={handleEditSection}
                  showTopEdit={showTopEdit}
                  onTopEdit={handleBulkEdit}
                  onTopConfirm={handleTopConfirm}
                />
              )}
            </div>
            {resumeHtml && (
              <button
                className="btn btn-success mt-3"
                onClick={handlePdfDownload}
              >
                Download Resume as PDF
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Edit Section Popup */}
      {showPopup && editSection && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => {
            setShowPopup(false);
            setEditSection(null);
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              maxWidth: 400,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Edit Section: {editSection.tagLabel}</h5>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 14 }}>
              <strong>Current:</strong>{" "}
              {Array.isArray(editSection.currentText) ? (
                editSection.section === "experience" ? (
                  <div>
                    {editSection.currentText.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div>
                          <b>Company:</b> {exp.company}
                        </div>
                        <div>
                          <b>Duration:</b> {exp.duration}
                        </div>
                        <div>
                          <b>Description:</b> {exp.description}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : editSection.section === "education" ? (
                  <div>
                    {editSection.currentText.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div>
                          <b>Institution:</b> {edu.institution}
                        </div>
                        <div>
                          <b>Duration:</b> {edu.duration}
                        </div>
                        <div>
                          <b>Course:</b> {edu.course}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : editSection.section === "projects" ? (
                  <div>
                    {editSection.currentText.map((proj, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div>
                          <b>Name:</b> {proj.name}
                        </div>
                        <div>
                          <b>Description:</b> {proj.description}
                        </div>
                        {proj.link && (
                          <div>
                            <b>Link:</b> {proj.link}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // For skills, certifications (array of strings)
                  <span>{editSection.currentText.join(", ")}</span>
                )
              ) : typeof editSection.currentText === "string" ? (
                editSection.currentText
              ) : (
                ""
              )}
            </div>
            <textarea
              className="form-control"
              rows={3}
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder={`Enter your prompt to update ${editSection.tagLabel}`}
            />
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <button
                className="btn btn-secondary me-2"
                onClick={() => {
                  setShowPopup(false);
                  setEditSection(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveEdit}
                disabled={!editPrompt.trim()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bulk Edit Popup */}
      {showBulkEditPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleBulkCancel}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 350,
              maxWidth: 420,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Edit Resume Section</h5>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="section-select" style={{ fontWeight: 500, marginBottom: 6, display: 'block' }}>Select Section</label>
              <select
                id="section-select"
                value={bulkEditSection?.section || ''}
                onChange={handleBulkSectionChange}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 10 }}
              >
                <option value="" disabled>Select a section...</option>
                {RESUME_SECTIONS.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
            {bulkEditSection && (
              <div style={{ marginBottom: 12, color: "#888", fontSize: 14 }}>
                <strong>Current:</strong>{" "}
                {Array.isArray(bulkEditSection.currentText) ? (
                  bulkEditSection.section === "experience" ? (
                    <div>
                      {bulkEditSection.currentText.map((exp, idx) => (
                        <div key={idx} style={{ marginBottom: 8 }}>
                          <div>
                            <b>Company:</b> {exp.company}
                          </div>
                          <div>
                            <b>Duration:</b> {exp.duration}
                          </div>
                          <div>
                            <b>Description:</b> {exp.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : bulkEditSection.section === "education" ? (
                    <div>
                      {bulkEditSection.currentText.map((edu, idx) => (
                        <div key={idx} style={{ marginBottom: 8 }}>
                          <div>
                            <b>Institution:</b> {edu.institution}
                          </div>
                          <div>
                            <b>Duration:</b> {edu.duration}
                          </div>
                          <div>
                            <b>Course:</b> {edu.course}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : bulkEditSection.section === "projects" ? (
                    <div>
                      {bulkEditSection.currentText.map((proj, idx) => (
                        <div key={idx} style={{ marginBottom: 8 }}>
                          <div>
                            <b>Name:</b> {proj.name}
                          </div>
                          <div>
                            <b>Description:</b> {proj.description}
                          </div>
                          {proj.link && (
                            <div>
                              <b>Link:</b> {proj.link}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // For skills, certifications (array of strings)
                    <span>{bulkEditSection.currentText.join(", ")}</span>
                  )
                ) : typeof bulkEditSection.currentText === "string" ? (
                  bulkEditSection.currentText
                ) : (
                  <span>No text to display for this section.</span>
                )}
              </div>
            )}
            <textarea
              className="form-control"
              rows={3}
              value={bulkEditPrompt}
              onChange={(e) => setBulkEditPrompt(e.target.value)}
              placeholder={`Enter your prompt to update ${bulkEditSection?.tagLabel || "this section"}`}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #ccc', padding: 8, marginBottom: 10 }}
              disabled={!bulkEditSection}
            />
            <div style={{ marginTop: 16, textAlign: "right", display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={handleBulkCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleBulkSaveEdit}
                disabled={!bulkEditPrompt.trim() || !bulkEditSection}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Score Reason Modal */}
      {showReasonModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
          }}
          onClick={() => setShowReasonModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              maxWidth: 400,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Score Reason</h5>
            <div style={{ marginBottom: 12, color: "#333", fontSize: 15 }}>
              {scoreReason}
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowReasonModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeGen;
