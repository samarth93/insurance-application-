import React, { useState } from 'react';
import { FaHospital, FaFileMedical, FaUserMd, FaCalendarAlt, FaFileUpload, FaCheck } from 'react-icons/fa';
import './HealthHowItWorks.css';

const HealthHowItWorks = () => {
  const [activeSection, setActiveSection] = useState('process');

  const renderProcessSection = () => (
    <div className="process-section">
      <h2>Health Insurance Claim Process</h2>
      <div className="process-steps">
        <div className="step">
          <div className="step-icon"><FaHospital /></div>
          <h3>Step 1: Hospitalization</h3>
          <p>Inform us about your hospitalization within 24 hours of admission</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaFileMedical /></div>
          <h3>Step 2: Document Collection</h3>
          <p>Gather all necessary medical documents and bills</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaUserMd /></div>
          <h3>Step 3: Medical Review</h3>
          <p>Our medical team reviews your case and documents</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaCalendarAlt /></div>
          <h3>Step 4: Processing</h3>
          <p>We process your claim within 7 working days</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaCheck /></div>
          <h3>Step 5: Settlement</h3>
          <p>Claim amount is settled through your preferred mode</p>
        </div>
      </div>
    </div>
  );

  const renderDocumentsSection = () => (
    <div className="documents-section">
      <h2>Required Documents</h2>
      <div className="document-list">
        <div className="document-item">
          <FaFileMedical />
          <h3>Hospital Documents</h3>
          <ul>
            <li>Discharge Summary</li>
            <li>Hospital Bills</li>
            <li>Investigation Reports</li>
            <li>Prescription</li>
          </ul>
        </div>
        <div className="document-item">
          <FaUserMd />
          <h3>Medical Documents</h3>
          <ul>
            <li>Doctor's Consultation Notes</li>
            <li>Diagnosis Reports</li>
            <li>Treatment History</li>
            <li>Medication Details</li>
          </ul>
        </div>
        <div className="document-item">
          <FaFileUpload />
          <h3>Other Documents</h3>
          <ul>
            <li>Health ID Card</li>
            <li>ID Proof</li>
            <li>Bank Details</li>
            <li>Previous Insurance Details</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="health-how-it-works">
      <div className="section-tabs">
        <button 
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => setActiveSection('process')}
        >
          Claim Process
        </button>
        <button 
          className={activeSection === 'documents' ? 'active' : ''}
          onClick={() => setActiveSection('documents')}
        >
          Required Documents
        </button>
      </div>

      <div className="content-section">
        {activeSection === 'process' ? renderProcessSection() : renderDocumentsSection()}
      </div>
    </div>
  );
};

export default HealthHowItWorks; 