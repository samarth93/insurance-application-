import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
`;

const Pincode = () => {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const validatePincode = (code) => {
    return /^\d{6}$/.test(code);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!validatePincode(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    
    try {
      // Store pincode in localStorage without making actual API call
      localStorage.setItem('bikePincode', pincode);
      
      // Simulate a small delay
      setTimeout(() => {
        // Navigate to the next step
        history.push('/bikes/bikenumber');
        setLoading(false);
      }, 500);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting pincode:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Enter your pincode</Title>
      <FormContainer>
        <Label htmlFor="pincode">Pincode</Label>
        <Input
          id="pincode"
          type="text"
          value={pincode}
          onChange={handleChange}
          placeholder="Enter 6 digit pincode"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
      <Button 
        disabled={pincode.length !== 6 || loading} 
        onClick={handleSubmit}
      >
        {loading ? 'Processing...' : 'Continue'}
      </Button>
    </Container>
  );
};

export default Pincode; 