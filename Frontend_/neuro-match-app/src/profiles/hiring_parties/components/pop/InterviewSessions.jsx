import React, { useEffect, useState } from 'react';
import { FaComments, FaPlay, FaPause  } from "react-icons/fa";
import TimeComparisonChart from "./../chart/TimeComparisonChart"
import ScoreTrendChart from "./../chart/ScoreTrendChart"
import SummaryCard from "./../chart/SummaryCard"
import { fetchInterviewVideo } from "../../../../api/Interview";
const InterviewSessions = ({ sessions, onClose, score, jobId}) => {
  const [showChat, setShowChat] = useState(false);
  const averageScore = score;
  const [videoUrl, setVideoUrl] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
 
   const handlePlayPause = async () => {
        setIsPlaying(true);
    try {
      if (!videoUrl) {
        const url = await fetchInterviewVideo(jobId);
        setVideoUrl(url);
      }
      setShowVideoModal(true);
    } catch (error) {
      console.error("Could not load video:", error);
    }
  };

  // const avgTimeDeviation = sessions.filter(s => s.expectTimeSeconds && s.actualTimeSeconds).length
  //   ? (sessions.reduce((acc, curr) => {
  //       if (curr.expectTimeSeconds && curr.actualTimeSeconds) {
  //         return acc + (curr.actualTimeSeconds - curr.expectTimeSeconds);
  //       }
  //       return acc;
  //     }, 0) / sessions.filter(s => s.expectTimeSeconds && s.actualTimeSeconds).length).toFixed(0)
  //   : 'N/A';

useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      if (showVideoModal) {
        setShowVideoModal(false);
        setIsPlaying(false); 
      } else {
        onClose();
      }
    }
  };

  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [onClose, showVideoModal]);


  return (
<div  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black">
  <div
    className={`relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden animate-modalEnter flex transition-all duration-500 ease-in-out`}
    style={{maxWidth:"fit-content"}}
  >
  {/* <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      /> */}
      
    <div
      className={`border-r border-gray-200 bg-gray-50 overflow-y-auto transition-all duration-500 ease-in-out no-scrollbar`}
      style={{ width: showChat ? "20rem" : "0rem", margin:'10px' }}
    >
      

      {showChat && (
        <>
          <div className="p-4 bg-white from-indigo-50 to-purple-50 border-b border-gray-200 sticky top-0 z-10 "
          style={{borderRadius:'6px',  display:'flex', justifyContent:'space-between'}}
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {/* <FaSms className="text-indigo-500" /> */}
              Conversation
            </h3>
              <button
              onClick={handlePlayPause}
              // className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              {isPlaying ? (
                  <FaPause style={{ color: 'red' }} />
                ) : (
                  <FaPlay style={{ color: 'green' }} />
                )}
              {/* Watch Interview */}
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <ChatSessionItem key={session.id} session={session} />
            ))}
          </div>
        </>
      )}
    </div>

    <div className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out">
      <div className="p-4 bg-white from-indigo-50 to-purple-50  sticky top-0 z-10 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
           <button
          onClick={() => setShowChat(!showChat)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={showChat ? "Hide chat" : "Show chat"}
        >
          <FaComments className={`text-gray-500 ${showChat ? "text-indigo-600" : ""}`} style={{fontSize:'18px'}} />
        </button>
          {/* Interview Performance Overview */}
        </h3>
        <div>
       
         {/* previous btn */}
        </div>
        
      </div>

     <div className="flex flex-col md:flex-row gap-4 p-4"
    //  style={{width:'fit-content'}}
     >
            <div className="flex flex-col gap-4 w-full md:w-2/3"
            style={{maxWidth:"fit-content"}}
            >
              <ScoreTrendChart sessions={sessions} />
              <TimeComparisonChart sessions={sessions} />
            </div>
             <div className="flex flex-col gap-4 w-full md:w-1/3">
             <SummaryCard title="Performance Summary" sessions={sessions} averageScoreOrg = {averageScore}/>
             
            </div>
      </div>
    </div>
  </div>
   {showVideoModal && (
        <VideoModal videoUrl={videoUrl} onClose={() => setShowVideoModal(false)} />
      )}
</div>

  );
};


const ChatSessionItem = ({ session }) => (
  <div className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <div className="text-xs font-medium text-gray-500">
        Session #{session.id}
        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
          {session.sessionId.substring(0, 8)}...
        </span>
      </div>
      {session.score !== null && (
        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
          session.score >= 8 ? 'bg-green-100 text-green-800' :
          session.score >= 5 ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {session.score}/10
        </div>
      )}
    </div>

    <div className="space-y-3 mt-3">
      {session.airesponse && (
        <div className="flex gap-2">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-[80%]">
            <p className="text-sm text-gray-800">{session.airesponse}</p>
          </div>
        </div>
      )}

      {session.userResponse && (
        <div className="flex gap-2 justify-end">
          <div className="bg-indigo-600 px-3 py-2 rounded-lg max-w-[80%]">
            <p className="text-sm text-white">{session.userResponse}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>

    {session.expectTimeSeconds !== null && session.actualTimeSeconds !== null && (
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Time:</span>
        <span className="font-medium">
          <span className="text-blue-500">{session.actualTimeSeconds}s</span>
          <span> / </span>
          <span className="text-gray-600">{session.expectTimeSeconds}s</span>
        </span>
        <span className={`ml-1 ${
          session.actualTimeSeconds > session.expectTimeSeconds ? 'text-red-500' : 'text-green-500'
        }`}>
          ({session.actualTimeSeconds > session.expectTimeSeconds ? '+' : ''}
          {session.actualTimeSeconds - session.expectTimeSeconds}s)
        </span>
      </div>
    )}
  </div>
);

const VideoModal = ({ videoUrl, onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black bg-opacity-70 flex items-center justify-center animate-fadeIn">
    <div className="relative bg-black rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-2xl hover:text-red-400"
      >
        {/* <FaTimes /> */}
      </button>
      {videoUrl ? (
        <video controls autoPlay className="w-full h-auto rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="p-8 text-center text-white">Loading video...</div>
      )}
    </div>
  </div>
);

export default InterviewSessions;