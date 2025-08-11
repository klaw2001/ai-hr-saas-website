'use client'
import { useState, useEffect } from 'react';
import JobseekerServices from '../../../../../apiServices/JobseekerServices';

const TopCardBlock = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await JobseekerServices.getJobseekerDashboard();
        if(response.data.status){
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: dashboardData?.summary?.applied_jobs || "0",
      metaName: "Applied Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: dashboardData?.summary?.job_alerts || "0",
      metaName: "Job Alerts",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: dashboardData?.summary?.resumes || "0",
      metaName: "Messages",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: dashboardData?.summary?.shortlist || "0",
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
