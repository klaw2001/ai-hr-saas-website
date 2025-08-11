"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import ProfileIcon from "../common/ProfileIcon";
import candidatesMenuData from "@/data/candidatesMenuData";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import JobseekerServices from "@/apiServices/JobseekerServices";

const DefaulHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({});

  const pathname = usePathname();
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
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await JobseekerServices.getJobseekerProfile();
          if ((res.data?.success || res.data?.status) && res.data.data) {
            setProfile(res.data.data);
          }
        } catch (err) {
          // fallback to nothing
        }
      };
      fetchProfile();
    }
  }, [token]);

  const avatar = profile.profile_logo || "/images/resource/candidate-1.png";
  const name = profile.full_name || "My Account";

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

          <HeaderNavContent hideNavigation={token && pathname === "/jobs"} />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            {token ? (
              <div className="dropdown dashboard-option ">
                <Link
                  href="/candidates-dashboard/dashboard"
                  className="d-flex align-items-center"
                >
                  <Image
                    alt="avatar"
                    className="thumb"
                    src={avatar}
                    width={50}
                    height={50}
                  />
                  <span className="name">{name}</span>
                </Link>
              </div>
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
