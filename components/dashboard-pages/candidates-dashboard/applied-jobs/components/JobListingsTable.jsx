"use client";
import Link from "next/link.js";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import JobseekerServices from "@/apiServices/JobseekerServices";
import { useState, useEffect } from "react";


const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const response = await JobseekerServices.getJobseekerAppliedJobs();
    setJobs(response.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>

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
        {!jobs.length ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
            No applied jobs found.
          </div>
        ) : (
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
                  {jobs.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <Image
                                  width={50}
                                  height={49}
                                  src={item.logo}
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link href={`/job-single-v3/${item.id}`}>
                                  {item.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  Segment
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  London, UK
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>Dec 5, 2020</td>
                      <td className="status">Active</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication">
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Delete Aplication">
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
