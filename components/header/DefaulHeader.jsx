"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import ProfileIcon from "../common/ProfileIcon";

const DefaulHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [token, setToken] = useState(null);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    setToken(
      typeof window !== "undefined" ? localStorage.getItem("token") : null
    );
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
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
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            {token ? (
              <Link href="/profile" className="profile-icon-link">
                <ProfileIcon style={{ fontSize: 32 }} />
              </Link>
            ) : (
              <>
                <Link href={"/login"} className="theme-btn btn-style-three">
                  Login / Register
                </Link>
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

export default DefaulHeader;
