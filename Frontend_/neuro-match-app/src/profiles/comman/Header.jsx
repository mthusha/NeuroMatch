import React from 'react';
import {
  FaHome, FaNetworkWired, FaBell,
  FaEnvelope, FaUserCircle, FaCog
} from 'react-icons/fa';
import SearchInput from './SearchInput';

const Header = ({ searchType = 'company' }) => {
  return (
    <div className="header relative flex items-center justify-between p-4 bg-white shadow-md">
      <div className="neuromatch-logo font-bold text-xl text-blue-600">
        <i className="fas fa-brain mr-2"></i> NeuroMatch
      </div>
     <SearchInput type={searchType} placeholder={`Search ${searchType}s...`} />
      <div className="nav-icons flex gap-4 text-xl text-gray-600">
        <FaHome className="nav-icon hover:text-blue-500" />
        <FaNetworkWired className="nav-icon hover:text-blue-500" />
        <FaBell className="nav-icon hover:text-blue-500" />
        <FaEnvelope className="nav-icon hover:text-blue-500" />
        <FaUserCircle className="nav-icon hover:text-blue-500" />
        <FaCog className="nav-icon hover:text-blue-500" />
      </div>
    </div>
  );
};

export default Header;
