import React from 'react'
import About from "@/components/pages-menu/about";
import MainWrapper from '@/layout/MainWrapper';

export const metadata = {
  title: "About || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};
const page = () => {
  return (
  
    <>
        <MainWrapper>
            <About />
        </MainWrapper>
    </>
  )
}

export default page