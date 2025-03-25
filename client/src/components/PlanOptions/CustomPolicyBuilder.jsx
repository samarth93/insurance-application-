import styled from "styled-components";
import Header from "../Header/Header";
import styles from "./CustomPolicyBuilder.module.css";
import {
  accidentsSvg,
  calendarSvg,
  carBurnSvg,
  carFloodSvg,
  carSvg,
  carTheftSvg,
  consumablesSvg,
  emiSvg,
  mapSvg,
  ncbProtectSvg,
  needHelpSvg,
  passengerAccidentSvg,
  personalAccidentSvg,
} from "./assets/svgs";
import { images } from "./assets/imgs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaCar, FaFire, FaTint, FaUserSecret, FaTools, FaRegCreditCard, FaUserShield, FaUsers, FaExchangeAlt, FaCheck } from "react-icons/fa";

const Container = styled.div`
  width: 752px;
  margin: auto;
  margin-top: 64px;
  display: flex;
  grid-gap: 16px;
`;

const InContleft = styled.div`
  background-color: #ffffff;
  height: auto;
  width: 368px;
  border: 1px solid #dcdee9;
`;

const InContright = styled.div`
  background-color: #ffffff;
  width: 368px;
  border: 1px solid #dcdee9;
`;

const CustomCoverOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #dcdee9;
`;

const CoverageSlider = styled.input`
  width: 100%;
  margin: 16px 0;
`;

const CoverageAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const BuilderContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dcdee9;
  padding: 16px;
  margin-top: 16px;
`;

const BuilderTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
  color: #253858;
`;

const BuilderDescription = styled.p`
  font-size: 14px;
  color: #505f79;
  margin-bottom: 24px;
`;

const CoverageOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CoverageCheckbox = styled.input`
  margin-right: 12px;
`;

const CoverageLabel = styled.label`
  font-size: 14px;
  flex: 1;
`;

const CoveragePrice = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #253858;
`;

const CoverageDescription = styled.p`
  font-size: 12px;
  color: #505f79;
  margin-left: 24px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const TotalPremium = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #f4f5f7;
  font-weight: 500;
  margin-top: 24px;
`;

const ContinueButton = styled.button`
  background-color: #e74d31;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  &:hover {
    background-color: #d43e23;
  }
`;

const DateContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #dcdee9;
`;

const DateTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const DateDescription = styled.div`
  font-size: 12px;
  color: #505f79;
  margin-bottom: 16px;
`;

const DateInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DateInputContainer = styled.div`
  width: 48%;
`;

const DateLabel = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #505f79;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdee9;
  border-radius: 4px;
`;

const DurationSelector = styled.div`
  margin-top: 16px;
`;

const DurationTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const DurationOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const DurationOption = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.selected ? '#e74d31' : '#dcdee9'};
  background-color: ${props => props.selected ? '#fff8f7' : 'white'};
  color: ${props => props.selected ? '#e74d31' : '#253858'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    border-color: #e74d31;
  }
`;

const PriceAdjustment = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  border-top: 1px dashed #dcdee9;
  margin-top: 8px;
`;

export const CustomPolicyBuilder = () => {
  const history = useHistory();
  
  // Basic state for policy customization
  const [coverageOptions, setCoverageOptions] = useState([
    { 
      id: 'thirdParty', 
      name: 'Third Party Liability', 
      description: 'Mandatory coverage for damage to third parties as required by law',
      price: 2850, 
      isRequired: true, 
      isSelected: true,
      icon: <FaShieldAlt />,
      color: '#4299e1'
    },
    { 
      id: 'ownDamage', 
      name: 'Own Damage Cover', 
      description: 'Covers damage to your own vehicle due to accidents',
      price: 3540, 
      isRequired: false, 
      isSelected: true,
      icon: <FaCar />,
      color: '#48bb78'
    },
    { 
      id: 'fireCover', 
      name: 'Fire Protection', 
      description: 'Coverage for damage caused by fire or explosion',
      price: 890, 
      isRequired: false, 
      isSelected: false,
      icon: <FaFire />,
      color: '#ed8936'
    },
    { 
      id: 'floodCover', 
      name: 'Flood & Natural Disaster', 
      description: 'Protection from damage due to floods, earthquakes, and other natural disasters',
      price: 1250, 
      isRequired: false, 
      isSelected: false,
      icon: <FaTint />,
      color: '#38b2ac'
    },
    { 
      id: 'theftCover', 
      name: 'Theft Protection', 
      description: 'Coverage in case your vehicle is stolen',
      price: 1480, 
      isRequired: false, 
      isSelected: false,
      icon: <FaUserSecret />,
      color: '#9f7aea'
    },
    { 
      id: 'consumables', 
      name: 'Consumables Cover', 
      description: 'Coverage for oils, lubricants, and other consumables needed during repairs',
      price: 680, 
      isRequired: false, 
      isSelected: false,
      icon: <FaTools />,
      color: '#667eea'
    },
    { 
      id: 'emiProtection', 
      name: 'EMI Protection', 
      description: 'Coverage for your vehicle loan EMIs during repairs',
      price: 920, 
      isRequired: false, 
      isSelected: false,
      icon: <FaRegCreditCard />,
      color: '#f56565'
    },
    { 
      id: 'personalAccident', 
      name: 'Personal Accident Cover', 
      description: 'Compensation for injuries or disability to the driver',
      price: 750, 
      isRequired: false, 
      isSelected: false,
      icon: <FaUserShield />,
      color: '#805ad5'
    },
    { 
      id: 'passengerCover', 
      name: 'Passenger Cover', 
      description: 'Protection for passengers in your vehicle during accidents',
      price: 650, 
      isRequired: false, 
      isSelected: false,
      icon: <FaUsers />,
      color: '#dd6b20'
    },
    { 
      id: 'returnToInvoice', 
      name: 'Return to Invoice', 
      description: 'Get invoice value in case of total loss or theft',
      price: 1100, 
      isRequired: false, 
      isSelected: false,
      icon: <FaExchangeAlt />,
      color: '#e53e3e'
    },
  ]);
  
  // Date and duration state
  const [selectedDuration, setSelectedDuration] = useState('1 Year');
  const [durationFactor, setDurationFactor] = useState(1.0);
  const [idvValue, setIdvValue] = useState(50);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [animation, setAnimation] = useState(false);
  
  // Custom date selection
  const today = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(() => {
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    return formatDate(nextYear);
  });
  const [customDates, setCustomDates] = useState(false);
  
  // Calculate maximum possible premium
  const maxPremium = coverageOptions.reduce((sum, option) => sum + option.price, 0) * durationFactor;
  
  // Calculate actual premium
  const calculateTotalPremium = () => {
    const basePremium = coverageOptions
      .filter(option => option.isSelected)
      .reduce((total, option) => total + option.price, 0);
    
    // Apply IDV adjustment
    const idvAdjustedPremium = Math.round(basePremium * (0.75 + (idvValue / 100) * 0.5));
    
    // Apply duration factor
    const totalPremium = Math.round(idvAdjustedPremium * durationFactor);
    
    // Add taxes (GST 18%)
    const premiumWithTax = totalPremium + Math.round(totalPremium * 0.18);
    
    return premiumWithTax;
  };
  
  // Calculate base premium without taxes
  const calculateBasePremium = () => {
    const basePremium = coverageOptions
      .filter(option => option.isSelected)
      .reduce((total, option) => total + option.price, 0);
    
    // Apply IDV adjustment
    const idvAdjustedPremium = Math.round(basePremium * (0.75 + (idvValue / 100) * 0.5));
    
    // Apply duration factor
    return Math.round(idvAdjustedPremium * durationFactor);
  };
  
  // Calculate taxes
  const calculateTaxes = () => {
    const basePremium = calculateBasePremium();
    return Math.round(basePremium * 0.18);
  };
  
  // Calculate savings
  const calculateSavings = () => {
    const maxPremiumWithTax = maxPremium + Math.round(maxPremium * 0.18);
    return maxPremiumWithTax - calculateTotalPremium();
  };
  
  // Toggle coverage selection
  const handleCoverageChange = (id) => {
    setCoverageOptions(prev => 
      prev.map(option => 
        option.id === id 
          ? { ...option, isSelected: !option.isSelected } 
          : option
      )
    );
    
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };
  
  // Toggle all coverages
  const toggleAllCoverages = () => {
    const allSelected = coverageOptions.every(option => option.isRequired || option.isSelected);
    
    setCoverageOptions(prev => 
      prev.map(option => 
        option.isRequired 
          ? option 
          : { ...option, isSelected: !allSelected }
      )
    );
    
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };
  
  // Handle duration change
  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    setCustomDates(false);
    
    // Calculate end date based on duration
    const newEndDate = new Date(startDate);
    
    switch (duration) {
      case '1 Year':
        setDurationFactor(1.0);
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
      case '2 Years':
        setDurationFactor(1.8);
        newEndDate.setFullYear(newEndDate.getFullYear() + 2);
        break;
      case '3 Years':
        setDurationFactor(2.4);
        newEndDate.setFullYear(newEndDate.getFullYear() + 3);
        break;
      case '6 Months':
        setDurationFactor(0.6);
        newEndDate.setMonth(newEndDate.getMonth() + 6);
        break;
      case '3 Months':
        setDurationFactor(0.4);
        newEndDate.setMonth(newEndDate.getMonth() + 3);
        break;
      default:
        setDurationFactor(1.0);
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
    }
    
    setEndDate(formatDate(newEndDate));
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };
  
  // Handle start date change
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Update duration factor and selection based on date difference
    calculateDurationFromDates(newStartDate, endDate);
  };
  
  // Handle end date change
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    
    // Update duration factor and selection based on date difference
    calculateDurationFromDates(startDate, newEndDate);
  };
  
  // Calculate duration factor from start and end dates
  const calculateDurationFromDates = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    
    // Calculate difference in days
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate duration factor based on days
    let newDurationFactor = 0;
    let newDurationLabel = 'Custom';
    
    if (diffDays <= 90) {
      newDurationFactor = 0.4;
      newDurationLabel = '3 Months';
    } else if (diffDays <= 180) {
      newDurationFactor = 0.6;
      newDurationLabel = '6 Months';
    } else if (diffDays <= 365) {
      newDurationFactor = 1.0;
      newDurationLabel = '1 Year';
    } else if (diffDays <= 730) {
      newDurationFactor = 1.8;
      newDurationLabel = '2 Years';
    } else if (diffDays <= 1095) {
      newDurationFactor = 2.4;
      newDurationLabel = '3 Years';
    } else {
      // For dates beyond 3 years, use a proportional factor
      newDurationFactor = (diffDays / 365) * 0.8;
      newDurationLabel = 'Custom';
    }
    
    setDurationFactor(newDurationFactor);
    setSelectedDuration(newDurationLabel);
    setCustomDates(true);
    
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };
  
  // Toggle custom date selection
  const toggleCustomDates = () => {
    setCustomDates(!customDates);
  };
  
  // Continue to next page
  const handleContinue = () => {
    // Save selected plan details to localStorage
    localStorage.setItem("selectedPlan", "Custom Plan");
    localStorage.setItem("totalacko", calculateTotalPremium().toString());
    localStorage.setItem("basePremium", calculateBasePremium().toString());
    localStorage.setItem("taxes", calculateTaxes().toString());
    
    // Store selected covers for reference
    const selectedCovers = coverageOptions
      .filter(option => option.isSelected)
      .reduce((obj, option) => {
        obj[option.id] = true;
        return obj;
      }, {});
      
    localStorage.setItem("customCovers", JSON.stringify(selectedCovers));
    localStorage.setItem("policyDuration", selectedDuration);
    localStorage.setItem("idvPercentage", idvValue.toString());
    localStorage.setItem("policyStartDate", startDate);
    localStorage.setItem("policyEndDate", endDate);
    
    // Navigate to additional details page
    history.push("/addtional-details");
  };
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.customPolicyHeader}>
        <h1 className={styles.mainTitle}>Build Your Custom Policy</h1>
        <p className={styles.mainSubtitle}>
          Customize your car insurance to perfectly match your needs and budget
        </p>
      </div>
      
      <div className={styles.customPolicyContent}>
        <div className={styles.leftPanel}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Coverage Options</h2>
              <button 
                className={styles.toggleButton}
                onClick={toggleAllCoverages}
              >
                {coverageOptions.every(option => option.isRequired || option.isSelected) ? "Deselect All" : "Select All"}
              </button>
            </div>
            
            <div className={styles.coverageList}>
              {coverageOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`${styles.coverageOption} ${option.isSelected ? styles.selected : ''} ${hoveredOption === option.id ? styles.hovered : ''}`}
                  onClick={() => !option.isRequired && handleCoverageChange(option.id)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <div className={styles.coverageInfo}>
                    <div 
                      className={styles.coverageIcon} 
                      style={{backgroundColor: option.color}}
                    >
                      {option.icon}
                    </div>
                    
                    <div className={styles.coverageDetails}>
                      <div className={styles.coverageHeader}>
                        <h3>{option.name}</h3>
                        {option.isRequired && <span className={styles.requiredBadge}>Required</span>}
                      </div>
                      <p className={styles.coverageDescription}>{option.description}</p>
                    </div>
                  </div>
                  
                  <div className={styles.coverageAction}>
                    <span className={styles.coveragePrice}>₹{option.price}</span>
                    <div className={`${styles.checkbox} ${option.isSelected ? styles.checked : ''}`}>
                      {option.isSelected && <FaCheck className={styles.checkmark} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.sectionCard}>
            <h2>Customize IDV</h2>
            <p className={styles.sectionSubtitle}>Insured Declared Value - affects your premium and claim amount</p>
            
            <div className={styles.sliderContainer}>
              <div className={styles.sliderLabels}>
                <span>Lower Premium</span>
                <span>Higher Coverage</span>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={idvValue} 
                onChange={(e) => setIdvValue(parseInt(e.target.value))} 
                className={styles.slider}
              />
              
              <div className={styles.sliderValues}>
                <span>₹{Math.round(calculateBasePremium() * 0.75 / durationFactor)}</span>
                <span>₹{Math.round(calculateBasePremium() * 1.25 / durationFactor)}</span>
              </div>
            </div>
            
            <div className={styles.idvIndicator}>
              <div className={styles.idvIndicatorBar}>
                <div 
                  className={styles.idvIndicatorFill} 
                  style={{width: `${idvValue}%`}}
                ></div>
              </div>
              <div className={styles.idvValue}>Selected IDV: {idvValue}%</div>
            </div>
          </div>
          
          <div className={styles.sectionCard}>
            <h2>Policy Duration</h2>
            <p className={styles.sectionSubtitle}>Choose how long you want your coverage to last</p>
            
            <div className={styles.durationOptions}>
              <button 
                className={`${styles.durationButton} ${selectedDuration === '3 Months' && !customDates ? styles.selected : ''}`}
                onClick={() => handleDurationChange('3 Months')}
              >
                3 Months
              </button>
              <button 
                className={`${styles.durationButton} ${selectedDuration === '6 Months' && !customDates ? styles.selected : ''}`}
                onClick={() => handleDurationChange('6 Months')}
              >
                6 Months
              </button>
              <button 
                className={`${styles.durationButton} ${selectedDuration === '1 Year' && !customDates ? styles.selected : ''}`}
                onClick={() => handleDurationChange('1 Year')}
              >
                1 Year
              </button>
              <button 
                className={`${styles.durationButton} ${selectedDuration === '2 Years' && !customDates ? styles.selected : ''}`}
                onClick={() => handleDurationChange('2 Years')}
              >
                2 Years <span className={styles.saveBadge}>Save 10%</span>
              </button>
              <button 
                className={`${styles.durationButton} ${selectedDuration === '3 Years' && !customDates ? styles.selected : ''}`}
                onClick={() => handleDurationChange('3 Years')}
              >
                3 Years <span className={styles.saveBadge}>Save 20%</span>
              </button>
              <button 
                className={`${styles.durationButton} ${customDates ? styles.selected : ''}`}
                onClick={toggleCustomDates}
              >
                Custom
              </button>
            </div>
            
            {customDates && (
              <div className={styles.customDateSelection}>
                <div className={styles.dateInputGroup}>
                  <div className={styles.dateInputContainer}>
                    <label className={styles.dateLabel}>Start Date</label>
                    <input 
                      type="date" 
                      className={styles.dateInput}
                      value={startDate} 
                      min={formatDate(today)}
                      onChange={handleStartDateChange}
                    />
                  </div>
                  <div className={styles.dateInputContainer}>
                    <label className={styles.dateLabel}>End Date</label>
                    <input 
                      type="date" 
                      className={styles.dateInput}
                      value={endDate}
                      min={startDate}
                      onChange={handleEndDateChange}
                    />
                  </div>
                </div>
                <p className={styles.durationNote}>
                  Your policy will be valid for {selectedDuration !== 'Custom' ? selectedDuration : 'the selected duration'}.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.rightPanel}>
          <div className={`${styles.summaryCard} ${animation ? styles.animate : ''}`}>
            <h2>Your Custom Policy Summary</h2>
            
            <div className={styles.savingsDisplay}>
              <div className={styles.savingsLabel}>Your Savings</div>
              <div className={styles.savingsAmount}>₹{calculateSavings()}</div>
            </div>
            
            <div className={styles.selectedCoverages}>
              <h3>Selected Coverages ({coverageOptions.filter(option => option.isSelected).length}/{coverageOptions.length})</h3>
              
              {coverageOptions
                .filter(option => option.isSelected)
                .map(option => (
                  <div className={styles.selectedCoverage} key={option.id}>
                    <div className={styles.selectedInfo}>
                      <span 
                        className={styles.selectedIcon}
                        style={{ color: option.color }}
                      >
                        {option.icon}
                      </span>
                      <span>{option.name}</span>
                    </div>
                    <div className={styles.selectedPrice}>₹{option.price}</div>
                  </div>
                ))
              }
            </div>
            
            <div className={styles.pricingDetails}>
              <div className={styles.pricingRow}>
                <span>Base Premium</span>
                <span>₹{coverageOptions
                  .filter(option => option.isSelected)
                  .reduce((total, option) => total + option.price, 0)}
                </span>
              </div>
              
              <div className={styles.pricingRow}>
                <span>Duration {customDates ? '(Custom)' : `(${selectedDuration})`}</span>
                <span>x{durationFactor.toFixed(1)}</span>
              </div>
              
              <div className={styles.pricingRow}>
                <span>IDV Adjustment</span>
                <span>{idvValue > 50 ? '+' : ''}{Math.round((idvValue - 50) * 0.5)}%</span>
              </div>
              
              <div className={styles.pricingRow}>
                <span>Premium Subtotal</span>
                <span>₹{calculateBasePremium()}</span>
              </div>
              
              <div className={styles.pricingRow}>
                <span>GST (18%)</span>
                <span>₹{calculateTaxes()}</span>
              </div>
            </div>
            
            <div className={styles.totalPremium}>
              <span>Total Premium</span>
              <span className={styles.totalAmount}>₹{calculateTotalPremium()}</span>
            </div>
            
            <button 
              className={styles.continueButton}
              onClick={handleContinue}
            >
              Continue with Custom Plan
            </button>
            
            <div className={styles.policyNote}>
              <p>Premium includes all applicable taxes. Your custom policy will be valid from {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}.</p>
              <p>By continuing, you agree to the <a href="#terms">Terms and Conditions</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 