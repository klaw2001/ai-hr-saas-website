'use client'

import Link from "next/link";
// import jobs from "../../../data/job-featured";
import ListingShowing from "../components/ListingShowing";
import JobSelect from "../components/JobSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
} from "../../../features/filter/filterSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import JobServices from "@/apiServices/JobServices";
import { toast } from "react-toastify";
import JobseekerServices from "@/apiServices/JobseekerServices";
import JobSearchForm from "./JobSearchForm";

const FilterJobBox = () => {
  const { jobSort } = useSelector((state) => state.filter);
  const [jobList, setJobList] = useState([]);
  const {
    keyword,
    location,
    destination,
    category,
    datePosted,
    jobTypeSelect,
    experienceSelect,
    salary,
  } = jobList || {};
  
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    if (jobTypeSelect) params.append('jobType', jobTypeSelect);
    if (datePosted) params.append('datePosted', datePosted);
    if (experienceSelect) params.append('experience', experienceSelect);
    if (salary?.min !== undefined) params.append('salaryMin', salary.min);
    if (salary?.max !== undefined) params.append('salaryMax', salary.max);
    if (sort) params.append('sort', sort);
    if (perPage.start !== undefined) params.append('start', perPage.start);
    if (perPage.end !== undefined) params.append('end', perPage.end);
    return params.toString();
  };

  const fetchJobs = async () => {
    const queryString = buildQueryParams();
    const response = await JobServices.getJobs(queryString ? `?${queryString}` : '');
    if(response.data.status){
      setJobList(response.data.data);
    }
  };

  const jobs = jobList


  async function shortlistJob(job_id) {
    try {
      const response = await JobseekerServices.shortlistJob({
        job_id
      });
      if (response.data.status) {
        toast.success("Job shortlisted successfully!");
      } else {
        toast.error(response.data.message || "Failed to shortlist job.");
      }
    } catch (error) {
      toast.error("Failed to shortlist job. Please try again.");
      console.error("Error shortlisting job:", error);
    }
  }

  const { sort, perPage } = jobSort;

  const dispatch = useDispatch();
  useEffect(() => {
    fetchJobs();
  }, [keyword, location, category, jobTypeSelect, datePosted, experienceSelect, salary, sort, perPage]);

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // clear all filters
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addExperienceSelect(""));
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  
  return (
    <>
      <JobSearchForm onFindJobs={fetchJobs} />
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{jobs.length}</strong> jobs
          </div>
        </div>
        {/* End .showing-result */}

        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          category !== "" ||
          jobTypeSelect !== "" ||
          datePosted !== "" ||
          experienceSelect !== "" ||
          salary?.min !== 0 ||
          salary?.max !== 20000 ||
          sort !== "" ||
          perPage.start !== 0 ||
          perPage.end !== 0 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          ) : undefined}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
          {/* End select */}

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 30,
              })}
            >
              30 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 40,
              })}
            >
              40 per page
            </option>
          </select>
          {/* End select */}
        </div>
        {/* End sort by filter */}
      </div>
      {/* <!-- ls Switcher --> */}

      <div className="row">
        {jobs?.map((item) => (
          <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <Image width={50} height={49} src={item.logo} alt="item brand" />
                </span>
                <h4>
                  <Link href={`/job-single-v1/${item.id}`}>{item.job_title}</Link>
                </h4>
                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item.company_name}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {item.job_location}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span> {item.created_at}
                  </li>
                  {item.job_salary !== '' && (
                    <li>
                      <span className="icon flaticon-money"></span> {item.job_salary}
                    </li>
                  )}
                </ul>
                <ul className="job-other-info">
                  <li className="time">{item.employment_type}</li>
                  <li className="privacy">{item.job_seniority}</li>
                </ul>
                <button className="bookmark-btn" onClick={() => shortlistJob(item.job_id)}>
                  <span className={item.jobs_shortlisted && item.jobs_shortlisted.length ? "flaticon-bookmark-filled" : "flaticon-bookmark"}></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End .row with jobs */}

      <ListingShowing />
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
