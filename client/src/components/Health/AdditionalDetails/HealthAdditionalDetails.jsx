import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaClock, FaMoneyBillWave, FaPercent } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  animation: fadeIn 0.8s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 15px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #636e72;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
  max-width: 800px;
  margin: 0 auto 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 1;
  }
`;

const ProgressStep = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const StepCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => props.active ? '#522ED3' : props.completed ? '#4CAF50' : 'white'};
  color: ${props => (props.active || props.completed) ? 'white' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-weight: 600;
  border: 2px solid ${props => props.active ? '#522ED3' : props.completed ? '#4CAF50' : '#e0e0e0'};
  transition: all 0.3s ease;
`;

const StepLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.active ? '#522ED3' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 350px;
`;

const RightSection = styled.div`
  width: 350px;
  align-self: flex-start;
  position: sticky;
  top: 20px;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: sticky;
  top: 20px;
`;

const SummaryHeader = styled.div`
  background: #522ED3;
  color: white;
  padding: 20px;
  text-align: center;
`;

const SummaryTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 500;
`;

const SummaryBody = styled.div`
  padding: 25px;
`;

const PlanDetails = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const PlanName = styled.h4`
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
`;

const PlanDateInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
    color: #FF9800;
  }
`;

const AddonTag = styled.span`
  display: inline-block;
  background-color: #f0ebff;
  color: #522ED3;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  margin-right: 6px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const AddonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const PlanCoverage = styled.div`
  margin-top: 15px;
`;

const CoverageItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CoverageIcon = styled.div`
  color: #4CAF50;
  margin-right: 10px;
  font-size: 14px;
`;

const CoverageText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`;

const PremiumBreakdown = styled.div`
  margin: 25px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const BreakdownTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 1.1rem;
  color: #2d3436;
  font-weight: 600;
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e0e0e0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const BreakdownLabel = styled.span`
  font-size: 0.95rem;
  color: #636e72;
`;

const BreakdownValue = styled.span`
  font-size: 0.95rem;
  color: #2d3436;
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;
`;

const TotalValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #522ED3;
`;

const PaymentOptions = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 20px;
  font-weight: 600;
`;

const FrequencyOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const FrequencyOption = styled.div`
  background: ${props => props.selected ? '#f8f5ff' : 'white'};
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #522ED3;
  }
`;

const FrequencyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FrequencyName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #2d3436;
`;

const FrequencyPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #522ED3;
`;

const FrequencyDiscount = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #E8F5E9;
  color: #388E3C;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 8px;
  font-weight: 500;
`;

const DiscountBanner = styled.div`
  background: #FFF8E1;
  border: 1px dashed #FFC107;
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const DiscountIcon = styled.div`
  color: #FFA000;
  margin-right: 12px;
  font-size: 1.2rem;
`;

const DiscountText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #333;
`;

const DiscountCode = styled.span`
  font-weight: 600;
  color: #D84315;
  background: #FFEBEE;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PayButton = styled.button`
  background: #522ED3;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #3f22a3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #d1d1d1;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoBox = styled.div`
  background: ${props => props.type === 'success' ? '#E8F5E9' : '#E3F2FD'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid ${props => props.type === 'success' ? '#A5D6A7' : '#BBDEFB'};
`;

const InfoTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 1.1rem;
  color: ${props => props.type === 'success' ? '#388E3C' : '#1976D2'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
`;

const calculateDiscount = (frequency, baseAmount) => {
  switch(frequency) {
    case 'monthly':
      return 0;
    case 'quarterly':
      return Math.round(baseAmount * 0.05);
    case 'halfYearly':
      return Math.round(baseAmount * 0.1);
    case 'yearly':
      return Math.round(baseAmount * 0.15);
    default:
      return 0;
  }
};

const calculateFinalAmount = (frequency, baseAmount) => {
  const discount = calculateDiscount(frequency, baseAmount);
  return baseAmount - discount;
};

const getFrequencyLabel = (frequency) => {
  switch(frequency) {
    case 'monthly':
      return 'Monthly';
    case 'quarterly':
      return 'Quarterly';
    case 'halfYearly':
      return 'Half-Yearly';
    case 'yearly':
      return 'Yearly';
    default:
      return '';
  }
};

const getFrequencyDiscount = (frequency) => {
  switch(frequency) {
    case 'monthly':
      return null;
    case 'quarterly':
      return '5% off';
    case 'halfYearly':
      return '10% off';
    case 'yearly':
      return '15% off';
    default:
      return null;
  }
};

const HealthAdditionalDetails = () => {
  console.log("HealthAdditionalDetails component rendering");
  
  const [userData, setUserData] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customPlan, setCustomPlan] = useState(null);
  const [isCustomPlan, setIsCustomPlan] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentFrequency, setPaymentFrequency] = useState('yearly');
  const [basePremium, setBasePremium] = useState(0);
  const [addonsCost, setAddonsCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPremium, setTotalPremium] = useState(0);
  const [error, setError] = useState(null);
  
  const history = useHistory();
  
  useEffect(() => {
    console.log("HealthAdditionalDetails useEffect running");
    try {
      // Check for selected plan or custom plan in localStorage
      const storedPlanId = localStorage.getItem('selectedHealthPlan');
      const storedCustomPlan = localStorage.getItem('customHealthPlan');
      const storedPremium = localStorage.getItem('healthTotalPremium');
      
      console.log("localStorage data:", { 
        storedPlanId, 
        storedCustomPlan: storedCustomPlan ? "exists" : "not found", 
        storedPremium 
      });

      let basePremiumValue = 0;
      let addonsValue = 0;
      
      if (storedPlanId) {
        // Find the plan details based on ID
        console.log("Using pre-defined plan ID:", storedPlanId);
        const foundPlan = plans.find(plan => plan.id === storedPlanId) || null;
        setSelectedPlan(foundPlan);
        
        if (foundPlan) {
          basePremiumValue = foundPlan.price || 0;
        }
      } else if (storedCustomPlan) {
        try {
          const parsedPlan = JSON.parse(storedCustomPlan);
          console.log("Parsed custom plan:", parsedPlan);
          setCustomPlan(parsedPlan);
          
          if (parsedPlan) {
            // Calculate base premium from custom plan
            basePremiumValue = parsedPlan.totalPremium || 0;
            
            // Extract addons cost if available
            if (parsedPlan.selectedAddons) {
              const addonPrices = {
                criticalIllness: 1499,
                personalAccident: 999,
                maternity: 2499,
                opd: 1299,
                dentalCare: 899,
                visionCare: 699,
                internationalCoverage: 1999,
                preventiveCare: 799,
                homeCare: 1099,
                mentalHealth: 1399
              };
              
              addonsValue = Object.entries(parsedPlan.selectedAddons)
                .reduce((total, [key, isSelected]) => {
                  if (isSelected && addonPrices[key]) {
                    return total + addonPrices[key];
                  }
                  return total;
                }, 0);
            }
          }
        } catch (parseError) {
          console.error("Error parsing custom plan:", parseError);
          setError("Invalid custom plan data. Please go back and try again.");
        }
      }
      
      // Set the premium values
      setBasePremium(basePremiumValue);
      setAddonsCost(addonsValue);
      
      // If total premium is explicitly stored, use that
      if (storedPremium) {
        setTotalPremium(parseInt(storedPremium, 10) || basePremiumValue);
      } else {
        setTotalPremium(basePremiumValue);
      }
      
      setLoading(false);
    } catch (e) {
      console.error("Error in HealthAdditionalDetails useEffect:", e);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (!loading && !error) {
      const hasPlan = localStorage.getItem('selectedHealthPlan') || localStorage.getItem('customHealthPlan');
      if (!hasPlan) {
        console.log("No plan data found, redirecting to plans page");
        history.replace('/health/plans');
      }
    }
  }, [loading, error, history]);
  
  const handlePaymentFrequencyChange = (frequency) => {
    setPaymentFrequency(frequency);
  };
  
  const handlePayment = () => {
    setLoading(true);
    
    try {
      // Store premium calculation in localStorage
      const premiumAmount = calculateFinalAmount(paymentFrequency, basePremium);
      const frequency = getFrequencyLabel(paymentFrequency).toLowerCase();
      
      localStorage.setItem('healthFinalPremium', premiumAmount.toString());
      localStorage.setItem('healthPaymentFrequency', frequency);
      localStorage.setItem('policyType', 'Health Insurance');
      localStorage.setItem('totalacko', premiumAmount.toString());
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Navigate to payment page
        history.push('/cardPayment');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error processing payment:', error);
      setLoading(false);
    }
  };
  
  // Plans data (in a real app, this would come from an API)
  const plans = [
    {
      id: 'basic',
      name: 'Basic Health Plan',
      price: 4999,
      coverageHighlights: [
        'Hospitalization cover up to ₹3 lakh',
        'Room rent up to ₹3,000 per day',
        'Surgical procedures up to ₹2 lakh',
        '30 days pre & 60 days post hospitalization'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Health Plan',
      price: 7999,
      coverageHighlights: [
        'Hospitalization cover up to ₹5 lakh',
        'Room rent up to ₹5,000 per day',
        'Critical illness cover up to ₹3 lakh',
        '60 days pre & 90 days post hospitalization'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Health Plan',
      price: 11999,
      coverageHighlights: [
        'Comprehensive coverage with no sub-limits',
        'Single AC room or up to ₹10,000 per day',
        'Critical illness cover up to ₹10 lakh',
        'OPD coverage up to ₹15,000 per year'
      ]
    }
  ];
  
  // Add-on options
  const addons = [
    {
      id: 'critical-illness',
      name: 'Critical Illness Cover',
      price: 1499
    },
    {
      id: 'personal-accident',
      name: 'Personal Accident Cover',
      price: 999
    },
    {
      id: 'maternity',
      name: 'Maternity Cover',
      price: 2499
    },
    {
      id: 'opd',
      name: 'OPD Cover',
      price: 1299
    }
  ];
  
  // Calculate GST (18%)
  const calculateGST = (amount) => {
    return Math.round(amount * 0.18);
  };
  
  // Total premium including addons but before GST
  const premiumBeforeGST = basePremium;
  
  // GST amount
  const gstAmount = calculateGST(premiumBeforeGST);
  
  // Total amount including GST
  const totalAmount = premiumBeforeGST + gstAmount;
  
  // Final amount after frequency discount
  const finalAmount = calculateFinalAmount(paymentFrequency, totalAmount);
  
  // Discount amount
  const discountAmount = totalAmount - finalAmount;
  
  // Function to format coverage in lakhs
  const formatCoverageInLakhs = (amount) => {
    return `₹${amount / 100000} Lakhs`;
  };
  
  // Function to get hospital tier name
  const getHospitalTierName = (tierId) => {
    const tiers = {
      'basic': 'Basic Network (3,500+ hospitals)',
      'standard': 'Standard Network (5,000+ hospitals)',
      'premium': 'Premium Network (7,500+ hospitals)'
    };
    return tiers[tierId] || 'Basic Network';
  };
  
  // Function to get addon name by ID
  const getAddonName = (addonId) => {
    const addonMap = {
      'criticalIllness': 'Critical Illness Cover',
      'personalAccident': 'Personal Accident Cover',
      'maternity': 'Maternity Benefits',
      'opd': 'OPD Coverage',
      'dentalCare': 'Dental Care',
      'visionCare': 'Vision Care',
      'internationalCoverage': 'International Coverage',
      'preventiveCare': 'Preventive Health Checkups',
      'homeCare': 'Home Healthcare',
      'mentalHealth': 'Mental Health Coverage'
    };
    return addonMap[addonId] || addonId;
  };
  
  // Render plan details section
  const renderPlanDetails = () => {
    if (selectedPlan) {
      return (
        <PlanSummaryCard>
          <PlanHeader type={selectedPlan.type}>
            <PlanName>{selectedPlan.name}</PlanName>
          </PlanHeader>
          <PlanDetailsBody>
            <PlanDetail>
              <DetailLabel>Coverage Amount:</DetailLabel>
              <DetailValue>
                {selectedPlan.coverageList && selectedPlan.coverageList[0]?.text.replace('Coverage up to ', '') || 'N/A'}
              </DetailValue>
            </PlanDetail>
            <PlanDetail>
              <DetailLabel>Room Rent Limit:</DetailLabel>
              <DetailValue>
                {selectedPlan.coverageList && selectedPlan.coverageList[1]?.text.replace('Room rent ', '') || 'N/A'}
              </DetailValue>
            </PlanDetail>
            <PlanDetail>
              <DetailLabel>Annual Premium:</DetailLabel>
              <DetailValue>₹{selectedPlan.price}</DetailValue>
            </PlanDetail>
          </PlanDetailsBody>
        </PlanSummaryCard>
      );
    } else if (customPlan) {
      return (
        <PlanSummaryCard>
          <PlanHeader type="custom">
            <PlanName>Custom Health Plan</PlanName>
          </PlanHeader>
          <PlanDetailsBody>
            <PlanDetail>
              <DetailLabel>Coverage Amount:</DetailLabel>
              <DetailValue>₹{customPlan.coverageAmount/100000} Lakhs</DetailValue>
            </PlanDetail>
            <PlanDetail>
              <DetailLabel>Hospital Network:</DetailLabel>
              <DetailValue>
                {customPlan.hospitalTier === 'basic' ? 'Basic Network' : 
                 customPlan.hospitalTier === 'standard' ? 'Standard Network' : 
                 'Premium Network'}
              </DetailValue>
            </PlanDetail>
            <PlanDetail>
              <DetailLabel>Policy Duration:</DetailLabel>
              <DetailValue>{customPlan.duration} {customPlan.duration > 1 ? 'Years' : 'Year'}</DetailValue>
            </PlanDetail>
            <PlanDetail>
              <DetailLabel>Deductible:</DetailLabel>
              <DetailValue>{customPlan.deductible > 0 ? `₹${customPlan.deductible}` : 'None'}</DetailValue>
            </PlanDetail>
            {customPlan.selectedAddons && Object.entries(customPlan.selectedAddons).some(([_, isSelected]) => isSelected) && (
              <PlanDetail>
                <DetailLabel>Add-ons:</DetailLabel>
                <AddonsContainer>
                  {Object.entries(customPlan.selectedAddons).map(([key, isSelected]) => {
                    if (!isSelected) return null;
                    return <AddonTag key={key}>{formatAddonName(key)}</AddonTag>;
                  })}
                </AddonsContainer>
              </PlanDetail>
            )}
            <PlanDetail>
              <DetailLabel>Total Premium:</DetailLabel>
              <DetailValue>₹{customPlan.totalPremium}</DetailValue>
            </PlanDetail>
          </PlanDetailsBody>
        </PlanSummaryCard>
      );
    } else {
      return <LoadingMessage>No plan details available.</LoadingMessage>;
    }
  };
  
  // Helper function to format addon names
  const formatAddonName = (key) => {
    const names = {
      criticalIllness: 'Critical Illness',
      personalAccident: 'Personal Accident',
      maternity: 'Maternity',
      opd: 'OPD Coverage',
      dentalCare: 'Dental Care',
      visionCare: 'Vision Care',
      internationalCoverage: 'International Coverage',
      preventiveCare: 'Preventive Care',
      homeCare: 'Home Healthcare',
      mentalHealth: 'Mental Health'
    };
    
    return names[key] || key;
  };
  
  if (loading) {
    return (
      <Container>
        <LoadingState>
          <LoadingSpinner />
          <LoadingText>Loading your plan details...</LoadingText>
        </LoadingState>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorState>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <BackLink onClick={() => history.push('/health/plans')}>
            Back to Plans
          </BackLink>
        </ErrorState>
      </Container>
    );
  }
  
  // Check if we have any plan data before rendering the main content
  const hasPlanData = selectedPlan || customPlan;
  if (!hasPlanData) {
    return (
      <Container>
        <ErrorState>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>No plan information found. Please select a plan first.</ErrorText>
          <BackLink onClick={() => history.push('/health/plans')}>
            Back to Plans
          </BackLink>
        </ErrorState>
      </Container>
    );
  }
  
  return (
    <Container>
      <Header>
        <Title>Premium Calculation</Title>
        <Subtitle>Review your plan details and choose your preferred payment option</Subtitle>
      </Header>
      
      <ProgressContainer>
        <ProgressStep>
          <StepCircle completed first>1</StepCircle>
          <StepLabel>Personal Details</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle completed>2</StepCircle>
          <StepLabel>Medical History</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle completed>3</StepCircle>
          <StepLabel>Plan Selection</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle active>4</StepCircle>
          <StepLabel active>Payment</StepLabel>
        </ProgressStep>
      </ProgressContainer>
      
      <ContentContainer>
        <PaymentOptions>
          <SectionTitle>Payment Frequency</SectionTitle>
          <InfoBox type="success">
            <InfoTitle>
              <FaCheck />
              Save with longer payment terms
            </InfoTitle>
            <InfoText>
              Choose annual payment to maximize your savings. Get up to 15% discount with yearly payment option.
            </InfoText>
          </InfoBox>
          
          <FrequencyOptions>
            <FrequencyOption 
              selected={paymentFrequency === 'monthly'} 
              onClick={() => handlePaymentFrequencyChange('monthly')}
            >
              <FrequencyHeader>
                <FrequencyName>Monthly</FrequencyName>
              </FrequencyHeader>
              <FrequencyPrice>₹{Math.round(totalAmount / 12)}</FrequencyPrice>
            </FrequencyOption>
            
            <FrequencyOption 
              selected={paymentFrequency === 'quarterly'} 
              onClick={() => handlePaymentFrequencyChange('quarterly')}
            >
              <FrequencyHeader>
                <FrequencyName>Quarterly</FrequencyName>
              </FrequencyHeader>
              <FrequencyPrice>₹{Math.round(calculateFinalAmount('quarterly', totalAmount) / 4)}</FrequencyPrice>
              <FrequencyDiscount>5% off</FrequencyDiscount>
            </FrequencyOption>
            
            <FrequencyOption 
              selected={paymentFrequency === 'halfYearly'} 
              onClick={() => handlePaymentFrequencyChange('halfYearly')}
            >
              <FrequencyHeader>
                <FrequencyName>Half-Yearly</FrequencyName>
              </FrequencyHeader>
              <FrequencyPrice>₹{Math.round(calculateFinalAmount('halfYearly', totalAmount) / 2)}</FrequencyPrice>
              <FrequencyDiscount>10% off</FrequencyDiscount>
            </FrequencyOption>
            
            <FrequencyOption 
              selected={paymentFrequency === 'yearly'} 
              onClick={() => handlePaymentFrequencyChange('yearly')}
            >
              <FrequencyHeader>
                <FrequencyName>Yearly</FrequencyName>
              </FrequencyHeader>
              <FrequencyPrice>₹{finalAmount}</FrequencyPrice>
              <FrequencyDiscount>15% off</FrequencyDiscount>
            </FrequencyOption>
          </FrequencyOptions>
          
          <DiscountBanner>
            <DiscountIcon>
              <FaPercent />
            </DiscountIcon>
            <DiscountText>
              Use promo code <DiscountCode>HEALTH10</DiscountCode> at checkout for an additional 10% off on your first payment.
            </DiscountText>
          </DiscountBanner>
        </PaymentOptions>
        
        <SummaryCard>
          <SummaryHeader>
            <SummaryTitle>Plan Summary</SummaryTitle>
          </SummaryHeader>
          <SummaryBody>
            {renderPlanDetails()}
            
            <PremiumBreakdown>
              <BreakdownTitle>Premium Breakdown</BreakdownTitle>
              
              <BreakdownItem>
                <BreakdownLabel>Base Premium</BreakdownLabel>
                <BreakdownValue>₹{basePremium > addonsCost ? basePremium - addonsCost : basePremium}</BreakdownValue>
              </BreakdownItem>
              
              {addonsCost > 0 && (
                <BreakdownItem>
                  <BreakdownLabel>Add-ons</BreakdownLabel>
                  <BreakdownValue>₹{addonsCost}</BreakdownValue>
                </BreakdownItem>
              )}
              
              <BreakdownItem>
                <BreakdownLabel>GST (18%)</BreakdownLabel>
                <BreakdownValue>₹{gstAmount}</BreakdownValue>
              </BreakdownItem>
              
              <BreakdownItem>
                <BreakdownLabel>Total Premium</BreakdownLabel>
                <BreakdownValue bold>₹{totalAmount}</BreakdownValue>
              </BreakdownItem>
              
              {discountAmount > 0 && (
                <BreakdownItem style={{ color: '#4CAF50' }}>
                  <BreakdownLabel>{getFrequencyLabel(paymentFrequency)} Payment Discount</BreakdownLabel>
                  <BreakdownValue>- ₹{discountAmount}</BreakdownValue>
                </BreakdownItem>
              )}
              
              <TotalRow>
                <TotalLabel>Amount Payable ({getFrequencyLabel(paymentFrequency)})</TotalLabel>
                <TotalValue>₹{finalAmount}</TotalValue>
              </TotalRow>
            </PremiumBreakdown>
            
            <ButtonContainer>
              <PayButton 
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${finalAmount}`}
              </PayButton>
            </ButtonContainer>
          </SummaryBody>
        </SummaryCard>
      </ContentContainer>
    </Container>
  );
};

// Mock plans data to display pre-defined plan details
const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    coverageList: [
      { text: 'Coverage up to ₹3 lakhs', included: true },
      { text: 'Room rent up to ₹3,000/day', included: true },
      { text: 'Critical illness cover', included: false },
      { text: 'Pre & post hospitalization', included: true }
    ]
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    coverageList: [
      { text: 'Coverage up to ₹5 lakhs', included: true },
      { text: 'Room rent up to ₹5,000/day', included: true },
      { text: 'Critical illness cover', included: true },
      { text: 'Pre & post hospitalization', included: true }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    coverageList: [
      { text: 'Coverage up to ₹10 lakhs', included: true },
      { text: 'No room rent capping', included: true },
      { text: 'Critical illness cover', included: true },
      { text: 'Maternity benefits', included: true }
    ]
  }
];

// Add these styled components if they don't exist already
const PlanSummaryCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow: hidden;
`;

const PlanHeader = styled.div`
  background-color: ${props => 
    props.type === 'premium' ? '#522ED3' : 
    props.type === 'standard' ? '#FF9800' : 
    props.type === 'custom' ? '#4CAF50' : '#03A9F4'};
  padding: 15px 20px;
  color: white;
`;

const PlanDetailsBody = styled.div`
  padding: 20px;
`;

const PlanDetail = styled.div`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 4px;
`;

const DetailValue = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const AddonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #6c5ce7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0 0 20px;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #6c5ce7;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f8f6ff;
    text-decoration: underline;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default HealthAdditionalDetails;