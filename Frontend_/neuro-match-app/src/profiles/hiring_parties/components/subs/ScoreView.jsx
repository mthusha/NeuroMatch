const RenderWaitingScore = ({ score }) => (
  <div className="flex items-center ml-3">
    <div className="relative flex items-center justify-center">
      <svg className="w-14 h-14 transform rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="3"
        />
        <path
          className="animate-dash"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="3"
          strokeDasharray="69, 100"
          strokeLinecap="round"
        />
      </svg>
      <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
           {score !== null ? `${score}` : ".."}
        </span>
        <span className="text-[0.5rem] font-semibold text-gray-400 mt-[-4px]">
          SCORE
        </span>
      </div>
    </div>
    <div className="ml-3 text-xs text-gray-500 font-medium">
      {/* <div className="flex items-center text-gray-400">
        <span className="inline-block w-2 h-2 mr-1 rounded-full bg-purple-500 animate-pulse"></span>
        Calculating...
      </div> */}
    </div>
  </div>
);

export default RenderWaitingScore;