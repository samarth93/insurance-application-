import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaInfoCircle, FaArrowRight, FaBriefcase, FaRupeeSign } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 40px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(12px) saturate(180%);
  border-radius: 28px;
  box-shadow: 0 12px 48px rgba(82, 46, 211, 0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
  border: 1.5px solid rgba(138,43,226,0.10);

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(32px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 768px) {
    margin: 12px;
    padding: 16px 4px;
    border-radius: 18px;
  }
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: slideDown 0.8s ease-in;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 15px;
  font-weight: 700;
  background: linear-gradient(135deg, #522ED3 0%, #8967E8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  align-items: center;
  margin: 40px auto;
  position: relative;
  max-width: 800px;
  min-height: 70px;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 40px;
    right: 40px;
    height: 4px;
    background: linear-gradient(90deg, #e0e0e0 0%, #d1c4e9 100%);
    z-index: 1;
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 15px;
    margin: 30px 0;
    &::before {
      left: 24px;
      right: 24px;
      height: 3px;
    }
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d0d0d0;
      border-radius: 4px;
    }
  }
`;

const ProgressStep = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  min-width: 90px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    min-width: 80px;
    flex: 0 0 auto;
  }
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.active ? 'linear-gradient(135deg, #522ED3 0%, #8967E8 100%)' : props.completed ? 'linear-gradient(135deg, #8967E8 0%, #b2a4f7 100%)' : 'rgba(255,255,255,0.7)'};
  color: ${props => (props.active || props.completed) ? 'white' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 1.3rem;
  border: 2.5px solid ${props => props.active ? '#522ED3' : props.completed ? '#8967E8' : '#e0e0e0'};
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  box-shadow: ${props => (props.active || props.completed) ? '0 4px 16px rgba(82, 46, 211, 0.18)' : 'none'};
  position: relative;
  overflow: hidden;
  background-clip: padding-box;
  z-index: 2;
  & svg {
    font-size: 1.5rem;
  }
  &:hover {
    transform: scale(1.12);
  }
`;

const StepLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.active ? '#522ED3' : props.completed ? '#8967E8' : '#666'};
  font-weight: ${props => (props.active || props.completed) ? '600' : '400'};
  transition: all 0.3s ease;
`;

const FormContainer = styled.div`
  background: rgba(255,255,255,0.92);
  border-radius: 22px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(82, 46, 211, 0.07);
  margin-bottom: 36px;
  border: 1.5px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  animation: slideUp 0.6s cubic-bezier(0.4,0,0.2,1);
  &:hover {
    box-shadow: 0 16px 48px rgba(82, 46, 211, 0.13);
    border-color: #e6e0f8;
    transform: translateY(-2px) scale(1.01);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 768px) {
    padding: 18px 6px;
    margin-bottom: 18px;
    border-radius: 14px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin: 0 0 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #522ED3;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: #8967E8;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 60px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const FormColumn = styled.div`
  flex: 1 1 0;
  min-width: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  color: #2d3436;
  margin-bottom: 8px;
  font-weight: 500;
  
  &::after {
    content: '*';
    color: #e74c3c;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  border: 2px solid ${props => props.error ? '#e74c3c' : '#e0e0e0'};
  border-radius: 14px;
  font-size: 1.08rem;
  color: #2d3436;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  background: ${props => props.error ? '#fff5f5' : 'rgba(255,255,255,0.95)'};
  box-shadow: 0 2px 8px rgba(82, 46, 211, 0.04);
  &:focus {
    outline: none;
    border-color: #522ED3;
    box-shadow: 0 0 0 6px rgba(82, 46, 211, 0.10);
    background: #f8f9ff;
  }
  &::placeholder {
    color: #b2bec3;
  }
  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  border: 2px solid ${props => props.error ? '#e74c3c' : '#e0e0e0'};
  border-radius: 14px;
  font-size: 1.08rem;
  color: #2d3436;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  background: ${props => props.error ? '#fff5f5' : 'rgba(255,255,255,0.95)'};
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 18px;
  cursor: pointer;
  height: 52px;
  &:focus {
    outline: none;
    border-color: #522ED3;
    box-shadow: 0 0 0 6px rgba(82, 46, 211, 0.10);
    background: #f8f9ff;
  }
  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 8px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  animation: shake 0.5s ease-in-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  &::before {
    content: "!";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    margin-right: 8px;
    font-size: 12px;
    font-weight: bold;
  }
`;

const RequiredFieldNote = styled.p`
  font-size: 14px;
  color: #666;
  margin: 10px 0 20px;
  font-style: italic;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 20px;
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(135deg, #522ED3 0%, #8967E8 100%);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 18px 38px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  display: flex;
  align-items: center;
  box-shadow: 0 4px 18px rgba(82, 46, 211, 0.18);
  &:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 32px rgba(82, 46, 211, 0.22);
    background: linear-gradient(135deg, #8967E8 0%, #522ED3 100%);
  }
  &:active {
    transform: translateY(0) scale(1);
  }
  &:disabled {
    background: #d1d1d1;
    cursor: not-allowed;
    box-shadow: none;
  }
  svg {
    margin-left: 10px;
    transition: transform 0.2s;
  }
  &:hover svg {
    transform: translateX(3px);
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #EFF6FF 0%, #F0EBFF 100%);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #522ED3;
  animation: slideIn 0.6s ease-in;
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 30px;
  }
`;

const InfoIcon = styled.div`
  color: #522ED3;
  margin-right: 20px;
  font-size: 24px;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  font-size: 1rem;
  color: #2d3436;
  line-height: 1.6;
  
  p {
    margin: 0 0 10px;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f0ebff 0%, #e6e0ff 100%);
  border-radius: 12px;
  margin-right: 15px;
  color: #522ED3;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.2rem;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const handleOptionStyles = () => {
  // Apply styles to select options when component mounts
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
      select option {
        padding: 12px !important;
        font-size: 15px !important;
        color: #333 !important;
      }
      
      select option:checked {
        background-color: #f0ebff !important;
        color: #522ED3 !important;
      }
    `;
    document.head.appendChild(style);
  });
};

const HealthProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    occupation: '',
    annualIncome: '',
    maritalStatus: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeSections, setActiveSections] = useState({
    personal: true,
    contact: false,
    professional: false
  });
  
  const history = useHistory();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Auto-advance to next section
    if (
      (name === 'maritalStatus' && value && !activeSections.contact) ||
      (name === 'email' && value && !activeSections.professional)
    ) {
      setTimeout(() => {
        const nextSection = name === 'maritalStatus' ? 'contact' : 'professional';
        setActiveSections({
          ...activeSections,
          [nextSection]: true
        });
      }, 300);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      // Check if user is at least 18 years old
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      } else if (age > 65) {
        newErrors.dob = 'Maximum age for policy is 65 years';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
    }
    
    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Annual income is required';
    }
    
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        // Store user data in localStorage
        localStorage.setItem('healthUserData', JSON.stringify(formData));
        
        // Simulate API call with setTimeout
        setTimeout(() => {
          // Navigate to medical history page
          history.push('/health/medical-info');
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
      }
    } else {
      // Open all sections if there are errors
      setActiveSections({
        personal: true,
        contact: true,
        professional: true
      });
    }
  };
  
  // Calculate max date (18 years ago from today)
  const calculateMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  };
  
  // Calculate min date (65 years ago from today)
  const calculateMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 65);
    return date.toISOString().split('T')[0];
  };
  
  const toggleSection = (section) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section]
    });
  };
  
  // Apply custom styles to options
  useEffect(() => {
    handleOptionStyles();
  }, []);
  
  return (
    <Container>
      <TitleSection>
        <Title>Your Details</Title>
        <Subtitle>Please provide your personal information for a tailored health insurance quote</Subtitle>
      </TitleSection>
      
      <ProgressContainer>
        <ProgressStep>
          <StepCircle active completed first><FaUser /></StepCircle>
          <StepLabel active completed>Personal Details</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle><FaCalendarAlt /></StepCircle>
          <StepLabel>Medical History</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle><FaBriefcase /></StepCircle>
          <StepLabel>Plan Selection</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle><FaRupeeSign /></StepCircle>
          <StepLabel>Payment</StepLabel>
        </ProgressStep>
      </ProgressContainer>
      
      <InfoBox>
        <InfoIcon>
          <FaInfoCircle />
        </InfoIcon>
        <InfoText>
          <p>Your information is secure and will only be used for generating an accurate health insurance quote. All fields marked with an asterisk (*) are required.</p>
          <p>Complete your profile to discover health plans tailored to your needs.</p>
        </InfoText>
      </InfoBox>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <SectionTitle onClick={() => toggleSection('personal')} style={{cursor: 'pointer'}}>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            Personal Information
          </SectionTitle>
          
          {activeSections.personal && (
            <>
              <FormRow>
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
                
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      error={errors.dob}
                      min={calculateMinDate()}
                      max={calculateMaxDate()}
                    />
                    {errors.dob && <ErrorMessage>{errors.dob}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
              </FormRow>
            
              <FormRow>
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      error={errors.gender}
                      required
                    >
                      <option value="" disabled hidden>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
                
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      error={errors.maritalStatus}
                      required
                    >
                      <option value="" disabled hidden>Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </Select>
                    {errors.maritalStatus && <ErrorMessage>{errors.maritalStatus}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
              </FormRow>
            </>
          )}
        </FormContainer>
        
        <FormContainer>
          <SectionTitle onClick={() => toggleSection('contact')} style={{cursor: 'pointer'}}>
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            Contact Information
          </SectionTitle>
          
          {activeSections.contact && (
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
              
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="your@email.com"
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
            </FormRow>
          )}
        </FormContainer>
        
        <FormContainer>
          <SectionTitle onClick={() => toggleSection('professional')} style={{cursor: 'pointer'}}>
            <IconWrapper>
              <FaBriefcase />
            </IconWrapper>
            Professional Information
          </SectionTitle>
          
          {activeSections.professional && (
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Select
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    error={errors.occupation}
                    required
                  >
                    <option value="" disabled hidden>Select occupation</option>
                    <option value="salaried">Salaried Employee</option>
                    <option value="self-employed">Self-Employed Professional</option>
                    <option value="business-owner">Business Owner</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                    <option value="homemaker">Homemaker</option>
                    <option value="other">Other</option>
                  </Select>
                  {errors.occupation && <ErrorMessage>{errors.occupation}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
              
              <FormColumn>
                <FormGroup>
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                  <Select
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    error={errors.annualIncome}
                    required
                  >
                    <option value="" disabled hidden>Select income range</option>
                    <option value="below-3">Below ₹3 Lakh</option>
                    <option value="3-5">₹3 Lakh - ₹5 Lakh</option>
                    <option value="5-10">₹5 Lakh - ₹10 Lakh</option>
                    <option value="10-15">₹10 Lakh - ₹15 Lakh</option>
                    <option value="15-25">₹15 Lakh - ₹25 Lakh</option>
                    <option value="above-25">Above ₹25 Lakh</option>
                  </Select>
                  {errors.annualIncome && <ErrorMessage>{errors.annualIncome}</ErrorMessage>}
                </FormGroup>
              </FormColumn>
            </FormRow>
          )}
        </FormContainer>
        
        <RequiredFieldNote>All fields are required</RequiredFieldNote>
        
        <ButtonContainer>
          <ContinueButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner /> Processing...
              </>
            ) : (
              <>
                Continue to Medical History <FaArrowRight />
              </>
            )}
          </ContinueButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default HealthProfile; 