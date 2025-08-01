import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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

  const renderRecommendedIcon = () => (
    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Recommended
    </span>
  );

  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b p-6">
        <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          Suggested Candidates
        </h2>
        <select
          className="text-sm border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

      {/* Suggestions List */}
      <div className="p-6">
        {selectedVacancyId ? (
          suggestions.length > 0 ? (
            <div className="grid gap-4">
              {suggestions.map(candidate => {
                const skills = candidate.skills || [];

                return (
                  <div key={candidate._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group hover:border-indigo-200">
                    <div className="flex gap-4 items-start">
                      {candidate.profileImage ? (
                        <img
                          src={candidate.profileImage}
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
                            <h3 className="text-base font-semibold text-gray-800 truncate max-w-[180px]">
                              {candidate.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{candidate.email}</p>
                            {candidate.experience && (
                              <p className="text-xs text-gray-600">{candidate.experience}</p>
                            )}
                          </div>
                          <span className="text-xs text-indigo-600 font-medium whitespace-nowrap px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                            Score: {candidate.matchScore}%
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {skills.slice(0, 4).map((skill, index) => (
                            <span key={index} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {skills.length > 4 && (
                            <span className="text-xs text-gray-500">+{skills.length - 4} more</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div>
                            {candidate.recommended && renderRecommendedIcon()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No suggested candidates found for this vacancy.</p>
          )
        ) : (
          <p className="text-sm text-gray-500 italic">Please select a vacancy to view suggestions.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedCandidates;
