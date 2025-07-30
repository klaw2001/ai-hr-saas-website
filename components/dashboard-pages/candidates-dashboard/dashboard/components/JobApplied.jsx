'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import JobseekerServices from "@/apiServices/JobseekerServices";

const JobApplied = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await JobseekerServices.getJobseekerAppliedJobs();
        // Support both array and {data: array} responses
        let jobsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setJobs(jobsData);
      } catch (err) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading applied jobs...</div>;
  }

  if (!jobs.length) {
    return <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No applied jobs found.</div>;
  }

  return (
    <>
      {jobs.length === 0 && (
        <div className="col-lg-12 col-md-12 text-center mt-5">
          <h3>No applied jobs found</h3>
        </div>
      )}
      {jobs.slice(0, 6).map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id || item.job_id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <Image
                  width={50}
                  height={49}
                  src={item.logo || "/images/resource/candidate-1.png"}
                  alt="item brand"
                />
              </span>
              <h4>
                <Link href={`/job-single-v1/${item.id || item.job_id}`}>{item.jobTitle || item.job_title}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.company || item.company_name}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.location || item.job_location}
                </li>
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span> {item.time || item.applied_at}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span> {item.salary || item.salary_range}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
                {(item.jobType || item.job_type || []).map && (item.jobType || item.job_type || []).map((val, i) => (
                  <li key={i} className={val.styleClass || ""}>
                    {val.type || val}
                  </li>
                ))}
              </ul>
              {/* End .job-other-info */}

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobApplied;
