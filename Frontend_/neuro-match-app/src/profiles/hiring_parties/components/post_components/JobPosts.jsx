import React, { useEffect, useState } from 'react';
import { getAppliedJobUserUI } from '../../../../api/AppliedJobs';

const JobPosts = ({ posts, onDelete }) => {

  const [appliedData, setAppliedData] = useState({});

  useEffect(() => {
    const fetchAppliedData = async () => {
      for (const post of posts) {
        if (post.id) {
          const data = await getAppliedJobUserUI(post.id);
          if (data) {
            setAppliedData(prev => ({
              ...prev,
              [post.id]: data
            }));
          }
        }
      }
    };
    fetchAppliedData();
  }, [posts]);

  return (
    <div className="job-feed">
      <h3 className="feed-title text-xl font-bold text-indigo-600 flex items-center gap-2">Recent Job Posts</h3>
      
      <div className="grid gap-6">
        {posts.map((post, index) => {
          const appliedInfo = appliedData[post.id] || {};
          return (
          <div
            key={index}
            className="job-card group relative rounded-lg p-4"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-48 relative">
                {post?.posterImageBase64 ? (
                  <img
                    className="job-image"
                    src={`${post.posterImageBase64}`}
                    alt={post.title || 'Job Image'}
                  />
                ) : (
                  <div className="job-image-placeholder">
                    <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-indigo-500 mt-2">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="job-details"
              style={{padding:"0px 0px 0px 20px"}}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post.title || 'No Title'}</h3>
                    <div className="text-xs text-gray-500">
                    Posted {post.postedOn || 'recently'}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {post.location || 'Remote'}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onDelete && onDelete(post.id || index)}
                    className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Delete job post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {post.description || 'No description provided'}
                </div>
                
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                      {post.type || 'Full-time'}
                    </span>
                    
                    <div className="text-sm text-indigo-600">
                      {post.salaryFrom && post.salaryTo
                        ? `$${Math.round(post.salaryFrom / 1000)}k - $${Math.round(post.salaryTo / 1000)}k`
                        : post.salaryFrom
                        ? `$${Math.round(post.salaryFrom / 1000)}k`
                        : 'Salary not specified'}
                    </div>
                  </div>

                  {appliedInfo.profilePictureBase64 && (
                      <div className="flex items-center -space-x-2">
                        {appliedInfo.profilePictureBase64.slice(0, 3).map((imgBase64, idx) => (
                          <img
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                            src={`data:image/jpeg;base64,${imgBase64}`}
                            alt={`Applicant ${idx + 1}`}
                          />
                        ))}
                        {appliedInfo.totalCount > 3 && (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 text-xs font-semibold border-2 border-white shadow-sm">
                            +{appliedInfo.totalCount - 3}
                          </div>
                        )}
                      </div>
                    )}
                  
                  {/* <div className="text-xs text-gray-500">
                    Posted {post.postedOn || 'recently'}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobPosts;