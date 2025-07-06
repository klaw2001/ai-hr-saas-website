import JobListPage from '@/components/job-listing-pages/job-list-v6'
import MainWrapper from '@/layout/MainWrapper'
import React from 'react'

const page = () => {
  return (
    <>
        <MainWrapper>
          <JobListPage />
        </MainWrapper>
    </>
  )
}

export default page