"use client";
import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import JobseekerServices from "@/apiServices/JobseekerServices";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "../header/DashboardCandidatesSidebar";
import BreadCrumb from "../dashboard-pages/BreadCrumb";

const examplePrompts = [
  "Create a resume for a senior software engineer with 5 years experience in React and Node.js",
  "Generate a marketing manager resume with focus on digital marketing and campaign management",
  "Build a data scientist resume highlighting machine learning and Python expertise",
  "Create a project manager resume with Agile methodology and team leadership experience"
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

function ResumePreview({ resume }) {
  if (!resume) return null;
  return (
    <div style={{ background: "#fff", padding: 32 }}>
      <h1 style={{ fontWeight: 700, fontSize: 36 }}>{resume.full_name}</h1>
      <div style={{ color: "#444", marginBottom: 16 }}>
        <span>{resume.email}</span> &nbsp;|&nbsp;
        <span>{resume.phone}</span> &nbsp;|&nbsp;
        <span>{resume.location}</span>
      </div>
      <hr style={{ margin: "24px 0" }} />

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Professional Summary</h2>
      <div style={{ marginBottom: 24 }}>{resume.summary}</div>

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Work Experience</h2>
      {resume.experience && resume.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600 }}>{exp.company}</div>
          <div style={{ color: "#888", fontSize: 15 }}>{exp.duration}</div>
          <ul>
            {exp.description && exp.description.split('\n').map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Education</h2>
      {resume.education && resume.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600 }}>{edu.institution}</div>
          <div style={{ color: "#888", fontSize: 15 }}>{edu.duration}</div>
          <div>{edu.course}</div>
        </div>
      ))}

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Technical Skills</h2>
      <div style={{ marginBottom: 24 }}>
        {resume.skills && resume.skills.map((skill, i) => (
          <span key={i} style={{
            display: "inline-block",
            background: "#e0e7ff",
            color: "#2563eb",
            borderRadius: 8,
            padding: "4px 12px",
            margin: "0 8px 8px 0",
            fontSize: 15
          }}>{skill}</span>
        ))}
      </div>

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Projects</h2>
      {resume.projects && resume.projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600 }}>{proj.name}</div>
          <div>{proj.description}</div>
          {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>}
        </div>
      ))}

      <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>Certifications</h2>
      <div>
        {resume.certifications && resume.certifications.map((cert, i) => (
          <div key={i}>{cert}</div>
        ))}
      </div>
    </div>
  );
}

const ResumeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeHtml, setResumeHtml] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [resumeJson, setResumeJson] = useState(null);
  const [score, setScore] = useState(0);
  const [logId, setLogId] = useState(null);
  const [scoreReason, setScoreReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [templateAccordionOpen, setTemplateAccordionOpen] = useState(true);

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
    
    const responseArray = await JobseekerServices.generateResumeArray({ prompt });
    
    // const data = await response.data; 
    const dataArray = await responseArray.data.data;
    console.log(dataArray);
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

  return (
    <div >
      <DashboardCandidatesHeader />
      {/* <DashboardCandidatesSidebar /> */}
      <div style={{  margin: "5rem", background: "#fff", overflow: "hidden" }}>
        <div style={{ display: "flex", minHeight: 600 }}>
          {/* Left column */}
          <div style={{ flex: "0 0 350px", borderRight: "1px solid #eee", padding: "2rem" }}>
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Generate Resume</h2>
            <label style={{ fontWeight: 500, marginBottom: 8, display: "block" }}>
              Describe your background and desired position
            </label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="E.g., I'm a software engineer with 3 years experience in React, Node.js, and AWS. I want to apply for senior developer positions..."
              maxLength={500}
              rows={5}
              style={{ width: "100%", marginBottom: 12, borderRadius: 6, border: "1px solid #ccc", padding: 10 }}
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
                cursor: isGenerating ? "not-allowed" : "pointer"
              }}
            >
              {isGenerating ? "Generating..." : "Generate Resume"}
            </button>
            <div>
              <div style={{ fontWeight: 500, marginBottom: 8 }}>Example prompts:</div>
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
                    color: "#333"
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 32, color: '#888', fontSize: 15 }}>
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
            <div style={{
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
            </div>
            {/* Resume Preview */}
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Resume Preview</h2>
            <div style={{
              minHeight: 400,
              background: "#f7f9fb",
              border: "1px dashed #ccc",
              borderRadius: 8,
              position: "relative"
            }}>
              {!resumeJson ? (
                <div style={{ textAlign: "center", color: "#bbb" }}>
                  <FaRegFileAlt size={48} style={{ marginBottom: 12 }} />
                  <div>Enter a prompt to generate your resume</div>
                </div>
              ) : (
                <ResumePreview resume={resumeJson} />
              )}
            </div>
            {resumeHtml && (
              <button className="btn btn-success mt-3" onClick={handlePdfDownload}>
                Download Resume as PDF
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Edit Section Popup */}
      {showPopup && (
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
          onClick={() => setShowPopup(false)}
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
            <h5>Edit Section: {clickedSection?.tag}</h5>
            <div style={{ marginBottom: 12, color: "#888", fontSize: 14 }}>
              <strong>Current:</strong> {clickedSection?.text}
            </div>
            <textarea
              className="form-control"
              rows={3}
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (!resumeJson || !clickedSection?.section) {
                    alert("Missing resume data or section.");
                    return;
                  }
                  const response = await JobseekerServices.updateResumeSection({
                    section: clickedSection.section,
                    prompt: editPrompt,
                    currentResume: resumeJson,
                  });
                  const updatedHtml = await response.data;
                  setResumeHtml(updatedHtml);
                  setShowPopup(false);
                }}
              >
                Save
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
