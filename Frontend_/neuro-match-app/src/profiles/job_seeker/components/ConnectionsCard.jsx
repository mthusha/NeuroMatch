import React from 'react';

const ConnectionsCard = () => {
  return (
    <div className="sidebar-card">
      <h3>Synaptic Connections</h3>
      <div className="connection-item">
        <div className="connection-avatar">M</div>
        <div className="connection-info">
          <h4>Dr. Maria Rodriguez</h4>
          <p>Computational Neuroscientist</p>
        </div>
        <button className="connect-btn">Sync</button>
      </div>
      <div className="connection-item">
        <div className="connection-avatar">J</div>
        <div className="connection-info">
          <h4>Jamal Williams</h4>
          <p>AI Ethics Researcher</p>
        </div>
        <button className="connect-btn">Sync</button>
      </div>
      <div className="connection-item">
        <div className="connection-avatar">S</div>
        <div className="connection-info">
          <h4>Dr. Sarah Kim</h4>
          <p>Neural Architect</p>
        </div>
        <button className="connect-btn">Sync</button>
      </div>
    </div>
  );
};

export default ConnectionsCard;