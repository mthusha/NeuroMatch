import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../../../comman/Header';
import CompanyProfile from './CompanyProfile';
import JobFeed from '../JobFeed';
import RecruitmentMetrics from '../../../comman/RecruitmentMetrics';
import ConnectionsCard from '../ConnectionsCard';
function CompanyView(){
      const { id } = useParams();
      const [refreshConnectionsTrigger, setRefreshConnectionsTrigger] = useState(false);
      const refreshConnections = () => {
    setRefreshConnectionsTrigger(prev => !prev);
  };
    return (
    <div id="Jobseeker">
      <div className="container">
        <Header searchType="company" />
        <div style={{ maxHeight: "900px", overflow: "auto", scrollbarWidth: "none" }} className="main-content">
          <CompanyProfile companyId={id} onFollowChange={refreshConnections} />
          <JobFeed companyId={id} type="company"/>
        </div>

        <div className="sidebar">
          <RecruitmentMetrics />
          <ConnectionsCard trigger={refreshConnectionsTrigger} />
        </div>
      </div>
    </div>
  );
}

export default CompanyView;