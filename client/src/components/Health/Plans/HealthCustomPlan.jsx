import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
  font-weight: 600;
`;

const OptionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;

const Option = styled.div`
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  background-color: ${props => props.selected ? '#f8f5ff' : 'white'};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #522ED3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(82, 46, 211, 0.1);
  }
`;

const OptionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 10px;
  font-weight: 500;
`;

const OptionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const AddonsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const AddonOption = styled.div`
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  background-color: ${props => props.selected ? '#f8f5ff' : 'white'};
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #522ED3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(82, 46, 211, 0.1);
  }
`;

const AddonTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

const AddonPrice = styled.div`
  font-size: 14px;
  color: #522ED3;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ContinueButton = styled.button`
  background: linear-gradient(135deg, #522ED3 0%, #3f22a3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(82, 46, 211, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(82, 46, 211, 0.3);
  }
  
  &:disabled {
    background: #d1d1d1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const HealthCustomPlan = () => {
  const history = useHistory();
  const [coverageAmount, setCoverageAmount] = useState(300000);
  const [hospitalTier, setHospitalTier] = useState('standard');
  const [duration, setDuration] = useState(2);
  const [deductible, setDeductible] = useState(10000);
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
  const [totalPremium, setTotalPremium] = useState(0);
  const [basePremium, setBasePremium] = useState(0);
  const [totalAddonsPrice, setTotalAddonsPrice] = useState(0);

  const handleContinue = () => {
    calculateTotalPremium();
    
    const customPlanData = {
      coverageAmount,
      hospitalTier,
      duration,
      deductible,
      selectedAddons,
      totalPremium: totalPremium,
      basePremium: basePremium,
      addonsCost: totalAddonsPrice
    };
    
    localStorage.setItem('customHealthPlan', JSON.stringify(customPlanData));
    localStorage.setItem('healthTotalPremium', totalPremium.toString());
    localStorage.removeItem('selectedHealthPlan');
    
    history.push('/health/additional-details');
  };

  const calculateTotalPremium = () => {
    let premium = 5000;
    
    if (coverageAmount === 300000) premium += 0;
    else if (coverageAmount === 500000) premium += 1500;
    else if (coverageAmount === 1000000) premium += 3500;
    else if (coverageAmount === 1500000) premium += 5500;
    else if (coverageAmount === 2000000) premium += 7500;
    
    if (hospitalTier === 'standard') premium += 1000;
    else if (hospitalTier === 'premium') premium += 2500;
    
    if (duration === 2) premium += 1000;
    else if (duration === 3) premium += 2000;
    
    if (deductible === 10000) premium -= 500;
    else if (deductible === 25000) premium -= 1000;
    else if (deductible === 50000) premium -= 1500;
    
    setBasePremium(premium);
    
    const addonsPrice = Object.entries(selectedAddons).reduce((total, [key, isSelected]) => {
      if (isSelected) {
        switch (key) {
          case 'criticalIllness': return total + 1499;
          case 'personalAccident': return total + 999;
          case 'maternity': return total + 2499;
          case 'opd': return total + 1299;
          case 'dentalCare': return total + 899;
          case 'visionCare': return total + 699;
          case 'internationalCoverage': return total + 1999;
          case 'preventiveCare': return total + 799;
          case 'homeCare': return total + 1099;
          case 'mentalHealth': return total + 1399;
          default: return total;
        }
      }
      return total;
    }, 0);
    
    setTotalAddonsPrice(addonsPrice);
    
    const finalPremium = premium + addonsPrice;
    setTotalPremium(finalPremium);
    
    return finalPremium;
  };

  return (
    <Container>
      <Title>Customize Your Health Plan</Title>
      <Subtitle>Select your coverage options to create a plan that fits your needs</Subtitle>
      
      <FormContainer>
        <Section>
          <SectionTitle>Coverage Amount</SectionTitle>
          <OptionGroup>
            <Option 
              selected={coverageAmount === 300000}
              onClick={() => setCoverageAmount(300000)}
            >
              <OptionTitle>₹3 Lakhs</OptionTitle>
              <OptionDescription>Basic coverage for essential healthcare needs</OptionDescription>
            </Option>
            <Option 
              selected={coverageAmount === 500000}
              onClick={() => setCoverageAmount(500000)}
            >
              <OptionTitle>₹5 Lakhs</OptionTitle>
              <OptionDescription>Standard coverage for comprehensive healthcare</OptionDescription>
            </Option>
            <Option 
              selected={coverageAmount === 1000000}
              onClick={() => setCoverageAmount(1000000)}
            >
              <OptionTitle>₹10 Lakhs</OptionTitle>
              <OptionDescription>Premium coverage for extensive healthcare needs</OptionDescription>
            </Option>
          </OptionGroup>
        </Section>

        <Section>
          <SectionTitle>Hospital Network</SectionTitle>
          <OptionGroup>
            <Option 
              selected={hospitalTier === 'basic'}
              onClick={() => setHospitalTier('basic')}
            >
              <OptionTitle>Basic Network</OptionTitle>
              <OptionDescription>Access to 3,500+ hospitals across India</OptionDescription>
            </Option>
            <Option 
              selected={hospitalTier === 'standard'}
              onClick={() => setHospitalTier('standard')}
            >
              <OptionTitle>Standard Network</OptionTitle>
              <OptionDescription>Access to 5,000+ hospitals across India</OptionDescription>
            </Option>
            <Option 
              selected={hospitalTier === 'premium'}
              onClick={() => setHospitalTier('premium')}
            >
              <OptionTitle>Premium Network</OptionTitle>
              <OptionDescription>Access to 7,500+ hospitals across India</OptionDescription>
            </Option>
          </OptionGroup>
        </Section>

        <Section>
          <SectionTitle>Policy Duration</SectionTitle>
          <OptionGroup>
            <Option 
              selected={duration === 1}
              onClick={() => setDuration(1)}
            >
              <OptionTitle>1 Year</OptionTitle>
              <OptionDescription>Standard duration with annual renewal</OptionDescription>
            </Option>
            <Option 
              selected={duration === 2}
              onClick={() => setDuration(2)}
            >
              <OptionTitle>2 Years</OptionTitle>
              <OptionDescription>Extended coverage with better value</OptionDescription>
            </Option>
            <Option 
              selected={duration === 3}
              onClick={() => setDuration(3)}
            >
              <OptionTitle>3 Years</OptionTitle>
              <OptionDescription>Long-term coverage with maximum savings</OptionDescription>
            </Option>
          </OptionGroup>
        </Section>

        <Section>
          <SectionTitle>Deductible</SectionTitle>
          <OptionGroup>
            <Option 
              selected={deductible === 0}
              onClick={() => setDeductible(0)}
            >
              <OptionTitle>No Deductible</OptionTitle>
              <OptionDescription>Zero out-of-pocket expenses</OptionDescription>
            </Option>
            <Option 
              selected={deductible === 10000}
              onClick={() => setDeductible(10000)}
            >
              <OptionTitle>₹10,000</OptionTitle>
              <OptionDescription>Lower premium with small deductible</OptionDescription>
            </Option>
            <Option 
              selected={deductible === 25000}
              onClick={() => setDeductible(25000)}
            >
              <OptionTitle>₹25,000</OptionTitle>
              <OptionDescription>Significant premium savings</OptionDescription>
            </Option>
            <Option 
              selected={deductible === 50000}
              onClick={() => setDeductible(50000)}
            >
              <OptionTitle>₹50,000</OptionTitle>
              <OptionDescription>Maximum premium savings</OptionDescription>
            </Option>
          </OptionGroup>
        </Section>

        <Section>
          <SectionTitle>Additional Benefits</SectionTitle>
          <AddonsSection>
            <AddonOption 
              selected={selectedAddons.criticalIllness}
              onClick={() => setSelectedAddons(prev => ({...prev, criticalIllness: !prev.criticalIllness}))}
            >
              <AddonTitle>Critical Illness Cover</AddonTitle>
              <AddonPrice>₹1,499</AddonPrice>
            </AddonOption>
            <AddonOption 
              selected={selectedAddons.personalAccident}
              onClick={() => setSelectedAddons(prev => ({...prev, personalAccident: !prev.personalAccident}))}
            >
              <AddonTitle>Personal Accident Cover</AddonTitle>
              <AddonPrice>₹999</AddonPrice>
            </AddonOption>
            <AddonOption 
              selected={selectedAddons.maternity}
              onClick={() => setSelectedAddons(prev => ({...prev, maternity: !prev.maternity}))}
            >
              <AddonTitle>Maternity Cover</AddonTitle>
              <AddonPrice>₹2,499</AddonPrice>
            </AddonOption>
            <AddonOption 
              selected={selectedAddons.opd}
              onClick={() => setSelectedAddons(prev => ({...prev, opd: !prev.opd}))}
            >
              <AddonTitle>OPD Cover</AddonTitle>
              <AddonPrice>₹1,299</AddonPrice>
            </AddonOption>
            <AddonOption 
              selected={selectedAddons.dentalCare}
              onClick={() => setSelectedAddons(prev => ({...prev, dentalCare: !prev.dentalCare}))}
            >
              <AddonTitle>Dental Care</AddonTitle>
              <AddonPrice>₹899</AddonPrice>
            </AddonOption>
            <AddonOption 
              selected={selectedAddons.visionCare}
              onClick={() => setSelectedAddons(prev => ({...prev, visionCare: !prev.visionCare}))}
            >
              <AddonTitle>Vision Care</AddonTitle>
              <AddonPrice>₹699</AddonPrice>
            </AddonOption>
          </AddonsSection>
        </Section>
      </FormContainer>

      <ButtonContainer>
        <ContinueButton onClick={handleContinue}>
          Continue to Payment
          <FaArrowRight />
        </ContinueButton>
      </ButtonContainer>
    </Container>
  );
};

export default HealthCustomPlan; 