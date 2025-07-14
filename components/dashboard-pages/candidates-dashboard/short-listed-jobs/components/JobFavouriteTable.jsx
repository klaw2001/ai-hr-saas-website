'use client'
import Link from "next/link.js";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import JobseekerServices from "@/apiServices/JobseekerServices";
import { useEffect, useState } from "react";

const JobFavouriteTable = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await JobseekerServices.getJobseekerShortlistedJobs();
      if (res.data?.status && res.data.data) {
        setJobs(res.data.data);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Favorite Jobs</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((item) => {
                  // item: jobs_shortlisted, item.job: job
                  const job = item.job || {};
                  return (
                    <tr key={item.job_shortlisted_id || item.job_id}>
                      <td>
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                {/* Show company logo if available, else fallback */}
                                {/* {job.company_url ? (
                                  <Image
                                    width={48}
                                    height={48}
                                    src={job.company_url}
                                    alt={job.company_name || "logo"}
                                  />
                                ) : (
                                  <span className="no-logo" style={{width: 48, height: 48, display: "inline-block", background: "#eee"}} />
                                )} */}
                              </span>
                              <h4>
                                <Link href={`/job-single-v3/${job.job_id}`}>
                                  {job.job_title}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                {job.company_name && (
                                  <li>
                                    <span className="icon flaticon-briefcase"></span>
                                    {job.company_name}
                                  </li>
                                )}
                                {job.job_location && (
                                  <li>
                                    <span className="icon flaticon-map-locator"></span>
                                    {job.job_location}
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* Show date shortlisted */}
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="status">
                        {job.is_active ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Job">
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Delete Shortlist">
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobFavouriteTable;
