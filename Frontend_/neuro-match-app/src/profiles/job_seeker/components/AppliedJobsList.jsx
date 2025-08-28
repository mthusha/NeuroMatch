import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppliedJobsByEmail } from '../../../api/AppliedJobs';
import { useAuth } from "../../../context/AuthContext";
import FullscreenLoader from './../../comman/FullscreenLoader'
const statusStyles = {
  shortlisted: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
  rejected: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300',
  pending: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
  reviewed: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
  default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300',
  'request interview': 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 border-indigo-200 animate-pulse hover:animate-none hover:from-purple-200 hover:to-indigo-200 transition-all duration-300',
  'waiting': 'bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 border-indigo-200 animate-pulse  transition-all duration-300' 

};


const positionIcons = {
  'Frontend Developer': '💻',
  'Backend Engineer': '⚙️',
  'UI/UX Designer': '🎨',
  default: '👔'
};

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useAuth();
  const email = user.email;
  const navigate = useNavigate();
  const [loadingInterview, setLoadingInterview] = useState(false);

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

  const getStatusStyle = (status) => {
    if (!status) return statusStyles.default;
    const lowerCaseStatus = status.toLowerCase();
    return statusStyles[lowerCaseStatus] || statusStyles.default;
  };

  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

 const handleStatusClick = async (status, jobId) => {
  if (status.toLowerCase() === 'request interview') {
    setLoadingInterview(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/seeker-interview/${jobId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setLoadingInterview(false);
    }
  }
};

  if (loading) {
    return (
      <div className="max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-indigo-700">Your Applied Jobs</h2>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
          <div className="animate-pulse flex justify-center">
            <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-indigo-700">Your Applied Jobs</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
          <div className="text-red-500 mb-3">
            ⚠️
          </div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Error loading applications</h3>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
     <>
      {loadingInterview && <FullscreenLoader />}
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-indigo-700">Your Applied Jobs</h2>
        <div className="text-sm text-gray-500">
          {jobs.length} {jobs.length === 1 ? 'application' : 'applications'}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
          <div className="flex flex-col justify-center items-center ">
             <img
               src="/static/img/file-not-found.png"
               alt="Select a vacancy"
               className="w-24 h-24 mb-4"
             />

          </div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">No applications yet</h3>
          <p className="text-sm text-gray-500">You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md no-scrollbar"
          style={{ maxHeight: '700px', overflow: 'auto' }}
        >
          <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="col-span-5 text-xs font-semibold text-gray-500">POSITION</div>
            <div className="col-span-3 text-xs font-semibold text-gray-500">COMPANY</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500">APPLIED DATE</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 text-right">STATUS</div>
          </div>

          <div className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="px-6 py-5 hover:bg-indigo-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.01]"
                onClick={() => setSelectedJob(job)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      {job.posterImageBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${job.posterImageBase64}`}
                          alt={job.appliedJob}
                          className="w-14 h-14 rounded-lg object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                          {positionIcons[job.appliedJob] || positionIcons.default}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{job.appliedJob}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{job.appliedJobDescription}</p>
                      <p className="text-xs text-gray-500 md:hidden flex items-center mt-1">
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
                      <div className="w-8 h-8 rounded-full bg-gray-100 mr-3"></div>
                    )}
                    <div>
                      <p className="text-sm text-gray-800">{job.company}</p>
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
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border shadow-sm w-max ${getStatusStyle(job.status)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusClick(job.status, job.id);
                      }}
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

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
              onClick={() => setSelectedJob(null)}
            >
              ✖
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-3">{selectedJob.subject || selectedJob.appliedJob}</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{selectedJob.appliedJobDescription}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AppliedJobsList;
