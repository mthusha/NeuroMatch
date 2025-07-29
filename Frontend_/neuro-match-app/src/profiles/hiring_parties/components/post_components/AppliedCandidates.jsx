import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';
import { getApplicantsByJobPostId } from '../../../../api/AppliedJobs';

const AppliedCandidates = ({ vacancies, selectedVacancy, onSelectVacancy }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

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
    <div className="bg-white rounded-2xl  p-4 border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">🎯 Applied Candidates</h2>
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
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application, index) => (
              <div key={index} className="pb-4 last:border-b-0">
                <CandidateCard 
                  candidate={{
                    name: application.name,
                    email: application.email,
                    recommended: application.recommended,
                    score: application.score,
                    skill: application.skill,
                    profilePictureBase64: application.profilePictureBase64
                  }}
                  applicationStatus={selectedStatus}
                  applicationDate={application.appliedDate}
                  showActionButton={true}
                  actionText="View Application"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No applications found for this vacancy.</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please select a vacancy to view applications.</p>
      )}
    </div>
  );
};

export default AppliedCandidates;
