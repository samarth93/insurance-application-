import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

// Create context
const ChatbotContext = createContext();

// Custom hook to use the chatbot context
export const useChatbot = () => useContext(ChatbotContext);

// Provider component
export const ChatbotProvider = ({ children }) => {
  // State for chatbot settings
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('language_selection');
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [insuranceType, setInsuranceType] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({});
  const [medicalHistory, setMedicalHistory] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  // Effect to show notification when chatbot is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShowNotification(true);
      }, 3000);
    } else {
      setShowNotification(false);
    }
  }, [isOpen]);

  // Effect to add initial language selection message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'language_selection',
          text: translations.en.selectLanguage,
          sender: 'bot',
          options: [
            { value: 'en', label: 'English' },
            { value: 'hi', label: 'हिंदी' }
          ]
        }
      ]);
    }
  }, [messages]);

  // Helper function to add a message with a typing indicator effect
  const addMessage = (message, delay = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { ...message, id: Date.now() }]);
      setIsTyping(false);
    }, delay);
  };

  // Get translation based on current language
  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Function to handle user selecting a language
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    
    // Add user's selection to messages
    addMessage({
      text: lang === 'en' ? 'English' : 'हिंदी',
      sender: 'user'
    });
    
    // Add welcome message in selected language
    setTimeout(() => {
      addMessage({
        text: translations[lang].welcome,
        sender: 'bot',
        options: [
          { value: 'yes', label: translations[lang].yes },
          { value: 'no', label: translations[lang].no }
        ]
      }, 500);
      
      setCurrentStep('welcome');
    }, 600);
  };

  // Function to handle welcome response
  const handleWelcomeResponse = (response) => {
    // Add user's response to messages
    addMessage({
      text: t(response),
      sender: 'user'
    });
    
    if (response === 'yes') {
      // Ask for insurance type
      setTimeout(() => {
        addMessage({
          text: t('insuranceType'),
          sender: 'bot',
          options: [
            { value: 'car', label: t('car') },
            { value: 'bike', label: t('bike') },
            { value: 'health', label: t('health') }
          ]
        }, 500);
        
        setCurrentStep('insurance_type');
      }, 600);
    } else {
      // Close chatbot
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  // Function to handle insurance type selection
  const handleInsuranceTypeSelect = (type) => {
    setInsuranceType(type);
    
    // Add user's selection to messages
    addMessage({
      text: t(type),
      sender: 'user'
    });
    
    if (type === 'car' || type === 'bike') {
      // Ask for vehicle number
      setTimeout(() => {
        addMessage({
          text: t('enterVehicleNumber'),
          sender: 'bot',
          requiresInput: true
        }, 500);
        
        setCurrentStep('vehicle_number');
      }, 600);
    } else if (type === 'health') {
      // Ask for personal details
      setTimeout(() => {
        addMessage({
          text: t('personalDetails'),
          sender: 'bot',
          requiresPersonalDetails: true
        }, 500);
        
        setCurrentStep('personal_details');
      }, 600);
    }
  };

  // Function to handle vehicle number input
  const handleVehicleNumberSubmit = (vehicleNumber) => {
    // Add user's input to messages
    addMessage({
      text: vehicleNumber,
      sender: 'user'
    });
    
    // Simulate API call to get vehicle details
    setTimeout(() => {
      addMessage({
        text: t('vehicleDetails'),
        sender: 'bot',
        vehicleDetails: {
          number: vehicleNumber,
          type: insuranceType,
          // Other details will be provided by API
        },
        options: [
          { value: 'correct', label: t('correct') },
          { value: 'incorrect', label: t('incorrect') }
        ]
      }, 700);
      
      setCurrentStep('vehicle_confirmation');
    }, 1000);
  };

  // Function to handle vehicle details confirmation
  const handleVehicleConfirmation = (confirmation) => {
    // Add user's confirmation to messages
    addMessage({
      text: t(confirmation),
      sender: 'user'
    });
    
    if (confirmation === 'correct') {
      // Ask for insurance status
      setTimeout(() => {
        addMessage({
          text: t('insuranceStatus'),
          sender: 'bot',
          options: [
            { value: 'activeInsurance', label: t('activeInsurance') },
            { value: 'expiredInsurance', label: t('expiredInsurance') },
            { value: 'firstTimeInsurance', label: t('firstTimeInsurance') }
          ]
        }, 500);
        
        setCurrentStep('insurance_status');
      }, 600);
    } else {
      // Ask for vehicle number again
      setTimeout(() => {
        addMessage({
          text: t('enterVehicleNumber'),
          sender: 'bot',
          requiresInput: true
        }, 500);
        
        setCurrentStep('vehicle_number');
      }, 600);
    }
  };

  // Function to handle insurance status selection
  const handleInsuranceStatusSelect = (status) => {
    // Add user's selection to messages
    addMessage({
      text: t(status),
      sender: 'user'
    });
    
    // Show recommended plans
    setTimeout(() => {
      addMessage({
        text: t('recommendedPlans'),
        sender: 'bot',
        options: [
          { 
            value: 'viewPlans', 
            label: t('viewPlans'),
            action: insuranceType === 'car' ? '/plans' : `/${insuranceType}s/plans` 
          },
          { 
            value: 'customize', 
            label: t('customize'),
            action: insuranceType === 'car' ? '/custom-policy' : 
                  insuranceType === 'bike' ? '/bikes/custom-policy' : 
                  '/health/custom-plan'
          }
        ]
      }, 500);
      
      setCurrentStep('plan_recommendation');
    }, 600);
  };

  // Function to handle personal details submission
  const handlePersonalDetailsSubmit = (details) => {
    setPersonalDetails(details);
    
    // Add confirmation of received details
    addMessage({
      text: `${t('fullName')}: ${details.fullName}`,
      sender: 'user'
    });
    
    // Ask for medical history
    setTimeout(() => {
      addMessage({
        text: t('medicalHistory'),
        sender: 'bot',
        requiresMedicalHistory: true
      }, 500);
      
      setCurrentStep('medical_history');
    }, 600);
  };

  // Function to handle medical history submission
  const handleMedicalHistorySubmit = (history) => {
    setMedicalHistory(history);
    
    // Add confirmation of received medical history
    addMessage({
      text: `${t('height')}: ${history.height} cm, ${t('weight')}: ${history.weight} kg`,
      sender: 'user'
    });
    
    // Show recommended health plans
    setTimeout(() => {
      addMessage({
        text: t('recommendedPlans'),
        sender: 'bot',
        options: [
          { 
            value: 'viewPlans', 
            label: t('viewPlans'),
            action: '/health/plans' 
          },
          { 
            value: 'customize', 
            label: t('customize'),
            action: '/health/custom-plan'
          }
        ]
      }, 500);
      
      setCurrentStep('plan_recommendation');
    }, 600);
  };

  const contextValue = {
    isOpen,
    setIsOpen,
    showNotification,
    setShowNotification,
    language,
    messages,
    currentStep,
    vehicleDetails,
    userInput,
    setUserInput,
    insuranceType,
    personalDetails,
    medicalHistory,
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
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotContext; 
 