import React from 'react';
import Insights from './../hiring_parties/components/post_components/Insights'
import { useLocation } from "react-router-dom";
const RecruitmentMetrics = () => {
  const location = useLocation();
  const path = location.pathname;
  const hideInsights = path.startsWith("/company/");

  return (
    <div>
    <div className="bg-in-box rounded-xl p-5 shadow-sm border border-gray-200 max-w-full mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        Recruitment Metrics
      </h3>

      <div className="space-y-5">
        <MetricItem
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
          iconPath="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          label="Open Positions"
          value="24"
          change="+2 last month"
          changeColor="text-indigo-600"
        />

        <MetricItem
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          label="Active Candidates"
          value="142"
          change="+24 this week"
          changeColor="text-purple-600"
        />

        <MetricItem
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          label="Avg. Time to Hire"
          value="32 days"
          change="-3 last quarter"
          changeColor="text-blue-600"
        />
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Hiring Goal Progress</span>
          <span className="text-gray-800 font-medium">65%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>
      
    </div>
    {/* Chart */}
    {!hideInsights && <Insights />}
        </div>
  );
};

const MetricItem = ({ iconBg, iconColor, iconPath, label, value, change, changeColor }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-3">
      <div className={`${iconBg} p-2 rounded-lg`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
    <div className="text-right">
      <p className="text-gray-800 font-medium">{value}</p>
      <p className={`${changeColor} text-xs`}>{change}</p>
    </div>
  </div>
);

export default RecruitmentMetrics;
