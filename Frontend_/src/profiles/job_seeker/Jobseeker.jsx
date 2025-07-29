import React from 'react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import Sidebar from './components/Sidebar';
import JobFeed from './components/JobFeed';
import './Jobseeker.css';

function Jobseeker() {
    return (
    <div id='Jobseeker' >
      <div className="container" >
        <Header />
        <div className="main-content">
          <ProfileCard />
        </div>
        <Sidebar />
        <JobFeed />
      </div>
    </div>
    );
  }
  
  export default Jobseeker;