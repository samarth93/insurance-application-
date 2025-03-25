import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

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

const ProgressContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  position: relative;
`;

const ProgressStep = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#522ED3' : props.completed ? '#4CAF50' : '#e0e0e0'};
  color: ${props => (props.active || props.completed) ? 'white' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-weight: 600;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: ${props => props.first ? '50%' : '-100%'};
    right: ${props => props.last ? '50%' : '50%'};
    height: 3px;
    background-color: ${props => props.completed ? '#4CAF50' : '#e0e0e0'};
    z-index: 1;
  }
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: ${props => props.active ? '#522ED3' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  
  &:focus {
    border-color: #522ED3;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  background-color: white;
  
  &:focus {
    border-color: #522ED3;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: #522ED3;
`;

const UserProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      } else if (age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Store user data in localStorage
      localStorage.setItem('healthUserData', JSON.stringify(formData));
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Navigate to medical info page
        history.push('/health/medical-info');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setLoading(false);
    }
  };
  
  // Get maxDate for date of birth (18 years ago)
  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  };
  
  return (
    <Container>
      <Title>Health Insurance Profile</Title>
      <Subtitle>Fill in your personal details to get started with your health insurance quote</Subtitle>
      
      <ProgressContainer>
        <ProgressStep>
          <StepCircle active first>1</StepCircle>
          <StepLabel active>Personal Details</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle>2</StepCircle>
          <StepLabel>Medical History</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle>3</StepCircle>
          <StepLabel>Plan Selection</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle>4</StepCircle>
          <StepLabel>Payment</StepLabel>
        </ProgressStep>
      </ProgressContainer>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <IconWrapper>
            <Icon><FaUser /></Icon>
            <SectionTitle>Basic Information</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>Full Name</Label>
            <Input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Enter your full name"
            />
            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input 
              type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange}
              max={getMaxDate()}
            />
            {errors.dateOfBirth && <ErrorMessage>{errors.dateOfBirth}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Gender</Label>
            <Select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <IconWrapper>
            <Icon><FaEnvelope /></Icon>
            <SectionTitle>Contact Information</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>Email Address</Label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email address"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <IconWrapper>
            <Icon><FaMapMarkerAlt /></Icon>
            <SectionTitle>Address Details</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>Address</Label>
            <Input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="Enter your street address"
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>City</Label>
            <Input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              placeholder="Enter your city"
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>State</Label>
            <Input 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              placeholder="Enter your state"
            />
            {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Pincode</Label>
            <Input 
              type="text" 
              name="pincode" 
              value={formData.pincode} 
              onChange={handleChange} 
              placeholder="Enter your 6-digit pincode"
            />
            {errors.pincode && <ErrorMessage>{errors.pincode}</ErrorMessage>}
          </FormGroup>
        </FormSection>
        
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Continue to Medical Information'}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UserProfile; 