import React from 'react';
import { Link } from 'react-router-dom';

const InterviewNoUserCompleted = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-300 opacity-20 rounded-full translate-x-20 translate-y-20"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-300 opacity-30 rounded-full"></div>
      
      <div className="bg-white rounded-3xl p-10 text-center max-w-lg w-full border border-white border-opacity-20 shadow-2xl backdrop-blur-sm bg-opacity-95 transform transition-all duration-300 hover:scale-[1.02] relative z-10">
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Thank You for Attending
        </h1>
        
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          We appreciate your time and effort in completing the interview. The completed interview report 
          will be sent to the associated company, and they will contact you shortly regarding the next steps.
        </p>
        
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          Join with Us
        </Link>
        
        {/* Additional decorative elements */}
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-200 rounded-full opacity-40 z-0"></div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-200 rounded-full opacity-40 z-0"></div>
      </div>
      
      {/* Subtle floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-indigo-200 rounded-full opacity-50 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-2/4 w-2 h-2 bg-purple-200 rounded-full opacity-50 animate-float animation-delay-2000"></div>
    </div>
  );
};

export default InterviewNoUserCompleted;