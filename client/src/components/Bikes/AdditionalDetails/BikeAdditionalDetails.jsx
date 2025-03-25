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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 30px;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
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

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 500px;
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#522ED3' : props.completed ? '#7E57E8' : '#E0E0E0'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    height: 2px;
    width: 100px;
    background-color: ${props => props.completed ? '#7E57E8' : '#E0E0E0'};
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: ${props => props.first ? 'none' : 'block'};
  }
`;

const StepLabel = styled.p`
  font-size: 12px;
  color: ${props => props.active ? '#522ED3' : '#666'};
  margin-top: 8px;
`;

const BikeAdditionalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validatePincode = (pincode) => {
    return /^[0-9]{6}$/.test(pincode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
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
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(formData.pincode)) {
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
      localStorage.setItem('bikeUserData', JSON.stringify(formData));
      
      // Get total premium from localStorage or use default value
      const totalPremium = localStorage.getItem('bikeTotalPremium') || '0';
      const premiumValue = parseInt(totalPremium);
      const gstAmount = Math.round(premiumValue * 0.18);
      const finalTotal = (premiumValue + gstAmount).toString();
      
      // Store total for payment page
      localStorage.setItem('totalacko', finalTotal);
      
      // Get bike details for policy creation
      const bikeMake = localStorage.getItem('bikeMake') || '';
      const bikeModel = localStorage.getItem('bikeModel') || '';
      const bikeYear = localStorage.getItem('bikeYear') || '';
      const bikeNumber = localStorage.getItem('bikeNumber') || '';
      const bikeUse = localStorage.getItem('bikeUse') || 'Personal use';
      const planType = localStorage.getItem('selectedBikePlan') || 'comprehensive';

      // Store policy type
      localStorage.setItem('policyType', 'Comprehensive Bike Insurance');
      
      // Store bike details for policy creation
      localStorage.setItem('vehicleType', 'bike');
      localStorage.setItem('bikeNumber', bikeNumber);
      localStorage.setItem('bikeMake', bikeMake);
      localStorage.setItem('bikeModel', bikeModel);
      localStorage.setItem('bikeYear', bikeYear);
      localStorage.setItem('bikeUse', bikeUse);
      
      // Check if we have selected coverages stored
      const coveragesString = localStorage.getItem('selectedBikeCoverages');
      if (coveragesString) {
        try {
          const coverages = JSON.parse(coveragesString);
          // Store individual coverages
          coverages.forEach(coverage => {
            if (coverage.name === 'Zero Depreciation') 
              localStorage.setItem('zeroDepreciation', 'true');
            if (coverage.name === 'Engine Protection') 
              localStorage.setItem('engineProtection', 'true');
            if (coverage.name === 'Roadside Assistance') 
              localStorage.setItem('roadSideAssistance', 'true');
            if (coverage.name === 'Personal Accident Cover') 
              localStorage.setItem('paCover', 'true');
          });
        } catch (e) {
          console.error('Error parsing coverages:', e);
        }
      } else if (planType === 'comprehensive') {
        // Set default coverages for comprehensive plan
        localStorage.setItem('paCover', 'true');
      }
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Navigate to card payment page
        history.push('/cardPayment');
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
      <Title>Additional Details</Title>
      
      <ProgressContainer>
        <ProgressStep>
          <StepCircle completed first>1</StepCircle>
          <StepLabel>Select Plan</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle active>2</StepCircle>
          <StepLabel active>Personal Details</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle>3</StepCircle>
          <StepLabel>Payment</StepLabel>
        </ProgressStep>
      </ProgressContainer>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              maxLength={10}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              max={getMaxDate()}
            />
            {errors.dob && <ErrorMessage>{errors.dob}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
              {/* Add other states as needed */}
            </Select>
            {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              name="pincode"
              type="text"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
            />
            {errors.pincode && <ErrorMessage>{errors.pincode}</ErrorMessage>}
          </FormGroup>
        </FormContainer>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </form>
    </Container>
  );
};

export default BikeAdditionalDetails; 