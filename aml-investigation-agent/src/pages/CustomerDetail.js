import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api, dummyData } from '../services/api';
import '../styles/dashboard.css';
import '../styles/alerts.css';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy customer detail data
  const dummyCustomerDetail = {
    id: id,
    name: id === 'C-1001' ? 'Acme Corp' : 
          id === 'C-1002' ? 'TechGiant Inc' :
          id === 'C-1003' ? 'Global Services' : 'Customer ' + id,
    type: 'Corporate',
    industry: 'Technology',
    riskScore: 75,
    riskCategory: 'Medium-High',
    establishedDate: '2019-05-15',
    status: 'Active',
    address: '123 Business Ave, Tech Park, CA 94103',
    contacts: [
      {
        name: 'John Doe',
        role: 'CEO',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567'
      },
      {
        name: 'Jane Smith',
        role: 'CFO',
        email: 'jane.smith@example.com',
        phone: '(555) 987-6543'
      }
    ],
    riskFactors: [
      'Operating in high-risk jurisdiction',
      'High volume of international transactions',
      'Complex corporate structure',
      'Recent regulatory issues'
    ],
    alertHistory: [
      { id: 'A-1001', type: 'Unusual Transaction', risk: 'High', amount: '$250,000', date: '2025-05-01', status: 'Under Investigation' },
      { id: 'A-876', type: 'Suspicious Activity', risk: 'Medium', amount: '$78,000', date: '2025-03-15', status: 'Closed' },
      { id: 'A-742', type: 'Regulatory Flag', risk: 'High', amount: '$125,000', date: '2025-02-22', status: 'Escalated' },
      { id: 'A-651', type: 'Pattern Deviation', risk: 'Low', amount: '$45,000', date: '2025-01-18', status: 'Closed' }
    ],
    transactionHistory: [
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-05-01',
        type: 'Wire Transfer',
        amount: '$250,000',
        direction: 'Outgoing',
        counterparty: 'Global Supplies Ltd'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-28',
        type: 'Wire Transfer',
        amount: '$15,000',
        direction: 'Outgoing',
        counterparty: 'Office Solutions Inc'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-15',
        type: 'ACH Transfer',
        amount: '$22,000',
        direction: 'Incoming',
        counterparty: 'Client XYZ'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-10',
        type: 'Wire Transfer',
        amount: '$175,000',
        direction: 'Incoming',
        counterparty: 'Partnership Alpha'
      },
      {
        id: 'T-' + Math.floor(10000 + Math.random() * 90000),
        date: '2025-04-05',
        type: 'ACH Transfer',
        amount: '$48,000',
        direction: 'Outgoing',
        counterparty: 'Vendor Services LLC'
      }
    ],
    monthlyVolume: [
      { month: 'Jan', volume: 850000 },
      { month: 'Feb', volume: 920000 },
      { month: 'Mar', volume: 1100000 },
      { month: 'Apr', volume: 980000 },
      { month: 'May', volume: 1250000 }
    ]
  };

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        // In a real application, uncomment this API call
        // const response = await api.getCustomerDetails(id);
        // setCustomer(response.data);
        
        // For now, use dummy data
        setCustomer(dummyCustomerDetail);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setLoading(false);
      }
    };

    fetchCustomerDetail();
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

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'under investigation':
        return 'status-investigation';
      case 'escalated':
        return 'status-escalated';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <Layout title="Customer Details">
        <div className="loading">Loading customer details...</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Customer: ${customer.name}`}>
      <div className="dashboard">
        <div className="header">
          <div className="header-title">
            <h1>Customer Details: {customer.name}</h1>
            <div className="customer-id">ID: {customer.id}</div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <i className="fas fa-file-export"></i> Export Profile
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-edit"></i> Edit Customer
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Risk Score</div>
              <div className="stat-card-icon">
                <i className="fas fa-chart-line"></i>
              </div>
            </div>
            <div className="stat-card-value">{customer.riskScore}/100</div>
            <div className="stat-card-change">
              <span className={`badge ${customer.riskScore > 70 ? 'badge-danger' : customer.riskScore > 40 ? 'badge-warning' : 'badge-success'}`}>
                {customer.riskCategory}
              </span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Customer Type</div>
              <div className="stat-card-icon">
                <i className="fas fa-building"></i>
              </div>
            </div>
            <div className="stat-card-value">{customer.type}</div>
            <div className="stat-card-change">{customer.industry}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Status</div>
              <div className="stat-card-icon">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <div className="stat-card-value">{customer.status}</div>
            <div className="stat-card-change">Since {customer.establishedDate}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-title">Alerts</div>
              <div className="stat-card-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
            </div>
            <div className="stat-card-value">{customer.alertHistory.length}</div>
            <div className="stat-card-change">
              {customer.alertHistory.filter(alert => alert.status === 'Under Investigation').length} open
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Customer Profile</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Address</strong></td>
                <td colSpan="3">{customer.address}</td>
              </tr>
              <tr>
                <td><strong>Industry</strong></td>
                <td>{customer.industry}</td>
                <td><strong>Established</strong></td>
                <td>{customer.establishedDate}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Key Contacts</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customer.contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.role}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Risk Factors</h3>
          <ul>
            {customer.riskFactors.map((factor, index) => (
              <li key={index} className="risk-factor-item">
                <span className="risk-factor-icon"><i className="fas fa-exclamation-circle"></i></span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Monthly Transaction Volume</div>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customer.monthlyVolume}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Volume']} />
                <Bar dataKey="volume" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">Alert History</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Type</th>
                <th>Risk Level</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customer.alertHistory.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td>{alert.type}</td>
                  <td>
                    <span className={getRiskBadgeClass(alert.risk)}>
                      {alert.risk}
                    </span>
                  </td>
                  <td>{alert.amount}</td>
                  <td>{alert.date}</td>
                  <td>
                    <span className={`alert-status ${getStatusClass(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/alerts/${alert.id}`} className="btn btn-primary">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">Recent Transactions</div>
            <div className="alerts-table-actions">
              <button className="btn btn-secondary">View All Transactions</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Direction</th>
                <th>Counterparty</th>
              </tr>
            </thead>
            <tbody>
              {customer.transactionHistory.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.direction}</td>
                  <td>{transaction.counterparty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetail;