import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { api, dummyData } from '../services/api';
import { Link } from 'react-router-dom';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(10);
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Expanded alerts data for the alerts page
  const dummyAlerts = [
    ...dummyData.recentAlerts,
    { id: 'A-1006', customer: 'Zenith Trading', type: 'Unusual Transaction', risk: 'Medium', amount: '$87,500', date: '2025-04-29' },
    { id: 'A-1007', customer: 'Blue Ocean Ltd', type: 'Pattern Deviation', risk: 'Low', amount: '$32,000', date: '2025-04-28' },
    { id: 'A-1008', customer: 'Evergreen Solutions', type: 'Regulatory Flag', risk: 'High', amount: '$175,000', date: '2025-04-28' },
    { id: 'A-1009', customer: 'Luxury Imports', type: 'Suspicious Activity', risk: 'Medium', amount: '$64,000', date: '2025-04-27' },
    { id: 'A-1010', customer: 'Eastern Distributors', type: 'Unusual Transaction', risk: 'High', amount: '$218,000', date: '2025-04-27' },
    { id: 'A-1011', customer: 'Sunshine Industries', type: 'Pattern Deviation', risk: 'Low', amount: '$41,000', date: '2025-04-26' },
    { id: 'A-1012', customer: 'Metro Financials', type: 'Regulatory Flag', risk: 'Medium', amount: '$93,000', date: '2025-04-26' },
    { id: 'A-1013', customer: 'Alpine Retailers', type: 'Suspicious Activity', risk: 'High', amount: '$146,000', date: '2025-04-25' },
    { id: 'A-1014', customer: 'Silver Coast Bank', type: 'Unusual Transaction', risk: 'Medium', amount: '$78,000', date: '2025-04-25' },
    { id: 'A-1015', customer: 'Global Express', type: 'Pattern Deviation', risk: 'Low', amount: '$29,000', date: '2025-04-24' }
  ];

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // In a real application, uncomment this API call
        // const response = await api.getAlerts();
        // setAlerts(response.data);
        
        // For now, use dummy data
        setAlerts(dummyAlerts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Filter alerts based on risk level, type, and search term
  const filteredAlerts = alerts.filter(alert => {
    return (
      (filterRisk === 'all' || alert.risk.toLowerCase() === filterRisk.toLowerCase()) &&
      (filterType === 'all' || alert.type.toLowerCase().includes(filterType.toLowerCase())) &&
      (searchTerm === '' || 
       alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alert.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Get current alerts for pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  if (loading) {
    return (
      <Layout title="Alerts">
        <div className="loading">Loading alerts...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Alerts">
      <div className="dashboard">
        <div className="filter-bar">
          <div className="filter-item">
            <input 
              type="text" 
              placeholder="Search by ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <select 
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
          <div className="filter-item">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Alert Types</option>
              <option value="unusual transaction">Unusual Transaction</option>
              <option value="suspicious activity">Suspicious Activity</option>
              <option value="regulatory flag">Regulatory Flag</option>
              <option value="pattern deviation">Pattern Deviation</option>
            </select>
          </div>
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">All Alerts</div>
            <div className="alerts-table-actions">
              <button className="btn btn-secondary">
                <i className="fas fa-download"></i> Export
              </button>
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
              {currentAlerts.map((alert) => (
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
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredAlerts.length / alertsPerPage) }).map((_, index) => (
              <div 
                key={index} 
                className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;