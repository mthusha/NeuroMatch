import React from 'react';

const CandidateCard = ({ candidate, applicationStatus, applicationDate, showActionButton }) => {
  const skills = candidate?.skill?.user_skills || [];

  const renderRecommendedIcon = () => (
    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Recommended
    </span>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group hover:border-indigo-200">
      <div className="flex gap-4 items-start">
        {candidate.profilePictureBase64 ? (
          <img
            src={`data:image/jpeg;base64,${candidate.profilePictureBase64}`}
            alt={candidate.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-indigo-100 shadow-sm flex-shrink-0"
          />
        ) : (
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg shadow-sm flex-shrink-0">
            {candidate.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-800 truncate max-w-[180px]">
                  {candidate.name}
                </h3>
                <span className="text-xs text-indigo-600 font-medium whitespace-nowrap">
                  Score: {candidate.score}
                </span>
              </div>

              <p className="text-xs text-gray-500 truncate">{candidate.email}</p>
            </div>

            {showActionButton && (
              <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skills.slice(0, 4).map((skill) => (
              <span key={skill} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-gray-500">+{skills.length - 4} more</span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between mt-3">
            <div>
              {candidate.recommended && renderRecommendedIcon()}
            </div>

            {applicationStatus && (
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`px-2 py-1 rounded-full font-medium ${
                    applicationStatus === 'shortlisted'
                      ? 'bg-green-100 text-green-800'
                      : applicationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
                </span>

                {applicationDate && (
                  <span className="text-xs text-gray-500">
                    {new Date(applicationDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;