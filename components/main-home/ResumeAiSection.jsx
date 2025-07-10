import React from "react";
import Block7 from "../block/Block7";

import Link from "next/link";
import JobFeatured10 from "../job-featured/JobFeatured10";
import CallToAction9 from "../call-to-action/CallToAction9";
import FeaturedBlock3 from "../block/FeaturedBlock3";
import Subscribe2 from "../call-to-action/subcribe-box/Subscribe2";
import AppSection4 from "../app-section/AppSection4";
import TopCompany from "../top-company/TopCompany";
import Testimonial6 from "@/components/testimonial/Testimonial6";

const ResumeAiSection = () => {
  return (
    <>  
    <section className="py-5 bg-white position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="text">
            AI Resume Builder

            </div>
            <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
              Tailor your resume <br /> for each job instantly            </h2>
            <p className="mb-4 text-secondary" style={{ fontSize: '1.1rem' }}>
              Let our GPT-powered engine generate role-specific, <br /> ATS-friendly resumes with a click.            </p>
            <button className="theme-btn btn-style-one">
              Build a Resume with AI
            </button>
          </div>
          {/* Right Column */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="position-relative" style={{ maxWidth: 400 }}>
              {/* Resume Card */}
              <div className="bg-light rounded-4 shadow p-4" style={{ minHeight: 350 }}>
                <div className="d-flex align-items-center mb-3">
                  <div className="fw-bold text-success me-2" style={{ fontSize: '1.1rem' }}>WeWork</div>
                  <span className="badge bg-secondary">Senior Marketing Manager</span>
                </div>
                <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>07/2023 - Present</div>
                <ul className="ps-3 mb-4" style={{ fontSize: '0.98rem' }}>
                  <li>Implemented website optimization strategies that resulted in a 15% increase in conversion rates and a 20% increase in organic search traffic.</li>
                  <li>Developed and implemented a global campaign roadmap that resulted in a 25% increase in lead generation and a 20% increase in conversion rates.</li>
                </ul>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                    32%
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '1rem' }}>Overall Score</div>
                    <div className="small text-muted">Resume Structure, Measurable Results, Keyword Usage</div>
                  </div>
                </div>
                <div className="fw-semibold mt-3" style={{ fontSize: '1.05rem' }}>Tina Miller</div>
                <div className="text-muted small mb-2">Global Campaign Director</div>
                <div className="text-muted small">Miami, Florida • tina.miller29@gmail.com</div>
              </div>
              {/* Tooltip/Callout */}
              <div className="position-absolute bg-white border rounded-3 shadow p-3" style={{ left: '100%', top: '60%', minWidth: 260, zIndex: 2, transform: 'translate(-30px, -50%)' }}>
                <div className="d-flex align-items-start">
                  <span className="me-2" style={{ fontSize: '1.3rem', color: '#0d6efd' }}>▲</span>
                  <span style={{ fontSize: '0.98rem' }}>
                    Helped grow awareness and built an inbound marketing strategy that increased website traffic by 25% and lead generation by 50% within the first 6 months.
                  </span>
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="position-absolute rounded-circle bg-primary opacity-25" style={{ width: 350, height: 350, right: -120, top: -80, zIndex: 0 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-5 bg-white position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="text">
            Auto Apply to Jobs

            </div>
            <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Apply to 50+ jobs daily, <br /> while you sleep. </h2>
            <p className="mb-4 text-secondary" style={{ fontSize: '1.1rem' }}>
            Connect your resume, set your preferences, <br /> and let RecruitVerse auto-apply on your behalf.              </p>
            <button className="theme-btn btn-style-one">
            Automate Applications
            </button>
          </div>
          {/* Right Column */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="position-relative" style={{ maxWidth: 400 }}>
              {/* Resume Card */}
              <div className="bg-light rounded-4 shadow p-4" style={{ minHeight: 350 }}>
                <div className="d-flex align-items-center mb-3">
                  <div className="fw-bold text-success me-2" style={{ fontSize: '1.1rem' }}>WeWork</div>
                  <span className="badge bg-secondary">Senior Marketing Manager</span>
                </div>
                <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>07/2023 - Present</div>
                <ul className="ps-3 mb-4" style={{ fontSize: '0.98rem' }}>
                  <li>Implemented website optimization strategies that resulted in a 15% increase in conversion rates and a 20% increase in organic search traffic.</li>
                  <li>Developed and implemented a global campaign roadmap that resulted in a 25% increase in lead generation and a 20% increase in conversion rates.</li>
                </ul>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                    32%
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '1rem' }}>Overall Score</div>
                    <div className="small text-muted">Resume Structure, Measurable Results, Keyword Usage</div>
                  </div>
                </div>
                <div className="fw-semibold mt-3" style={{ fontSize: '1.05rem' }}>Tina Miller</div>
                <div className="text-muted small mb-2">Global Campaign Director</div>
                <div className="text-muted small">Miami, Florida • tina.miller29@gmail.com</div>
              </div>
              {/* Tooltip/Callout */}
              <div className="position-absolute bg-white border rounded-3 shadow p-3" style={{ left: '100%', top: '60%', minWidth: 260, zIndex: 2, transform: 'translate(-30px, -50%)' }}>
                <div className="d-flex align-items-start">
                  <span className="me-2" style={{ fontSize: '1.3rem', color: '#0d6efd' }}>▲</span>
                  <span style={{ fontSize: '0.98rem' }}>
                    Helped grow awareness and built an inbound marketing strategy that increased website traffic by 25% and lead generation by 50% within the first 6 months.
                  </span>
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="position-absolute rounded-circle bg-primary opacity-25" style={{ width: 350, height: 350, right: -120, top: -80, zIndex: 0 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-5 bg-white position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="text">
            Track & Manage Applications

            </div>
            <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Stay organized <br /> and never miss a follow-up. </h2>
            <p className="mb-4 text-secondary" style={{ fontSize: '1.1rem' }}>
            Get a visual dashboard of your job search, <br /> follow-ups, and recruiter responses. </p>
            <button className="theme-btn btn-style-one">
            Start Tracking
            </button>
          </div>
          {/* Right Column */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="position-relative" style={{ maxWidth: 400 }}>
              {/* Resume Card */}
              <div className="bg-light rounded-4 shadow p-4" style={{ minHeight: 350 }}>
                <div className="d-flex align-items-center mb-3">
                  <div className="fw-bold text-success me-2" style={{ fontSize: '1.1rem' }}>WeWork</div>
                  <span className="badge bg-secondary">Senior Marketing Manager</span>
                </div>
                <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>07/2023 - Present</div>
                <ul className="ps-3 mb-4" style={{ fontSize: '0.98rem' }}>
                  <li>Implemented website optimization strategies that resulted in a 15% increase in conversion rates and a 20% increase in organic search traffic.</li>
                  <li>Developed and implemented a global campaign roadmap that resulted in a 25% increase in lead generation and a 20% increase in conversion rates.</li>
                </ul>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                    32%
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '1rem' }}>Overall Score</div>
                    <div className="small text-muted">Resume Structure, Measurable Results, Keyword Usage</div>
                  </div>
                </div>
                <div className="fw-semibold mt-3" style={{ fontSize: '1.05rem' }}>Tina Miller</div>
                <div className="text-muted small mb-2">Global Campaign Director</div>
                <div className="text-muted small">Miami, Florida • tina.miller29@gmail.com</div>
              </div>
              {/* Tooltip/Callout */}
              <div className="position-absolute bg-white border rounded-3 shadow p-3" style={{ left: '100%', top: '60%', minWidth: 260, zIndex: 2, transform: 'translate(-30px, -50%)' }}>
                <div className="d-flex align-items-start">
                  <span className="me-2" style={{ fontSize: '1.3rem', color: '#0d6efd' }}>▲</span>
                  <span style={{ fontSize: '0.98rem' }}>
                    Helped grow awareness and built an inbound marketing strategy that increased website traffic by 25% and lead generation by 50% within the first 6 months.
                  </span>
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="position-absolute rounded-circle bg-primary opacity-25" style={{ width: 350, height: 350, right: -120, top: -80, zIndex: 0 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="sec-title text-center">
                <h2>How It Works?</h2>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row grid-base" data-aos="fade-up">
            <Block7 />
          </div>
        </div>
      </section>


      <section className="layout-pt-60 layout-pb-120">
        <div className="auto-container">
          <div className="sec-title text-center mb-0">
            <h2>Jobs of the day</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>
          {/* End sec-title */}
          <JobFeatured10 />
        </div>
      </section>
      {/* End Job Featured Section */}

      <CallToAction9 />
      {/* <!-- End Call To Action --> */}

      <section className="layout-pt-120 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-between align-items-end">
            <div className="col-lg-6">
              <div className="sec-title mb-0">
                <h2 className="color-blue-dark fw-700">
                  Top Company Registered
                </h2>
                <div className="text">
                  Some of the companies we have helped recruit excellent
                  applicants over the years.
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="/candidates-list-v3"
                className="button -arrow text-dark-blue"
              >
                Browse
                <span className="fa fa-angle-right ms-1"></span>
              </Link>
            </div>
          </div>
          {/* End .row */}

          <div className="carousel-outer pt-50" data-aos="fade-up">
            <div className="companies-carousel">
              <TopCompany />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Top Companies --> */}

      <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="sec-title-outer">
            <div className="sec-title">
              <h2>Featured Cities</h2>
              <div className="text">
                Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
              </div>
            </div>
            {/* End sec-title */}
            <Link href="/job-list-v13" className="link text-green">
              Browse All Locations <span className="fa fa-angle-right"></span>
            </Link>
          </div>
          {/* End .sec-title-outer */}

          <div className="row" data-aos="fade-up">
            <FeaturedBlock3 />
          </div>
          {/* End .row */}
        </div>
        {/* End auto-container */}
      </section>
      {/* <!-- End Features Section --> */}

      <section className="layout-pt-60 layout-pb-120">
        <div className="auto-container">
          <div className="row justify-content-center text-center">
            <div className="col-auto">
              <div className="">
                <h2 className="fw-700">What people are saying</h2>
                <div className="text mt-9">
                  Consectetur adipisicing elit, sed do eiusmod temp
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="job-carousel pt-50" data-aos="fade-up">
            <Testimonial6 />
          </div>
          {/* End .job-carousel pt-50 */}
        </div>
      </section>
      {/* <!-- End Testimonials Section --> */}

      <Subscribe2 />
      {/* <!-- End Subscribe Section --> */}

      <AppSection4 />
    </>
  );
};

export default ResumeAiSection; 