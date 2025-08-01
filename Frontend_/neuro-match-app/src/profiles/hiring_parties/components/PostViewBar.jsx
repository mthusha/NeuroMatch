import React, { useState, useEffect, useCallback } from 'react';
import VacancyForm from './post_components/VacancyForm';
import SuggestedCandidates from './post_components/SuggestedCandidates';
import AppliedCandidates from './post_components/AppliedCandidates';
import JobPosts from './post_components/JobPosts';
import { useAuth } from '../../../context/AuthContext';
import { getJobPostsByEmail } from '../../../api/Vacancy';

const PostViewBar = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('post');
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVacancies = useCallback(async () => {
    if (!user?.email) return;
    try {
      const response = await getJobPostsByEmail(user.email);
      setVacancies(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch vacancies:', error);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return (
    <div className="flex flex-col mt-5">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-in-box p-1 rounded-lg border border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm rounded-md transition-all ${
            activeTab === 'post' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('post')}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Job Posts
          </div>
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm rounded-md transition-all ${
            activeTab === 'suggested' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('suggested')}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Suggested
          </div>
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm rounded-md transition-all ${
            activeTab === 'applications' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('applications')}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Applications
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 w-full">
        {activeTab === 'post' && (
          <JobPosts 
            posts={vacancies} 
            onCreateNew={() => setShowForm(true)} 
          />
        )}

        {activeTab === 'suggested' && (
          <SuggestedCandidates
            vacancies={vacancies}
            onSelectVacancy={setSelectedVacancy}
          />
        )}

        {activeTab === 'applications' && (
          <AppliedCandidates
            vacancies={vacancies}
            selectedVacancy={selectedVacancy}
            onSelectVacancy={setSelectedVacancy}
          />
        )}
      </div>

      {/* Render the form modal if showForm is true */}
      {showForm && (
        <VacancyForm 
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchVacancies();
          }}
        />
      )}
    </div>
  );
};

export default PostViewBar;