import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaToggleOn, FaToggleOff, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

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

const MainContent = styled.div`
  display: flex;
  gap: 30px;
`;

const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 40px;
  align-self: flex-start;
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PriceLabel = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const PriceValue = styled.p`
  font-size: 14px;
  font-weight: ${props => props.bold ? '600' : '400'};
  color: ${props => props.highlight ? '#522ED3' : '#333'};
  margin: 0;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const TotalLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const TotalValue = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #522ED3;
  margin: 0;
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: #522ED3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3f22a3;
  }
`;

const SavingsCard = styled.div`
  background-color: #f0f9ff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SavingsIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e6f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #0288d1;
  font-size: 24px;
`;

const SavingsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SavingsTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 5px 0;
`;

const SavingsText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const CoverageSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
`;

const ToggleAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #eee;
  }
`;

const ToggleAllText = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;

const ToggleIcon = styled.div`
  color: #522ED3;
  font-size: 18px;
`;

const CoverageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${props => props.selected ? '#F0EAFB' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #522ED3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const CoverageInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverageName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 5px 0;
`;

const CoverageDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const CoveragePrice = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #522ED3;
  margin-right: 10px;
`;

const ToggleButton = styled.div`
  color: ${props => props.selected ? '#522ED3' : '#999'};
  font-size: 24px;
`;

const BikeCustomPolicy = () => {
  const [bikeInfo, setBikeInfo] = useState({});
  const [coverages, setCoverages] = useState([
    { id: 1, name: 'Third-party Liability', description: 'Legally required - covers damage to others', price: 850, selected: true, mandatory: true },
    { id: 2, name: 'Own Damage', description: 'Covers damage to your own bike from accidents', price: 1200, selected: false },
    { id: 3, name: 'Zero Depreciation', description: 'Get full claim without depreciation deduction', price: 500, selected: false },
    { id: 4, name: 'Engine Protection', description: 'Covers damage to engine from water or oil leakage', price: 350, selected: false },
    { id: 5, name: 'Roadside Assistance', description: '24/7 help for breakdowns and emergencies', price: 150, selected: false },
    { id: 6, name: 'Personal Accident Cover', description: 'Covers injuries to the rider in accidents', price: 250, selected: true, mandatory: true },
    { id: 7, name: 'Passenger Cover', description: 'Covers injuries to passengers in accidents', price: 200, selected: false },
    { id: 8, name: 'Accessories Cover', description: 'Covers damage to additional accessories', price: 300, selected: false },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const history = useHistory();

  useEffect(() => {
    // Get bike information from localStorage
    const make = localStorage.getItem('bikeMake') || '';
    const model = localStorage.getItem('bikeModel') || '';
    const year = localStorage.getItem('bikeYear') || '';
    
    setBikeInfo({ make, model, year });
  }, []);

  useEffect(() => {
    // Calculate total price based on selected coverages
    const selected = coverages.filter(item => item.selected);
    const total = selected.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
    
    // Calculate savings (compared to if all were selected)
    const maxTotal = coverages.reduce((sum, item) => sum + item.price, 0);
    setSavings(maxTotal - total);
  }, [coverages]);

  const handleToggleCoverage = (id) => {
    setCoverages(prev => prev.map(item => {
      // Don't allow toggling mandatory coverages
      if (item.id === id && !item.mandatory) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const handleToggleAll = () => {
    const allSelected = coverages.every(item => item.selected);
    
    setCoverages(prev => prev.map(item => {
      // Keep mandatory items selected even when deselecting all
      if (item.mandatory) {
        return { ...item, selected: true };
      }
      return { ...item, selected: !allSelected };
    }));
  };

  const handleContinue = () => {
    // Store selected coverages in localStorage
    const selectedCoverages = coverages.filter(item => item.selected);
    localStorage.setItem('selectedBikeCoverages', JSON.stringify(selectedCoverages));
    localStorage.setItem('bikeTotalPremium', totalPrice.toString());
    
    // Navigate to the next step
    history.push('/bikes/additional-details');
  };

  const selectedCount = coverages.filter(item => item.selected).length;
  const allSelected = coverages.every(item => item.selected);

  return (
    <Container>
      <Title>Customize Your Bike Insurance</Title>
      <Subtitle>
        {bikeInfo.make && bikeInfo.model 
          ? `For your ${bikeInfo.year} ${bikeInfo.make} ${bikeInfo.model}`
          : 'Select the coverages you need'}
      </Subtitle>
      
      <MainContent>
        <LeftSection>
          <SavingsCard>
            <SavingsIcon>
              <FaShieldAlt />
            </SavingsIcon>
            <SavingsContent>
              <SavingsTitle>Customize for what you need</SavingsTitle>
              <SavingsText>Select or deselect coverages to build your perfect policy</SavingsText>
            </SavingsContent>
          </SavingsCard>
          
          <CoverageSection>
            <SectionTitle>Available Coverages ({selectedCount}/{coverages.length})</SectionTitle>
            
            <ToggleAllButton onClick={handleToggleAll}>
              <ToggleAllText>{allSelected ? 'Deselect All' : 'Select All'}</ToggleAllText>
              <ToggleIcon>
                {allSelected ? <FaToggleOn /> : <FaToggleOff />}
              </ToggleIcon>
            </ToggleAllButton>
            
            {coverages.map(item => (
              <CoverageItem 
                key={item.id} 
                selected={item.selected}
                onClick={() => handleToggleCoverage(item.id)}
              >
                <CoverageInfo>
                  <CoverageName>{item.name}</CoverageName>
                  <CoverageDescription>{item.description}</CoverageDescription>
                </CoverageInfo>
                <CoveragePrice>
                  <Price>₹{item.price}</Price>
                  <ToggleButton selected={item.selected}>
                    {item.selected ? <FaToggleOn /> : <FaToggleOff />}
                  </ToggleButton>
                </CoveragePrice>
              </CoverageItem>
            ))}
          </CoverageSection>
        </LeftSection>
        
        <RightSection>
          <SummaryCard>
            <SummaryTitle>Policy Summary</SummaryTitle>
            
            <PriceSection>
              {coverages.filter(item => item.selected).map(item => (
                <PriceRow key={item.id}>
                  <PriceLabel>{item.name}</PriceLabel>
                  <PriceValue>₹{item.price}</PriceValue>
                </PriceRow>
              ))}
            </PriceSection>
            
            <PriceRow>
              <PriceLabel>Base Premium</PriceLabel>
              <PriceValue>₹{totalPrice}</PriceValue>
            </PriceRow>
            
            <PriceRow>
              <PriceLabel>GST (18%)</PriceLabel>
              <PriceValue>₹{Math.round(totalPrice * 0.18)}</PriceValue>
            </PriceRow>
            
            <TotalPrice>
              <TotalLabel>Total Premium</TotalLabel>
              <TotalValue>₹{totalPrice + Math.round(totalPrice * 0.18)}</TotalValue>
            </TotalPrice>
          </SummaryCard>
          
          <ContinueButton onClick={handleContinue}>
            Continue with Custom Plan <FaArrowRight />
          </ContinueButton>
        </RightSection>
      </MainContent>
    </Container>
  );
};

export default BikeCustomPolicy; 