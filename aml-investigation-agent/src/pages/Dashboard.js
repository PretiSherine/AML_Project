import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import RiskDistributionChart from '../components/dashboard/RiskDistributionChart';
import AlertTypesChart from '../components/dashboard/AlertTypesChart';
import RecentAlertsTable from '../components/dashboard/RecentAlertsTable';
import MonthlyTrendChart from '../components/dashboard/MonthlyTrendChart';
import { api, dummyData } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [riskDistribution, setRiskDistribution] = useState(null);
  const [alertTypes, setAlertTypes] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState(null);
  const [monthlyTrends, setMonthlyTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, uncomment these API calls
        // const statsResponse = await api.getDashboardStats();
        // const riskResponse = await api.getRiskDistribution();
        // const typesResponse = await api.getAlertTypes();
        // const alertsResponse = await api.getRecentAlerts();
        // const trendsResponse = await api.getMonthlyTrends();
        
        // For now, use dummy data
        setStats(dummyData.dashboardStats);
        setRiskDistribution(dummyData.riskDistribution);
        setAlertTypes(dummyData.alertTypes);
        setRecentAlerts(dummyData.recentAlerts);
        setMonthlyTrends(dummyData.monthlyTrends);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="dashboard">
          <div className="loading">Loading dashboard data...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="filter-bar">
            <div className="filter-item">
              <select defaultValue="all">
                <option value="all">All Customers</option>
                <option value="high-risk">High Risk Customers</option>
                <option value="new">New Customers (30 days)</option>
              </select>
            </div>
            <div className="filter-item">
              <select defaultValue="all">
                <option value="all">All Alert Types</option>
                <option value="unusual">Unusual Transactions</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="regulatory">Regulatory Flags</option>
              </select>
            </div>
            <div className="filter-item">
              <select defaultValue="30">
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="stats-grid">
          <StatCard 
            title="Total Alerts" 
            value={stats.totalAlerts} 
            icon="fas fa-exclamation-circle"
            change="12%" 
            changeType="increase"
          />
          <StatCard 
            title="High Risk Alerts" 
            value={stats.highRiskAlerts} 
            icon="fas fa-radiation-alt"
            change="5%" 
            changeType="increase"
          />
          <StatCard 
            title="Open Investigations" 
            value={stats.investigationsOpen} 
            icon="fas fa-search"
            change="3%" 
            changeType="decrease"
          />
          <StatCard 
            title="Escalations Today" 
            value={stats.escalationsToday} 
            icon="fas fa-arrow-up"
          />
        </div>
        
        <div className="charts-grid">
          <RiskDistributionChart data={riskDistribution} />
          <AlertTypesChart data={alertTypes} />
        </div>
        
        <RecentAlertsTable alerts={recentAlerts} />
        
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Monthly Trends</div>
          </div>
          <div className="chart-container" style={{height: "300px"}}>
            <MonthlyTrendChart data={monthlyTrends} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;