'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ResumeGen = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [resumeHtml, setResumeHtml] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [clickedSection, setClickedSection] = useState(null);
    const [editPrompt, setEditPrompt] = useState('');
    const [resumeJson, setResumeJson] = useState(null);


    const handleGenerate = async () => {
        setIsGenerating(true);
        setResumeHtml('');
        setResumeJson(null);

        const response = await fetch('http://localhost:8000/api/jobseeker/profile/generate-resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        setResumeHtml(data.html);
        setResumeJson(data.resume);

        setIsGenerating(false);
    };

    const handlePdfDownload = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/jobseeker/profile/download-resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resumeJson }),
          });
      
          const result = await response.json();
      
          if (result.status && result.data.file) {
            const fileUrl = `http://localhost:8000${result.data.file}`;
      
            // Trigger download via hidden <a> tag
            const a = document.createElement('a');
            a.href = fileUrl;
            a.target = '_blank';
            a.download = 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            alert('Failed to generate PDF. Please try again.');
            console.error('Download Error:', result.message || result);
          }
        } catch (err) {
          console.error('PDF Download Error:', err);
          alert('Something went wrong while downloading the PDF.');
        }
      };
      


    return (
        <div className="container my-5">
            <h2 className="mb-4">Generate Resume with Prompt</h2>

            <div className="mb-3">
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe your background..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
            </div>

            <button className="btn btn-primary mb-4" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Resume'}
            </button>

            {/* Resume Preview Template */}
            <div
                className="border p-4 shadow-sm"
                style={{
                    background: '#fff',
                    minHeight: '400px',
                    cursor: 'pointer', // Use pointer as a fallback
                }}
                onMouseOver={e => {
                    e.currentTarget.style.cursor = 'url("https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.2/src/svg/pencil-outline.svg") 12 12, pointer';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.cursor = 'pointer';
                }}
                title="Click to edit"
            >
                <div
                    onClick={(e) => {
                        // Traverse up the DOM tree to find the element with data-section
                        let target = e.target;
                        let sectionEl = target.closest('[data-section]');
                        if (!sectionEl) return;

                        const sectionName = sectionEl.getAttribute('data-section');

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
                <button
                    className="btn btn-success mt-3"
                    onClick={handlePdfDownload}
                >
                    Download Resume as PDF
                </button>
            )}

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: 24,
                            borderRadius: 8,
                            minWidth: 300,
                            maxWidth: 400,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h5>Edit Section: {clickedSection?.tag}</h5>
                        <div style={{ marginBottom: 12, color: '#888', fontSize: 14 }}>
                            <strong>Current:</strong> {clickedSection?.text}
                        </div>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={editPrompt}
                            onChange={e => setEditPrompt(e.target.value)}
                        />
                        <div style={{ marginTop: 16, textAlign: 'right' }}>
                            <button className="btn btn-secondary me-2" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={async () => {
                                    if (!resumeJson || !clickedSection?.section) {
                                        alert("Missing resume data or section.");
                                        return;
                                    }

                                    const response = await fetch('http://localhost:8000/api/jobseeker/profile/update-resume-section', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            section: clickedSection.section,
                                            prompt: editPrompt,
                                            currentResume: resumeJson,
                                        }),
                                    });

                                    const updatedHtml = await response.text();
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
        </div>
    );
};

export default ResumeGen;
