import React, { useState } from "react";
import { UserCheck } from "lucide-react";
import CreateTempInterviewModal from "./CreateTempInterviewModal"; 

const CVResultsModal = ({ results, onClose, jobPostId }) => {
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const onNeuraCheck = (candidate) => {
    setSelectedCandidate(candidate);
    setShowInterviewModal(true);
  };

    
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full shadow-lg animate-slide-down">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-indigo-600">CV Results</h2>
          <button 
            className="text-gray-500 hover:text-gray-800 text-xl font-bold" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
           <thead className="bg-indigo-50 sticky top-0 rounded-t-xl">
             <tr>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700 rounded-tl-xl">
                 Name
               </th>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700">Email</th>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700">PDF File</th>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700">Match</th>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700">Skills</th>
               <th className="px-4 py-2 text-left text-sm font-medium text-indigo-700 rounded-tr-xl">
                 Action
               </th>
             </tr>
           </thead>

            <tbody className="divide-y divide-gray-100">
              {results.map((cv, index) => (
                <tr key={index} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-2 text-sm font-medium text-gray-700">{cv.candidate_name || "Unknown"}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{cv.email || "No email"}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{cv.pdf_name}</td>
                  <td className="px-4 py-2 text-sm font-medium text-green-600">{cv.match_percentage}%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cv.skills.join(", ")}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="bg-indigo-600 text-white px-3 py-1 rounded-xl text-xs hover:bg-indigo-700"
                      onClick={() => onNeuraCheck(cv)}
                    >
                      <UserCheck size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            className="flex items-center gap-2 text-xs text-indigo-600 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    {showInterviewModal && selectedCandidate && (
        <CreateTempInterviewModal
          onClose={() => setShowInterviewModal(false)}
          candidateData={selectedCandidate}
          jobPostId={jobPostId}
        />
      )}
    </>
  );
};

export default CVResultsModal;
