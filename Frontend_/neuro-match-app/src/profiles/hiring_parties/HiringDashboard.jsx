import React, { useState, useEffect, useCallback } from 'react';
import VacancyForm from './components/post_components/VacancyForm';
import SuggestedCandidates from './components/post_components/SuggestedCandidates';
import AppliedCandidates from './components/post_components/AppliedCandidates';
import JobPosts from './components/post_components/JobPosts';
import ProfileCard from './components/ProfileCard';
import Header from '../comman/Header';
import RecruitmentMetrics from './../comman/RecruitmentMetrics';
import { useAuth } from '../../context/AuthContext';
import { getJobPostsByEmail } from '../../api/Vacancy';
import './hiringDash.css';

const HiringDashboard = () => {
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
    <div className="min-h-screen hirin-dash text-gray-800 bg-gray-50">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <VacancyForm
              onSuccess={() => {
                fetchVacancies();
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Header />
        <ProfileCard />
        <RecruitmentMetrics />
        {/* Main Content */}
        <div className="flex flex-col">
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
        </div>

        {/* Chart */}
        <div className="bg-in-box rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300 h-fit border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Insights</h2>
              <p className="text-sm text-gray-500">Key metrics and candidate distribution</p>
            </div>
            <div className="flex gap-3">
              <select className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Circular Progress Indicators */}
            <div className="bg-in-in-box rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
              <div className="flex flex-wrap justify-between gap-4">
                {[
                  { name: 'Hired', value: 18, color: '#10b981', target: 25 },
                  { name: 'Interview', value: 32, color: '#3b82f6', target: 40 },
                  { name: 'Screening', value: 45, color: '#f59e0b', target: 60 },
                  { name: 'Applied', value: 120, color: '#8b5cf6', target: 150 }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={`${item.color}20`}
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="3"
                          strokeDasharray={`${(item.value / item.target) * 100}, 100`}
                        />
                        <text x="18" y="20.5" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="bold">
                          {item.value}
                        </text>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.name}</span>
                    <span className="text-xs text-gray-500">{Math.round((item.value / item.target) * 100)}% of target</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time to Hire Metrics */}
            <div className="mt-6 bg-in-in-box rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Time to Hire Metrics</h3>
              <div className="grid gap-4">
                {[
                  { metric: 'Avg. Time to Hire', value: '14 days', change: '-2 days', positive: true },
                  { metric: 'Avg. Time to Screen', value: '3.2 days', change: '-0.5 days', positive: true },
                  { metric: 'Interview to Offer', value: '7 days', change: '+1 day', positive: false }
                ].map((item, index) => (
                  <div key={index} className="bg-in-in-in-box p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">{item.metric}</p>
                    <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs font-medium ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringDashboard;