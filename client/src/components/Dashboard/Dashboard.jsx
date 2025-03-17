import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import PolicyService from '../../services/policy.service';
import Header from '../Header/Header';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    sessionStorage.removeItem('policy_created');
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get user profile
        const userResponse = await AuthService.getProfile();
        setUser(userResponse.data);

        // Get policies with better error handling
        try {
          const policiesResponse = await PolicyService.getPolicies();
          console.log("Policies fetched:", policiesResponse);
          
          if (policiesResponse && policiesResponse.data) {
            setPolicies(policiesResponse.data);
          } else {
            console.warn("No policies data in response:", policiesResponse);
            setPolicies([]);
          }
        } catch (policyError) {
          console.error("Error fetching policies:", policyError);
          setPolicies([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const refreshPolicies = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-badge status-active';
      case 'expired':
        return 'status-badge status-expired';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="dashboard-actions">
            <button onClick={refreshPolicies} className="dashboard-button secondary refresh-button">
              Refresh Policies
            </button>
            <Link to="/profile" className="dashboard-button secondary">
              Edit Profile
            </Link>
            <Link to="/cars/useofcar" className="dashboard-button primary">
              Buy New Policy
            </Link>
          </div>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        {user && (
          <div className="user-info-card">
            <div className="user-info-header">
              <h2>Personal Information</h2>
              <Link to="/profile" className="edit-link">
                Edit
              </Link>
            </div>
            <div className="user-info-content">
              <div className="user-info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="user-info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="user-info-item">
                <span className="info-label">Mobile</span>
                <span className="info-value">{user.mobile}</span>
              </div>
              {user.address && (
                <div className="user-info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value">
                    {user.address}, {user.city}, {user.state} {user.pincode}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="policies-section">
          <h2>My Policies</h2>
          
          {policies.length === 0 ? (
            <div className="no-policies">
              <p>You don't have any policies yet.</p>
              <p className="policy-note">If you've recently purchased a policy, please click the "Refresh Policies" button above.</p>
              <Link to="/cars/useofcar" className="dashboard-button primary">
                Buy Your First Policy
              </Link>
            </div>
          ) : (
            <div className="policies-grid">
              {policies.map((policy) => (
                <div className="policy-card" key={policy._id}>
                  <div className="policy-header">
                    <h3>{policy.vehicleDetails.make} {policy.vehicleDetails.model}</h3>
                    <span className={getStatusBadgeClass(policy.status)}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="policy-details">
                    <div className="policy-detail-item">
                      <span className="detail-label">Policy Number</span>
                      <span className="detail-value">{policy.policyNumber}</span>
                    </div>
                    <div className="policy-detail-item">
                      <span className="detail-label">Policy Type</span>
                      <span className="detail-value">{policy.policyType}</span>
                    </div>
                    <div className="policy-detail-item">
                      <span className="detail-label">Valid From</span>
                      <span className="detail-value">{formatDate(policy.startDate)}</span>
                    </div>
                    <div className="policy-detail-item">
                      <span className="detail-label">Valid Until</span>
                      <span className="detail-value">{formatDate(policy.endDate)}</span>
                    </div>
                    <div className="policy-detail-item">
                      <span className="detail-label">Premium</span>
                      <span className="detail-value">₹{policy.premium.totalPremium}</span>
                    </div>
                  </div>
                  
                  <div className="policy-actions">
                    <Link to={`/policies/${policy._id}`} className="policy-button">
                      View Details
                    </Link>
                    {policy.status === 'active' && (
                      <Link to={`/policies/${policy._id}/claim`} className="policy-button claim">
                        File a Claim
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 