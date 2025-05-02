import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api, dummyData } from '../services/api';
import '../styles/dashboard.css';

const AlertDetail = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy alert detail data
  const dummyAlertDetail = {
    id: id,
    customer: {
      id: 'C-' + Math.floor(1000 + Math.random() * 9000),
      name: id === 'A-1001' ? 'Acme Corp' : 
            id === 'A-1002' ? 'TechGiant Inc' :
            id === 'A-1003' ? 'Global Services' : 'Customer ' + id,
      type: 'Corporate',
      riskScore: 75,
      establishedDate: '2019-05-15',
      status: 'Active'
    },
    type: id === 'A-1001' ? 'Unusual Transaction' : 
          id === 'A-1002' ? 'Suspicious Activity' :
          id === 'A-1003' ? 'Regulatory Flag' : 'Pattern Deviation',
    risk: id === 'A-1001' || id === 'A-1003' ? 'High' : 
          id === 'A-1002' ? 'Medium' : 'Low',
    amount: id === 'A-1001' ? '$250,000' : 
            id === 'A-1002' ? '$75,000' :
            id === 'A-1003' ? '$125,000' : '$45,000',
    date: id === 'A-1001' || id === 'A-1002' ? '2025-05-01' : 
          id === 'A-1003' ? '2025-04-30' : '2025-04-29',
    description: `This transaction was flagged due to unusual patterns compared to the customer's normal activity. The transaction amount exceeds the typical transaction volume by more than 300%.`,
    status: 'Under Investigation',
    assignedTo: 'John Smith',
    transactions: [
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-05-01',
        type: 'Wire Transfer',
        amount: id === 'A-1001' ? '$250,000' : 
                id === 'A-1002' ? '$75,000' :
                id === 'A-1003' ? '$125,000' : '$45,000',
        sender: 'Domestic Account',
        recipient: 'International Account',
        status: 'Completed'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-28',
        type: 'Wire Transfer',
        amount: '$15,000',
        sender: 'Domestic Account',
        recipient: 'Domestic Account',
        status: 'Completed'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-15',
        type: 'ACH Transfer',
        amount: '$22,000',
        sender: 'Domestic Account',
        recipient: 'Domestic Account',
        status: 'Completed'
      }
    ],
    riskFactors: [
      'Transaction amount significantly higher than customer average',
      'International recipient in high-risk jurisdiction',
      'Recent account activity inconsistent with history',
      'Multiple large transactions within short timeframe'
    ],
    timeline: [
      {
        date: '2025-05-01 09:45:23',
        action: 'Alert Generated',
        user: 'System',
        notes: 'Automated detection flagged transaction as suspicious'
      },
      {
        date: '2025-05-01 10:22:18',
        action: 'Alert Assigned',
        user: 'Sarah Johnson',
        notes: 'Assigned to John Smith for investigation'
      },
      {
        date: '2025-05-01 11:34:52',
        action: 'Investigation Started',
        user: 'John Smith',
        notes: 'Began review of transaction history and account documentation'
      }
    ]
  };

  useEffect(() => {
    const fetchAlertDetail = async () => {
      try {
        // In a real application, uncomment this API call
        // const response = await api.getAlertDetails(id);
        // setAlert(response.data);
        
        // For now, use dummy data
        setAlert(dummyAlertDetail);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alert details:', error);
        setLoading(false);
      }
    };

    fetchAlertDetail();
  }, [id]);

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
      <Layout title="Alert Details">
        <div className="loading">Loading alert details...</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Alert ${id}`}>
      <div className="dashboard">
        <div className="header">
          <div className="header-title">
            <h1>Alert Details: {id}</h1>
          </div>
          <div className="header-actions">
            <Link to="/alerts" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Alerts
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Alert Type</div>
              <div className="stat-card-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
            </div>
            <div className="stat-card-value">{alert.type}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Risk Level</div>
              <div className="stat-card-icon">
                <i className="fas fa-radiation-alt"></i>
              </div>
            </div>
            <div className="stat-card-value">
              <span className={getRiskBadgeClass(alert.risk)}>{alert.risk}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Amount</div>
              <div className="stat-card-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
            <div className="stat-card-value">{alert.amount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Date</div>
              <div className="stat-card-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>
            <div className="stat-card-value">{alert.date}</div>
          </div>
        </div>

        <div className="card">
          <h3>Alert Description</h3>
          <p>{alert.description}</p>
        </div>

        <div className="card">
        <h3>Customer Information</h3>
        <table>
            <tbody>
            <tr>
                <td><strong>Customer ID</strong></td>
                <td>{alert.customer.id}</td>
                <td><strong>Name</strong></td>
                <td>
                <Link to={`/customers/${alert.customer.id}`}>
                    {alert.customer.name}
                </Link>
                </td>
            </tr>
            <tr>
                <td><strong>Type</strong></td>
                <td>{alert.customer.type}</td>
                <td><strong>Risk Score</strong></td>
                <td>{alert.customer.riskScore}/100</td>
            </tr>
            <tr>
                <td><strong>Established Date</strong></td>
                <td>{alert.customer.establishedDate}</td>
                <td><strong>Status</strong></td>
                <td>{alert.customer.status}</td>
            </tr>
            </tbody>
        </table>
        <div style={{ marginTop: '10px' }}>
            <Link to={`/customers/${alert.customer.id}`} className="btn btn-secondary">
            <i className="fas fa-user"></i> View Customer Profile
            </Link>
        </div>
        </div>

        <div className="card">
          <h3>Risk Factors</h3>
          <ul>
            {alert.riskFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">Related Transactions</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Sender</th>
                <th>Recipient</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {alert.transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.sender}</td>
                  <td>{transaction.recipient}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">Investigation Timeline</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Action</th>
                <th>User</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {alert.timeline.map((event, index) => (
                <tr key={index}>
                  <td>{event.date}</td>
                  <td>{event.action}</td>
                  <td>{event.user}</td>
                  <td>{event.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Add Investigation Note</h3>
          <textarea 
            placeholder="Enter your investigation notes here..." 
            rows="4" 
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          ></textarea>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary">Save Note</button>
            <button className="btn btn-secondary">Escalate Alert</button>
            <button className="btn btn-secondary">Close Alert</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlertDetail;