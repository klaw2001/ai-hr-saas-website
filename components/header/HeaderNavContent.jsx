"use client";

import Link from "next/link";

const HeaderNavContent = ({ hideNavigation = false }) => {
  if (hideNavigation) {
    return null;
  }

  return (
    <nav className="main-menu">
      <ul className="navigation">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/jobs">Jobs</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavContent;
