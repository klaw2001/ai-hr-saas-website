import Breadcrumb from "../../common/Breadcrumb";

import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";

const JobListingPage = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      {/* <DefaulHeader2 /> */}
      {/* End Header with upload cv btn */}

      {/* End MobileMenu */}

      <Breadcrumb title="Find Jobs" meta="Jobs" />
      {/* <!--End Breadcrumb Start--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
              <FilterSidebar />
            </div>
            {/* <!-- End Filters Column --> */}

            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="ls-outer">
                <FilterJobsBox />
                {/* <!-- ls Switcher --> */}
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobListingPage;
