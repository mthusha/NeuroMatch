import React, { useState, useEffect } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import fetchSuggestedCandidates from "../../../../api/JobSeeker";

const SuggestedCandidates = ({ vacancies = [], onSelectVacancy = () => {} }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState('');

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!selectedVacancyId) return;
      try {
        const data = await fetchSuggestedCandidates(selectedVacancyId);
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      }
    };

    loadSuggestions();
  }, [selectedVacancyId]);

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 p-4">
        <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" /> Suggested Candidates
        </h2>
        <select
         className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-400"
          onChange={(e) => {
            const value = e.target.value;
            setSelectedVacancyId(value);
            const selectedVacancy = vacancies.find(v => v.id === value);
            onSelectVacancy(selectedVacancy);
          }}
        >
          <option value="">Select a vacancy</option>
          {vacancies.map(vacancy => (
            <option key={vacancy.id} value={vacancy.id}>
              {vacancy.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="p-4">
        {selectedVacancyId ? (
          <div className="flex flex-col gap-3">
            {suggestions.map(candidate => (
              <div
                key={candidate._id}
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:bg-gray-100 transition duration-200 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {candidate.profileImage ? (
                    <img
                      src={candidate.profileImage}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
                      {candidate.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                    <p className="text-gray-600 text-sm">{candidate.experience} experience</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Skills: <span className="text-indigo-600">{candidate.skills.join(', ')}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full text-xs">
                    {candidate.matchScore}%
                  </span>
                  <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    <Eye className="w-5 h-5 text-indigo-600 hover:text-indigo-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm p-4">Please select a vacancy to view suggested candidates.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedCandidates;