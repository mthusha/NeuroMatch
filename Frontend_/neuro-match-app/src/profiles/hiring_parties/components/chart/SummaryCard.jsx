// import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { FaArrowUp, FaArrowDown, FaArrowRight, FaStar, FaCheckCircle } from 'react-icons/fa';

const SummaryCard = ({ title, sessions, averageScoreOrg }) => {
  const totalSessions = sessions.length;
  const averageScore = sessions.reduce((sum, s) => sum + s.score, 0) / totalSessions || 0;
  const averageScorePercentage = (averageScore / 10) * 100; 
  const averageExpectedTimeSeconds = sessions.reduce((sum, s) => sum + s.expectTimeSeconds, 0) / totalSessions || 0;
  const averageActualTimeSeconds = sessions.reduce((sum, s) => sum + s.actualTimeSeconds, 0) / totalSessions || 0;
  const sessionsAboveThreshold = sessions.filter(s => s.score >= 8).length;
  const scores = sessions.map(s => s.score || 0);
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
  const successRatePercentage = (sessionsAboveThreshold / totalSessions) * 100 || 0;
  const lastTwoScores = sessions
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 2)
    .map(s => s.score);
 const trend = (lastTwoScores.length === 2 && lastTwoScores[1])
    ? ((lastTwoScores[0] - lastTwoScores[1]) / lastTwoScores[1]) * 100
    : 0;

  const lastInterview = sessions.slice().sort((a, b) => b.id - a.id)[0] || {};
//   const lastInterviewScore = lastInterview.score || 0;
  const lastInterviewId = lastInterview.id || 'N/A';

  return (
    <div className="relative bg-white p-7 rounded-3xl border border-gray-200 shadow-m transition-shadow duration-400 ease-in-out transform"
    style={{width:'max-content'}}
    >
      <h4 className="text-sm font-semibold text-indigo-700 tracking-wide uppercase mb-6">{title}</h4>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Average Score</span>
          <span className="font-semibold text-indigo-600">{averageScore.toFixed(1)} / 10</span>
        </div>
        <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
          <div
            className="h-3 bg-indigo-600 rounded-full transition-all duration-700"
            style={{ width: `${averageScorePercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Expected Time</span>
            <span className="font-semibold text-blue-600">
              {Math.floor(averageExpectedTimeSeconds / 60)}m {Math.floor(averageExpectedTimeSeconds % 60)}s
            </span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-400 rounded-full w-full"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-2"
          style={{gap:'50px'}}
          >
            <span>Actual Time</span>
            <span className="font-semibold text-blue-700">
              {Math.floor(averageActualTimeSeconds / 60)}m {Math.floor(averageActualTimeSeconds % 60)}s
            </span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full">
            <div
              className="h-2 bg-blue-700 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (averageActualTimeSeconds / averageExpectedTimeSeconds) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-700 mb-6">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          <span>{sessionsAboveThreshold} High Scores (≥ 80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span>Top Score: <span className="font-semibold">{(highestScore * 10).toFixed(0)}%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-indigo-500" />
          <span>Total Sessions: <span className="font-semibold">{totalSessions}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600" />
          <span>Success Rate: <span className="font-semibold">{successRatePercentage.toFixed(1)}%</span></span>
        </div>
      </div>

      <div className="flex justify-between mb-6 text-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">Highest Score</p>
          <p className="text-xl font-bold text-green-600">{(highestScore * 10).toFixed(0)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Lowest Score</p>
          <p className="text-xl font-bold text-red-500">{(lowestScore * 10).toFixed(0)}%</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-1">Recent Trend</p>
        <p
          className={`flex items-center justify-center gap-1 text-lg font-semibold ${
            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {trend > 0 && <FaArrowUp />}
          {trend < 0 && <FaArrowDown />}
          {trend === 0 && <FaArrowRight />}
          {trend > 0 ? `+${trend.toFixed(1)}%` : trend < 0 ? trend.toFixed(1) + '%' : 'No Change'}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1">Interview</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Session: {lastInterviewId}</span>
          <span
            className={`text-xl font-bold ${
              averageScoreOrg >= 80
                ? 'text-green-600'
                : averageScoreOrg >= 60
                ? 'text-indigo-600'
                : averageScoreOrg >= 40
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {averageScoreOrg }%
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-20 rounded-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-bl-3xl rounded-tr-3xl" />
    </div>
  );
};

export default SummaryCard;
