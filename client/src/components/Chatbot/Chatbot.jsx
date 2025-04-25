import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentAlt } from 'react-icons/fa';
import './Chatbot.css';
import { useChatbot } from './ChatbotContext';
import { vehicleData, defaultVehicleData } from './mockData';

// Personal Details Form Component
const PersonalDetailsForm = ({ onSubmit }) => {
  const { t } = useChatbot();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    phoneNumber: '',
    emailAddress: '',
    occupation: '',
    annualIncome: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="chatbot-form" onSubmit={handleSubmit}>
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('fullName')}*</label>
        <input 
          className="chatbot-form-input"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('dateOfBirth')}*</label>
        <input 
          className="chatbot-form-input"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('gender')}*</label>
        <select 
          className="chatbot-form-input"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('phoneNumber')}*</label>
        <input 
          className="chatbot-form-input"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('emailAddress')}</label>
        <input 
          className="chatbot-form-input"
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="chatbot-form-button">{t('submit')}</button>
    </form>
  );
};

// Medical History Form Component
const MedicalHistoryForm = ({ onSubmit }) => {
  const { t } = useChatbot();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    existingConditions: 'no',
    conditionsDetails: '',
    surgeries: 'no',
    surgeriesDetails: '',
    medications: 'no',
    medicationsDetails: '',
    familyHistory: 'no',
    familyHistoryDetails: '',
    smoking: 'no',
    alcohol: 'occasionally',
    exercise: 'occasionally',
    bloodPressure: 'normal',
    diabetes: 'no',
    cholesterol: 'normal',
    hospitalization: 'no',
    hospitalizationDetails: '',
    allergies: 'no',
    allergiesDetails: '',
    occupation: '',
    annualCheckup: 'no',
    covid19: 'no',
    covidDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="chatbot-form" onSubmit={handleSubmit}>
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('height')}* (cm)</label>
        <input 
          className="chatbot-form-input"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('weight')}* (kg)</label>
        <input 
          className="chatbot-form-input"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Blood Pressure</label>
        <select 
          className="chatbot-form-input"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
        >
          <option value="normal">Normal</option>
          <option value="high">High (Hypertension)</option>
          <option value="low">Low (Hypotension)</option>
          <option value="controlled">Controlled with medication</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Diabetes</label>
        <select 
          className="chatbot-form-input"
          name="diabetes"
          value={formData.diabetes}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          <option value="prediabetic">Pre-diabetic</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Cholesterol Level</label>
        <select 
          className="chatbot-form-input"
          name="cholesterol"
          value={formData.cholesterol}
          onChange={handleChange}
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="controlled">Controlled with medication</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('existingConditions')}</label>
        <select 
          className="chatbot-form-input"
          name="existingConditions"
          value={formData.existingConditions}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      
      {formData.existingConditions === 'yes' && (
        <div className="chatbot-form-field">
          <input 
            className="chatbot-form-input"
            type="text"
            name="conditionsDetails"
            value={formData.conditionsDetails}
            onChange={handleChange}
            placeholder="Please specify (e.g., Asthma, Heart Disease)"
          />
        </div>
      )}
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Previous Surgeries</label>
        <select 
          className="chatbot-form-input"
          name="surgeries"
          value={formData.surgeries}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      
      {formData.surgeries === 'yes' && (
        <div className="chatbot-form-field">
          <input 
            className="chatbot-form-input"
            type="text"
            name="surgeriesDetails"
            value={formData.surgeriesDetails}
            onChange={handleChange}
            placeholder="Please specify type and date"
          />
        </div>
      )}
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Hospitalization in last 5 years</label>
        <select 
          className="chatbot-form-input"
          name="hospitalization"
          value={formData.hospitalization}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      
      {formData.hospitalization === 'yes' && (
        <div className="chatbot-form-field">
          <input 
            className="chatbot-form-input"
            type="text"
            name="hospitalizationDetails"
            value={formData.hospitalizationDetails}
            onChange={handleChange}
            placeholder="Please specify reason and duration"
          />
        </div>
      )}
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Family History of Major Illness</label>
        <select 
          className="chatbot-form-input"
          name="familyHistory"
          value={formData.familyHistory}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      
      {formData.familyHistory === 'yes' && (
        <div className="chatbot-form-field">
          <input 
            className="chatbot-form-input"
            type="text"
            name="familyHistoryDetails"
            value={formData.familyHistoryDetails}
            onChange={handleChange}
            placeholder="Please specify (e.g., Cancer, Heart Disease)"
          />
        </div>
      )}
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">COVID-19 History</label>
        <select 
          className="chatbot-form-input"
          name="covid19"
          value={formData.covid19}
          onChange={handleChange}
        >
          <option value="no">Never had COVID-19</option>
          <option value="mild">Yes, had mild symptoms</option>
          <option value="severe">Yes, had severe symptoms</option>
          <option value="hospitalized">Yes, was hospitalized</option>
        </select>
      </div>
      
      {formData.covid19 !== 'no' && (
        <div className="chatbot-form-field">
          <input 
            className="chatbot-form-input"
            type="text"
            name="covidDetails"
            value={formData.covidDetails}
            onChange={handleChange}
            placeholder="When and any lingering effects?"
          />
        </div>
      )}
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">{t('smoking')}</label>
        <select 
          className="chatbot-form-input"
          name="smoking"
          value={formData.smoking}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="occasional">Occasionally</option>
          <option value="regular">Regular</option>
          <option value="former">Former smoker</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Alcohol Consumption</label>
        <select 
          className="chatbot-form-input"
          name="alcohol"
          value={formData.alcohol}
          onChange={handleChange}
        >
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
          <option value="regularly">Regularly</option>
          <option value="heavily">Heavily</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Exercise Frequency</label>
        <select 
          className="chatbot-form-input"
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
        >
          <option value="never">Never</option>
          <option value="occasionally">Occasionally</option>
          <option value="regularly">Regularly (3-5 times a week)</option>
          <option value="daily">Daily</option>
        </select>
      </div>
      
      <div className="chatbot-form-field">
        <label className="chatbot-form-label">Annual Health Check-ups</label>
        <select 
          className="chatbot-form-input"
          name="annualCheckup"
          value={formData.annualCheckup}
          onChange={handleChange}
        >
          <option value="yes">Yes, regularly</option>
          <option value="sometimes">Sometimes</option>
          <option value="no">No</option>
        </select>
      </div>
      
      <button type="submit" className="chatbot-form-button">{t('submit')}</button>
    </form>
  );
};

// Vehicle Details Component
const VehicleDetailsDisplay = ({ vehicleData }) => {
  if (!vehicleData) return null;
  
  return (
    <div className="vehicle-details">
      {Object.entries(vehicleData).map(([key, value]) => (
        key !== 'type' && (
          <div className="vehicle-detail-item" key={key}>
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span>{value}</span>
          </div>
        )
      ))}
    </div>
  );
};

// Main Chatbot Component
const Chatbot = () => {
  const history = useHistory();
  const {
    isOpen,
    setIsOpen,
    showNotification,
    setShowNotification,
    messages,
    currentStep,
    userInput,
    setUserInput,
    insuranceType,
    isTyping,
    t,
    handleLanguageSelect,
    handleWelcomeResponse,
    handleInsuranceTypeSelect,
    handleVehicleNumberSubmit,
    handleVehicleConfirmation,
    handleInsuranceStatusSelect,
    handlePersonalDetailsSubmit,
    handleMedicalHistorySubmit
  } = useChatbot();
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };
  
  // Handle user input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Handle based on current step
    if (currentStep === 'vehicle_number') {
      handleVehicleNumberSubmit(userInput);
    }
    
    setUserInput('');
  };
  
  // Handle option button clicks
  const handleOptionClick = (option) => {
    if (option.action) {
      // Log for debugging
      console.log("Navigating to:", option.action);
      // Navigate to a specific route
      history.push(option.action);
      // Close the chatbot after navigation
      setIsOpen(false);
      return;
    }
    
    // Handle based on current step
    switch (currentStep) {
      case 'language_selection':
        handleLanguageSelect(option.value);
        break;
      case 'welcome':
        handleWelcomeResponse(option.value);
        break;
      case 'insurance_type':
        handleInsuranceTypeSelect(option.value);
        break;
      case 'vehicle_confirmation':
        handleVehicleConfirmation(option.value);
        break;
      case 'insurance_status':
        handleInsuranceStatusSelect(option.value);
        break;
      default:
        break;
    }
  };
  
  // Process vehicle data from mock or API
  const getVehicleData = (vehicleNumber) => {
    // Check if vehicle exists in mock data
    if (vehicleData[vehicleNumber]) {
      return vehicleData[vehicleNumber];
    }
    
    // Return default data based on insurance type
    return defaultVehicleData[insuranceType];
  };
  
  return (
    <div className="chatbot-container">
      {/* Notification popup */}
      {showNotification && !isOpen && (
        <div className="chatbot-notification">
          <p>Select your language:</p>
          <div className="chatbot-options">
            <button 
              className="chatbot-option" 
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
                handleLanguageSelect('en');
              }}
            >
              English
            </button>
            <button 
              className="chatbot-option"
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
                handleLanguageSelect('hi');
              }}
            >
              हिंदी
            </button>
          </div>
        </div>
      )}
      
      {/* Chatbot button */}
      <div className="chatbot-button" onClick={toggleChatbot}>
        <div className="chatbot-icon">
          {isOpen ? <FaTimes /> : <FaCommentAlt />}
        </div>
      </div>
      
      {/* Chatbot popup */}
      <div className={`chatbot-popup ${isOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <h2 className="chatbot-title">Insurance Assistant</h2>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        
        <div className="chatbot-body">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`chatbot-message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
            >
              {message.text}
              
              {/* Display vehicle details if available */}
              {message.vehicleDetails && (
                <VehicleDetailsDisplay 
                  vehicleData={getVehicleData(message.vehicleDetails.number)} 
                />
              )}
              
              {/* Display options if available */}
              {message.options && (
                <div className="chatbot-options">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      className="chatbot-option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Display personal details form if required */}
              {message.requiresPersonalDetails && (
                <PersonalDetailsForm 
                  onSubmit={handlePersonalDetailsSubmit} 
                />
              )}
              
              {/* Display medical history form if required */}
              {message.requiresMedicalHistory && (
                <MedicalHistoryForm 
                  onSubmit={handleMedicalHistorySubmit} 
                />
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="chatbot-typing">
              <div className="chatbot-typing-dot"></div>
              <div className="chatbot-typing-dot"></div>
              <div className="chatbot-typing-dot"></div>
            </div>
          )}
          
          {/* Dummy div for scrolling to bottom */}
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* Input form for text input if required */}
        {messages.length > 0 && messages[messages.length - 1].requiresInput && (
          <form className="chatbot-input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chatbot-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                currentStep === 'vehicle_number' 
                  ? `${t('enterVehicleNumber')} (e.g. MH01AB1234)` 
                  : "Type here..."
              }
            />
            <button type="submit" className="chatbot-submit">
              <FaPaperPlane />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chatbot; 
 