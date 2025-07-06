import React from "react";

const tabData = [
  {
    key: "resume",
    label: "AI Resume Builder",
    icon: "📄",
    image: "/images/resource/recruiter.png",
    alt: "AI Resume Builder Screenshot"
  },
  {
    key: "tracker",
    label: "Job Tracker",
    icon: "📊",
    image: "/images/resource/jobseeker.png",
    alt: "Job Tracker Screenshot"
  },
  {
    key: "matching",
    label: "Matching Mode",
    icon: "🧩",
    image: "/images/resource/steps-img.png",
    alt: "Matching Mode Screenshot"
  }
];

const HeroTeal = () => (
  <section className="hero-teal-section bg-white py-5" style={{ marginTop: "180px" }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          {/* Headline */}
          <h1 className="fw-bold display-4 lh-1 mb-3">
            Smarter Job Search.<br />
            Better Resumes. More Interviews.
          </h1>
          {/* Subheadline */}
          <p className="fs-5 text-muted mb-4">
            RecruitVerse.ai is your AI-powered career co-pilot. Generate ATS-ready resumes, auto-apply to jobs, and stand out in every application — faster than ever.
          </p>
          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <button type="submit" className="theme-btn btn-style-one">
              <span className="btn-title"> Get Started Free</span>
            </button>
            <button className="theme-btn btn-style-three">
              Watch It in Action
            </button>
          </div>
          {/* Tabs */}
          <div className="mb-5">
            <div className="nav nav-tabs d-flex justify-content-center gap-4 border-0" role="tablist" style={{ borderBottom: "2px solid #eee" }}>
              {tabData.map((tab, idx) => (
                <React.Fragment key={tab.key}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="hero-tabs"
                    id={`tab-${tab.key}`}
                    autoComplete="off"
                    defaultChecked={idx === 0}
                  />
                  <label
                    className="nav-link px-4 py-2"
                    htmlFor={`tab-${tab.key}`}
                    style={{
                      border: "none",
                      borderBottom: "3px solid transparent",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      cursor: "pointer"
                    }}
                  >
                    <span role="img" aria-label={tab.label.toLowerCase()}>{tab.icon}</span>
                    <span className="fw-medium ms-2">{tab.label}</span>
                  </label>
                </React.Fragment>
              ))}
            </div>
            {/* Tab Content */}
            <div className="mt-4 d-flex justify-content-center">
              {tabData.map((tab, idx) => (
                <div
                  key={tab.key}
                  className="tab-pane"
                  style={{
                    display: `var(--tab-${tab.key}-display, ${idx === 0 ? "block" : "none"})`
                  }}
                >
                  <div className="bg-light rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: '320px', height: '180px' }}>
                    <img
                      src={tab.image}
                      alt={tab.alt}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Custom CSS for tab switching */}
          <style>{`
            [name='hero-tabs'] { display: none; }
            ${tabData.map(tab => `
              #tab-${tab.key}:checked ~ .nav-link[for='tab-${tab.key}'] {
                border-bottom: 3px solid #0d6efd;
                color: #0d6efd;
                background: none;
              }
              #tab-${tab.key}:checked ~ .tab-pane {
                --tab-${tab.key}-display: block;
              }
            `).join('')}
          `}</style>
        </div>
      </div>
    </div>
  </section>
);

export default HeroTeal;