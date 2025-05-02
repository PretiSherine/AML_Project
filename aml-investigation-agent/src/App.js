import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AlertDetail from './pages/AlertDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';

// Import CSS
import './styles/main.css';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/alerts.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts/:id" element={<AlertDetail />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;