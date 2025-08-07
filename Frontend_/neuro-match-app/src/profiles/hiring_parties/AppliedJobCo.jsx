import React, { useState, useEffect, useCallback } from 'react';
import VacancyForm from './components/post_components/VacancyForm';
import Header from '../comman/Header';
import RecruitmentMetrics from './../comman/RecruitmentMetrics';
import { getJobPostsByEmail } from '../../api/Vacancy';
import { useAuth } from '../../context/AuthContext';
import AppliedCandidates from './components/post_components/AppliedCandidates';
const AppliedJobCo = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState([]);
   const [selectedVacancy, setSelectedVacancy] = useState(null);
  

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


  useEffect(() => {

  }, []);

  return (
    <div className="min-h-screen hirin-dash text-gray-800 bg-gray-50">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <VacancyForm
              onSuccess={() => {
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div class="container mx-auto px-4 pt-5 pb-0">
        <Header />
         <AppliedCandidates
            vacancies={vacancies}
            selectedVacancy={selectedVacancy}
            onSelectVacancy={setSelectedVacancy}
          />
        <RecruitmentMetrics />
        {/* <PostViewBar/> */}
        <div></div>
        
      </div>

      <button
        onClick={() => setShowForm(true)} 
        className="create-post-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="sr-only">Create New Post</span>
      </button>
    </div>
  );
};

export default AppliedJobCo;