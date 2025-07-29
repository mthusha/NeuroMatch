import React, { useState, useEffect } from 'react';
import { Sparkles, Eye  } from 'lucide-react';
import fetchSuggestedCandidates from "../../../../api/JobSeeker";

const SuggestedCandidates = ({ vacancies = [], onSelectVacancy = () => {} }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState('');
// console.log(vacancies)
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
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 text-sm">
        <h2 className="text-2xl font-bold text-neon-green flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neon-green" /> Suggested Candidates
        </h2>
        <select
          className="bg-gray-800 border border-gray-600 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
          // value={selectedVacancyId}
          onChange={(e) => {
            const value = e.target.value;
            console.log(value)
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
      {selectedVacancyId ? (
        <div className="flex flex-col gap-4 text-sm">
          {suggestions.map(candidate => (
            <div
              key={candidate._id}
              className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-600 transition duration-200"
            >
              <div className="flex items-center gap-4">
                {candidate.profileImage ? (
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-neon-green text-black flex items-center justify-center font-bold text-lg bg-gray-700">
                    {candidate.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold">{candidate.name}</h3>
                  <p className="text-gray-400">{candidate.experience} experience</p>
                  <p className="text-gray-300 mt-1">
                    Skills: <span className="text-neon-green">{candidate.skills.join(', ')}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neon-green font-semibold bg-gray-700 px-3 py-1 rounded-full text-sm" style={{
                     fontSize: 'smaller',
                    //  background:'#853ce230',

                }}>
                  <button className="px-2 py-1 rounded">
                   {candidate.matchScore}%
                  </button>
                </span>
                <span className="text-neon-green font-semibold bg-gray-700 px-3 py-1 rounded-full">
                <button className="px-2 py-1 rounded">
                  <Eye className="w-5 h-5 text-[#9333ea] hover:text-[#6366f1] transition-colors duration-200" />
                </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Please select a vacancy to view suggested candidates.</p>
      )}

    </div>
  );
};

export default SuggestedCandidates;
