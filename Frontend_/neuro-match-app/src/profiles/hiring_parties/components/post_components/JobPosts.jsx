// components/JobPosts.js
import React from 'react';

const JobPosts = ({ posts, onCreateNew }) => {
  return (
    <div className="relative">
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-48">
                <img 
                  className="h-full w-full object-cover" 
                  src={post.image} 
                  alt={post.title} 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-indigo-300">{post.title}</h3>
                  <span className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded-full">
                    {post.type}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {post.location}
                </div>
                <div className="mt-3 text-gray-300">{post.description}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="text-indigo-400 font-medium">{post.salary}</span> · Posted on {post.postedAt}
                  </div>
                  <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                    View Details
                  </button>
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