import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FaUser,
  FaHospital,
  FaFileMedical,
  FaFileUpload,
  FaMapMarkerAlt,
  FaCheck,
  FaSave,
  FaUserMd,
  FaCalendarAlt,
  FaCreditCard,
  FaHistory,
  FaFileAlt,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaExclamationCircle,
  FaCloudUploadAlt
} from 'react-icons/fa';
import './HealthClaimForm.css';

const HealthClaimForm = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form states
  const [policyholderInfo, setPolicyholderInfo] = useState({
    policyNumber: '',
    patientName: '',
    relationship: '',
    contactNumber: '',
    email: '',
    address: ''
  });

  const [hospitalDetails, setHospitalDetails] = useState({
    hospitalName: '',
    doctorName: '',
    specialization: '',
    admissionDate: '',
    dischargeDate: '',
    natureOfIllness: '',
    diagnosisDate: '',
    treatmentType: '',
    hospitalizationType: ''
  });

  const [claimType, setClaimType] = useState({
    type: '',
    preAuthNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const [medicalHistory, setMedicalHistory] = useState({
    preExistingConditions: '',
    previousHospitalizations: '',
    currentMedications: '',
    primaryCarePhysician: '',
    physicianContact: ''
  });

  const [documents, setDocuments] = useState({
    hospitalBills: [],
    dischargeSummary: null,
    investigationReports: [],
    prescription: null,
    healthIdCard: null,
    otherDocuments: []
  });

  const [selectedHospital, setSelectedHospital] = useState(null);

  // Handle input changes
  const handlePolicyholderInfoChange = (e) => {
    const { name, value } = e.target;
    setPolicyholderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHospitalDetailsChange = (e) => {
    const { name, value } = e.target;
    setHospitalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClaimTypeChange = (e) => {
    const { name, value } = e.target;
    setClaimType(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for the current step
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmitClaim();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    const formData = {
      policyholderInfo,
      hospitalDetails,
      claimType,
      medicalHistory,
      documents,
      selectedHospital
    };
    
    localStorage.setItem('healthClaimDraft', JSON.stringify(formData));
    alert('Your claim draft has been saved!');
  };

  const handleSubmitClaim = () => {
    alert('Your claim has been submitted successfully!');
    history.push('/dashboard');
  };

  // Render progress indicator
  const renderProgressIndicator = () => {
    const progress = (currentStep / totalSteps) * 100;
    return (
      <div className="progress-indicator">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="steps-display">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    );
  };

  // Render policyholder information step
  const renderPolicyholderInfoStep = () => (
    <div className="form-step">
      <h2><FaUser className="step-icon" /> Policyholder Information</h2>
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="policyNumber">Policy Number</label>
          <div className="input-with-icon">
            <FaFileAlt className="input-icon" />
            <input
              type="text"
              id="policyNumber"
              name="policyNumber"
              value={policyholderInfo.policyNumber}
              onChange={handlePolicyholderInfoChange}
              placeholder="Enter your policy number"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name</label>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={policyholderInfo.patientName}
              onChange={handlePolicyholderInfoChange}
              placeholder="Enter patient name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship to Policyholder</label>
          <select
            id="relationship"
            name="relationship"
            value={policyholderInfo.relationship}
            onChange={handlePolicyholderInfoChange}
          >
            <option value="">Select relationship</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={policyholderInfo.contactNumber}
              onChange={handlePolicyholderInfoChange}
              placeholder="Enter contact number"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={policyholderInfo.email}
              onChange={handlePolicyholderInfoChange}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={policyholderInfo.address}
            onChange={handlePolicyholderInfoChange}
            placeholder="Enter your address"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  // Render hospital details step
  const renderHospitalDetailsStep = () => (
    <div className="form-step">
      <h2><FaHospital className="step-icon" /> Hospital & Treatment Details</h2>
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="hospitalName">Hospital Name</label>
          <div className="input-with-icon">
            <FaSearch className="input-icon" />
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              value={hospitalDetails.hospitalName}
              onChange={handleHospitalDetailsChange}
              placeholder="Search for hospital"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor's Name</label>
          <div className="input-with-icon">
            <FaUserMd className="input-icon" />
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={hospitalDetails.doctorName}
              onChange={handleHospitalDetailsChange}
              placeholder="Enter doctor's name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={hospitalDetails.specialization}
            onChange={handleHospitalDetailsChange}
            placeholder="Enter doctor's specialization"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="admissionDate">Admission Date</label>
            <div className="input-with-icon">
              <FaCalendarAlt className="input-icon" />
              <input
                type="date"
                id="admissionDate"
                name="admissionDate"
                value={hospitalDetails.admissionDate}
                onChange={handleHospitalDetailsChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dischargeDate">Expected Discharge Date</label>
            <div className="input-with-icon">
              <FaCalendarAlt className="input-icon" />
              <input
                type="date"
                id="dischargeDate"
                name="dischargeDate"
                value={hospitalDetails.dischargeDate}
                onChange={handleHospitalDetailsChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="natureOfIllness">Nature of Illness/Disease/Injury</label>
          <textarea
            id="natureOfIllness"
            name="natureOfIllness"
            value={hospitalDetails.natureOfIllness}
            onChange={handleHospitalDetailsChange}
            placeholder="Describe the nature of illness/disease/injury"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="diagnosisDate">Date of Injury/Diagnosis</label>
          <div className="input-with-icon">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              id="diagnosisDate"
              name="diagnosisDate"
              value={hospitalDetails.diagnosisDate}
              onChange={handleHospitalDetailsChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="treatmentType">Treatment Type</label>
          <select
            id="treatmentType"
            name="treatmentType"
            value={hospitalDetails.treatmentType}
            onChange={handleHospitalDetailsChange}
          >
            <option value="">Select treatment type</option>
            <option value="surgical">Surgical</option>
            <option value="medical">Medical Management</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hospitalization Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hospitalizationType"
                value="emergency"
                checked={hospitalDetails.hospitalizationType === 'emergency'}
                onChange={handleHospitalDetailsChange}
              />
              Emergency
            </label>
            <label>
              <input
                type="radio"
                name="hospitalizationType"
                value="planned"
                checked={hospitalDetails.hospitalizationType === 'planned'}
                onChange={handleHospitalDetailsChange}
              />
              Planned
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  // Render claim type step
  const renderClaimTypeStep = () => (
    <div className="form-step">
      <h2><FaCreditCard className="step-icon" /> Claim Type Selection</h2>
      <div className="form-section">
        <div className="form-group">
          <label>Claim Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="cashless"
                checked={claimType.type === 'cashless'}
                onChange={handleClaimTypeChange}
              />
              Cashless Facility
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="reimbursement"
                checked={claimType.type === 'reimbursement'}
                onChange={handleClaimTypeChange}
              />
              Reimbursement Claim
            </label>
          </div>
        </div>
        {claimType.type === 'cashless' && (
          <div className="form-group">
            <label htmlFor="preAuthNumber">Pre-authorization Number</label>
            <input
              type="text"
              id="preAuthNumber"
              name="preAuthNumber"
              value={claimType.preAuthNumber}
              onChange={handleClaimTypeChange}
              placeholder="Enter pre-authorization number"
            />
          </div>
        )}
        {claimType.type === 'reimbursement' && (
          <>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={claimType.bankName}
                onChange={handleClaimTypeChange}
                placeholder="Enter bank name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={claimType.accountNumber}
                onChange={handleClaimTypeChange}
                placeholder="Enter account number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ifscCode">IFSC Code</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={claimType.ifscCode}
                onChange={handleClaimTypeChange}
                placeholder="Enter IFSC code"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Render medical history step
  const renderMedicalHistoryStep = () => (
    <div className="form-step">
      <h2><FaHistory className="step-icon" /> Medical History</h2>
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="preExistingConditions">Pre-existing Conditions</label>
          <textarea
            id="preExistingConditions"
            name="preExistingConditions"
            value={medicalHistory.preExistingConditions}
            onChange={handleMedicalHistoryChange}
            placeholder="List any pre-existing conditions"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="previousHospitalizations">Previous Related Hospitalizations</label>
          <textarea
            id="previousHospitalizations"
            name="previousHospitalizations"
            value={medicalHistory.previousHospitalizations}
            onChange={handleMedicalHistoryChange}
            placeholder="List any previous related hospitalizations"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentMedications">Current Medications</label>
          <textarea
            id="currentMedications"
            name="currentMedications"
            value={medicalHistory.currentMedications}
            onChange={handleMedicalHistoryChange}
            placeholder="List current medications"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="primaryCarePhysician">Primary Care Physician</label>
          <input
            type="text"
            id="primaryCarePhysician"
            name="primaryCarePhysician"
            value={medicalHistory.primaryCarePhysician}
            onChange={handleMedicalHistoryChange}
            placeholder="Enter primary care physician's name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="physicianContact">Physician Contact</label>
          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              id="physicianContact"
              name="physicianContact"
              value={medicalHistory.physicianContact}
              onChange={handleMedicalHistoryChange}
              placeholder="Enter physician's contact number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render document upload step
  const renderDocumentUploadStep = () => (
    <div className="form-step">
      <h2><FaFileUpload className="step-icon" /> Document Upload</h2>
      <div className="form-section">
        <div className="form-group">
          <label>Hospital Bills</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setDocuments(prev => ({
                  ...prev,
                  hospitalBills: [...prev.hospitalBills, ...files]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload itemized hospital bills</span>
          </div>
          {documents.hospitalBills.length > 0 && (
            <div className="uploaded-files">
              {documents.hospitalBills.map((file, index) => (
                <div key={index} className="file-preview">
                  <span>{file.name}</span>
                  <button
                    onClick={() => {
                      setDocuments(prev => ({
                        ...prev,
                        hospitalBills: prev.hospitalBills.filter((_, i) => i !== index)
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Discharge Summary</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                setDocuments(prev => ({
                  ...prev,
                  dischargeSummary: e.target.files[0]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload discharge summary</span>
          </div>
          {documents.dischargeSummary && (
            <div className="uploaded-files">
              <div className="file-preview">
                <span>{documents.dischargeSummary.name}</span>
                <button
                  onClick={() => {
                    setDocuments(prev => ({
                      ...prev,
                      dischargeSummary: null
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Investigation Reports</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setDocuments(prev => ({
                  ...prev,
                  investigationReports: [...prev.investigationReports, ...files]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload investigation reports</span>
          </div>
          {documents.investigationReports.length > 0 && (
            <div className="uploaded-files">
              {documents.investigationReports.map((file, index) => (
                <div key={index} className="file-preview">
                  <span>{file.name}</span>
                  <button
                    onClick={() => {
                      setDocuments(prev => ({
                        ...prev,
                        investigationReports: prev.investigationReports.filter((_, i) => i !== index)
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Doctor's Prescription</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                setDocuments(prev => ({
                  ...prev,
                  prescription: e.target.files[0]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload doctor's prescription</span>
          </div>
          {documents.prescription && (
            <div className="uploaded-files">
              <div className="file-preview">
                <span>{documents.prescription.name}</span>
                <button
                  onClick={() => {
                    setDocuments(prev => ({
                      ...prev,
                      prescription: null
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Health ID Card</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                setDocuments(prev => ({
                  ...prev,
                  healthIdCard: e.target.files[0]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload photo of health ID card</span>
          </div>
          {documents.healthIdCard && (
            <div className="uploaded-files">
              <div className="file-preview">
                <span>{documents.healthIdCard.name}</span>
                <button
                  onClick={() => {
                    setDocuments(prev => ({
                      ...prev,
                      healthIdCard: null
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Other Supporting Documents</label>
          <div className="file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setDocuments(prev => ({
                  ...prev,
                  otherDocuments: [...prev.otherDocuments, ...files]
                }));
              }}
            />
            <span className="upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span>Upload other supporting documents</span>
          </div>
          {documents.otherDocuments.length > 0 && (
            <div className="uploaded-files">
              {documents.otherDocuments.map((file, index) => (
                <div key={index} className="file-preview">
                  <span>{file.name}</span>
                  <button
                    onClick={() => {
                      setDocuments(prev => ({
                        ...prev,
                        otherDocuments: prev.otherDocuments.filter((_, i) => i !== index)
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render nearby hospitals step
  const renderNearbyHospitalsStep = () => (
    <div className="form-step">
      <h2><FaMapMarkerAlt className="step-icon" /> Nearby Hospitals</h2>
      <div className="form-section">
        <div className="hospital-search">
          <div className="search-filters">
            <select>
              <option value="">All Specializations</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
            <select>
              <option value="">All Facilities</option>
              <option value="cashless">Cashless Facility</option>
              <option value="emergency">Emergency Care</option>
              <option value="icu">ICU</option>
            </select>
          </div>
          <div className="hospital-list">
            {/* This would be populated with actual hospital data */}
            <div className="hospital-card">
              <h3>Sample Hospital 1</h3>
              <p>Specialization: Cardiology, Neurology</p>
              <p>Facilities: Cashless, Emergency Care, ICU</p>
              <p>Distance: 2.5 km</p>
              <button onClick={() => setSelectedHospital('Sample Hospital 1')}>
                Select
              </button>
            </div>
            <div className="hospital-card">
              <h3>Sample Hospital 2</h3>
              <p>Specialization: Orthopedics, Pediatrics</p>
              <p>Facilities: Cashless, Emergency Care</p>
              <p>Distance: 3.1 km</p>
              <button onClick={() => setSelectedHospital('Sample Hospital 2')}>
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render review step
  const renderReviewStep = () => (
    <div className="form-step">
      <h2><FaCheck className="step-icon" /> Review & Submit</h2>
      <div className="form-section review-section">
        <div className="review-group">
          <h3>Policyholder Information</h3>
          <div className="review-item">
            <span>Policy Number:</span>
            <span>{policyholderInfo.policyNumber}</span>
          </div>
          <div className="review-item">
            <span>Patient Name:</span>
            <span>{policyholderInfo.patientName}</span>
          </div>
          <div className="review-item">
            <span>Relationship:</span>
            <span>{policyholderInfo.relationship}</span>
          </div>
          <div className="review-item">
            <span>Contact Number:</span>
            <span>{policyholderInfo.contactNumber}</span>
          </div>
          <div className="review-item">
            <span>Email:</span>
            <span>{policyholderInfo.email}</span>
          </div>
          <div className="review-item">
            <span>Address:</span>
            <span>{policyholderInfo.address}</span>
          </div>
        </div>

        <div className="review-group">
          <h3>Hospital & Treatment Details</h3>
          <div className="review-item">
            <span>Hospital Name:</span>
            <span>{hospitalDetails.hospitalName}</span>
          </div>
          <div className="review-item">
            <span>Doctor's Name:</span>
            <span>{hospitalDetails.doctorName}</span>
          </div>
          <div className="review-item">
            <span>Specialization:</span>
            <span>{hospitalDetails.specialization}</span>
          </div>
          <div className="review-item">
            <span>Admission Date:</span>
            <span>{hospitalDetails.admissionDate}</span>
          </div>
          <div className="review-item">
            <span>Discharge Date:</span>
            <span>{hospitalDetails.dischargeDate}</span>
          </div>
          <div className="review-item">
            <span>Nature of Illness:</span>
            <span>{hospitalDetails.natureOfIllness}</span>
          </div>
          <div className="review-item">
            <span>Diagnosis Date:</span>
            <span>{hospitalDetails.diagnosisDate}</span>
          </div>
          <div className="review-item">
            <span>Treatment Type:</span>
            <span>{hospitalDetails.treatmentType}</span>
          </div>
          <div className="review-item">
            <span>Hospitalization Type:</span>
            <span>{hospitalDetails.hospitalizationType}</span>
          </div>
        </div>

        <div className="review-group">
          <h3>Claim Type</h3>
          <div className="review-item">
            <span>Type:</span>
            <span>{claimType.type}</span>
          </div>
          {claimType.type === 'cashless' && (
            <div className="review-item">
              <span>Pre-authorization Number:</span>
              <span>{claimType.preAuthNumber}</span>
            </div>
          )}
          {claimType.type === 'reimbursement' && (
            <>
              <div className="review-item">
                <span>Bank Name:</span>
                <span>{claimType.bankName}</span>
              </div>
              <div className="review-item">
                <span>Account Number:</span>
                <span>{claimType.accountNumber}</span>
              </div>
              <div className="review-item">
                <span>IFSC Code:</span>
                <span>{claimType.ifscCode}</span>
              </div>
            </>
          )}
        </div>

        <div className="review-group">
          <h3>Medical History</h3>
          <div className="review-item">
            <span>Pre-existing Conditions:</span>
            <span>{medicalHistory.preExistingConditions}</span>
          </div>
          <div className="review-item">
            <span>Previous Hospitalizations:</span>
            <span>{medicalHistory.previousHospitalizations}</span>
          </div>
          <div className="review-item">
            <span>Current Medications:</span>
            <span>{medicalHistory.currentMedications}</span>
          </div>
          <div className="review-item">
            <span>Primary Care Physician:</span>
            <span>{medicalHistory.primaryCarePhysician}</span>
          </div>
          <div className="review-item">
            <span>Physician Contact:</span>
            <span>{medicalHistory.physicianContact}</span>
          </div>
        </div>

        <div className="review-group">
          <h3>Documents</h3>
          <div className="review-item">
            <span>Hospital Bills:</span>
            <span>{documents.hospitalBills.length} files</span>
          </div>
          <div className="review-item">
            <span>Discharge Summary:</span>
            <span>{documents.dischargeSummary ? 'Uploaded' : 'Not uploaded'}</span>
          </div>
          <div className="review-item">
            <span>Investigation Reports:</span>
            <span>{documents.investigationReports.length} files</span>
          </div>
          <div className="review-item">
            <span>Prescription:</span>
            <span>{documents.prescription ? 'Uploaded' : 'Not uploaded'}</span>
          </div>
          <div className="review-item">
            <span>Health ID Card:</span>
            <span>{documents.healthIdCard ? 'Uploaded' : 'Not uploaded'}</span>
          </div>
          <div className="review-item">
            <span>Other Documents:</span>
            <span>{documents.otherDocuments.length} files</span>
          </div>
        </div>

        {selectedHospital && (
          <div className="review-group">
            <h3>Selected Hospital</h3>
            <div className="review-item">
              <span>Hospital:</span>
              <span>{selectedHospital}</span>
            </div>
          </div>
        )}

        <div className="terms-section">
          <h3>Terms and Declaration</h3>
          <div className="terms-content">
            <p>
              I declare that all the information provided in this claim form is true and correct to the best of my knowledge.
              I understand that any false or misleading information may result in the rejection of my claim.
            </p>
            <p>
              I authorize the insurance company to verify the information provided and to obtain any additional information
              required for processing my claim.
            </p>
            <p>
              I understand that the insurance company may share my information with third parties as required for claim processing.
            </p>
          </div>
          <div className="terms-checkbox">
            <input type="checkbox" id="acceptTerms" required />
            <label htmlFor="acceptTerms">
              I accept the terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="health-claim-form-container">
      <div className="claim-form-header">
        <h1><FaFileMedical /> New Health Insurance Claim</h1>
        <div className="form-actions-top">
          <button className="save-draft-btn" onClick={handleSaveDraft}>
            <FaSave /> Save Draft
          </button>
        </div>
      </div>

      {renderProgressIndicator()}

      <div className="claim-form-content">
        {currentStep === 1 && renderPolicyholderInfoStep()}
        {currentStep === 2 && renderHospitalDetailsStep()}
        {currentStep === 3 && renderClaimTypeStep()}
        {currentStep === 4 && renderMedicalHistoryStep()}
        {currentStep === 5 && renderDocumentUploadStep()}
        {currentStep === 6 && renderNearbyHospitalsStep()}
        {currentStep === 7 && renderReviewStep()}
      </div>

      <div className="form-navigation">
        {currentStep > 1 && (
          <button className="prev-btn" onClick={handlePrevStep}>
            Previous
          </button>
        )}
        <button className="next-btn" onClick={handleNextStep}>
          {currentStep === totalSteps ? 'Submit Claim' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default HealthClaimForm; 