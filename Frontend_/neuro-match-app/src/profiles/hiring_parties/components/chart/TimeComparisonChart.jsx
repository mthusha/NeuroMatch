import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TimeComparisonChart = ({ sessions }) => {
  const timedSessions = sessions.filter(s => s.expectTimeSeconds && s.actualTimeSeconds);

  const maxTime = Math.max(
    ...timedSessions.flatMap(s => [s.expectTimeSeconds, s.actualTimeSeconds]),
    1
  );

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      return `${mins}m ${secs}s`;
    }
    return `${Math.round(seconds)}s`;
  };

  const data = {
    labels: timedSessions.map((_, idx) => `Q ${idx + 1}`),
    datasets: [
      {
        label: 'Expected Time',
        data: timedSessions.map(s => s.expectTimeSeconds),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(79, 70, 229, 0.9)',
        barThickness: 24,
      },
      {
        label: 'Actual Time',
        data: timedSessions.map(s => s.actualTimeSeconds),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(5, 150, 105, 0.9)',
        barThickness: 24,
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
      legend: {
        // position: 'top',
        // labels: {
        //   color: '#4B5563',
        //   font: {
        //     family: 'Inter, sans-serif',
        //     size: 12,
        //     weight: 500,
        //   },
        //   padding: 16,
        //   usePointStyle: true,
        //   pointStyle: 'circle',
        //   boxWidth: 8,
        // },
        display: false,
      },
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
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${formatTime(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxTime * 1.15,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        title: { 
          display: true, 
          text: 'Time Duration', 
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
          callback: (value) => formatTime(value),
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        title: { 
          display: true, 
          text: 'Questions', 
          color: '#4B5563',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: 500,
          },
          padding: { top: 0, bottom: 0 }
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
     style={{maxWidth:'500px'}}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Time Comparison</h4>
        {timedSessions.length > 0 && (
          <div className="flex space-x-2">
            <span className="inline-flex items-center text-xs text-indigo-600">
              <span className="w-2 h-2 mr-1 rounded-full bg-indigo-500"></span>
              Expected
            </span>
            <span className="inline-flex items-center text-xs text-emerald-600">
              <span className="w-2 h-2 mr-1 rounded-full bg-emerald-500"></span>
              Actual
            </span>
          </div>
        )}
      </div>
      <div className="h-64">
        {timedSessions.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-2 text-gray-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">No time data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeComparisonChart;