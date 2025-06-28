import React from 'react';

const CandidateCard = ({ candidate, applicationStatus, applicationDate, showActionButton, actionText }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {candidate.name.charAt(0)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-500">{candidate.title || 'Software Developer'}</p>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {candidate.skills.slice(0, 4).map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
          
          {applicationStatus && (
            <div className="mt-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                applicationStatus === 'shortlisted' ? 'bg-green-100 text-green-800' :
                applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
              </span>
              {applicationDate && (
                <span className="text-xs text-gray-500 ml-2">
                  Applied on {new Date(applicationDate).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showActionButton && (
        <div className="mt-4 flex justify-end">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;