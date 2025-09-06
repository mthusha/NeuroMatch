import React, {useEffect, useState } from "react";
// import { fetchJobSeekerSummary } from "../../../../api/JobSeeker"; 
import { fetchInterviewSessionsByApplicant } from "../../../../api/JobSeeker";
import RenderWaitingScore from './../subs/ScoreView';
import InterviewSessions from './../pop/InterviewSessions';
import { fetchJobSeekerScore } from "../../../../api/JobSeeker"; 
const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case 'shortlisted':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'reviewed':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'waiting':
    case 'request interview':
      return 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 border-indigo-200 animate-pulse hover:animate-none hover:from-purple-200 hover:to-indigo-200 transition-all duration-300';
    default:
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }
};

const TempCandidateCard = ({ candidate, applicationStatus, onClick }) => {
    const [showSessions, setShowSessions] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [score, setScore] = useState(null);

    const handleFetchSessions = async () => {
      try {
        const data = await fetchInterviewSessionsByApplicant(candidate.id);
        setSessions(data);
        setShowSessions(true);
      } catch (err) {
    
      }
    };

     useEffect(() => {
        if (!candidate?.id) return;
    
        const loadScore = async () => {
          try {
            const result = await fetchJobSeekerScore(candidate.id);
            setScore(result);
          } catch (error) {
            console.error("Error fetching score:", error);
          }
        };
    
        loadScore();
    }, [candidate.id]);

  return (
    <>
    <div
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all transform "
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg shadow-md">
          {candidate.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{candidate.name}</h3>
          <p className="text-xs text-gray-500 truncate">{candidate.email}</p>
        </div>

        {applicationStatus && (
          <div className="flex items-center gap-2">
            {applicationStatus.toLowerCase() === "waiting" && (
            <div  onClick={handleFetchSessions} className="cursor-pointer">
              <RenderWaitingScore score={score} />
              </div>
            )}
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border shadow-sm ${getStatusStyles(applicationStatus)}`}
            >
                
              {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
            </span>

            
          </div>
        )}
      </div>
    </div>
       {showSessions && <InterviewSessions sessions={sessions} score={score} onClose={() => setShowSessions(false)} jobId ={candidate.id} />}
    </>
  );
};

export default TempCandidateCard;
