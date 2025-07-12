import React from 'react';

const JobPosts = ({ posts, onCreateNew }) => {
  return (
    <div className="relative">
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-lg overflow-hidden  border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl"
            style={{border:"none",
            borderRadius:"8px"
            }}
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-48">
                {post?.posterImageBase64 ? (
                  <img
                    className="h-full w-full object-cover"
                    src={`${post.posterImageBase64}`}
                    alt={post.title || 'Job Image'}
                    style={{
                      maxHeight:"280px"
                    }}
                  />
                ) : (
                  <span className="text-sm text-gray-400">No Image</span>
                )}
              </div>
              <div className="p-6 w-full bg-in-post" 
              style={{border:"none"}}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold ">{post.title || 'No Title'}</h3>
                  {/* <span className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded-full">
                    {post.type}
                  </span> */}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                 {post.location || 'Unknown Location'}
                </div>
                <div className="mt-3 text-gray-400 text-sm">{post.description || 'No description provided'}</div>
                <div className="mt-4 flex items-center justify-between">
                 <div className="text-sm text-gray-500">
                  <span className="text-indigo-400 font-medium">
                    {post.salaryFrom && post.salaryTo
                     ? `$${Math.round(post.salaryFrom / 1000)}k - $${Math.round(post.salaryTo / 1000)}k`
                     : post.salaryFrom
                     ? `$${Math.round(post.salaryFrom / 1000)}k`
                     : 'Not specified'}
                  </span>
                      {' · '}Posted on {post.postedOn || 'N/A'}
                </div>
                   <span class="text-neon-green font-semibold bg-gray-700 px-3 py-1 rounded-full">
                    <button class="px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-5 h-5 text-[#9333ea] hover:text-[#6366f1] transition-colors duration-200" aria-hidden="true">
                       <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onCreateNew}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
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