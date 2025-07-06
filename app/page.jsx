// "use client";

// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "@/layout/Wrapper";
import { loginSuccess } from "@/features/auth/authSlice";
import MainHomePage from "./(home)/main-home/page";

export const metadata = {
  title: "Ai Hr Saas",
  description: "Superio - Job Borad React NextJS Template",
};
export default function Page() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const role = localStorage.getItem("role");

  //   if (token && role) {
  //     dispatch(loginSuccess({ token, role }));
  //   }
  // }, []);

  return (
    <Wrapper>
      <MainHomePage />
    </Wrapper>
  );
}
