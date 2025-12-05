import React, { useState, useEffect } from 'react';
import './StatsDashboard.css';
import { apiService } from '../services/apiService';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsData = await apiService.getStats();
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">Error loading statistics: {error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>
      <div className="stats-grid">
    {stats && (
      <div className="stats-grid">
        <p>Total Patients: {stats.totalPatients}</p>
        <p>Total Records: {stats.totalRecords}</p>
        <p>Total Consents: {stats.totalConsents}</p>
        <p>Active Consents: {stats.activeConsents}</p>
        <p>Pending Consents: {stats.pendingConsents}</p>
        <p>Total Transactions: {stats.totalTransactions}</p>
      </div>
    )}
    </div>
    </div>
  );
};

export default StatsDashboard;


