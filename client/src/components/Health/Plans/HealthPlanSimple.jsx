import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaShieldAlt, FaCrown, FaHospital, FaWrench, FaPlus, FaMinus, FaInfoCircle, FaAngleRight } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const PlansContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const PlanCard = styled.div`
  flex: 1;
  min-width: 300px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  background-color: white;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PlanHeader = styled.div`
  padding: 15px 20px;
  background-color: ${props => props.type === 'premium' ? '#522ED3' : props.type === 'standard' ? '#FF9800' : '#03A9F4'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlanType = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const PlanIcon = styled.div`
  font-size: 20px;
`;

const PlanBody = styled.div`
  padding: 20px;
`;

const PlanPrice = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const Price = styled.p`
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const PriceLabel = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
`;

const TaxInfo = styled.p`
  font-size: 12px;
  color: #999;
  margin: 5px 0 0 0;
`;

const CoverageList = styled.div`
  margin-bottom: 20px;
`;

const CoverageTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const CoverageItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CoverageIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: ${props => props.included ? '#4CAF50' : '#F44336'};
`;

const CoverageText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const BenefitSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #e0e0e0;
`;

const BenefitTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 10px 0;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BenefitText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const PopularFlag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #FF9800;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Dot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #522ED3;
  border-radius: 50%;
  margin-right: 8px;
`;

const Chip = styled.span`
  display: inline-block;
  background-color: ${props => props.color || '#f0ebff'};
  color: ${props => props.textColor || '#522ED3'};
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  margin-left: 8px;
  font-weight: 500;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #522ED3;
  font-size: 14px;
  padding: 0;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: #522ED3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3f22a3;
  }
  
  &:disabled {
    background-color: #d1d1d1;
    cursor: not-allowed;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#522ED3' : '#666'};
  border-bottom: 3px solid ${props => props.active ? '#522ED3' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #522ED3;
  }
`;

const CustomPlanContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid #e6e6e6;
`;

const CustomPlanTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #522ED3;
  }
`;

const CustomPlanSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 17px;
  font-weight: 500;
  color: #444;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const SliderContainer = styled.div`
  margin-bottom: 20px;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  span {
    font-size: 14px;
    color: #666;
  }
  
  strong {
    font-size: 16px;
    color: #333;
  }
`;

const StyledSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e0e0e0;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #522ED3;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #522ED3;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border: none;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.selected ? '#f0ebff' : 'white'};
  
  &:hover {
    border-color: #522ED3;
    background-color: ${props => props.selected ? '#f0ebff' : '#f9f7ff'};
  }
`;

const OptionText = styled.div`
  flex: 1;
  
  h5 {
    font-size: 15px;
    margin: 0 0 4px 0;
    color: #333;
  }
  
  p {
    font-size: 13px;
    margin: 0;
    color: #666;
  }
`;

const OptionPrice = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #522ED3;
`;

const AddonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border: 1px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.selected ? '#f0ebff' : 'white'};
  
  &:hover {
    border-color: #522ED3;
    background-color: ${props => props.selected ? '#f0ebff' : '#f9f7ff'};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddonInfo = styled.div`
  flex: 1;
  
  h5 {
    font-size: 15px;
    margin: 0 0 4px 0;
    color: #333;
    display: flex;
    align-items: center;
    
    svg {
      margin-left: 6px;
      color: #999;
      font-size: 14px;
    }
  }
  
  p {
    font-size: 13px;
    margin: 0;
    color: #666;
  }
`;

const AddonControls = styled.div`
  display: flex;
  align-items: center;
`;

const AddonPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #522ED3;
  margin-right: 12px;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${props => props.checked ? '#522ED3' : '#e0e0e0'};
  border-radius: 12px;
  transition: all 0.3s;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 3px;
    left: ${props => props.checked ? '23px' : '3px'};
    transition: all 0.3s;
  }
`;

const SummaryBox = styled.div`
  background-color: #f9f7ff;
  border: 1px solid #e6e0ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
`;

const SummaryTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #d1c6f6;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const LabelWithTooltip = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 6px;
    color: #999;
    font-size: 14px;
    cursor: help;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: ${props => props.disabled ? '#f9f9f9' : 'white'};
  
  &:focus {
    outline: none;
    border-color: #522ED3;
    box-shadow: 0 0 0 2px rgba(82, 46, 211, 0.1);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #522ED3;
    box-shadow: 0 0 0 2px rgba(82, 46, 211, 0.1);
  }
`;

const HealthPlanSimple = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});
  const history = useHistory();
  
  // Plans data
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      type: 'basic',
      icon: FaShieldAlt,
      price: 4999,
      popular: false,
      coverageList: [
        { text: 'Coverage up to ₹3 lakhs', included: true },
        { text: 'Room rent up to ₹3,000/day', included: true },
        { text: 'Critical illness cover', included: false },
        { text: 'Pre & post hospitalization', included: true },
        { text: 'Cashless treatment', included: true },
        { text: 'Ambulance charges', included: true, limit: '₹1,000' },
        { text: 'Ayurvedic treatment', included: false }
      ],
      benefits: [
        'No medical checkup required up to 45 years',
        'Tax benefits under Section 80D',
        '3,500+ network hospitals',
        '24/7 customer support'
      ],
      waitingPeriods: [
        { condition: 'Initial waiting period', duration: '30 days' },
        { condition: 'Pre-existing diseases', duration: '2 years' },
        { condition: 'Specific illnesses', duration: '1 year' }
      ],
      copay: '10% for claims above ₹1 lakh'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      type: 'standard',
      icon: FaHospital,
      price: 7999,
      popular: true,
      coverageList: [
        { text: 'Coverage up to ₹5 lakhs', included: true },
        { text: 'Room rent up to ₹5,000/day', included: true },
        { text: 'Critical illness cover', included: true },
        { text: 'Pre & post hospitalization', included: true },
        { text: 'Cashless treatment', included: true },
        { text: 'Ambulance charges', included: true, limit: '₹2,000' },
        { text: 'Ayurvedic treatment', included: true, limit: '₹10,000' }
      ],
      benefits: [
        'No medical checkup required up to 50 years',
        'Tax benefits under Section 80D',
        '5,000+ network hospitals',
        '24/7 customer support',
        'Free health check-up after 2 claim-free years'
      ],
      waitingPeriods: [
        { condition: 'Initial waiting period', duration: '30 days' },
        { condition: 'Pre-existing diseases', duration: '18 months' },
        { condition: 'Specific illnesses', duration: '1 year' }
      ],
      copay: '5% for claims above ₹2 lakhs'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      type: 'premium',
      icon: FaCrown,
      price: 11999,
      popular: false,
      coverageList: [
        { text: 'Coverage up to ₹10 lakhs', included: true },
        { text: 'No room rent capping', included: true },
        { text: 'Critical illness cover', included: true },
        { text: 'Maternity benefits', included: true, limit: '₹50,000' },
        { text: 'Pre & post hospitalization', included: true },
        { text: 'Cashless treatment', included: true },
        { text: 'Ambulance charges', included: true, limit: '₹3,000' },
        { text: 'Ayurvedic treatment', included: true, limit: '₹25,000' },
        { text: 'OPD coverage', included: true, limit: '₹5,000' }
      ],
      benefits: [
        'No medical checkup required up to 55 years',
        'Tax benefits under Section 80D',
        '7,500+ network hospitals',
        '24/7 priority customer support',
        'Annual free health check-up',
        'International emergency coverage',
        'Recovery benefit after 7+ days of hospitalization'
      ],
      waitingPeriods: [
        { condition: 'Initial waiting period', duration: '15 days' },
        { condition: 'Pre-existing diseases', duration: '12 months' },
        { condition: 'Specific illnesses', duration: '6 months' },
        { condition: 'Maternity', duration: '9 months' }
      ],
      copay: 'No co-pay'
    }
  ];
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  
  const handleContinue = () => {
    try {
      if (selectedPlan) {
        // Store selected plan
        localStorage.setItem('selectedHealthPlan', selectedPlan);
        
        // Store premium amount
        const planPrice = plans.find(plan => plan.id === selectedPlan)?.price || 0;
        localStorage.setItem('healthTotalPremium', planPrice.toString());
        
        // Clear any existing custom plan to avoid conflicts
        localStorage.removeItem('customHealthPlan');
        
        // Use React Router's history for navigation
        history.push('/health/additional-details');
      } else {
        alert("Please select a plan to continue");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };
  
  const goToCustomPlanBuilder = () => {
    history.push('/health/custom-plan');
  };
  
  const toggleDetails = (planId) => {
    setExpandedDetails(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };
  
  return (
    <Container>
      <Title>Health Insurance Plans</Title>
      <Subtitle>Choose from our pre-defined plans or build your own custom plan</Subtitle>
      
      <PlansContainer>
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id}
            type={plan.type}
            selected={selectedPlan === plan.id}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <PlanHeader type={plan.type}>
              <PlanType>{plan.name}</PlanType>
              <PlanIcon>
                <plan.icon />
              </PlanIcon>
            </PlanHeader>
            
            <PlanBody>
              <PlanPrice>
                <PriceLabel>Annual Premium</PriceLabel>
                <Price>₹{plan.price}</Price>
                <TaxInfo>+ GST applicable</TaxInfo>
              </PlanPrice>
              
              <CoverageList>
                <CoverageTitle>Key Benefits</CoverageTitle>
                {plan.coverageList.slice(0, 4).map((coverage, index) => (
                  <CoverageItem key={index}>
                    <CoverageIcon included={coverage.included}>
                      {coverage.included ? <FaCheck /> : <FaTimes />}
                    </CoverageIcon>
                    <CoverageText>
                      {coverage.text}
                      {coverage.included && coverage.limit && <Chip color="#f0f0f0" textColor="#666">{coverage.limit}</Chip>}
                    </CoverageText>
                  </CoverageItem>
                ))}
                
                {expandedDetails[plan.id] && (
                  <>
                    {plan.coverageList.slice(4).map((coverage, index) => (
                      <CoverageItem key={index + 4}>
                        <CoverageIcon included={coverage.included}>
                          {coverage.included ? <FaCheck /> : <FaTimes />}
                        </CoverageIcon>
                        <CoverageText>
                          {coverage.text}
                          {coverage.included && coverage.limit && <Chip color="#f0f0f0" textColor="#666">{coverage.limit}</Chip>}
                        </CoverageText>
                      </CoverageItem>
                    ))}
                    
                    <BenefitSection>
                      <BenefitTitle>Additional Benefits</BenefitTitle>
                      {plan.benefits.map((benefit, index) => (
                        <BenefitItem key={index}>
                          <Dot />
                          <BenefitText>{benefit}</BenefitText>
                        </BenefitItem>
                      ))}
                    </BenefitSection>
                    
                    <BenefitSection>
                      <BenefitTitle>Waiting Periods</BenefitTitle>
                      {plan.waitingPeriods.map((period, index) => (
                        <BenefitItem key={index}>
                          <Dot />
                          <BenefitText>{period.condition}: <strong>{period.duration}</strong></BenefitText>
                        </BenefitItem>
                      ))}
                    </BenefitSection>
                    
                    <BenefitSection>
                      <BenefitTitle>Co-payment</BenefitTitle>
                      <BenefitItem>
                        <Dot />
                        <BenefitText>{plan.copay}</BenefitText>
                      </BenefitItem>
                    </BenefitSection>
                  </>
                )}
                
                <ToggleButton onClick={(e) => {
                  e.stopPropagation(); 
                  toggleDetails(plan.id);
                }}>
                  {expandedDetails[plan.id] ? 'Show less' : 'Show more details'}
                </ToggleButton>
              </CoverageList>
            </PlanBody>
          </PlanCard>
        ))}
      </PlansContainer>
      
      <CustomPlanButton onClick={goToCustomPlanBuilder}>
        <FaWrench style={{ marginRight: '10px' }} />
        Build Your Own Custom Plan
      </CustomPlanButton>
      
      <ButtonContainer>
        <Button 
          onClick={handleContinue}
          disabled={!selectedPlan}
        >
          Continue with Selected Plan
          <FaAngleRight />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

// Add a new styled component for the custom plan button
const CustomPlanButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  padding: 15px 25px;
  background-color: #f8f9fa;
  border: 2px dashed #6c5ce7;
  border-radius: 10px;
  color: #6c5ce7;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.1);
  }
`;

export default HealthPlanSimple; 