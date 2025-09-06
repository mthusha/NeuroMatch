import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import RequestInterview from './RequestInterview';
const NeuroScorePanel = ({ neuroData, jobPost, status, onStatusChange  }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
//   const [status, setStatus] = useState(initialStatus);
  if (!neuroData || typeof neuroData !== "object") {
    return (
      <div className="text-sm text-gray-500 italic">
        No NeuroScore data available
      </div>
    );
  }

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleScheduled = () => {
    if(onStatusChange) onStatusChange("Request Interview");
    setIsFormOpen(false);
  };
  

  // Safely handle sessionScores
  const sessionScores = neuroData.sessionScores || {};
  const chartData = Object.entries(sessionScores).map(([_, score], index) => {
    let fillColor;
    if (score >= 80) fillColor = '#10b981';
    else if (score >= 60) fillColor = '#6366f1';
    else fillColor = '#ef4444';

    return {
      sessionNumber: index + 1,
      score,
      fillColor,
    };
  }).sort((a, b) => b.score - a.score);

  const processedData = chartData.map((entry, idx) => ({
    ...entry,
    order: idx + 1,
  }));

  const recentScores = Object.values(sessionScores);
  const lastFive = recentScores.slice(-5);

  const trend = lastFive.length > 1
    ? ((lastFive[lastFive.length - 1] - lastFive[0]) / lastFive[0] * 100).toFixed(2)
    : 0;


  return (
    <div className="bg-white rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          {/* <h3 className="text-2xl font-bold text-gray-700">NeuroScore Performance</h3> */}
          <p className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Detailed analysis of interview performance
          </p>
        </div>
        <div className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium">
          {neuroData.fullName}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
         <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
         style={{padding:'20px 20px 20px 0px'}}
         >
           <div className="flex justify-between items-center mb-3">
             <h4 className="text-lg font-semibold text-gray-600">.</h4>
             <div className="flex space-x-4 text-xs text-gray-500">
               <span className="flex items-center">
                 <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>≥80
               </span>
               <span className="flex items-center">
                 <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>60–79
               </span>
               <span className="flex items-center">
                 <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>&lt;60
               </span>
             </div>
           </div>

           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart
                className="my-bar-chart"
                 data={processedData}
                 barCategoryGap="15%"
                 margin={{ top: 15, right: 15, left: 15, bottom: 15 }}
               >
                 <XAxis
                   dataKey="order"
                   tickFormatter={val => `${val}`}
                   tick={{ fontSize: 11, fill: "#6b7280" }}
                   tickLine={false}
                   axisLine={{ stroke: "#e5e7eb", strokeWidth: 1.5 }}
                   interval={0}
                   padding={{ left: 10, right: 10 }}
                 />
                 <YAxis
                   domain={[0, 100]}
                   tick={{ fontSize: 11, fill: "#6b7280" }}
                   tickLine={false}
                   axisLine={{ stroke: "#e5e7eb", strokeWidth: 1.5 }}
                   tickCount={6}
                   padding={{ top: 10 }}
                 />
                 <Tooltip
                   cursor={{ fill: '#f3f4f6', radius: 4 }}
                   contentStyle={{
                     borderRadius: "8px",
                     border: "1px solid #e5e7eb",
                     background: "white",
                     padding: "8px 12px",
                     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                     fontSize: "14px",
                   }}
                   formatter={(value) => [`${value}%`, "Score"]}
                   labelFormatter={(label) => `Order ${label}`}
                   labelStyle={{ 
                     fontWeight: "600", 
                     color: "#111827",
                     marginBottom: "4px",
                   }}
                   itemStyle={{ color: "#4b5563" }}
                 />
                 <Bar 
                   dataKey="score" 
                   barSize={20}
                   radius={[4, 4, 0, 0]}
                   animationDuration={1500}
                   animationEasing="ease-out"
                 >
                   {chartData.map((entry, index) => (
                     <Cell
                       key={`cell-${index}`}
                       fill={entry.fillColor}
                       strokeWidth={1}
                       stroke={entry.fillColor}
                       opacity={0.9}
                       style={{
                         filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))",
                         transition: "opacity 0.2s",
                       }}
                       onMouseEnter={() => {
                         const cells = document.querySelectorAll('.recharts-bar-rectangle');
                         cells[index].style.opacity = '1';
                       }}
                       onMouseLeave={() => {
                         const cells = document.querySelectorAll('.recharts-bar-rectangle');
                         cells[index].style.opacity = '0.9';
                       }}
                     />
                   ))}
                 </Bar>
                 <CartesianGrid 
                   strokeDasharray="3 3" 
                   vertical={false} 
                   stroke="#f3f4f6" 
                 />
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gray-50 p-5 rounded-xl">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Time Management</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Avg Expected</span>
                    <span>{Math.floor(neuroData.averageExpectedTimeSeconds / 60)}m {Math.floor(neuroData.averageExpectedTimeSeconds % 60)}s</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-400 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Avg Actual</span>
                    <span>{Math.floor(neuroData.averageActualTimeSeconds / 60)}m {Math.floor(neuroData.averageActualTimeSeconds % 60)}s</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${Math.min(100, (neuroData.averageActualTimeSeconds / neuroData.averageExpectedTimeSeconds) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Achievements</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {neuroData.sessionsAboveThreshold} High Scores (≥80)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Top Score: {neuroData.highestScore}%
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {neuroData.totalSessions} Total Sessions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Success Rate: {neuroData.successRatePercentage.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-gray-200">
          <div className="pb-4">
            <span className="text-sm text-gray-500">Average Score</span>
            <p className="text-xl font-bold text-indigo-600 mt-1">{neuroData.averageScore.toFixed(1)}%</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${neuroData.averageScore}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div>
              <p className="text-gray-500 text-sm">Highest</p>
              <p className="text-lg font-bold text-green-600">{neuroData.highestScore}%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Lowest</p>
              <p className="text-lg font-bold text-red-500">{neuroData.lowestScore}%</p>
            </div>
          </div>

          <div className="py-4">
            <p className="text-gray-500 text-sm">Recent Trend</p>
            <p
              className={`text-sm font-semibold mt-1 ${
                trend > 0
                  ? "text-green-600"
                  : trend < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {trend > 0 ? `↑ +${trend}%` : trend < 0 ? `↓ ${trend}%` : "→ 0%"}
            </p>
          </div>

          <div className="flex justify-between items-center py-4">
            <div>
              <p className="text-gray-500 text-sm">Total Sessions</p>
              <p className="text-lg font-bold">{neuroData.totalSessions}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Success Rate</p>
              <p className="text-lg font-bold">{neuroData.successRatePercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-gray-500 text-sm">Last Interview</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-700">{neuroData.lastInterviewDate}</span>
              <span
                className={`font-bold ${
                  neuroData.lastInterviewScore >= 80
                    ? "text-green-600"
                    : neuroData.lastInterviewScore >= 60
                    ? "text-indigo-600"
                    : neuroData.lastInterviewScore >= 40
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {neuroData.lastInterviewScore}%
              </span>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-6 py-3 bg-white text-gray-800 font-medium rounded-xl shadow-m transition-all duration-300 transform active:translate-y-0 flex items-center gap-3 group border border-gray-100 hover:border-gray-200"
            style={{width:'100%', marginTop:'5px'}}
            onClick={status === "Request Interview" ? undefined : openForm}
            disabled={status === "Request Interview"}
            >
              <span className="relative inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                 {status === "Request Interview" ? "Applied" : "Neuro Interview"}
              </span>
            </button>
          </div>
          {isFormOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative">
               <button 
                 onClick={closeForm}
                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
               <RequestInterview
                 onClose={closeForm} 
                 jobseeker={neuroData.jobSeekerId}
                 jobPost={jobPost}
                 onScheduled={handleScheduled} 
               />
             </div>
           </div>
         )}
          
        </div>

      </div>
    </div>
  );
};

export default NeuroScorePanel;
