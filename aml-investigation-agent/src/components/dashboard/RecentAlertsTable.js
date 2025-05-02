import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';

const RecentAlertsTable = ({ alerts }) => {
  const getRiskBadgeClass = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'badge badge-danger';
      case 'medium':
        return 'badge badge-warning';
      case 'low':
        return 'badge badge-success';
      default:
        return 'badge';
    }
  };

  return (
    <div className="alerts-table">
      <div className="alerts-table-header">
        <div className="alerts-table-title">Recent Alerts</div>
        <div className="alerts-table-actions">
          <Link to="/alerts" className="btn btn-secondary">View All Alerts</Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Risk Level</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.customer}</td>
              <td>{alert.type}</td>
              <td>
                <span className={getRiskBadgeClass(alert.risk)}>
                  {alert.risk}
                </span>
              </td>
              <td>{alert.amount}</td>
              <td>{alert.date}</td>
              <td>
                <Link to={`/alerts/${alert.id}`} className="btn btn-primary">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAlertsTable;