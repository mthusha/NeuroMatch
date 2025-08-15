import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreTrendChart = ({ sessions }) => {
  const scoredSessions = sessions.filter(s => s.score);

  const data = {
    labels: scoredSessions.map((_, idx) => `Q ${idx + 1}`),
    datasets: [
      {
        data: scoredSessions.map(s => s.score),
        backgroundColor: (context) => {
          const value = context.raw;
          return value >= 8 
            ? 'rgba(16, 185, 129, 0.7)'  
            : value >= 5 
              ? 'rgba(234, 179, 8, 0.7)'  
              : 'rgba(239, 68, 68, 0.7)'; 
        },
        borderColor: (context) => {
          const value = context.raw;
          return value >= 8 
            ? 'rgba(16, 185, 129, 1)' 
            : value >= 5 
              ? 'rgba(234, 179, 8, 1)' 
              : 'rgba(239, 68, 68, 1)';
        },
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: (context) => {
          const value = context.raw;
          return value >= 8 
            ? 'rgba(5, 150, 105, 0.9)' 
            : value >= 5 
              ? 'rgba(202, 138, 4, 0.9)' 
              : 'rgba(220, 38, 38, 0.9)';
        },
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleFont: { 
          family: 'Inter, sans-serif',
          size: 12,
          weight: 'normal'
        },
        bodyFont: { 
          family: 'Inter, sans-serif',
          size: 12,
          weight: 'normal'
        },
        padding: 10,
        cornerRadius: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            let emoji = '';
            if (value >= 8) emoji = '🌟 ';
            else if (value >= 5) emoji = '👍 ';
            else emoji = '👎 ';
            return `${emoji}Score: ${value}/10`;
          },
          labelColor: (context) => {
            return {
              borderColor: 'transparent',
              backgroundColor: context.dataset.backgroundColor[context.dataIndex],
              borderRadius: 4,
            };
          }
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        min: 0,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        title: { 
          display: true, 
          text: 'Performance Score', 
          color: '#4B5563',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: 500,
          },
          padding: { top: 0, bottom: 10 }
        },
        ticks: { 
          color: '#6B7280',
          font: { 
            family: 'Inter, sans-serif',
            size: 10 
          },
          stepSize: 2,
          callback: (value) => `${value}/10`,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        title: { 
          display: true, 
          text: 'Practice Sessions', 
          color: '#4B5563',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: 500,
          },
          padding: { top: 10, bottom: 0 }
        },
        ticks: { 
          color: '#6B7280',
          font: { 
            family: 'Inter, sans-serif',
            size: 10 
          } 
        },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300" 
    style={{minWidth:'500px'}}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Score Performance Trend</h4>
        {scoredSessions.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">
              {scoredSessions.length} session{scoredSessions.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
      <div className="h-64 relative">
        {scoredSessions.length > 0 ? (
          <>
            <Bar data={data} options={options} />
            {/* <div className="absolute bottom-4 right-4 flex space-x-2">
              <span className="inline-flex items-center text-xs text-gray-500">
                <span className="w-2 h-2 mr-1 rounded-full bg-emerald-500"></span>
                8-10
              </span>
              <span className="inline-flex items-center text-xs text-gray-500">
                <span className="w-2 h-2 mr-1 rounded-full bg-amber-500"></span>
                5-7
              </span>
              <span className="inline-flex items-center text-xs text-gray-500">
                <span className="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
                0-4
              </span>
            </div> */}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-2 text-gray-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">No score data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreTrendChart;