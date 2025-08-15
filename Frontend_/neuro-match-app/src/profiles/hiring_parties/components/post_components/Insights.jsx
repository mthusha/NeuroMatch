import React from 'react';

const Insights = ({
  shortlisted,
  shortlistedPercent,
  inReview,
  inReviewPercent,
  pending,
  pendingPercent,
  rejected,
  rejectedPercent,
  totalApplied,
  totalAppliedPercent
}) => {

    const applicationStatusData = [
    { name: 'Hired', value: shortlisted, color: '#10b981', target: shortlisted / (shortlistedPercent / 100 || 1) }, 
    { name: 'Interview', value: inReview, color: '#3b82f6', target: inReview / (inReviewPercent / 100 || 1) },
    { name: 'Pending', value: pending, color: '#f59e0b', target: pending / (pendingPercent / 100 || 1) },
    { name: 'Applied', value: totalApplied, color: '#8b5cf6', target: totalApplied / (totalAppliedPercent / 100 || 1) }
  ];


  return (
    <div className="bg-in-box rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300 h-fit border border-gray-200">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Insights</h2>
          <p className="text-sm text-gray-500">Key metrics and candidate distribution</p>
        </div>
        <div>
          <select className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-in-in-box rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
          <div className="flex flex-wrap justify-between gap-4">
            {applicationStatusData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={`${item.color}20`}
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="3"
                      strokeDasharray={`${(item.value / item.target) * 100}, 100`}
                    />
                    <text x="18" y="20.5" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="bold">
                      {item.value}
                    </text>
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-600">{item.name}</span>
                <span className="text-xs text-gray-500">{Math.round((item.value / item.target) * 100)}% of target</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="bg-in-in-box rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time to Hire Metrics</h3>
          <div className="grid gap-4">
            {timeToHireData.map((item, index) => (
              <div key={index} className="bg-in-in-in-box p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">{item.metric}</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default Insights;
