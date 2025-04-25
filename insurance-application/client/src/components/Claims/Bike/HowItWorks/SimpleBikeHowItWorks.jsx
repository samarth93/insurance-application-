import React from 'react';
import { Link } from 'react-router-dom';

const SimpleBikeHowItWorks = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Bike Insurance Claims Process</h1>
      <p>Everything you need to know about filing and tracking your bike insurance claim</p>
      
      <div style={{ 
        marginTop: '20px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>Types of Bike Insurance Claims</h2>
        <ul>
          <li>Accident Claims - For damages due to collisions or accidents</li>
          <li>Theft Claims - For stolen bikes or parts</li>
          <li>Natural Disaster Claims - For damage from floods, earthquakes, etc.</li>
          <li>Fire Claims - For damages due to fire incidents</li>
        </ul>
      </div>
      
      <div style={{ 
        marginTop: '20px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>Bike Insurance Claim Process</h2>
        <ol>
          <li>Report the Incident - Notify us immediately through our app, website, or helpline.</li>
          <li>Claim Registration - We'll register your claim and provide a unique reference number.</li>
          <li>Document Submission - Submit all required documents through our app, email, or branch office.</li>
          <li>Bike Inspection - Our surveyor will inspect your bike to assess damage and repair costs.</li>
          <li>Claim Approval - Your claim will be approved with the final settlement amount.</li>
          <li>Repairs & Settlement - Repairs begin at network garage or you receive approved amount.</li>
        </ol>
      </div>
      
      <div style={{ 
        marginTop: '20px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>Documents Required</h2>
        <h3>For Accident Claims:</h3>
        <ul>
          <li>Filled claim form</li>
          <li>Insurance policy copy</li>
          <li>Driving license</li>
          <li>RC book copy</li>
          <li>Photos of damaged bike</li>
          <li>Estimate of repairs</li>
        </ul>
      </div>
      
      <Link 
        to="/claims"
        style={{ 
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 15px', 
          background: '#4a6491', 
          color: 'white', 
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        Back to Claims
      </Link>
    </div>
  );
};

export default SimpleBikeHowItWorks; 