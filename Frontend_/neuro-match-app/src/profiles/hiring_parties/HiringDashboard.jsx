import React, { useState, useEffect } from 'react';
import VacancyForm from './components/post_components/VacancyForm';
import SuggestedCandidates from './components/post_components/SuggestedCandidates';
import AppliedCandidates from './components/post_components/AppliedCandidates';
import JobPosts from './components/post_components/JobPosts';
import ProfileCard from './components/ProfileCard';
import { useAuth } from '../../context/AuthContext';
import { getJobPostsByEmail } from '../../api/Vacancy';
const HiringDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('post');
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      if (!user?.email) return;
      try {
        const response = await getJobPostsByEmail(user.email);
        // console.log("Fetched vacancies:", response.data.data);
        setVacancies(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch vacancies:', error);
      }
    };
    fetchVacancies();
  }, [user]);
  
  

  const chartData = [
    { name: 'Applications', value: 120 },
    { name: 'Shortlisted', value: 45 },
    { name: 'Rejected', value: 30 },
  ];

  const COLORS = ['#8b5cf6', '#6366f1', '#a78bfa'];

  const mockPosts = [
    {
      title: 'Senior Frontend Developer',
      location: 'Colombo, Sri Lanka',
      description: 'We\'re looking for a React expert to build modern UIs for enterprise clients.',
      postedAt: '2025-06-20',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      type: 'Full-time',
      salary: '$80k - $120k'
    },
    {
      title: 'AI Engineer',
      location: 'Remote',
      description: 'Join our team to work on cutting-edge AI-driven products using TensorFlow and PyTorch.',
      postedAt: '2025-06-18',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      type: 'Full-time',
      salary: '$90k - $140k'
    },
    {
      title: 'UX Designer',
      location: 'New York, USA',
      description: 'Create beautiful, intuitive interfaces for our next-generation products.',
      postedAt: '2025-06-15',
      image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      type: 'Contract',
      salary: '$70/hr'
    },
    {
      title: 'DevOps Engineer',
      location: 'Berlin, Germany',
      description: 'Implement CI/CD pipelines and cloud infrastructure for our global platform.',
      postedAt: '2025-06-10',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      type: 'Full-time',
      salary: '€75k - €95k'
    },
    {
      title: 'Data Scientist',
      location: 'Singapore',
      description: 'Analyze complex datasets and build predictive models for business insights.',
      postedAt: '2025-06-08',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      type: 'Full-time',
      salary: 'S$100k - S$130k'
    }
  ];

  return (

    <div className="min-h-screen bg-gray-900 text-gray-100">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <VacancyForm
              onSuccess={(newVacancy) => {
                setVacancies([...vacancies, newVacancy]);
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/*  */}
        <ProfileCard/>
        {/* Stats Overview */}
        <div className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 max-w-xs" style={{minWidth:"100%"}}>
           <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Recruitment Metrics
          </h3>

          <div className="space-y-5">
            {/* Open Positions */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-900/30 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Open Positions</span>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">24</p>
                <p className="text-indigo-400 text-xs">+2 last month</p>
              </div>
            </div>

            {/* Active Candidates */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-900/30 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Active Candidates</span>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">142</p>
                <p className="text-purple-400 text-xs">+24 this week</p>
              </div>
            </div>

            {/* Avg. Time to Hire */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Avg. Time to Hire</span>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">32 days</p>
                <p className="text-blue-400 text-xs">-3 last quarter</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Hiring Goal Progress</span>
              <span className="text-white font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
          </div>
        </div>

        

        {/* Main Content */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              className={`py-2 px-4 font-medium text-sm rounded-md transition-all ${
                activeTab === 'post' ? 'bg-indigo-900 text-indigo-100 shadow-md' : 'text-gray-400 hover:text-gray-200'
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
                activeTab === 'suggested' ? 'bg-indigo-900 text-indigo-100 shadow-md' : 'text-gray-400 hover:text-gray-200'
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
                activeTab === 'applications' ? 'bg-indigo-900 text-indigo-100 shadow-md' : 'text-gray-400 hover:text-gray-200'
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
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700 hover:border-indigo-500 transition-colors duration-300 h-fit">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Hiring Insights</h2>
              <p className="text-sm text-gray-400">Key metrics and candidate distribution</p>
            </div>
            <div className="flex gap-3">
              <select className="bg-gray-700/50 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Circular Progress Indicators */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Application Status</h3>
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
                          stroke={item.color + '20'}
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
                        <text x="18" y="20.5" textAnchor="middle" fill="#f3f4f6" fontSize="10" fontWeight="bold">
                          {item.value}
                        </text>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-400">{item.name}</span>
                    <span className="text-xs text-gray-500">{Math.round((item.value / item.target) * 100)}% of target</span>
                  </div>
                ))}
              </div>
            </div>


          </div>

  {/* Time to Hire Metrics */}
          <div className="mt-6 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Time to Hire Metrics</h3>
            <div className="grid  gap-4">
              {[
                { metric: 'Avg. Time to Hire', value: '14 days', change: '-2 days', positive: true },
                { metric: 'Avg. Time to Screen', value: '3.2 days', change: '-0.5 days', positive: true },
                { metric: 'Interview to Offer', value: '7 days', change: '+1 day', positive: false }
              ].map((item, index) => (
                <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">{item.metric}</p>
                  <p className="text-xl font-bold text-white mt-1">{item.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
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
  );
};

export default HiringDashboard;