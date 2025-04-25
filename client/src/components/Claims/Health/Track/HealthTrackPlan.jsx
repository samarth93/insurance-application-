import React, { useState } from 'react';
import { FaSearch, FaFileMedical, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import './HealthTrackPlan.css';

const HealthTrackPlan = () => {
  const [claimNumber, setClaimNumber] = useState('');
  const [claimStatus, setClaimStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setClaimStatus({
        claimNumber: claimNumber,
        status: 'In Progress',
        dateSubmitted: '2024-04-25',
        lastUpdated: '2024-04-25',
        estimatedCompletion: '2024-05-02',
        documents: [
          { name: 'Hospital Bills', status: 'Received' },
          { name: 'Discharge Summary', status: 'Received' },
          { name: 'Medical Reports', status: 'Pending' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received':
        return <FaCheckCircle className="status-icon received" />;
      case 'Pending':
        return <FaSpinner className="status-icon pending" />;
      case 'Rejected':
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return null;
    }
  };

  return (
    <div className="health-track-plan">
      <div className="search-section">
        <h2>Track Your Health Insurance Claim</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Enter your claim number"
              value={claimNumber}
              onChange={(e) => setClaimNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Track Claim'}
          </button>
        </form>
      </div>

      {claimStatus && (
        <div className="claim-details">
          <div className="status-header">
            <h3>Claim Status</h3>
            <span className={`status-badge ${claimStatus.status.toLowerCase().replace(' ', '-')}`}>
              {claimStatus.status}
            </span>
          </div>

          <div className="status-timeline">
            <div className="timeline-item">
              <FaFileMedical className="timeline-icon" />
              <div className="timeline-content">
                <h4>Claim Submitted</h4>
                <p>{claimStatus.dateSubmitted}</p>
              </div>
            </div>
            <div className="timeline-item">
              <FaCalendarAlt className="timeline-icon" />
              <div className="timeline-content">
                <h4>Last Updated</h4>
                <p>{claimStatus.lastUpdated}</p>
              </div>
            </div>
            <div className="timeline-item">
              <FaCheckCircle className="timeline-icon" />
              <div className="timeline-content">
                <h4>Estimated Completion</h4>
                <p>{claimStatus.estimatedCompletion}</p>
              </div>
            </div>
          </div>

          <div className="documents-section">
            <h3>Document Status</h3>
            <div className="documents-list">
              {claimStatus.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <span className="document-name">{doc.name}</span>
                  <div className="document-status">
                    {getStatusIcon(doc.status)}
                    <span className={`status-text ${doc.status.toLowerCase()}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTrackPlan; 