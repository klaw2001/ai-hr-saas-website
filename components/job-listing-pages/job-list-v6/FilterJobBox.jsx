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
  
  const fetchJobs = async () => {
    const response = await JobServices.getJobs()
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
  }, []);

  // keyword filter on title
  const keywordFilter = (item) =>
    keyword !== ""
      ? item.jobTitle.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location
          ?.toLocaleLowerCase()
          .includes(location?.toLocaleLowerCase())
      : item;

  // location filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // job-type filter
  const jobTypeFilter = (item) =>
    item.jobType !== undefined && jobTypeSelect !== ""
      ? item?.jobType[0]?.type.toLocaleLowerCase().split(" ").join("-") ===
          jobTypeSelect && item
      : item;

  // date-posted filter
  const datePostedFilter = (item) =>
    datePosted !== "all" && datePosted !== ""
      ? item?.created_at
          ?.toLocaleLowerCase()
          .split(" ")
          .join("-")
          .includes(datePosted)
      : item;

  // experience level filter
  const experienceFilter = (item) =>
    experienceSelect !== ""
      ? item?.experience?.split(" ").join("-").toLocaleLowerCase() ===
          experienceSelect && item
      : item;

  // salary filter
  const salaryFilter = (item) =>
    item?.totalSalary?.min >= salary?.min &&
    item?.totalSalary?.max <= salary?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

  let content = jobs
    // ?.filter(keywordFilter)
    // ?.filter(locationFilter)
    // ?.filter(destinationFilter)
    // ?.filter(categoryFilter)
    // ?.filter(jobTypeFilter)
    // ?.filter(datePostedFilter)
    // ?.filter(experienceFilter)
    // ?.filter(salaryFilter)
    // ?.sort(sortFilter)
    // .slice(perPage.start, perPage.end !== 0 ? perPage.end : 16)
    ?.map((item) => (
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
              {/* compnay info */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item.job_location}
              </li>
              {/* location info */}
              <li>
                <span className="icon flaticon-clock-3"></span> {item.created_at}
              </li>
              {/* time info  */}

              {item.job_salary !== '' && (
                <li>
                  <span className="icon flaticon-money"></span> {item.job_salary}
                </li>
              )}
              {/* salary info */}
              </ul>
              {/* End .job-info */}

            <ul className="job-other-info">
              {/* {item?.jobType?.map((val, i) => (
                <li key={i} className={`${val.styleClass}`}>
                  {val.type}
                </li>
              ))} */}
              <li className="time">{item.employment_type}</li>
              <li className="privacy">{item.job_seniority}</li>
            </ul>
            {/* End .job-other-info  */}

                  <button className="bookmark-btn" onClick={() => shortlistJob(item.job_id)}>
                    <span className={item.jobs_shortlisted && item.jobs_shortlisted.length ? "flaticon-bookmark-filled" : "flaticon-bookmark"}></span>
                  </button>
                  </div>
                </div>
                </div>
      // End all jobs
    ));

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
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{content?.length}</strong> jobs
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

      <div className="row">{content}</div>
      {/* End .row with jobs */}

      <ListingShowing />
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
