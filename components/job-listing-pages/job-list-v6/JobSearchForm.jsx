'use client'
import Categories from "../components/Categories";
import JobSelect from "../components/JobSelect";
import LocationBox from "../components/LocationBox";
import SearchBox from "../components/SearchBox";

const JobSearchForm = ({ onFindJobs }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onFindJobs) onFindJobs();
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="job-search-form">
                <div className="row">
                    <div className="form-group col-lg-4 col-md-12 col-sm-12">
                        <SearchBox />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <LocationBox />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <Categories />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
                        <button
                            type="submit"
                            className="theme-btn btn-style-one"
                        >
                            Find Jobs
                        </button>
                    </div>
                    {/* <!-- Form Group --> */}
                </div>
            </form>

            <JobSelect />
        </>
    );
};

export default JobSearchForm;
