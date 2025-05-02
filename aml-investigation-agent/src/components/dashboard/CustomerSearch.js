import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, dummyData } from '../../services/api';

const CustomerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;
    
    setSearching(true);
    try {
      // In a real application, uncomment this API call
      // const response = await api.getCustomers({ search: searchTerm });
      // setSearchResults(response.data);
      
      // For now, use dummy data
      const filteredCustomers = dummyData.customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCustomers);
    } catch (error) {
      console.error('Error searching customers:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card">
      <h3>Customer Lookup</h3>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ flex: 1, padding: '8px', marginRight: '10px' }}
        />
        <button 
          className="btn btn-primary" 
          onClick={handleSearch}
          disabled={searching}
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {searchResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Risk Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.riskScore}/100</td>
                <td>
                  <Link to={`/customers/${customer.id}`} className="btn btn-primary">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : searchTerm && !searching ? (
        <div>No customers found matching "{searchTerm}"</div>
      ) : null}
    </div>
  );
};

export default CustomerSearch;