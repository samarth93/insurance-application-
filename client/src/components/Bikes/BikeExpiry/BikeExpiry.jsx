import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
  margin-bottom: 40px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const OptionCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#522ED3' : '#e0e0e0'};
  background-color: ${props => props.selected ? '#F0EAFB' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #522ED3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const RadioButton = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#522ED3' : '#999'};
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.selected ? '#522ED3' : 'transparent'};
  }
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #333;
`;

const OptionDescription = styled.p`
  font-size: 14px;
  margin: 5px 0 0 0;
  color: #666;
`;

const DateSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const DateInput = styled.input`
  width: 300px;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #522ED3;
  }
`;

const Button = styled.button`
  width: 180px;
  height: 48px;
  background-color: ${props => props.disabled ? '#ccc' : '#522ED3'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#3f22a3'};
  }
`;

const BikeExpiry = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Reset expiry date if not selecting "expired"
    if (option !== 'expired') {
      setExpiryDate('');
    }
  };

  const handleDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Store expiry status in localStorage
      localStorage.setItem('bikePolicyStatus', selectedOption);
      
      if (selectedOption === 'expired' && expiryDate) {
        localStorage.setItem('bikePolicyExpiryDate', expiryDate);
      }
      
      // Simulate a small delay
      setTimeout(() => {
        // Navigate to the next step
        history.push('/bikes/plans');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error saving policy status:', error);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!selectedOption) return false;
    if (selectedOption === 'expired' && !expiryDate) return false;
    return true;
  };

  // Calculate min and max date for expiry date input
  const getMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Container>
      <Title>When did your previous bike insurance expire?</Title>
      
      <OptionsContainer>
        <OptionCard 
          selected={selectedOption === 'active'} 
          onClick={() => handleOptionSelect('active')}
        >
          <RadioButton selected={selectedOption === 'active'} />
          <OptionContent>
            <OptionTitle>My insurance is active</OptionTitle>
            <OptionDescription>I have an existing policy that has not expired</OptionDescription>
          </OptionContent>
        </OptionCard>
        
        <OptionCard 
          selected={selectedOption === 'expired'} 
          onClick={() => handleOptionSelect('expired')}
        >
          <RadioButton selected={selectedOption === 'expired'} />
          <OptionContent>
            <OptionTitle>My insurance has expired</OptionTitle>
            <OptionDescription>My previous policy has already expired</OptionDescription>
          </OptionContent>
        </OptionCard>
        
        <OptionCard 
          selected={selectedOption === 'new'} 
          onClick={() => handleOptionSelect('new')}
        >
          <RadioButton selected={selectedOption === 'new'} />
          <OptionContent>
            <OptionTitle>I am buying insurance for the first time</OptionTitle>
            <OptionDescription>I have never had a bike insurance policy before</OptionDescription>
          </OptionContent>
        </OptionCard>
      </OptionsContainer>
      
      {selectedOption === 'expired' && (
        <DateSelector>
          <Label htmlFor="expiryDate">When did your policy expire?</Label>
          <DateInput
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={handleDateChange}
            min={getMinDate()}
            max={getMaxDate()}
          />
        </DateSelector>
      )}
      
      <Button 
        disabled={!isFormValid() || loading} 
        onClick={handleSubmit}
      >
        {loading ? 'Processing...' : 'Continue'}
      </Button>
    </Container>
  );
};

export default BikeExpiry; 