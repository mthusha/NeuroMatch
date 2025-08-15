import React from 'react';

const CandidateCard = ({ candidate, applicationStatus, applicationDate, showActionButton, onClick }) => {
  const skills = candidate?.skill?.user_skills || [];

  const renderRecommendedIcon = () => (
    <span className="inline-flex items-center gap-1.5 text-green-700 text-xs font-medium bg-green-100 px-2.5 py-1 rounded-full shadow-sm border border-green-200">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Recommended
    </span>
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Request Interview':
        return 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 border-indigo-200 animate-pulse hover:animate-none hover:from-purple-200 hover:to-indigo-200 transition-all duration-300';
      case 'Waiting':
        return 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 border-indigo-200 animate-pulse hover:animate-none hover:from-purple-200 hover:to-indigo-200 transition-all duration-300';
        default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4 items-start">
        <div className="relative">
          {candidate.profilePictureBase64 ? (
            <div className="p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full">
              <img
                src={`data:image/jpeg;base64,${candidate.profilePictureBase64}`}
                alt={candidate.name}
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            </div>
          ) : (
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 font-bold text-xl shadow-md">
              {candidate.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}

          {candidate.score && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <div className="bg-indigo-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {candidate.score}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[180px]">
                  {candidate.name}
                </h3>
                {candidate.recommended && renderRecommendedIcon()}
              </div>
              {applicationDate && (
                <span className="text-xs text-gray-500">
                  Applied on {new Date(applicationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>

            {applicationStatus && (
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full border shadow-sm ${getStatusStyles(applicationStatus)}`}
              >
                {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
              </span>
            )}
          </div>

          {candidate.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 relative">
              {candidate.description}. {candidate.subject}
              <span className="absolute right-0 bottom-0 w-12 h-full bg-gradient-to-l from-white"></span>
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 shadow-sm hover:bg-indigo-100 transition-colors"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-gray-500 flex items-center">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
