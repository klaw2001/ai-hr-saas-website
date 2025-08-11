"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "@/layout/Wrapper";
import { initializeAuth } from "@/features/auth/authSlice";
import MainHomePage from "./(home)/main-home/page";
import DashboadHome from "@/components/dashboard-pages/candidates-dashboard/dashboard";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize authentication state from localStorage
    dispatch(initializeAuth());
    setIsLoading(false);
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="page-wrapper">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Render dashboard for logged-in candidates, homepage for others
  if (token && role === "candidate") {
    return <DashboadHome />;
  }

  // If user is logged in but not a candidate, show homepage
  // (This could be extended to show employer dashboard for employer role)
  return (
    <Wrapper>
      <MainHomePage />
    </Wrapper>
  );
}
