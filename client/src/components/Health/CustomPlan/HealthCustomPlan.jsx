import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaInfoCircle, FaAngleRight, FaArrowLeft, FaWrench, FaMoneyBillWave, FaClock, FaHospital, FaShieldAlt } from 'react-icons/fa';

const HealthCustomPlan = () => {
  const history = useHistory();
  
  // Custom plan state
  const [coverageAmount, setCoverageAmount] = useState(500000); // 5 lakhs
  const [hospitalTier, setHospitalTier] = useState('standard'); // basic, standard or premium
  const [deductible, setDeductible] = useState(0); // 0, 5000, 10000
  const [selectedAddons, setSelectedAddons] = useState({
    criticalIllness: false,
    personalAccident: false,
    maternity: false,
    opd: false,
    dentalCare: false,
    visionCare: false,
    internationalCoverage: false,
    preventiveCare: false,
    homeCare: false,
    mentalHealth: false
  });
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(1); // 1 year by default
  
  // Calculate end date based on start date and duration
  const calculateEndDate = () => {
    const end = new Date(startDate);
    end.setFullYear(end.getFullYear() + duration);
    end.setDate(end.getDate() - 1); // End one day before the anniversary
    return end.toISOString().split('T')[0];
  };
  
  const coverageOptions = [300000, 500000, 1000000, 1500000, 2000000]; // 3L to 20L
  const hospitalTierOptions = [
    { 
      id: 'basic', 
      name: 'Basic Network', 
      description: 'Access to 3,500+ hospitals nationwide', 
      price: 0 
    },
    { 
      id: 'standard', 
      name: 'Standard Network', 
      description: 'Access to 5,000+ hospitals including selected private chains', 
      price: 999 
    },
    { 
      id: 'premium', 
      name: 'Premium Network', 
      description: 'Access to 7,500+ hospitals including all top tier facilities', 
      price: 1999 
    }
  ];
  
  const durationOptions = [
    { years: 1, discount: 0 },
    { years: 2, discount: 10 }, // 10% discount
    { years: 3, discount: 20 }  // 20% discount
  ];
  
  const deductibleOptions = [
    { amount: 0, discount: 0 },
    { amount: 5000, discount: 10 }, // 10% discount
    { amount: 10000, discount: 15 }, // 15% discount
    { amount: 20000, discount: 20 } // 20% discount
  ];
  
  const addonOptions = [
    { 
      id: 'criticalIllness', 
      name: 'Critical Illness Cover', 
      description: 'Additional coverage for 20 critical illnesses',
      price: 1999
    },
    { 
      id: 'personalAccident', 
      name: 'Personal Accident Cover', 
      description: 'Coverage against accidental injuries and disability',
      price: 899
    },
    { 
      id: 'maternity', 
      name: 'Maternity Benefits', 
      description: 'Covers pregnancy and childbirth expenses',
      price: 2499
    },
    { 
      id: 'opd', 
      name: 'OPD Coverage', 
      description: 'Outpatient department consultations and medicines',
      price: 1299
    },
    { 
      id: 'dentalCare', 
      name: 'Dental Care', 
      description: 'Covers dental procedures and treatments',
      price: 999
    },
    { 
      id: 'visionCare', 
      name: 'Vision Care', 
      description: 'Coverage for eye check-ups and spectacles',
      price: 799
    },
    { 
      id: 'internationalCoverage', 
      name: 'International Coverage', 
      description: 'Extends protection during international travel',
      price: 3499
    },
    { 
      id: 'preventiveCare', 
      name: 'Preventive Health Checkups', 
      description: 'Annual health check-ups and preventive screenings',
      price: 1499
    },
    { 
      id: 'homeCare', 
      name: 'Home Healthcare', 
      description: 'Medical services provided at home during recovery',
      price: 1899
    },
    { 
      id: 'mentalHealth', 
      name: 'Mental Health Coverage', 
      description: 'Covers psychiatric consultations and treatments',
      price: 1699
    }
  ];
  
  // Toggle addon selection
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };
  
  // Calculate base premium based on coverage amount
  const calculateBasePremium = () => {
    const baseRates = {
      300000: 4999,
      500000: 6999,
      1000000: 9999,
      1500000: 13999,
      2000000: 17999
    };
    
    return baseRates[coverageAmount] || 6999;
  };
  
  // Calculate hospital tier premium
  const getHospitalTierPremium = () => {
    const selectedOption = hospitalTierOptions.find(option => option.id === hospitalTier);
    return selectedOption ? selectedOption.price : 0;
  };
  
  // Calculate multi-year discount
  const getMultiYearDiscount = () => {
    const selectedOption = durationOptions.find(option => option.years === duration);
    return selectedOption ? selectedOption.discount : 0;
  };
  
  // Calculate deductible discount
  const getDeductibleDiscount = () => {
    const selectedOption = deductibleOptions.find(option => option.amount === deductible);
    return selectedOption ? selectedOption.discount : 0;
  };
  
  // Calculate addon premiums
  const calculateAddonsPremium = () => {
    return addonOptions.reduce((total, addon) => {
      return total + (selectedAddons[addon.id] ? addon.price : 0);
    }, 0);
  };
  
  // Calculate total premium
  const calculateTotalPremium = () => {
    const basePremium = calculateBasePremium();
    const hospitalTierPremium = getHospitalTierPremium();
    const addonsPremium = calculateAddonsPremium();
    
    // Apply deductible discount
    const deductibleDiscountPercentage = getDeductibleDiscount();
    const deductibleDiscount = (basePremium * deductibleDiscountPercentage) / 100;
    
    // Calculate subtotal before multi-year discount
    const subtotal = basePremium + hospitalTierPremium + addonsPremium - deductibleDiscount;
    
    // Apply multi-year discount
    const multiYearDiscountPercentage = getMultiYearDiscount();
    const multiYearDiscount = (subtotal * multiYearDiscountPercentage) / 100;
    
    // Calculate annual premium
    const annualPremium = Math.round(subtotal - multiYearDiscount);
    
    // Return annual premium (for 1 year plan) or total multi-year premium
    return duration === 1 ? annualPremium : annualPremium * duration;
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatCoverageInLakhs = (amount) => {
    return `₹${amount / 100000} Lakhs`;
  };
  
  const handleBackToPlans = () => {
    history.push('/health/plans');
  };
  
  const handleContinue = () => {
    // First save a minimal valid dataset to ensure there's something in localStorage
    const minimalPlanDetails = {
      coverageAmount: coverageAmount || 500000,
      hospitalTier: hospitalTier || 'standard',
      deductible: deductible || 0,
      selectedAddons: selectedAddons || {},
      startDate: startDate || new Date().toISOString().split('T')[0],
      duration: duration || 1,
      endDate: calculateEndDate() || new Date().toISOString().split('T')[0],
      totalPremium: calculateTotalPremium() || 6999
    };
    
    // Absolutely ensure we have data in localStorage
    localStorage.removeItem('selectedHealthPlan');
    localStorage.setItem('customHealthPlan', JSON.stringify(minimalPlanDetails));
    localStorage.setItem('healthTotalPremium', (minimalPlanDetails.totalPremium).toString());
    
    // Force a complete URL redirect with no validation
    const absoluteUrl = window.location.origin + '/health/additional-details';
    console.log("Forcing navigation to:", absoluteUrl);
    
    // Try approach 1: direct window.location replacement
    try {
      window.location.replace(absoluteUrl);
      return; // Stop execution if this works
    } catch (e) {
      console.error("Approach 1 failed:", e);
    }
    
    // Try approach 2: window.location href
    try {
      window.location.href = absoluteUrl;
      return; // Stop execution if this works
    } catch (e) {
      console.error("Approach 2 failed:", e);
    }
    
    // Try approach 3: direct link creation and click
    try {
      const link = document.createElement('a');
      link.href = absoluteUrl;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.error("Approach 3 failed:", e);
      
      // Last resort - alert user with direct URL
      alert("Please navigate directly to: " + absoluteUrl);
    }
  };
  
  return (
    <Container>
      <TitleSection>
        <BackButton onClick={handleBackToPlans}>
          <FaArrowLeft /> Back to Plans
        </BackButton>
        <Title>
          <FaWrench style={{ marginRight: '10px' }} />
          Build Your Custom Health Insurance Plan
        </Title>
        <Subtitle>Customize every aspect of your health coverage to match your needs</Subtitle>
      </TitleSection>
      
      <CustomPlanContainer>
        <CustomPlanSection>
          <SectionTitle>Coverage Amount</SectionTitle>
          <SliderContainer>
            <SliderLabel>
              <span>Select Coverage Amount</span>
              <strong>{formatCoverageInLakhs(coverageAmount)}</strong>
            </SliderLabel>
            <StyledSlider
              type="range"
              min="0"
              max="4"
              step="1"
              value={coverageOptions.indexOf(coverageAmount)}
              onChange={(e) => setCoverageAmount(coverageOptions[e.target.value])}
            />
          </SliderContainer>
          <SliderLabel>
            <span>₹3 Lakhs</span>
            <span>₹20 Lakhs</span>
          </SliderLabel>
        </CustomPlanSection>
        
        <CustomPlanSection>
          <SectionTitle>Coverage Period</SectionTitle>
          <FormRow>
            <FormColumn style={{ flex: 2 }}>
              <Label>Start Date</Label>
              <StyledInput
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormColumn>
            <FormColumn style={{ flex: 1 }}>
              <Label>Duration</Label>
              <StyledSelect 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              >
                {durationOptions.map(option => (
                  <option key={option.years} value={option.years}>
                    {option.years} {option.years === 1 ? 'Year' : 'Years'} 
                    {option.discount > 0 ? ` (${option.discount}% off)` : ''}
                  </option>
                ))}
              </StyledSelect>
            </FormColumn>
            <FormColumn style={{ flex: 2 }}>
              <Label>End Date</Label>
              <StyledInput
                type="date"
                value={calculateEndDate()}
                disabled
              />
            </FormColumn>
          </FormRow>
        </CustomPlanSection>
        
        <CustomPlanSection>
          <SectionTitle>Hospital Network Access</SectionTitle>
          <OptionGrid>
            {hospitalTierOptions.map(option => (
              <OptionCard 
                key={option.id}
                selected={hospitalTier === option.id}
                onClick={() => setHospitalTier(option.id)}
              >
                <OptionText>
                  <h5>{option.name}</h5>
                  <p>{option.description}</p>
                </OptionText>
                <OptionPrice>
                  {option.price > 0 ? `+₹${option.price}` : 'Included'}
                </OptionPrice>
              </OptionCard>
            ))}
          </OptionGrid>
        </CustomPlanSection>
        
        <CustomPlanSection>
          <SectionTitle>
            <LabelWithTooltip>
              Deductible Amount
              <FaInfoCircle title="The amount you pay before insurance starts covering" />
            </LabelWithTooltip>
          </SectionTitle>
          <OptionGrid>
            {deductibleOptions.map(option => (
              <OptionCard 
                key={option.amount}
                selected={deductible === option.amount}
                onClick={() => setDeductible(option.amount)}
              >
                <OptionText>
                  <h5>{option.amount === 0 ? 'No Deductible' : `₹${option.amount} Deductible`}</h5>
                  <p>{option.discount > 0 ? `${option.discount}% premium discount` : 'Standard premium'}</p>
                </OptionText>
              </OptionCard>
            ))}
          </OptionGrid>
        </CustomPlanSection>
        
        <CustomPlanSection>
          <SectionTitle>Additional Coverage Options</SectionTitle>
          {addonOptions.map(addon => (
            <AddonItem 
              key={addon.id}
              selected={selectedAddons[addon.id]}
              onClick={() => toggleAddon(addon.id)}
            >
              <AddonInfo>
                <h5>
                  {addon.name}
                  <FaInfoCircle />
                </h5>
                <p>{addon.description}</p>
              </AddonInfo>
              <AddonControls>
                <AddonPrice>+₹{addon.price}</AddonPrice>
                <ToggleSwitch checked={selectedAddons[addon.id]} />
              </AddonControls>
            </AddonItem>
          ))}
        </CustomPlanSection>
        
        <SummaryBox>
          <SummaryTitle>Plan Summary</SummaryTitle>
          <SummaryRow>
            <span>Base Premium ({formatCoverageInLakhs(coverageAmount)})</span>
            <span>{formatCurrency(calculateBasePremium())}</span>
          </SummaryRow>
          
          {hospitalTier !== 'basic' && (
            <SummaryRow>
              <span>Hospital Network ({hospitalTierOptions.find(o => o.id === hospitalTier)?.name})</span>
              <span>+{formatCurrency(getHospitalTierPremium())}</span>
            </SummaryRow>
          )}
          
          {deductible > 0 && (
            <SummaryRow>
              <span>Deductible Discount (₹{deductible})</span>
              <span>-{formatCurrency((calculateBasePremium() * getDeductibleDiscount()) / 100)}</span>
            </SummaryRow>
          )}
          
          {Object.keys(selectedAddons).map(key => {
            if (!selectedAddons[key]) return null;
            const addon = addonOptions.find(a => a.id === key);
            return (
              <SummaryRow key={key}>
                <span>{addon.name}</span>
                <span>+{formatCurrency(addon.price)}</span>
              </SummaryRow>
            );
          })}
          
          {duration > 1 && (
            <SummaryRow>
              <span>Multi-year discount ({getMultiYearDiscount()}%)</span>
              <span>-{formatCurrency((calculateBasePremium() * getMultiYearDiscount()) / 100)}</span>
            </SummaryRow>
          )}
          
          <SummaryTotal>
            <span>{duration > 1 ? `Total Premium (${duration} years)` : 'Annual Premium'}</span>
            <span>{formatCurrency(calculateTotalPremium())}</span>
          </SummaryTotal>
          
          <SummaryRow style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
            <span>Policy period: {new Date(startDate).toLocaleDateString()} to {new Date(calculateEndDate()).toLocaleDateString()}</span>
          </SummaryRow>
        </SummaryBox>
        
        <ButtonContainer>
          <BackButton onClick={handleBackToPlans}>
            <FaArrowLeft /> Back to Plans
          </BackButton>
          <ContinueButton onClick={handleContinue}>
            Continue with Custom Plan <FaAngleRight />
          </ContinueButton>
        </ButtonContainer>
        
        {/* Add hidden direct link as fallback */}
        <div style={{ display: 'none' }}>
          <a 
            href="/health/additional-details" 
            id="direct-additional-details-link"
            onClick={() => {
              // Also save data when using direct link
              const customPlanDetails = {
                coverageAmount,
                hospitalTier,
                deductible,
                selectedAddons,
                startDate,
                duration,
                endDate: calculateEndDate(),
                totalPremium: calculateTotalPremium()
              };
              localStorage.removeItem('selectedHealthPlan');
              localStorage.setItem('customHealthPlan', JSON.stringify(customPlanDetails));
              localStorage.setItem('healthTotalPremium', calculateTotalPremium().toString());
            }}
          >
            Direct link to Additional Details
          </a>
        </div>
        
        {/* Add visible fallback link if all else fails */}
        <FallbackContainer id="fallback-navigation">
          If the Continue button doesn't work, <FallbackLink 
            href="/health/additional-details"
            onClick={() => {
              // Also save data when using fallback link
              const customPlanDetails = {
                coverageAmount,
                hospitalTier,
                deductible,
                selectedAddons,
                startDate,
                duration,
                endDate: calculateEndDate(),
                totalPremium: calculateTotalPremium()
              };
              localStorage.removeItem('selectedHealthPlan');
              localStorage.setItem('customHealthPlan', JSON.stringify(customPlanDetails));
              localStorage.setItem('healthTotalPremium', calculateTotalPremium().toString());
            }}
          >click here</FallbackLink> to continue to the next step.
        </FallbackContainer>
      </CustomPlanContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #6c5ce7;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  transition: all 0.2s;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    color: #5348c7;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CustomPlanContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 30px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const CustomPlanSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 8px;
    color: #6c5ce7;
  }
`;

const LabelWithTooltip = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 8px;
    color: #6c5ce7;
    cursor: help;
  }
`;

const SliderContainer = styled.div`
  margin-bottom: 10px;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  span {
    color: #666;
    font-size: 14px;
  }
  
  strong {
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`;

const StyledSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6c5ce7;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6c5ce7;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  color: #666;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #6c5ce7;
    outline: none;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #666;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #6c5ce7;
    outline: none;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.div`
  border: 1px solid ${props => props.selected ? '#6c5ce7' : '#ddd'};
  background-color: ${props => props.selected ? '#f8f6ff' : '#fff'};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${props => props.selected ? '0 4px 10px rgba(108, 92, 231, 0.1)' : 'none'};
  
  &:hover {
    border-color: #6c5ce7;
    box-shadow: 0 4px 10px rgba(108, 92, 231, 0.1);
  }
`;

const OptionText = styled.div`
  h5 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
`;

const OptionPrice = styled.div`
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #6c5ce7;
`;

const AddonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid ${props => props.selected ? '#6c5ce7' : '#ddd'};
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: ${props => props.selected ? '#f8f6ff' : '#fff'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #6c5ce7;
    box-shadow: 0 4px 10px rgba(108, 92, 231, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddonInfo = styled.div`
  flex: 1;
  
  h5 {
    margin: 0 0 5px;
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #333;
    
    svg {
      margin-left: 8px;
      font-size: 14px;
      color: #6c5ce7;
    }
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const AddonControls = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const AddonPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 15px;
  color: #6c5ce7;
`;

const ToggleSwitch = styled.div`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.checked ? '#6c5ce7' : '#e0e0e0'};
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    background-color: white;
    transition: all 0.3s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const SummaryBox = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
`;

const SummaryTitle = styled.h4`
  font-size: 18px;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
  color: #555;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ContinueButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #6c5ce7;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    margin-left: 8px;
  }
  
  &:hover {
    background-color: #5348c7;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Add styled components for the fallback link
const FallbackContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #ddd;
  color: #666;
  font-size: 14px;
`;

const FallbackLink = styled.a`
  color: #6c5ce7;
  text-decoration: underline;
  font-weight: 500;
  
  &:hover {
    color: #5348c7;
  }
`;

export default HealthCustomPlan; 