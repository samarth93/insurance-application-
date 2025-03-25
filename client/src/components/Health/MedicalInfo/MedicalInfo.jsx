import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaNotesMedical, FaBriefcaseMedical, FaHeartbeat, FaRunning } from 'react-icons/fa';

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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;
  
  &:focus {
    border-color: #522ED3;
    outline: none;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
`;

const Radio = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? 'transparent' : '#522ED3'};
  color: ${props => props.secondary ? '#522ED3' : 'white'};
  border: ${props => props.secondary ? '1px solid #522ED3' : 'none'};
  border-radius: 4px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#f0f0ff' : '#3f22a3'};
  }
  
  &:disabled {
    background-color: #d1d1d1;
    border-color: #d1d1d1;
    color: #777;
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

const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 5px;
  font-style: italic;
`;

// List of common pre-existing conditions
const preExistingConditions = [
  'Diabetes',
  'Hypertension (High Blood Pressure)',
  'Asthma',
  'Heart Disease',
  'Cancer (specify type in notes)',
  'Kidney Disease',
  'Liver Disease',
  'Thyroid Disorder',
  'Autoimmune Disorder',
  'Mental Health Condition',
  'Other (please specify)'
];

const MedicalInfo = () => {
  const [formData, setFormData] = useState({
    governmentId: '',
    idType: 'aadhar',
    employment: '',
    employmentStatus: 'employed',
    preExistingConditions: [],
    otherConditions: '',
    surgeries: '',
    hospitalizations: '',
    familyHistory: '',
    medications: '',
    smoking: 'no',
    alcohol: 'no',
    exerciseFrequency: 'rarely',
    diet: 'mixed'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    // Load user profile data if available
    const storedUserData = localStorage.getItem('healthUserData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      // Redirect to profile page if no user data
      history.push('/health/profile');
    }
  }, [history]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'preExistingConditions') {
        const updatedConditions = [...formData.preExistingConditions];
        if (checked) {
          updatedConditions.push(value);
        } else {
          const index = updatedConditions.indexOf(value);
          if (index > -1) {
            updatedConditions.splice(index, 1);
          }
        }
        setFormData({
          ...formData,
          preExistingConditions: updatedConditions
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
    
    if (formData.idType === 'aadhar' && (!formData.governmentId || !/^\d{12}$/.test(formData.governmentId))) {
      newErrors.governmentId = 'Please enter a valid 12-digit Aadhaar number';
    } else if (formData.idType === 'pan' && (!formData.governmentId || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.governmentId))) {
      newErrors.governmentId = 'Please enter a valid 10-character PAN number';
    }
    
    if (formData.employmentStatus === 'employed' && !formData.employment.trim()) {
      newErrors.employment = 'Please enter your employer details';
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
      // Store medical data in localStorage
      localStorage.setItem('healthMedicalData', JSON.stringify(formData));
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Navigate to plans page
        history.push('/health/plans');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving medical data:', error);
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    history.push('/health/profile');
  };
  
  return (
    <Container>
      <Title>Medical Information</Title>
      <Subtitle>Help us understand your health needs better by providing your medical details</Subtitle>
      
      <ProgressContainer>
        <ProgressStep>
          <StepCircle completed first>1</StepCircle>
          <StepLabel>Personal Details</StepLabel>
        </ProgressStep>
        <ProgressStep>
          <StepCircle active>2</StepCircle>
          <StepLabel active>Medical History</StepLabel>
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
            <Icon><FaBriefcaseMedical /></Icon>
            <SectionTitle>Personal Identifiers</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>ID Type</Label>
            <Select 
              name="idType" 
              value={formData.idType} 
              onChange={handleChange}
            >
              <option value="aadhar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Government ID Number</Label>
            <Input 
              type="text" 
              name="governmentId" 
              value={formData.governmentId} 
              onChange={handleChange} 
              placeholder={formData.idType === 'aadhar' ? 'Enter 12-digit Aadhaar number' : 'Enter 10-character PAN number'}
            />
            {errors.governmentId && <ErrorMessage>{errors.governmentId}</ErrorMessage>}
            <InfoText>This information is kept secure and used only for verification purposes.</InfoText>
          </FormGroup>
          
          <FormGroup>
            <Label>Employment Status</Label>
            <Select 
              name="employmentStatus" 
              value={formData.employmentStatus} 
              onChange={handleChange}
            >
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
            </Select>
          </FormGroup>
          
          {formData.employmentStatus === 'employed' && (
            <FormGroup>
              <Label>Employer Details</Label>
              <Input 
                type="text" 
                name="employment" 
                value={formData.employment} 
                onChange={handleChange} 
                placeholder="Enter your company name"
              />
              {errors.employment && <ErrorMessage>{errors.employment}</ErrorMessage>}
            </FormGroup>
          )}
        </FormSection>
        
        <FormSection>
          <IconWrapper>
            <Icon><FaNotesMedical /></Icon>
            <SectionTitle>Medical History</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>Pre-existing Medical Conditions</Label>
            <InfoText>Select all conditions that you have been diagnosed with or are currently being treated for.</InfoText>
            <CheckboxGroup>
              {preExistingConditions.map((condition, index) => (
                <CheckboxItem key={index}>
                  <Checkbox 
                    type="checkbox" 
                    id={`condition-${index}`} 
                    name="preExistingConditions" 
                    value={condition}
                    checked={formData.preExistingConditions.includes(condition)}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor={`condition-${index}`}>{condition}</CheckboxLabel>
                </CheckboxItem>
              ))}
            </CheckboxGroup>
          </FormGroup>
          
          {formData.preExistingConditions.includes('Other (please specify)') && (
            <FormGroup>
              <Label>Other Medical Conditions</Label>
              <TextArea 
                name="otherConditions" 
                value={formData.otherConditions} 
                onChange={handleChange} 
                placeholder="Please specify other medical conditions"
              />
            </FormGroup>
          )}
          
          <FormGroup>
            <Label>Previous Surgeries or Hospitalizations</Label>
            <TextArea 
              name="surgeries" 
              value={formData.surgeries} 
              onChange={handleChange} 
              placeholder="List any surgeries or major medical procedures with approximate dates"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Family Medical History</Label>
            <TextArea 
              name="familyHistory" 
              value={formData.familyHistory} 
              onChange={handleChange} 
              placeholder="Note any significant medical conditions in your immediate family"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Current Medications</Label>
            <TextArea 
              name="medications" 
              value={formData.medications} 
              onChange={handleChange} 
              placeholder="List any medications you are currently taking"
            />
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <IconWrapper>
            <Icon><FaRunning /></Icon>
            <SectionTitle>Lifestyle & Habits</SectionTitle>
          </IconWrapper>
          
          <FormGroup>
            <Label>Do you smoke?</Label>
            <RadioGroup>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="smoke-no" 
                  name="smoking" 
                  value="no"
                  checked={formData.smoking === 'no'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="smoke-no">No</RadioLabel>
              </RadioItem>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="smoke-quit" 
                  name="smoking" 
                  value="quit"
                  checked={formData.smoking === 'quit'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="smoke-quit">Quit</RadioLabel>
              </RadioItem>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="smoke-yes" 
                  name="smoking" 
                  value="yes"
                  checked={formData.smoking === 'yes'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="smoke-yes">Yes</RadioLabel>
              </RadioItem>
            </RadioGroup>
          </FormGroup>
          
          <FormGroup>
            <Label>Do you consume alcohol?</Label>
            <RadioGroup>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="alcohol-no" 
                  name="alcohol" 
                  value="no"
                  checked={formData.alcohol === 'no'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="alcohol-no">No</RadioLabel>
              </RadioItem>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="alcohol-occasionally" 
                  name="alcohol" 
                  value="occasionally"
                  checked={formData.alcohol === 'occasionally'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="alcohol-occasionally">Occasionally</RadioLabel>
              </RadioItem>
              <RadioItem>
                <Radio 
                  type="radio" 
                  id="alcohol-regularly" 
                  name="alcohol" 
                  value="regularly"
                  checked={formData.alcohol === 'regularly'}
                  onChange={handleChange}
                />
                <RadioLabel htmlFor="alcohol-regularly">Regularly</RadioLabel>
              </RadioItem>
            </RadioGroup>
          </FormGroup>
          
          <FormGroup>
            <Label>Exercise Frequency</Label>
            <Select 
              name="exerciseFrequency" 
              value={formData.exerciseFrequency} 
              onChange={handleChange}
            >
              <option value="rarely">Rarely/Never</option>
              <option value="occasionally">1-2 times a week</option>
              <option value="regularly">3-5 times a week</option>
              <option value="daily">Daily</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Diet Type</Label>
            <Select 
              name="diet" 
              value={formData.diet} 
              onChange={handleChange}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="mixed">Mixed/Non-vegetarian</option>
            </Select>
          </FormGroup>
        </FormSection>
        
        <ButtonContainer>
          <Button type="button" secondary onClick={handleBack}>
            Back to Personal Details
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'View Plan Options'}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default MedicalInfo; 