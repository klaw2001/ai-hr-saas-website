
'use client'

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import Form from "./FormContent";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [role,setRole] = useState('JOBSEEKER')
  return (
    <div className="form-inner">
      <h3>Create a AI HR Account</h3>
      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab
              className="col-lg-6 col-md-12"
              onClick={() => setRole("JOBSEEKER")}
            >
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab
              className="col-lg-6 col-md-12"
              onClick={() => setRole("EMPLOYER")}
            >
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <Form role={role} />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <Form role={role} />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            href="/login"
            className="call-modal login"
          >
            LogIn
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register;
