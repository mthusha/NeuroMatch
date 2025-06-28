import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import ConnectionsCard from './ConnectionsCard';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <AnalyticsCard />
      <ConnectionsCard />
    </div>
  );
};

export default Sidebar;