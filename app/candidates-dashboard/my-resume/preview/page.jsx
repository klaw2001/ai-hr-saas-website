'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import JobseekerServices from '@/apiServices/JobseekerServices'
import DashboardCandidatesHeader from '@/components/header/DashboardCandidatesHeader'
import BreadCrumb from '@/components/dashboard-pages/BreadCrumb'
import { toast } from 'react-toastify'

const ResumePreviewPage = () => {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('id')
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResume = async () => {
      if (!resumeId) {
        toast.error('No resume ID provided')
        return
      }

      try {
        const response = await JobseekerServices.getSingleSavedResume(resumeId)
        if (response.data.status) {
          const resumeJson = JSON.parse(response.data.data.jr_resume_obj)
          setResume(resumeJson)
        } else {
          toast.error('Failed to load resume')
        }
      } catch (error) {
        console.error('Error fetching resume:', error)
        toast.error('Error loading resume')
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
  }, [resumeId])

  if (loading) {
    return (
      <div>
        <DashboardCandidatesHeader />
        <div className="dashboard-content">
          <div className="container">
            <BreadCrumb title="Resume Preview" />
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading resume preview...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div>
        <DashboardCandidatesHeader />
        <div className="dashboard-content">
          <div className="container">
            <BreadCrumb title="Resume Preview" />
            <div className="text-center py-5">
              <h3>Resume not found</h3>
              <p>The requested resume could not be loaded.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* <DashboardCandidatesHeader /> */}
      <div className="dashboard-content">
        <div className="container">
          {/* <BreadCrumb title="Resume Preview" /> */}
          
          <div className="resume-preview-page">
            <div className="preview-header">
              <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Resume Preview</h2>
                <div className="preview-actions">
                  <button 
                    className="btn btn-outline-primary me-2"
                    onClick={() => window.print()}
                  >
                    <span className="icon flaticon-printer"></span> Print
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.history.back()}
                  >
                    <span className="icon flaticon-arrow-left"></span> Back
                  </button>
                </div>
              </div>
            </div>
            
            <div className="resume-preview-container">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="resume-preview" style={{ background: "#fff", padding: 32, position: 'relative' }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontWeight: 700, fontSize: 36 }}>{resume.full_name || 'Your Name'}</h1>
      </div>
      
      <div style={{ color: "#444", marginBottom: 16 }}>
        <span>{resume.email || 'email@example.com'}</span> &nbsp;|&nbsp;
        <span>{resume.phone || 'Phone Number'}</span> &nbsp;|&nbsp;
        <span>{resume.location || 'Location'}</span>
      </div>
      
      <hr style={{ margin: "24px 0" }} />
      
      {resume.summary && (
        <>
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
        </>
      )}

      {resume.experience && resume.experience.length > 0 && (
        <>
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
          {resume.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>{exp.company || exp.title}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{exp.duration}</div>
              {exp.description && (
                <ul>
                  {exp.description
                    .split("\n")
                    .map((line, idx) => <li key={idx}>{line}</li>)}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {resume.education && resume.education.length > 0 && (
        <>
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
          {resume.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>{edu.institution}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{edu.duration}</div>
              <div>{edu.course}</div>
            </div>
          ))}
        </>
      )}

      {resume.skills && resume.skills.length > 0 && (
        <>
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
            {resume.skills.map((skill, i) => (
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
        </>
      )}

      {resume.projects && resume.projects.length > 0 && (
        <>
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
          {resume.projects.map((proj, i) => (
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
        </>
      )}

      {resume.portfolio && resume.portfolio.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
              Portfolio
            </h2>
          </div>
          {resume.portfolio.map((item, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div>{item.description}</div>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              )}
            </div>
          ))}
        </>
      )}

      {resume.awards && resume.awards.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ color: "#2563eb", fontSize: 22, marginBottom: 8 }}>
              Awards & Certifications
            </h2>
          </div>
          {resume.awards.map((award, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>{award.title}</div>
              {award.issuer && <div style={{ color: "#888", fontSize: 15 }}>{award.issuer}</div>}
              {award.year && <div style={{ color: "#888", fontSize: 15 }}>{award.year}</div>}
              {award.description && <div>{award.description}</div>}
            </div>
          ))}
        </>
      )}

      {resume.certifications && resume.certifications.length > 0 && (
        <>
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
            {resume.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>{cert}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResumePreviewPage 