"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";


const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const { token, role } = useSelector((state) => state.auth);

  if (token) {
    console.log("User is logged in as:", role); // JOBSEEKER or EMPLOYER etc.
  }
  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="main-box">
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={154}
                  height={50}
                  src="/images/logo.svg"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          <HeaderNavContent />
        </div>

        <div className="outer-box">
          <Link href="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link>

          <div className="btn-box">
            {token ? (
              <div class="dropdown ms-3">
                <div
                  class="dropdown-toggle d-flex align-items-center no-caret "
                  data-bs-toggle="dropdown"
                >
                  <i
                    className="la la-user-circle"
                    style={{ fontSize: "30px" }}
                  ></i>{" "}
                </div>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <div class="dropdown-item logout" onClick={() => {}}>
                      Logout
                    </div>
                  </li>
                 
                </ul>
              </div>
            ) : (
              <>
                <a
                  href="/register"
                  className="theme-btn btn-style-three call-modal"
                >
                  Login / Register
                </a>

                <Link
                  href="/employers-dashboard/post-jobs"
                  className="theme-btn btn-style-one"
                >
                  Job Post
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;

