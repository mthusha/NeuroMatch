import React, { useState, useEffect } from 'react';
import VacancyForm from './components/post_components/VacancyForm';
import ProfileCard from './components/ProfileCard';
import Header from '../comman/Header';
import RecruitmentMetrics from './../comman/RecruitmentMetrics';
// import PostViewBar from './components/PostViewBar'
import './hiringDash.css';

const HiringDashboard = () => {
  const [showForm, setShowForm] = useState(false);
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
        <ProfileCard />
        <RecruitmentMetrics />
        {/* <PostViewBar/> */}
        <div></div>
        
      </div>
    </div>
  );
};

export default HiringDashboard;