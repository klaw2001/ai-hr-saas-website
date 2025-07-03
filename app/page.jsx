"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-1";
import { loginSuccess } from "@/features/auth/authSlice";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      dispatch(loginSuccess({ token, role }));
    }
  }, []);

  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
