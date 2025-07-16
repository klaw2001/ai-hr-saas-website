import React from 'react'
import MainWrapper from '@/layout/MainWrapper';
import ResumeAiSection from '@/components/main-home/ResumeAiSection';

export const metadata = {
  title: "AI Resume Generator || RecruitVerseAi Resume Generator",
  description: "RecruitVerseAi Resume Generator",
};
const page = () => {
  return (
  
    <>
        <MainWrapper>
            <ResumeAiSection />
        </MainWrapper>
    </>
  )
}

export default page