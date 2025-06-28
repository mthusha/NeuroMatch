import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';

const SuggestedCandidates = ({ vacancies, onSelectVacancy }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState('');

  useEffect(() => {
    if (selectedVacancyId) {
      fetch(`/api/suggestions?vacancyId=${selectedVacancyId}`)
        .then(res => res.json())
        .then(data => setSuggestions(data));
    }
  }, [selectedVacancyId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Suggested Candidates</h2>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={selectedVacancyId}
          onChange={(e) => {
            setSelectedVacancyId(e.target.value);
            onSelectVacancy(vacancies.find(v => v._id === e.target.value));
          }}
        >
          <option value="">Select a vacancy</option>
          {vacancies.map(vacancy => (
            <option key={vacancy._id} value={vacancy._id}>
              {vacancy.title}
            </option>
          ))}
        </select>
      </div>
      
      {selectedVacancyId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map(candidate => (
            <CandidateCard 
              key={candidate._id} 
              candidate={candidate} 
              showActionButton={true}
              actionText="View Profile"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Please select a vacancy to view suggested candidates</p>
      )}
    </div>
  );
};

export default SuggestedCandidates;