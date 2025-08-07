import React from "react";
import { FaComments, FaTrashAlt } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";

const InterviewHistoryView = ({ groupedBySession, selectedSession, setSelectedSession, showChat, setShowChat, handleDeleteSession }) => {
  return (
    <div style={{maxHeight:'920px'}} className="flex flex-col h-full">
      {!selectedSession || !showChat ? (
        <div style={{maxHeight:'920px'}} className="bg-white p-3 rounded-lg shadow-xs border border-gray-100 flex-grow flex flex-col">
          <h3 className="text-base font-semibold text-gray-700 mb-2 flex items-center">
            <FaComments className="text-indigo-500 mr-2 text-sm" /> Interview Sessions
          </h3>
          <div className="space-y-2.5 flex-grow overflow-y-auto no-scrollbar">
            {Object.keys(groupedBySession).map((sessionId, index) => (
              <div
                key={sessionId}
                className="group relative p-3 rounded-lg cursor-pointer transition-all duration-200 bg-indigo-50 hover:shadow-sm border border-transparent hover:border-indigo-200"
                onClick={() => {
                  setSelectedSession(groupedBySession[sessionId]);
                  setShowChat(true);
                }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm font-semibold shadow-sm">
                    {index + 1}
                  </div>

                  <div className="flex-grow">
                    <div className="font-medium text-gray-800 text-sm flex justify-between items-start">
                      <span className="">Session: {sessionId}</span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(sessionId);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
                        aria-label="Delete session"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="text-xs text-gray-500 mt-1">
                      {groupedBySession[sessionId].length} messages •
                      <span className="ml-1">
                        Avg:{" "}
                        <span
                          className={
                            (avg => {
                              if (avg >= 7) return "text-green-600 ";
                              if (avg >= 4) return "text-yellow-600 ";
                              return "text-red-600 ";
                            })(
                              groupedBySession[sessionId].reduce(
                                (sum, item) => sum + item.score,
                                0
                              ) / groupedBySession[sessionId].length
                            )
                          }
                        >
                          {(
                            groupedBySession[sessionId].reduce(
                              (sum, item) => sum + item.score,
                              0
                            ) / groupedBySession[sessionId].length
                          ).toFixed(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      ) : (
        <div style={{maxHeight:'920px'}} className="bg-white p-3 rounded-lg shadow-xs border border-gray-100 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b pb-2">
            <button 
              onClick={() => setShowChat(false)}
              className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors text-sm"
            >
              <FiChevronLeft className="h-4 w-4 mr-1" />
              <span>Sessions</span>
            </button>
            <button 
              onClick={() => handleDeleteSession(selectedSession[0].sessionId)}
              className="text-gray-400 hover:text-red-500 transition-colors p-0.5 text-sm"
              aria-label="Delete session"
            >
              <FaTrashAlt className="text-xs" />
            </button>
          </div>

          <div className="space-y-2 flex-grow overflow-y-auto pr-1 no-scrollbar">
            {selectedSession.map((item, index) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex justify-end">
                  <div className="bg-indigo-50 text-gray-800 rounded-lg p-2 max-w-[85%] relative">
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-indigo-50 transform rotate-45"></div>
                    <div className="flex items-center">
                      {/* <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 text-xs font-medium">
                        {index + 1}
                      </div> */}
                      <div className="font-medium text-indigo-600 text-xs">You</div>
                    </div>
                    <p className="mt-1 text-sm">{item.userResponse}</p>
                    {item.actualTimeSeconds && (
                      <div className="text-[0.65rem] text-gray-400 mt-1 text-right">
                        {item.actualTimeSeconds}s
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-gray-50 text-gray-800 rounded-lg p-2 max-w-[85%] relative">
                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-gray-50 transform rotate-45"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {/* <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-2 text-xs font-medium">
                          AI
                        </div> */}
                        <div className="font-medium text-gray-600 text-xs">NeuroMatch</div>
                      </div>
                      <div className={`ml-1 text-[0.65rem] font-bold px-1 py-0.5 rounded ${
                        item.score >= 7 ? 'bg-green-50 text-green-700' : 
                        item.score >= 4 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {item.score}/10
                      </div>
                    </div>
                    <p className="mt-1 text-sm">{item.airesponse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewHistoryView;