import React from 'react';
import '../../styles/layout.css';

const Header = ({ title }) => {
  return (
    <div className="header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <button className="btn btn-secondary">
          <i className="fas fa-bell"></i> Notifications
        </button>
        <div className="user-profile">
          <div className="user-profile-img">
            AM
          </div>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Header;