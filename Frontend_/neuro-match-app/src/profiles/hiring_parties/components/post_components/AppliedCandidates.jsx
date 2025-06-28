import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';

const AppliedCandidates = ({ vacancies, selectedVacancy, onSelectVacancy }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    if (selectedVacancy?._id) {
      fetch(`/api/applications?vacancyId=${selectedVacancy._id}&status=${selectedStatus}`)
        .then(res => res.json())
        .then(data => setApplications(data));
    }
  }, [selectedVacancy, selectedStatus]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-indigo-700">Applied Candidates</h2>
        <div className="flex gap-4">
          <select
            className="border border-indigo-300 rounded-md p-2 text-sm text-gray-700"
            value={selectedVacancy?._id || ''}
            onChange={(e) => onSelectVacancy(vacancies.find(v => v._id === e.target.value))}
          >
            <option value="">Select a vacancy</option>
            {vacancies.map(vacancy => (
              <option key={vacancy._id} value={vacancy._id}>
                {vacancy.title}
              </option>
            ))}
          </select>
          <select
            className="border border-indigo-300 rounded-md p-2 text-sm text-gray-700"
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
          {applications.length > 0 ? (
            applications.map(application => (
              <div key={application._id} className="border-b pb-4 last:border-b-0">
                <CandidateCard 
                  candidate={application.candidate} 
                  applicationStatus={application.status}
                  applicationDate={application.appliedAt}
                  showActionButton={true}
                  actionText="View Application"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No applications found for this vacancy</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please select a vacancy to view applications</p>
      )}
    </div>
  );
};

export default AppliedCandidates;
