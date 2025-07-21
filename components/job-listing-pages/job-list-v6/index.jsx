import FilterJobBox from "./FilterJobBox";
import JobSearchForm from "./JobSearchForm";

const JobListPage = () => {
  return (
    <>
      <span className="header-span"></span>

      {/* <section className="page-title style-three">
        <div className="auto-container">
          <JobSearchForm />
        </div>
      </section> */}

      <section className="ls-section style-three">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-12">
              <div className="ls-outer">
                <FilterJobBox />
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
    </>
  );
};

export default JobListPage;
