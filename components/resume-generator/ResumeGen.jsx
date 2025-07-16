"use client";
import React, { useState } from "react";
import axios from "axios";
import JobseekerServices from "@/apiServices/JobseekerServices";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "../header/DashboardCandidatesSidebar";
import BreadCrumb from "../dashboard-pages/BreadCrumb";

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

  const handleScoreResume = async () => {
    const response = await JobseekerServices.scoreResume({ logId });
    setScore(response.data.data.score);
    setScoreReason(response.data.data.reason);
  };
  const handleGenerate = async () => {
    setIsGenerating(true);
    setResumeHtml("");
    setResumeJson(null);

    const response = await JobseekerServices.generateResume({ prompt });

    const data = await response.data;

    setResumeHtml(data.html);
    setResumeJson(data.resume);
    setLogId(data.log_id);

    setIsGenerating(false);

    handleScoreResume();
  };

  const handlePdfDownload = async () => {
    try {
      const response = await JobseekerServices.downloadResume({ resumeJson });

      const result = await response.data;

      if (result.status && result.data.file) {
        const fileUrl = `http://localhost:8000${result.data.file}`;

        // Trigger download via hidden <a> tag
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
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardCandidatesHeader />

      <DashboardCandidatesSidebar />
      <div className="container my-5">
        <BreadCrumb title="Generate Resume with Prompt" />

        <p>
          Resume Score: {score}
          <br />
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
        </p>

        <form className="default-form">
          <div className="row">
            <div className="form-group col-lg-12 col-md-12">
              <label>Description</label>
              <textarea
                placeholder="Enter your prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
            </div>
          </div>
        </form>
        <button
          className="btn btn-primary my-4"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Resume"}
        </button>

        {/* Resume Preview Template */}
        <div
          className="border p-4 shadow-sm"
          style={{
            background: "#fff",
            minHeight: "400px",
            cursor: "pointer", // Use pointer as a fallback
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.cursor =
              'url("https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.2/src/svg/pencil-outline.svg") 12 12, pointer';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
          title="Click to edit"
        >
          <div
            onClick={(e) => {
              // Traverse up the DOM tree to find the element with data-section
              let target = e.target;
              let sectionEl = target.closest("[data-section]");
              if (!sectionEl) return;

              const sectionName = sectionEl.getAttribute("data-section");

              setClickedSection({
                section: sectionName,
                text: sectionEl.textContent,
                html: sectionEl.outerHTML,
              });

              setShowPopup(true);
            }}
            dangerouslySetInnerHTML={{ __html: resumeHtml }}
          />
        </div>

        {resumeHtml && (
          <button className="btn btn-success mt-3" onClick={handlePdfDownload}>
            Download Resume as PDF
          </button>
        )}

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

                    const response =
                      await JobseekerServices.updateResumeSection({
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
    </div>
  );
};

export default ResumeGen;
