import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';
import CandidateProfile from './CandidateProfile';
import { getApplicantsByJobPostId } from '../../../../api/AppliedJobs';

const AppliedCandidates = ({ vacancies, selectedVacancy, onSelectVacancy }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedVacancy) return;
      const res = await getApplicantsByJobPostId(selectedVacancy.id);
      if (res.statusCode === 201) {
        setApplications(res.data);
      } else {
        setApplications([]);
        console.warn("Unexpected response:", res);
      }
    };

    fetchApplications();
  }, [selectedVacancy]);

  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  return (
    <div>
    <div class="flex justify-between items-center mb-4">
        <h2 class="flex items-center gap-2 text-xs font-bold text-indigo-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-6 h-6 text-indigo-500" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>Applied Candidates</h2>
      {/* <div class="text-xs text-gray-500">6 applications</div> */}
    </div>
    <div className="bg-white rounded-2xl  p-4 border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2"> </h2>
        {/* <h2 class="text-2xl font-semibold text-indigo-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-6 h-6 text-indigo-500" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>Applied Candidates</h2> */}
        <div className="flex gap-3">
          <select
            className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-400"
            value={selectedVacancy?.id || ''}
            onChange={(e) => {
              const vacancy = vacancies.find(v => v.id.toString() === e.target.value);
              onSelectVacancy(vacancy || null);
            }}
          >
            <option value="">🎓 Select a vacancy</option>
            {vacancies.map(vacancy => (
              <option key={vacancy.id} value={vacancy.id}>
                {vacancy.title}
              </option>
            ))}
          </select>

          <select
            className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={!selectedVacancy}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
            <option value="shortlisted">Shortlisted</option>
          </select>
        </div>
      </div>

      {selectedVacancy ? (
        <div className="space-y-4">
          {selectedCandidate ? (
              // ✅ Show CandidateProfile in same place
              <CandidateProfile
                candidate={selectedCandidate}
                goBack={() => setSelectedCandidate(null)}
              />
          ) : (
          filteredApplications.length > 0 ? (
            filteredApplications.map((application, index) => (
              <div key={index} className="pb-4 last:border-b-0">
                <CandidateCard 
                  candidate={{
                    name: application.name,
                    email: application.email,
                    recommended: application.recommended,
                    score: application.score,
                    skill: application.skill,
                    profilePictureBase64: application.profilePictureBase64,
                    bio : application.bio
                  }}
                  applicationStatus={application.status} 
                  applicationDate={application.appliedDate}
                  showActionButton={true}
                  actionText="View Application"
                  onClick={() => setSelectedCandidate(application)}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No applications found for this vacancy.</p>
          )
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please select a vacancy to view applications.</p>
      )}
    </div>
    </div>
  );
};

export default AppliedCandidates;
