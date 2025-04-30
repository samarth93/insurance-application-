import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import PolicyService from '../../services/policy.service';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isServerAvailable, setIsServerAvailable] = useState(true);
  const [databaseStatus, setDatabaseStatus] = useState('unknown');

  // Check server availability with enhanced status info
  const checkServerAvailability = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('http://localhost:8082/health', { 
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setIsServerAvailable(true);
        setDatabaseStatus(data.database || 'unknown');
        return {
          available: true,
          database: data.database || 'unknown'
        };
      } else {
        setIsServerAvailable(false);
        setDatabaseStatus('disconnected');
        return { available: false, database: 'disconnected' };
      }
    } catch (error) {
      console.warn('Server health check failed:', error.message);
      setIsServerAvailable(false);
      setDatabaseStatus('disconnected');
      return { available: false, database: 'disconnected' };
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('policy_created');
    
    const fetchData = async () => {
      setLoading(true);
      setError('');
      
      // First check server status
      const serverStatus = await checkServerAvailability();
      
      if (!serverStatus.available) {
        console.log("Server unavailable");
        setError('Server is currently unavailable. Please try again later.');
        setLoading(false);
        return;
      }
      
      if (serverStatus.database === 'disconnected') {
        setError("Server is running but database is disconnected. Some features may be unavailable.");
      }
      
      try {
        let currentUserData = null;
        
        // Get user profile with better error handling
        try {
          const userResponse = await AuthService.getProfile();
          if (userResponse && userResponse.data) {
            setUser(userResponse.data);
            currentUserData = userResponse.data;
          } else {
            console.warn("Invalid user data response:", userResponse);
            // Try to get current user from local storage as fallback
            const localUser = AuthService.getCurrentUser();
            if (localUser) {
              setUser(localUser);
              currentUserData = localUser;
            } else {
              setError('Could not retrieve user profile. Please log in again.');
            }
          }
        } catch (userError) {
          console.error("Error fetching user profile:", userError);
          // Try to get current user from local storage as fallback
          const localUser = AuthService.getCurrentUser();
          if (localUser) {
            setUser(localUser);
            currentUserData = localUser;
          } else {
            setError('Could not retrieve user profile. Please log in again.');
          }
        }

        // Get policies with better error handling
        try {
          const policiesResponse = await PolicyService.getPolicies();
          console.log("Policies fetched:", policiesResponse);
          
          if (policiesResponse && policiesResponse.data) {
            setPolicies(policiesResponse.data);
          } else {
            console.warn("No policies data in response:", policiesResponse);
            setPolicies([]);
            
            // Try fallback method if regular policies endpoint returns empty data
            if (currentUserData && currentUserData.email) {
              try {
                console.log("Trying fallback: fetching policies by email");
                const fallbackResponse = await fetch(`http://localhost:8082/policies/check-by-email/${currentUserData.email}`);
                if (fallbackResponse.ok) {
                  const fallbackData = await fallbackResponse.json();
                  if (fallbackData && fallbackData.data && fallbackData.data.length > 0) {
                    console.log("Fallback successful:", fallbackData);
                    setPolicies(fallbackData.data);
                  }
                }
              } catch (fallbackError) {
                console.error("Fallback policy fetch failed:", fallbackError);
              }
            }
          }
        } catch (policyError) {
          console.error("Error fetching policies:", policyError);
          setPolicies([]);
          
          // Try fallback method if regular policies endpoint fails
          if (currentUserData && currentUserData.email) {
            try {
              console.log("Trying fallback after error: fetching policies by email");
              const fallbackResponse = await fetch(`http://localhost:8082/policies/check-by-email/${currentUserData.email}`);
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                if (fallbackData && fallbackData.data && fallbackData.data.length > 0) {
                  console.log("Fallback successful:", fallbackData);
                  setPolicies(fallbackData.data);
                }
              }
            } catch (fallbackError) {
              console.error("Fallback policy fetch failed:", fallbackError);
            }
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        
        // More specific error messages based on the error type
        if (error.message && error.message.includes('Network Error')) {
          setError('Network error. Please check your internet connection.');
        } else if (error.response && error.response.status === 401) {
          setError('Session expired. Please log in again.');
          // Redirect to login after a short delay
          setTimeout(() => {
            AuthService.logout();
            window.location.href = '/login';
          }, 2000);
        } else {
          setError('Failed to load dashboard data. Please try refreshing.');
        }
        
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

  if (!isServerAvailable) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>My Dashboard</h1>
            <div className="dashboard-actions">
              <button onClick={() => setRefreshKey(prevKey => prevKey + 1)} className="dashboard-button secondary refresh-button">
                Try Again
              </button>
              <Link to="/profile" className="dashboard-button secondary">
                Edit Profile
              </Link>
              <Link to="/cars/useofcar" className="dashboard-button primary">
                Buy New Policy
              </Link>
            </div>
          </div>
          
          <div className="server-unavailable-message">
            <div className="message-icon">🔌</div>
            <h3>Server is currently unavailable</h3>
            <p>We're having trouble connecting to our servers. This could be due to maintenance or temporary network issues.</p>
            <p>You can try again or continue using other parts of the application that don't require server connection.</p>
            <button onClick={() => setRefreshKey(prevKey => prevKey + 1)} className="dashboard-button secondary">
              Retry Connection
            </button>
          </div>
          
          {user && (
            <div className="user-info-card">
              <div className="user-info-header">
                <h2>Personal Information (Cached)</h2>
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
                {user.mobile && (
                  <div className="user-info-item">
                    <span className="info-label">Mobile</span>
                    <span className="info-value">{user.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="policies-section">
            <h2>My Policies</h2>
            <div className="no-policies">
              <p>We can't load your policies right now.</p>
              <p className="policy-note">Please try again when the server is available.</p>
              <Link to="/cars/useofcar" className="dashboard-button primary">
                Buy a New Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="dashboard-actions">
            <button onClick={refreshPolicies} className="dashboard-button secondary refresh-button">
              Refresh
            </button>
            {!isServerAvailable && (
              <div className="server-status-indicator">
                Server Offline
                <span className="status-dot offline"></span>
              </div>
            )}
            {isServerAvailable && databaseStatus === 'disconnected' && (
              <div className="database-status-indicator">
                Database Offline
                <span className="status-dot warning"></span>
              </div>
            )}
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
              <p className="policy-note">If you've recently purchased a policy, please click the "Refresh" button above.</p>
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