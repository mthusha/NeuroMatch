import React from 'react';
import Header from '../comman/Header';
// import ProfileCard from './components/ProfileCard';
import Sidebar from './components/Sidebar';
import AppliedJobsList from './components/AppliedJobsList'
// import JobFeed from './components/JobFeed';
import './Jobseeker.css';

const AppliedJobs = () => {

  return (
   <div id='Jobseeker' >
      <div className="container" >
        <Header searchType="company" />
        <div style={{maxHeight:"900px", overflow:"auto",scrollbarWidth:"none"}} className="main-content">
          {/* <ProfileCard /> */}
          {/* <JobFeed companyId={null} type="user" /> */}
          <AppliedJobsList/>
        </div>
        <Sidebar />
      
      </div>
    </div>
    );
};

export default AppliedJobs;
