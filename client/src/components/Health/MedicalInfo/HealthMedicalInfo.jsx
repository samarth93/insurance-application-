import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeartbeat, FaInfoCircle, FaCheck, FaTimes, FaWeight, FaRulerVertical, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 40px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 35px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: #522ED3;
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 0;
  line-height: 1.5;
`;

const ProgressContainer = styled.div`
  display: flex;
  margin: 40px 0;
  position: relative;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 10px;
  }
`;

const ProgressStep = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  
  @media (max-width: 768px) {
    min-width: 100px;
  }
`;

const StepCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#522ED3' : props.completed ? '#4CAF50' : '#e0e0e0'};
  color: ${props => (props.active || props.completed) ? 'white' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  font-weight: 600;
  position: relative;
  z-index: 2;
  box-shadow: ${props => props.active ? '0 4px 8px rgba(82, 46, 211, 0.2)' : props.completed ? '0 4px 8px rgba(76, 175, 80, 0.2)' : 'none'};
  transition: all 0.3s ease;
  
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

const FormContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin: 0 0 25px;
  display: flex;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  color: #444;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${props => props.error ? '#f44336' : '#ddd'};
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #522ED3;
    box-shadow: 0 0 0 3px rgba(82, 46, 211, 0.1);
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #666;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: #444;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const RadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
  accent-color: #522ED3;
  width: 18px;
  height: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const BackButton = styled.button`
  background-color: white;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #bbb;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    margin-right: 8px;
    transition: transform 0.2s;
  }
  
  &:hover svg {
    transform: translateX(-3px);
  }
`;

const ContinueButton = styled.button`
  background-color: #522ED3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(82, 46, 211, 0.2);
  
  &:hover {
    background-color: #4526b1;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(82, 46, 211, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #d1d1d1;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  svg {
    margin-left: 8px;
    transition: transform 0.2s;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  
  &::before {
    content: "!";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background-color: #f44336;
    color: white;
    border-radius: 50%;
    margin-right: 6px;
    font-size: 11px;
    font-weight: bold;
  }
`;

const InfoBox = styled.div`
  background-color: #FFF8E1;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 30px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-left: 4px solid #FFA000;
`;

const InfoIcon = styled.div`
  color: #FFA000;
  margin-right: 16px;
  font-size: 22px;
  margin-top: 2px;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  
  p {
    margin: 0 0 8px;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const ConditionalFormGroup = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  padding-left: 20px;
  border-left: 3px solid #e0e0e0;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #f0ebff;
  border-radius: 8px;
  margin-right: 12px;
  color: #522ED3;
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

const HealthMedicalInfo = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bmi: '',
    existingCondition: '',
    conditionDetails: '',
    smokes: '',
    alcohol: '',
    exercise: '',
    familyHistory: '',
    familyHistoryDetails: '',
    surgery: '',
    surgeryDetails: '',
    medication: '',
    medicationDetails: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();
  
  useEffect(() => {
    // Check if user has completed profile step
    const userData = localStorage.getItem('healthUserData');
    if (!userData) {
      history.push('/health/profile');
    }
    
    // Calculate BMI when height or weight changes
    if (formData.height && formData.weight) {
      const heightInMeters = Number(formData.height) / 100;
      const weightInKg = Number(formData.weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        setFormData(prev => ({
          ...prev,
          bmi
        }));
      }
    }
  }, [formData.height, formData.weight, history]);
  
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
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Enter a valid height between 100-250 cm';
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (formData.weight < 30 || formData.weight > 200) {
      newErrors.weight = 'Enter a valid weight between 30-200 kg';
    }
    
    if (!formData.existingCondition) {
      newErrors.existingCondition = 'Please select an option';
    } else if (formData.existingCondition === 'yes' && !formData.conditionDetails.trim()) {
      newErrors.conditionDetails = 'Please provide details of your medical conditions';
    }
    
    if (!formData.smokes) {
      newErrors.smokes = 'Please select an option';
    }
    
    if (!formData.alcohol) {
      newErrors.alcohol = 'Please select an option';
    }
    
    if (!formData.exercise) {
      newErrors.exercise = 'Please select an option';
    }
    
    if (!formData.familyHistory) {
      newErrors.familyHistory = 'Please select an option';
    } else if (formData.familyHistory === 'yes' && !formData.familyHistoryDetails.trim()) {
      newErrors.familyHistoryDetails = 'Please provide details of your family medical history';
    }
    
    if (!formData.surgery) {
      newErrors.surgery = 'Please select an option';
    } else if (formData.surgery === 'yes' && !formData.surgeryDetails.trim()) {
      newErrors.surgeryDetails = 'Please provide details of your surgeries';
    }
    
    if (!formData.medication) {
      newErrors.medication = 'Please select an option';
    } else if (formData.medication === 'yes' && !formData.medicationDetails.trim()) {
      newErrors.medicationDetails = 'Please provide details of your medications';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        // Store medical data in localStorage
        localStorage.setItem('healthMedicalData', JSON.stringify(formData));
        
        // Simulate API call with setTimeout
        setTimeout(() => {
          // Navigate to plans page
          history.push('/health/plans');
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
      }
    }
  };
  
  const handleBack = () => {
    history.push('/health/profile');
  };
  
  // Calculate BMI category
  const getBMICategory = (bmi) => {
    if (!bmi) return '';
    const numBmi = parseFloat(bmi);
    if (numBmi < 18.5) return 'Underweight';
    if (numBmi < 25) return 'Normal weight';
    if (numBmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  const bmiCategory = getBMICategory(formData.bmi);
  const bmiColor = !formData.bmi ? '#999' : 
                    bmiCategory === 'Normal weight' ? '#4CAF50' : 
                    bmiCategory === 'Underweight' ? '#FF9800' : '#f44336';
  
  return (
    <Container>
      <TitleSection>
        <Title>Medical Information</Title>
        <Subtitle>Please provide your health details for an accurate insurance quote</Subtitle>
      </TitleSection>
      
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
      
      <InfoBox>
        <InfoIcon>
          <FaInfoCircle />
        </InfoIcon>
        <InfoText>
          <p>Your medical information is confidential and used only for generating an accurate health insurance quote. Providing complete and accurate details helps us offer the best coverage options for your health needs.</p>
        </InfoText>
      </InfoBox>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <SectionTitle>
            <IconWrapper>
              <FaWeight />
            </IconWrapper>
            Physical Measurements
          </SectionTitle>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  error={errors.height}
                  placeholder="Height in centimeters"
                  min="100"
                  max="250"
                />
                {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  error={errors.weight}
                  placeholder="Weight in kilograms"
                  min="30"
                  max="200"
                />
                {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <Label htmlFor="bmi">BMI (Calculated)</Label>
                <Input
                  type="text"
                  id="bmi"
                  name="bmi"
                  value={formData.bmi ? `${formData.bmi} - ${bmiCategory}` : ''}
                  disabled
                  placeholder="Body Mass Index"
                  style={{ color: bmiColor, fontWeight: formData.bmi ? '500' : '400' }}
                />
              </FormGroup>
            </FormColumn>
          </FormRow>
        </FormContainer>
        
        <FormContainer>
          <SectionTitle>
            <IconWrapper>
              <FaHeartbeat />
            </IconWrapper>
            Medical History
          </SectionTitle>
          
          <FormGroup>
            <Label>Do you have any existing medical conditions? (e.g., diabetes, hypertension, heart disease)</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="existingCondition"
                  value="yes"
                  checked={formData.existingCondition === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="existingCondition"
                  value="no"
                  checked={formData.existingCondition === 'no'}
                  onChange={handleChange}
                />
                No
              </RadioLabel>
            </RadioGroup>
            {errors.existingCondition && <ErrorMessage>{errors.existingCondition}</ErrorMessage>}
            
            {formData.existingCondition === 'yes' && (
              <ConditionalFormGroup>
                <Label htmlFor="conditionDetails">Please provide details:</Label>
                <Input
                  type="text"
                  id="conditionDetails"
                  name="conditionDetails"
                  value={formData.conditionDetails}
                  onChange={handleChange}
                  error={errors.conditionDetails}
                  placeholder="List your medical conditions and when diagnosed"
                />
                {errors.conditionDetails && <ErrorMessage>{errors.conditionDetails}</ErrorMessage>}
              </ConditionalFormGroup>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Have you undergone any surgeries in the last 5 years?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="surgery"
                  value="yes"
                  checked={formData.surgery === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="surgery"
                  value="no"
                  checked={formData.surgery === 'no'}
                  onChange={handleChange}
                />
                No
              </RadioLabel>
            </RadioGroup>
            {errors.surgery && <ErrorMessage>{errors.surgery}</ErrorMessage>}
            
            {formData.surgery === 'yes' && (
              <ConditionalFormGroup>
                <Label htmlFor="surgeryDetails">Please provide details:</Label>
                <Input
                  type="text"
                  id="surgeryDetails"
                  name="surgeryDetails"
                  value={formData.surgeryDetails}
                  onChange={handleChange}
                  error={errors.surgeryDetails}
                  placeholder="List surgeries with dates"
                />
                {errors.surgeryDetails && <ErrorMessage>{errors.surgeryDetails}</ErrorMessage>}
              </ConditionalFormGroup>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Are you currently taking any medications regularly?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="medication"
                  value="yes"
                  checked={formData.medication === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="medication"
                  value="no"
                  checked={formData.medication === 'no'}
                  onChange={handleChange}
                />
                No
              </RadioLabel>
            </RadioGroup>
            {errors.medication && <ErrorMessage>{errors.medication}</ErrorMessage>}
            
            {formData.medication === 'yes' && (
              <ConditionalFormGroup>
                <Label htmlFor="medicationDetails">Please provide details:</Label>
                <Input
                  type="text"
                  id="medicationDetails"
                  name="medicationDetails"
                  value={formData.medicationDetails}
                  onChange={handleChange}
                  error={errors.medicationDetails}
                  placeholder="List medications with dosage"
                />
                {errors.medicationDetails && <ErrorMessage>{errors.medicationDetails}</ErrorMessage>}
              </ConditionalFormGroup>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Is there a history of serious medical conditions in your immediate family?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="familyHistory"
                  value="yes"
                  checked={formData.familyHistory === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="familyHistory"
                  value="no"
                  checked={formData.familyHistory === 'no'}
                  onChange={handleChange}
                />
                No
              </RadioLabel>
            </RadioGroup>
            {errors.familyHistory && <ErrorMessage>{errors.familyHistory}</ErrorMessage>}
            
            {formData.familyHistory === 'yes' && (
              <ConditionalFormGroup>
                <Label htmlFor="familyHistoryDetails">Please provide details:</Label>
                <Input
                  type="text"
                  id="familyHistoryDetails"
                  name="familyHistoryDetails"
                  value={formData.familyHistoryDetails}
                  onChange={handleChange}
                  error={errors.familyHistoryDetails}
                  placeholder="List family medical history (parents, siblings)"
                />
                {errors.familyHistoryDetails && <ErrorMessage>{errors.familyHistoryDetails}</ErrorMessage>}
              </ConditionalFormGroup>
            )}
          </FormGroup>
        </FormContainer>
        
        <FormContainer>
          <SectionTitle>
            <IconWrapper>
              <FaRulerVertical />
            </IconWrapper>
            Lifestyle
          </SectionTitle>
          
          <FormGroup>
            <Label>Do you smoke or use tobacco products?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="smokes"
                  value="yes"
                  checked={formData.smokes === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="smokes"
                  value="no"
                  checked={formData.smokes === 'no'}
                  onChange={handleChange}
                />
                No
              </RadioLabel>
            </RadioGroup>
            {errors.smokes && <ErrorMessage>{errors.smokes}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Do you consume alcohol?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="alcohol"
                  value="regularly"
                  checked={formData.alcohol === 'regularly'}
                  onChange={handleChange}
                />
                Regularly
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="alcohol"
                  value="occasionally"
                  checked={formData.alcohol === 'occasionally'}
                  onChange={handleChange}
                />
                Occasionally
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="alcohol"
                  value="never"
                  checked={formData.alcohol === 'never'}
                  onChange={handleChange}
                />
                Never
              </RadioLabel>
            </RadioGroup>
            {errors.alcohol && <ErrorMessage>{errors.alcohol}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>How often do you exercise?</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="exercise"
                  value="regularly"
                  checked={formData.exercise === 'regularly'}
                  onChange={handleChange}
                />
                Regularly (3+ times/week)
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="exercise"
                  value="occasionally"
                  checked={formData.exercise === 'occasionally'}
                  onChange={handleChange}
                />
                Occasionally
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="exercise"
                  value="rarely"
                  checked={formData.exercise === 'rarely'}
                  onChange={handleChange}
                />
                Rarely/Never
              </RadioLabel>
            </RadioGroup>
            {errors.exercise && <ErrorMessage>{errors.exercise}</ErrorMessage>}
          </FormGroup>
        </FormContainer>
        
        <ButtonContainer>
          <BackButton type="button" onClick={handleBack}>
            <FaArrowLeft /> Back to Personal Details
          </BackButton>
          <ContinueButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner /> Processing...
              </>
            ) : (
              <>
                Continue to Plans <FaArrowRight />
              </>
            )}
          </ContinueButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default HealthMedicalInfo; 