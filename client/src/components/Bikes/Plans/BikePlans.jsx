import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaShieldAlt, FaInfoCircle, FaCrown } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
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
  min-width: 280px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  background-color: white;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.selected ? '0 8px 16px rgba(82, 46, 211, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PlanHeader = styled.div`
  padding: 15px 20px;
  background-color: ${props => props.type === 'comprehensive' ? '#522ED3' : props.type === 'thirdParty' ? '#FF9800' : '#03A9F4'};
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
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const PriceLabel = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const OldPrice = styled.p`
  font-size: 16px;
  color: #999;
  margin: 0 10px 0 0;
  text-decoration: line-through;
`;

const Price = styled.p`
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DiscountBadge = styled.span`
  background-color: #4CAF50;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 10px;
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
  align-items: flex-start;
  margin-bottom: 12px;
  position: relative;
`;

const CoverageIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: ${props => props.included ? '#4CAF50' : '#F44336'};
  margin-top: 2px;
`;

const CoverageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverageText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  font-weight: 500;
`;

const CoverageDetail = styled.p`
  font-size: 12px;
  color: #888;
  margin: 4px 0 0 0;
`;

const InfoIconWrapper = styled.div`
  margin-left: 5px;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  
  &:hover {
    color: #522ED3;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: ${props => props.selected ? '#522ED3' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.selected ? '#3f22a3' : '#e0e0e0'};
  }
`;

const CustomizeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
  margin-top: 40px;
  background-color: #522ED3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3f22a3;
  }
`;

const BenefitsSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #e0e0e0;
`;

const BenefitsTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #522ED3;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const BenefitIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #522ED3;
  font-size: 12px;
`;

const BenefitText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const BikePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [bikeInfo, setBikeInfo] = useState({});
  const history = useHistory();

  // Plans data (in a real app, this would come from an API)
  const plans = [
    {
      id: 'comprehensive',
      name: 'Comprehensive',
      icon: <FaCrown />,
      price: 2999,
      originalPrice: 3499,
      discount: 15,
      coverage: [
        { name: 'Third-party Liability', included: true, detail: 'Covers damages to third-party property and injury/death' },
        { name: 'Own Damage', included: true, detail: 'Covers damages to your own bike due to accidents' },
        { name: 'Natural Calamities', included: true, detail: 'Protection against floods, earthquakes, storms, and other natural disasters' },
        { name: 'Man-made Calamities', included: true, detail: 'Covers damages due to fire, theft, riots, and vandalism' },
        { name: 'Personal Accident Cover', included: true, detail: 'Provides ₹15 lakh coverage for permanent disability or death' },
        { name: 'Zero Depreciation', included: false, detail: 'Get full claim amount without deduction for depreciation' },
        { name: 'Engine Protection', included: false, detail: 'Special coverage for engine damage due to water ingression' },
        { name: 'Roadside Assistance', included: false, detail: '24×7 assistance for breakdowns and emergencies' }
      ],
      benefits: [
        'Cashless repairs at 5000+ network garages',
        'Faster claim settlement in 24 hours',
        'No inspection required for new bikes',
        'NCB transfer up to 50% from previous insurer'
      ]
    },
    {
      id: 'thirdParty',
      name: 'Third Party',
      icon: <FaShieldAlt />,
      price: 999,
      originalPrice: 1199,
      discount: 17,
      coverage: [
        { name: 'Third-party Liability', included: true, detail: 'Mandatory coverage as per Motor Vehicles Act' },
        { name: 'Own Damage', included: false, detail: 'Damages to your own bike are not covered' },
        { name: 'Natural Calamities', included: false, detail: 'No protection against natural disasters' },
        { name: 'Man-made Calamities', included: false, detail: 'No coverage for theft, fire, or vandalism' },
        { name: 'Personal Accident Cover', included: true, detail: 'Provides ₹15 lakh coverage for permanent disability or death' },
        { name: 'Legal Liability to Paid Driver', included: true, detail: 'Covers legal liability for employed drivers' },
        { name: 'Unlimited Third-Party Liability', included: true, detail: 'No cap on third-party property or injury claims' }
      ],
      benefits: [
        'Easy digital policy issuance',
        'Legal compliance with Motor Vehicles Act',
        'Zero paperwork process',
        'Digital policy certificate'
      ]
    }
  ];

  useEffect(() => {
    // Get bike information from localStorage
    const make = localStorage.getItem('bikeMake') || '';
    const model = localStorage.getItem('bikeModel') || '';
    const year = localStorage.getItem('bikeYear') || '';
    
    setBikeInfo({ make, model, year });
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      // Store selected plan in localStorage
      localStorage.setItem('selectedBikePlan', selectedPlan);
      
      // Navigate to the next step
      history.push('/bikes/additional-details');
    }
  };

  const handleCustomize = () => {
    // Navigate to customize plan page
    history.push('/bikes/custom-policy');
  };

  return (
    <Container>
      <Title>Choose a Bike Insurance Plan</Title>
      <Subtitle>
        {bikeInfo.make && bikeInfo.model 
          ? `For your ${bikeInfo.year} ${bikeInfo.make} ${bikeInfo.model}`
          : 'Select a plan that fits your needs'}
      </Subtitle>
      
      <PlansContainer>
        {plans.map(plan => (
          <PlanCard 
            key={plan.id} 
            selected={selectedPlan === plan.id}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <PlanHeader type={plan.id}>
              <PlanType>{plan.name}</PlanType>
              <PlanIcon>{plan.icon}</PlanIcon>
            </PlanHeader>
            
            <PlanBody>
              <PlanPrice>
                <PriceLabel>Annual Premium</PriceLabel>
                <PriceRow>
                  <OldPrice>₹{plan.originalPrice}</OldPrice>
                  <Price>₹{plan.price}</Price>
                  <DiscountBadge>{plan.discount}% OFF</DiscountBadge>
                </PriceRow>
                <TaxInfo>Includes 18% GST</TaxInfo>
              </PlanPrice>
              
              <CoverageList>
                <CoverageTitle>What's covered:</CoverageTitle>
                {plan.coverage.map((item, index) => (
                  <CoverageItem key={index}>
                    <CoverageIcon included={item.included}>
                      {item.included ? <FaCheck /> : <FaTimes />}
                    </CoverageIcon>
                    <CoverageTextContainer>
                      <CoverageText>{item.name}</CoverageText>
                      <CoverageDetail>{item.detail}</CoverageDetail>
                    </CoverageTextContainer>
                  </CoverageItem>
                ))}
              </CoverageList>
              
              <BenefitsSection>
                <BenefitsTitle>
                  <FaInfoCircle style={{ marginRight: '8px' }} /> Special Benefits
                </BenefitsTitle>
                {plan.benefits.map((benefit, index) => (
                  <BenefitItem key={index}>
                    <BenefitIcon>•</BenefitIcon>
                    <BenefitText>{benefit}</BenefitText>
                  </BenefitItem>
                ))}
              </BenefitsSection>
              
              <SelectButton selected={selectedPlan === plan.id}>
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </SelectButton>
            </PlanBody>
          </PlanCard>
        ))}
      </PlansContainer>
      
      <CustomizeButton onClick={handleCustomize}>
        Customize Your Own Policy
      </CustomizeButton>
      
      {selectedPlan && (
        <CustomizeButton onClick={handleContinue} style={{ marginTop: '20px' }}>
          Continue with Selected Plan
        </CustomizeButton>
      )}
    </Container>
  );
};

export default BikePlans; 