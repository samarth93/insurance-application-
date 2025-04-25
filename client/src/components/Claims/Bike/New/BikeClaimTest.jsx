import React from 'react';
import { Link } from 'react-router-dom';

const BikeClaimTest = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Bike Claims Testing Page</h1>
      <p>This page is for testing navigation and component rendering</p>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        marginTop: '20px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>Navigation Links</h2>
        <Link 
          to="/claims/bike/how-it-works" 
          style={{ 
            padding: '10px 15px', 
            background: '#4a6491', 
            color: 'white', 
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            width: 'fit-content'
          }}
        >
          Go to Bike Insurance Claims Guide
        </Link>
        
        <Link 
          to="/claims/bike/repair-shops" 
          style={{ 
            padding: '10px 15px', 
            background: '#4a6491', 
            color: 'white', 
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            width: 'fit-content'
          }}
        >
          Go to Bike Repair Shops
        </Link>
        
        <button
          onClick={() => window.history.back()}
          style={{ 
            padding: '10px 15px', 
            background: '#6c757d', 
            color: 'white', 
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            width: 'fit-content'
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BikeClaimTest; 