import React, { useState, useEffect } from 'react';
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 30px;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 16px;
  background-color: white;
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

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const BikeDetails = () => {
  const [bikeDetails, setBikeDetails] = useState({
    make: '',
    model: '',
    variant: '',
    year: ''
  });
  const [makes, setMakes] = useState(['Honda', 'Hero', 'Bajaj', 'TVS', 'Royal Enfield', 'Yamaha', 'Suzuki', 'KTM']);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Generate years from 2005 to current year
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = currentYear; year >= 2005; year--) {
      yearOptions.push(year.toString());
    }
    setYears(yearOptions);
  }, []);

  useEffect(() => {
    // Set models based on selected make
    if (bikeDetails.make === 'Honda') {
      setModels(['Activa', 'CB Shine', 'CB Unicorn', 'CB Hornet', 'CB Trigger']);
    } else if (bikeDetails.make === 'Hero') {
      setModels(['Splendor', 'Passion Pro', 'HF Deluxe', 'Glamour', 'Xtreme']);
    } else if (bikeDetails.make === 'Bajaj') {
      setModels(['Pulsar', 'Avenger', 'Dominar', 'Platina', 'CT']);
    } else if (bikeDetails.make === 'TVS') {
      setModels(['Apache', 'Jupiter', 'XL100', 'Ntorq', 'Sport']);
    } else if (bikeDetails.make === 'Royal Enfield') {
      setModels(['Classic 350', 'Bullet 350', 'Himalayan', 'Meteor', 'Continental GT']);
    } else if (bikeDetails.make === 'Yamaha') {
      setModels(['FZ', 'R15', 'MT-15', 'Fascino', 'Ray ZR']);
    } else if (bikeDetails.make === 'Suzuki') {
      setModels(['Access', 'Gixxer', 'Intruder', 'Burgman', 'Hayabusa']);
    } else if (bikeDetails.make === 'KTM') {
      setModels(['Duke 125', 'Duke 200', 'Duke 390', 'RC 200', 'RC 390']);
    } else {
      setModels([]);
    }
    setBikeDetails(prev => ({ ...prev, model: '', variant: '' }));
  }, [bikeDetails.make]);

  useEffect(() => {
    // Set variants based on selected model
    if (bikeDetails.model) {
      // Simplified variant list for demonstration
      setVariants(['Standard', 'Deluxe', 'Special Edition', 'Sports', 'Premium']);
    } else {
      setVariants([]);
    }
    setBikeDetails(prev => ({ ...prev, variant: '' }));
  }, [bikeDetails.model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBikeDetails({
      ...bikeDetails,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Store bike details in localStorage
      localStorage.setItem('bikeMake', bikeDetails.make);
      localStorage.setItem('bikeModel', bikeDetails.model);
      localStorage.setItem('bikeVariant', bikeDetails.variant);
      localStorage.setItem('bikeYear', bikeDetails.year);
      
      // Simulate a small delay
      setTimeout(() => {
        // Navigate to the next step
        history.push('/bikes/bikeexpiry');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error saving bike details:', error);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return bikeDetails.make && bikeDetails.model && bikeDetails.variant && bikeDetails.year;
  };

  return (
    <Container>
      <Title>Tell us about your bike</Title>
      
      <FormContainer>
        <SelectGroup>
          <Label htmlFor="make">Bike Make</Label>
          <Select
            id="make"
            name="make"
            value={bikeDetails.make}
            onChange={handleChange}
          >
            <option value="">Select Make</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </Select>
        </SelectGroup>
        
        <SelectGroup>
          <Label htmlFor="model">Bike Model</Label>
          <Select
            id="model"
            name="model"
            value={bikeDetails.model}
            onChange={handleChange}
            disabled={!bikeDetails.make}
          >
            <option value="">Select Model</option>
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </Select>
        </SelectGroup>
        
        <SelectGroup>
          <Label htmlFor="variant">Variant</Label>
          <Select
            id="variant"
            name="variant"
            value={bikeDetails.variant}
            onChange={handleChange}
            disabled={!bikeDetails.model}
          >
            <option value="">Select Variant</option>
            {variants.map(variant => (
              <option key={variant} value={variant}>{variant}</option>
            ))}
          </Select>
        </SelectGroup>
        
        <SelectGroup>
          <Label htmlFor="year">Registration Year</Label>
          <Select
            id="year"
            name="year"
            value={bikeDetails.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <InfoText>Year when your bike was first registered</InfoText>
        </SelectGroup>
      </FormContainer>
      
      <Button 
        disabled={!isFormValid() || loading} 
        onClick={handleSubmit}
      >
        {loading ? 'Processing...' : 'Continue'}
      </Button>
    </Container>
  );
};

export default BikeDetails; 