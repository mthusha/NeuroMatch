import React from 'react';

const JobPosts = ({ posts, onCreateNew }) => {
  return (
    <div className="job-feed">
      <h3 className="feed-title text-xl font-bold text-indigo-600 flex items-center gap-2">Recent Job Posts</h3>
      
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="job-card"
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
              
              <div className="job-details">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post.title || 'No Title'}</h3>
                    <div className="mt-2 flex items-center text-sm text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {post.location || 'Remote'}
                    </div>
                  </div>
                  
                  <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
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
                  
                  <div className="text-xs text-gray-500">
                    Posted {post.postedOn || 'recently'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={onCreateNew}
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

export default JobPosts;