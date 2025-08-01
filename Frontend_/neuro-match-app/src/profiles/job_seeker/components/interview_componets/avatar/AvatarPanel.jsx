import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AvatarPanel = () => {
  return (
    <div className="hidden md:flex h-full w-full bg-gray-100">
      <div className="w-full bg-white flex flex-col items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
            <FaUserCircle className="text-gray-400 text-7xl md:text-9xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarPanel;