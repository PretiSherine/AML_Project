import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../styles/dashboard.css';

const AlertTypesChart = ({ data }) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Alert Types</div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3498db" name="Alerts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlertTypesChart;