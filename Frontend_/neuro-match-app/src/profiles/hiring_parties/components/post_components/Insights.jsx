import React from 'react';

const Insights = ({
  shortlisted = 0,
  shortlistedPercent = 0,
  inReview = 0,
  inReviewPercent = 0,
  pending = 0,
  pendingPercent = 0,
  rejected = 0,
  rejectedPercent = 0,
  totalApplied = 0,
  totalAppliedPercent = 0
}) => {
  const statusData = [
    { 
      name: 'Hired', 
      value: shortlisted, 
      color: 'bg-emerald-100 text-emerald-800',
      border: 'border-emerald-200',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      targetPercent: shortlistedPercent 
    }, 
    { 
      name: 'Interview', 
      value: inReview, 
      color: 'bg-blue-100 text-blue-800',
      border: 'border-blue-200',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      targetPercent: inReviewPercent 
    },
    { 
      name: 'Pending', 
      value: pending, 
      color: 'bg-amber-100 text-amber-800',
      border: 'border-amber-200',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      targetPercent: pendingPercent 
    },
    { 
      name: 'Applied', 
      value: totalApplied, 
      color: 'bg-purple-100 text-purple-800',
      border: 'border-purple-200',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      targetPercent: totalAppliedPercent 
    }
  ];

  const calculatePercentage = (value, targetPercent) => {
    if (targetPercent <= 0) return 0;
    const targetValue = value / (targetPercent / 100);
    return Math.round((value / targetValue) * 100);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Application Status</h3>
          <p className="text-xs text-gray-500">Candidate progression</p>
        </div>
        <div className="relative">
          <select className="appearance-none text-xs bg-white border border-gray-200 rounded-lg px-3 py-1 pr-6 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition">
            <option>30d</option>
            <option>90d</option>
            <option>1y</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-3">
        {statusData.map((item, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${item.border} ${item.color} transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium opacity-80 mb-1">{item.name}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
              <div className={`p-1.5 rounded-full ${item.color.replace('text', 'bg').replace('800', '200')}`}>
                {item.icon}
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-white border-opacity-30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium opacity-70">Progress</span>
                <span className="text-[10px] font-semibold">
                  {item.targetPercent > 0 ? (
                    <>
                      <span className={calculatePercentage(item.value, item.targetPercent) >= 100 ? 'text-emerald-600' : 'text-amber-600'}>
                        {calculatePercentage(item.value, item.targetPercent)}%
                      </span>
                      <span className="text-gray-400"> of target</span>
                    </>
                  ) : (
                    <span className="text-gray-400">No target</span>
                  )}
                </span>
              </div>
              <div className="h-1 w-full bg-white bg-opacity-30 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${calculatePercentage(item.value, item.targetPercent) >= 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(calculatePercentage(item.value, item.targetPercent), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">Updated just now</span>
        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
          View details
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Insights;