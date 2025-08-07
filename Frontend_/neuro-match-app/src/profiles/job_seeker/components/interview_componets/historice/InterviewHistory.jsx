import React, { useEffect, useState } from "react";
import InterviewAnalytics from "./../../chart/InterviewAnalytics";
import InterviewHistoryView from "./../../chart/InterviewHistoryView";
import Header from '../../../../comman/Header';
import "chart.js/auto";
import { getInterviewSessions } from "../../../../../api/Interview";
import { useAuth } from "../../../../../context/AuthContext";
const InterviewHistory = () => {

  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const email = user.email;


  const [chartData, setChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [radarChartData, setRadarChartData] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [timeComparisonData, setTimeComparisonData] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const groupedBySession = React.useMemo(() => {
    if (!rawData?.data) return {};
  return rawData.data.reduce((acc, item) => {
    if (!acc[item.sessionId]) acc[item.sessionId] = [];
    acc[item.sessionId].push(item);
    return acc;
  }, {});
}, [rawData]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!rawData || !rawData.data) return;

    const sessions = [...rawData.data].sort((a, b) => a.id - b.id);
    const sessionIds = [...new Set(rawData.data.map(item => item.sessionId))];
    const sessionGroups = sessionIds.map(id => rawData.data.filter(item => item.sessionId === id));

    setChartData({
      labels: sessions.map((_, i) => `Session ${i + 1}`),
      datasets: [
        {
          label: "Interview Score",
          data: sessions.map((s) => s.score),
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#6366f1",
          pointRadius: 0,
          pointHoverRadius: 0
        }
      ]
    });

    setBarChartData({
  labels: sessionIds.map((_, i) => i + 1), 
  datasets: [
    {
      label: "",
      data: sessionGroups.map(group => {
        const scores = group.map(s => s.score);
        return (scores.reduce((a, b) => a + b, 0) / scores.length);
      }),
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)', 
        'rgba(79, 209, 197, 0.7)', 
        'rgba(249, 168, 212, 0.7)',
        'rgba(254, 215, 102, 0.7)', 
        'rgba(139, 92, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)' 
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(79, 209, 197, 1)',
        'rgba(249, 168, 212, 1)',
        'rgba(254, 215, 102, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(16, 185, 129, 1)'
      ],
      borderWidth: 1,
      borderRadius: 4, 
      hoverBackgroundColor: [
        'rgba(99, 102, 241, 0.9)',
        'rgba(79, 209, 197, 0.9)',
        'rgba(249, 168, 212, 0.9)',
        'rgba(254, 215, 102, 0.9)',
        'rgba(139, 92, 246, 0.9)',
        'rgba(16, 185, 129, 0.9)'
      ]
    }
  ]
});

    const scoreCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    sessions.forEach(s => {
      if (s.score >= 1 && s.score <= 10) {
        scoreCounts[s.score - 1]++;
      }
    });

    setRadarChartData({
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [
        {
          label: 'Score Distribution',
          data: scoreCounts,
          backgroundColor: 'rgba(79, 209, 197, 0.2)',
          borderColor: 'rgba(79, 209, 197, 1)',
          pointBackgroundColor: 'rgba(79, 209, 197, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(79, 209, 197, 1)'
        }
      ]
    });

    const timeData = sessions.filter(s => s.actualTimeSeconds !== null && s.expectTimeSeconds !== null);
    if (timeData.length > 0) {
      setTimeComparisonData({
        labels: timeData.map((_, i) => `Q ${i + 1}`),
        datasets: [
          {
            label: "Expected Time (sec)",
            data: timeData.map(s => s.expectTimeSeconds),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: "Actual Time (sec)",
            data: timeData.map(s => s.actualTimeSeconds),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      });
    }

    if (sessionIds.length > 0) {
      setSelectedSession(groupedBySession[sessionIds[0]]);
    }
}, [rawData, groupedBySession]);

useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("from ui is colled")
        const data = await getInterviewSessions(email);
        setRawData(data);
      } catch (error) {
        console.error("Failed to load interview sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  

//   const handleSessionSelect = (sessionId) => {
//     setSelectedSession(groupedBySession[sessionId]);
//     setShowChat(true);
//   };
  if (loading) {
    return <div className="text-gray-500 text-sm p-4">Loading sessions...</div>;
  }

  if (!chartData || !barChartData || !radarChartData) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );



  return (
    <div id='Jobseeker'>
     <div id='Interview-history'>
       <Header searchType="company" />
       <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
         {/* <h2 className="text-gray-800 mb-3  text-xs font-bold text-indigo-700">Interview History & Improvement Analysis</h2> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <InterviewHistoryView
             groupedBySession={groupedBySession}
             selectedSession={selectedSession}
             setSelectedSession={setSelectedSession}
             showChat={showChat}
             setShowChat={setShowChat}
           //   handleDeleteSession={handleDeleteSession}
           />

          

          <InterviewAnalytics
                chartData={chartData}
                barChartData={barChartData}
                radarChartData={radarChartData}
                timeComparisonData={timeComparisonData}
              />
         </div>
       </div>
      </div>
  </div>
</div>
  );
};

export default InterviewHistory;