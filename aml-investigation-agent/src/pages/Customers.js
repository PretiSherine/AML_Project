import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { api, dummyData } from '../services/api';
import '../styles/dashboard.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  // Extended customers data for the customers page
  const dummyCustomers = [
    ...dummyData.customers,
    { id: 'C-1006', name: 'Zenith Trading', type: 'Corporate', industry: 'Finance', riskScore: 55, status: 'Active' },
    { id: 'C-1007', name: 'Blue Ocean Ltd', type: 'Corporate', industry: 'Shipping', riskScore: 28, status: 'Active' },
    { id: 'C-1008', name: 'Evergreen Solutions', type: 'Corporate', industry: 'Consulting', riskScore: 82, status: 'Under Review' },
    { id: 'C-1009', name: 'Luxury Imports', type: 'Corporate', industry: 'Retail', riskScore: 68, status: 'Active' },
    { id: 'C-1010', name: 'Eastern Distributors', type: 'Corporate', industry: 'Logistics', riskScore: 90, status: 'Active' },
    { id: 'C-1011', name: 'Sunshine Industries', type: 'Corporate', industry: 'Manufacturing', riskScore: 22, status: 'Active' },
    { id: 'C-1012', name: 'Metro Financials', type: 'Corporate', industry: 'Finance', riskScore: 71, status: 'Active' },
    { id: 'C-1013', name: 'Alpine Retailers', type: 'Corporate', industry: 'Retail', riskScore: 85, status: 'Under Review' },
    { id: 'C-1014', name: 'Silver Coast Bank', type: 'Financial Institution', industry: 'Banking', riskScore: 76, status: 'Active' },
    { id: 'C-1015', name: 'Global Express', type: 'Corporate', industry: 'Logistics', riskScore: 42, status: 'Active' }
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // In a real application, uncomment this API call
        // const response = await api.getCustomers();
        // setCustomers(response.data);
        
        // For now, use dummy data
        setCustomers(dummyCustomers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Get risk category based on risk score
  const getRiskCategory = (score) => {
    if (score >= 75) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
  };

  // Filter customers based on search term, industry, and risk level
  const filteredCustomers = customers.filter(customer => {
    const riskCategory = getRiskCategory(customer.riskScore);
    
    return (
      (searchTerm === '' || 
       customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterIndustry === 'all' || customer.industry === filterIndustry) &&
      (filterRisk === 'all' || riskCategory.toLowerCase() === filterRisk.toLowerCase())
    );
  });

  // Get current customers for pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get all unique industries for the filter dropdown
  const industries = [...new Set(customers.map(customer => customer.industry))];

  const getRiskBadgeClass = (score) => {
    if (score >= 75) return 'badge badge-danger';
    if (score >= 50) return 'badge badge-warning';
    return 'badge badge-success';
  };

  if (loading) {
    return (
      <Layout title="Customers">
        <div className="loading">Loading customers...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Customers">
      <div className="dashboard">
        <div className="filter-bar">
          <div className="filter-item">
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <select 
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
              ))}
            </select>
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
        </div>

        <div className="alerts-table">
          <div className="alerts-table-header">
            <div className="alerts-table-title">All Customers</div>
            <div className="alerts-table-actions">
              <button className="btn btn-secondary">
                <i className="fas fa-download"></i> Export
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i> Add Customer
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Industry</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.type}</td>
                  <td>{customer.industry}</td>
                  <td>
                    <span className={getRiskBadgeClass(customer.riskScore)}>
                      {customer.riskScore}/100 ({getRiskCategory(customer.riskScore)})
                    </span>
                  </td>
                  <td>{customer.status}</td>
                  <td>
                    <Link to={`/customers/${customer.id}`} className="btn btn-primary">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }).map((_, index) => (
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

export default Customers;