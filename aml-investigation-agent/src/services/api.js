import axios from 'axios';

// Base URL for API requests - change this to your FastAPI backend URL when available
const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const api = {
  // Dashboard data
  getDashboardStats: () => apiClient.get('/dashboard/stats'),
  getRiskDistribution: () => apiClient.get('/dashboard/risk-distribution'),
  getAlertTypes: () => apiClient.get('/dashboard/alert-types'),
  getRecentAlerts: () => apiClient.get('/dashboard/recent-alerts'),
  getMonthlyTrends: () => apiClient.get('/dashboard/monthly-trends'),
  
  // Alerts
  getAlerts: (params) => apiClient.get('/alerts', { params }),
  getAlertDetails: (id) => apiClient.get(`/alerts/${id}`),
  updateAlertStatus: (id, status) => apiClient.put(`/alerts/${id}/status`, { status }),
  addAlertNote: (id, note) => apiClient.post(`/alerts/${id}/notes`, { note }),
  
  // Customers
  getCustomers: (params) => apiClient.get('/customers', { params }),
  getCustomerDetails: (id) => apiClient.get(`/customers/${id}`),
  getCustomerAlerts: (id) => apiClient.get(`/customers/${id}/alerts`),
  getCustomerTransactions: (id, params) => apiClient.get(`/customers/${id}/transactions`, { params }),
};

// Dummy data for development (when API is not available)
export const dummyData = {
  dashboardStats: {
    totalAlerts: 247,
    highRiskAlerts: 58,
    investigationsOpen: 32,
    escalationsToday: 5
  },
  riskDistribution: [
    { name: 'High', value: 32, fill: '#FF5252' },
    { name: 'Medium', value: 48, fill: '#FFC107' },
    { name: 'Low', value: 20, fill: '#4CAF50' }
  ],
  alertTypes: [
    { name: 'Unusual Transaction', value: 42 },
    { name: 'Suspicious Activity', value: 28 },
    { name: 'Regulatory Flag', value: 17 },
    { name: 'Pattern Deviation', value: 13 }
  ],
  recentAlerts: [
    { id: 'A-1001', customer: 'Acme Corp', type: 'Unusual Transaction', risk: 'High', amount: '$250,000', date: '2025-05-01' },
    { id: 'A-1002', customer: 'TechGiant Inc', type: 'Suspicious Activity', risk: 'Medium', amount: '$75,000', date: '2025-05-01' },
    { id: 'A-1003', customer: 'Global Services', type: 'Regulatory Flag', risk: 'High', amount: '$125,000', date: '2025-04-30' },
    { id: 'A-1004', customer: 'Smith Enterprises', type: 'Pattern Deviation', risk: 'Low', amount: '$45,000', date: '2025-04-30' },
    { id: 'A-1005', customer: 'Johnson & Co', type: 'Unusual Transaction', risk: 'Medium', amount: '$92,000', date: '2025-04-29' }
  ],
  monthlyTrends: [
    { month: 'Jan', alerts: 120, investigations: 45 },
    { month: 'Feb', alerts: 132, investigations: 52 },
    { month: 'Mar', alerts: 101, investigations: 38 },
    { month: 'Apr', alerts: 134, investigations: 56 },
    { month: 'May', alerts: 90, investigations: 32 }
  ],
  customers: [
    { id: 'C-1001', name: 'Acme Corp', type: 'Corporate', industry: 'Manufacturing', riskScore: 82, status: 'Active' },
    { id: 'C-1002', name: 'TechGiant Inc', type: 'Corporate', industry: 'Technology', riskScore: 65, status: 'Active' },
    { id: 'C-1003', name: 'Global Services', type: 'Corporate', industry: 'Consulting', riskScore: 78, status: 'Active' },
    { id: 'C-1004', name: 'Smith Enterprises', type: 'Corporate', industry: 'Retail', riskScore: 35, status: 'Active' },
    { id: 'C-1005', name: 'Johnson & Co', type: 'Corporate', industry: 'Finance', riskScore: 60, status: 'Active' }
  ]
};