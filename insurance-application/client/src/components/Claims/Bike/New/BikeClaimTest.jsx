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
          Go to Bike Insurance Claims Guide (Full Version)
        </Link>
        
        <Link 
          to="/claims/bike/simple-how-it-works" 
          style={{ 
            padding: '10px 15px', 
            background: '#28a745', 
            color: 'white', 
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            width: 'fit-content',
            marginTop: '10px'
          }}
        >
          Go to Bike Insurance Claims Guide (Simple Version)
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
            width: 'fit-content',
            marginTop: '10px'
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
            marginTop: '20px',
            width: 'fit-content'
          }}
        >
          Go Back
        </button>
      </div>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <h3>Troubleshooting Tips</h3>
        <p>If you are experiencing any issues with the full version of the BikeHowItWorks component:</p>
        <ul>
          <li>Try the simple version which has fewer interactive elements</li>
          <li>Check the browser console for any JavaScript errors</li>
          <li>Make sure all required React libraries are properly loaded</li>
          <li>Verify that the CSS is properly applied</li>
        </ul>
      </div>
    </div>
  );
};

export default BikeClaimTest; 