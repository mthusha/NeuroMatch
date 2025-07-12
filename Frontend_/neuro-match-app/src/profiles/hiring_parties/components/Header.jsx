import React from 'react';
import {  FaHome, FaNetworkWired, FaBell, FaEnvelope, FaUserCircle, FaCog } from 'react-icons/fa';
// import { FaMagnifyingGlass } from 'react-icons/fa6';

const Header = () => {
  return (
    <div className="header">
      <div className="neuromatch-logo">
      <i class="fas fa-brain mr-2"></i> NeuroMatch
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search talents or opportunities..." />
      </div>
      <div className="nav-icons">
        <FaHome className="nav-icon" />
        <FaNetworkWired className="nav-icon" />
        <FaBell className="nav-icon" />
        <FaEnvelope className="nav-icon" />
        <FaUserCircle className="nav-icon" />
        <FaCog className="nav-icon" />
      </div>
    </div>
  );
};

export default Header;