import React from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadCamera from './LoadCamera';

const AvatarPanel = ({ showCamera, eyeDetected, trackingActive }) => {
  return (
    <div className="hidden md:flex h-full w-full bg-gray-100 relative">
      <div className="w-full bg-white flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
          <FaUserCircle className="text-gray-400 text-7xl md:text-9xl" />
        </div>
        {trackingActive && (
          <div className={`absolute top-4 left-4 flex items-center space-x-2 p-2 px-3 rounded-full backdrop-blur-sm transition-all duration-300${
            eyeDetected 
              ? 'bg-green-100 text-green-600 shadow-green-sm'
              : 'bg-red-100 text-red-600 shadow-red-sm'
          }`}>
            {eyeDetected ? (
              <FaEye className="text-xl animate-pulse" />
            ) : (
              <FaEyeSlash className="text-xl" />
            )}
            <span className="text-sm font-medium">
              {eyeDetected ? 'Looking at screen' : 'Please look at screen'}
            </span>
          </div>
        )}
        <LoadCamera show={showCamera} />
      </div>
    </div>
  );
};

export default AvatarPanel;