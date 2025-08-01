import React, { useState, useEffect } from 'react';
import { fetchAppliedJobsByEmail } from '../../../api/AppliedJobs';
import { useAuth } from "../../../context/AuthContext";
const statusColors = {
  shortlisted: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  default: 'bg-gray-100 text-gray-800 border-gray-200'
};

const positionIcons = {
  'Frontend Developer': '💻',
  'Backend Engineer': '⚙️',
  'UI/UX Designer': '🎨',
  'default': '👔'
};

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const email = user.email;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const appliedJobs = await fetchAppliedJobsByEmail(email);
        setJobs(appliedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [email]);

  const getStatusColor = (status) => {
    if (!status) return statusColors.default;
    const lowerCaseStatus = status.toLowerCase();
    return statusColors[lowerCaseStatus] || statusColors.default;
  };

  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-indigo-700">Your Applied Jobs</h2>
          <div className="text-xs text-gray-500">Loading...</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="animate-pulse flex justify-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          </div>
          <p className="mt-4 text-xs text-gray-500">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-indigo-700">Your Applied Jobs</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xs font-medium text-gray-600 mb-1">Error loading applications</h3>
          <p className="text-xs text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-indigo-700">Your Applied Jobs</h2>
        <div className="text-xs text-gray-500">
          {jobs.length} {jobs.length === 1 ? 'application' : 'applications'}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xs font-medium text-gray-600 mb-1">No applications yet</h3>
          <p className="text-xs text-gray-500">You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-12 bg-white px-6 py-3 border-b border-gray-200">
            <div className="col-span-5 text-xs font-medium text-gray-500">POSITION</div>
            <div className="col-span-3 text-xs font-medium text-gray-500">COMPANY</div>
            <div className="col-span-2 text-xs font-medium text-gray-500">APPLIED DATE</div>
            <div className="col-span-2 text-xs font-medium text-gray-500 text-right">STATUS</div>
          </div>

          <div className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <div key={job.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      {job.posterImageBase64 ? (
                        <img 
                          src={`data:image/jpeg;base64,${job.posterImageBase64}`} 
                          alt={job.appliedJob} 
                          className="w-14 h-14 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-md bg-gray-200 flex items-center justify-center">
                          {positionIcons[job.appliedJob] || positionIcons['default']}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-xs text-gray-600" style={{fontSize:'0.825rem', marginBottom:'5px'}}>{job.appliedJob}</h3>
                      <span className="text-xs text-gray-400 line-clamp-2" style={{ marginBottom:'5px'}}>
                        {job.appliedJobDescription}
                      </span>
                      <p className="text-xs text-gray-500 md:hidden flex items-center">
                        {job.companyProfileImageBase64 ? (
                          <img 
                            src={`data:image/jpeg;base64,${job.companyProfileImageBase64}`} 
                            alt={job.company} 
                            className="w-4 h-4 rounded-full mr-1"
                          />
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-gray-200 mr-1"></span>
                        )}
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 hidden md:flex items-center">
                    {job.companyProfileImageBase64 ? (
                      <img 
                        src={`data:image/jpeg;base64,${job.companyProfileImageBase64}`} 
                        alt={job.company} 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                    )}
                    <div>
                      <p className="text-xs text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">{job.location}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-600">
                      {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 md:text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        getStatusColor(job.status)
                      }`}
                    >
                      {formatStatus(job.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobsList;