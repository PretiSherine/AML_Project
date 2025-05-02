import React from 'react';
import '../../styles/dashboard.css';

const StatCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-title">{title}</div>
        <div className="stat-card-icon">
          <i className={icon}></i>
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${changeType === 'increase' ? 'text-success' : changeType === 'decrease' ? 'text-danger' : ''}`}>
          <i className={`fas ${changeType === 'increase' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
          <span>{change} from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;