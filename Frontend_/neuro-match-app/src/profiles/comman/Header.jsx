import React from 'react';
import {
  FaHome, FaNetworkWired, FaBell,
  FaEnvelope, FaUserCircle, FaCog
} from 'react-icons/fa';
import SearchInput from './SearchInput';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = ({ searchType = 'company' }) => {
  const { user } = useAuth();
   const paths = {
    home: user?.role === 'employer' ? '/employer' : '/jobseeker',
    applied: user?.role === 'employer' ? '/view-applied-jobs-co' : '/view-applied-jobs',
    notifications: '/notifications',
    messages: '/messages',
    profile: '/profile',
    settings: '/settings',
  };
  const currentPath = window.location.pathname;
  const isActive = (path, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  // path based on user role
  const homePath = user?.role === 'employer' ? '/employer' : '/jobseeker';
  const viewApliedPath = user?.role === 'employer' ? '/view-applied-jobs-co' : '/view-applied-jobs';

console.log(user?.role)

  return (
    <div className="header relative flex items-center justify-between p-4 bg-white shadow-md">
      <div className="neuromatch-logo font-bold text-xl text-blue-600">
        <i className="fas fa-brain mr-2"></i> NeuroMatch
      </div>
     <SearchInput type={searchType} placeholder={`Search ${searchType}s...`} />
      <div className="nav-icons flex gap-4 text-xl text-gray-600">
        <Link to={homePath}>
          <FaHome className={isActive(paths.home, true) ? 'nav-icon text-[#4f46e5]' : 'nav-icon'} />
        </Link>
        <Link to={viewApliedPath}>
        <FaNetworkWired className={isActive(paths.applied, true) ? 'nav-icon text-[#4f46e5]' : 'nav-icon'}/>
        </Link>
        <FaBell className="nav-icon hover:text-blue-500" />
        <FaEnvelope className="nav-icon hover:text-blue-500" />
        <FaUserCircle className="nav-icon hover:text-blue-500" />
        <FaCog className="nav-icon hover:text-blue-500" />
      </div>
    </div>
  );
};

export default Header;
