import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaInfoCircle, FaShieldAlt, FaCrown, FaHospital, FaUserMd, FaBaby, FaHeartbeat, FaCog } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  animation: fadeIn 0.8s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 15px;
  font-weight: 700;
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

const FiltersSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#522ED3' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#522ED3' : '#ddd'};
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#3f22a3' : '#f5f5f5'};
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.selected ? '#522ED3' : 'transparent'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => 
      props.type === 'premium' ? '#522ED3' : 
      props.type === 'standard' ? '#FF9800' : '#03A9F4'};
  }
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
  position: relative;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 10px;
  font-weight: 600;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  color: #522ED3;
  font-weight: 700;
  margin-bottom: 15px;
  
  span {
    font-size: 1rem;
    color: #636e72;
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #2d3436;
  font-size: 0.95rem;
  
  svg {
    color: #4CAF50;
    margin-right: 10px;
    font-size: 1.1rem;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: ${props => props.selected ? '#522ED3' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#522ED3'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? '#522ED3' : 'transparent'};

  &:hover {
    background: ${props => props.selected ? '#3f22a3' : '#e9ecef'};
  }
`;

const CustomPlanCard = styled(PlanCard)`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px dashed #522ED3;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 40px 20px;

  &:hover {
    border-color: #3f22a3;
    background: linear-gradient(135deg, #ffffff 0%, #f0ebff 100%);
  }
`;

const CustomPlanIcon = styled.div`
  font-size: 3rem;
  color: #522ED3;
  margin-bottom: 20px;
`;

const CustomPlanTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 15px;
`;

const CustomPlanDescription = styled.p`
  color: #636e72;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 250px;
  margin: 0 auto;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 20px;
  right: -35px;
  background: #FF9800;
  color: white;
  padding: 8px 40px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

const HealthPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [userData, setUserData] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  const [totalPremium, setTotalPremium] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();

  useEffect(() => {
    // Load user and medical data if available
    const storedUserData = localStorage.getItem('healthUserData');
    const storedMedicalData = localStorage.getItem('healthMedicalData');
    
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      // Redirect to profile page if no user data
      history.push('/health/profile');
      return;
    }
    
    if (storedMedicalData) {
      try {
        setMedicalData(JSON.parse(storedMedicalData));
      } catch (error) {
        console.error('Error parsing medical data:', error);
      }
    } else {
      // Redirect to medical info page if no medical data
      history.push('/health/medical-info');
      return;
    }
  }, [history]);
  
  // Calculate premium based on user data, medical info and selected plan
  useEffect(() => {
    if (selectedPlan && userData) {
      // Get base premium from selected plan
      const basePremium = plans.find(plan => plan.id === selectedPlan)?.price || 0;
      
      // Add addon costs
      const addonsCost = selectedAddons.reduce((total, addonId) => {
        const addon = addons.find(a => a.id === addonId);
        return total + (addon?.price || 0);
      }, 0);
      
      // Calculate total premium
      const total = basePremium + addonsCost;
      setTotalPremium(total);
      
      // Store in localStorage for payment step
      localStorage.setItem('healthTotalPremium', total.toString());
      localStorage.setItem('selectedHealthPlan', selectedPlan);
      localStorage.setItem('selectedHealthAddons', JSON.stringify(selectedAddons));
    }
  }, [selectedPlan, selectedAddons, userData]);
  
  // Filter plans based on selected filter
  const getFilteredPlans = () => {
    if (selectedFilter === 'all') {
      return plans;
    }
    return plans.filter(plan => plan.categories.includes(selectedFilter));
  };

  // Plans data (in a real app, this would come from an API and be tailored to the user)
  const plans = [
    {
      id: 'basic',
      name: 'Basic Health Plan',
      icon: <FaShieldAlt />,
      type: 'basic',
      price: 4999,
      originalPrice: 5999,
      discount: 17,
      categories: ['affordable', 'individual'],
      coverage: [
        { name: 'Hospitalization', included: true, detail: 'Covers room charges up to ₹3,000 per day' },
        { name: 'Surgical Procedures', included: true, detail: 'Covers surgical expenses up to ₹2 lakh' },
        { name: 'Pre & Post Hospitalization', included: true, detail: 'Covers expenses 30 days before and 60 days after hospitalization' },
        { name: 'Daycare Procedures', included: true, detail: 'Covers procedures that require less than 24 hours hospitalization' },
        { name: 'Ambulance Charges', included: true, detail: 'Covers ambulance charges up to ₹2,000 per hospitalization' },
        { name: 'Critical Illness Cover', included: false, detail: 'No coverage for critical illnesses' },
        { name: 'OPD Expenses', included: false, detail: 'Outpatient consultations not covered' },
        { name: 'Maternity Cover', included: false, detail: 'No coverage for pregnancy-related expenses' }
      ],
      benefits: [
        'No medical check-up required up to 45 years of age',
        'Cashless treatment at 4,000+ network hospitals',
        'Tax benefits under Section 80D',
        '24/7 customer support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Health Plan',
      icon: <FaHospital />,
      type: 'standard',
      price: 7999,
      originalPrice: 9499,
      discount: 16,
      categories: ['affordable', 'individual', 'family'],
      coverage: [
        { name: 'Hospitalization', included: true, detail: 'Covers room charges up to ₹5,000 per day' },
        { name: 'Surgical Procedures', included: true, detail: 'Covers surgical expenses up to ₹5 lakh' },
        { name: 'Pre & Post Hospitalization', included: true, detail: 'Covers expenses 60 days before and 90 days after hospitalization' },
        { name: 'Daycare Procedures', included: true, detail: 'Covers all daycare procedures' },
        { name: 'Ambulance Charges', included: true, detail: 'Covers ambulance charges up to ₹3,000 per hospitalization' },
        { name: 'Critical Illness Cover', included: true, detail: 'Covers 12 critical illnesses up to ₹3 lakh' },
        { name: 'OPD Expenses', included: false, detail: 'Outpatient consultations not covered' },
        { name: 'Maternity Cover', included: false, detail: 'No coverage for pregnancy-related expenses' }
      ],
      benefits: [
        'No-claim bonus of 10% each year (up to 50%)',
        'Cashless treatment at 5,000+ network hospitals',
        'Free annual health check-up after 2 years',
        'Tax benefits under Section 80D',
        'Dedicated relationship manager'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Health Plan',
      icon: <FaCrown />,
      type: 'premium',
      price: 11999,
      originalPrice: 14999,
      discount: 20,
      categories: ['comprehensive', 'individual', 'family'],
      coverage: [
        { name: 'Hospitalization', included: true, detail: 'Covers room charges up to ₹10,000 per day or single AC room' },
        { name: 'Surgical Procedures', included: true, detail: 'Covers surgical expenses up to sum insured' },
        { name: 'Pre & Post Hospitalization', included: true, detail: 'Covers expenses 90 days before and 180 days after hospitalization' },
        { name: 'Daycare Procedures', included: true, detail: 'Covers all daycare procedures' },
        { name: 'Ambulance Charges', included: true, detail: 'Covers all ambulance charges' },
        { name: 'Critical Illness Cover', included: true, detail: 'Covers 25 critical illnesses up to ₹10 lakh' },
        { name: 'OPD Expenses', included: true, detail: 'Covers outpatient consultations up to ₹15,000 per year' },
        { name: 'Maternity Cover', included: true, detail: 'Covers normal and C-section deliveries after 2 years' },
        { name: 'Alternative Treatments', included: true, detail: 'Covers AYUSH treatments (Ayurveda, Yoga, Unani, Siddha, Homeopathy)' }
      ],
      benefits: [
        'No-claim bonus of 20% each year (up to  100%)',
        'Cashless treatment at 7,500+ network hospitals',
        'Free annual health check-up',
        'International emergency coverage',
        'Tax benefits under Section 80D',
        'Priority claim processing',
        'Dedicated relationship manager'
      ]
    }
  ];
  
  // Add-on options
  const addons = [
    {
      id: 'critical-illness',
      name: 'Critical Illness Cover',
      description: 'Additional coverage for 36 critical illnesses with a lump sum payment upon diagnosis.',
      price: 1499,
      icon: <FaHeartbeat />
    },
    {
      id: 'personal-accident',
      name: 'Personal Accident Cover',
      description: 'Protection against accidental death and disability with coverage up to ₹25 lakh.',
      price: 999,
      icon: <FaShieldAlt />
    },
    {
      id: 'maternity',
      name: 'Maternity Cover',
      description: 'Coverage for pregnancy-related expenses including pre and post-natal care.',
      price: 2499,
      icon: <FaBaby />
    },
    {
      id: 'opd',
      name: 'OPD Cover',
      description: 'Coverage for outpatient consultations, medications, and diagnostic tests.',
      price: 1299,
      icon: <FaUserMd />
    }
  ];
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  
  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };
  
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  
  const handleContinue = () => {
    if (selectedPlan) {
      setLoading(true);
      
      try {
        // Store selected plan
        localStorage.setItem('selectedHealthPlan', selectedPlan);
        
        // Store premium amount (for the selected plan)
        const planPrice = plans.find(plan => plan.id === selectedPlan)?.price || 0;
        localStorage.setItem('healthTotalPremium', planPrice.toString());
        
        // Simulate API call with setTimeout
        setTimeout(() => {
          // Navigate to additional details page
          history.push('/health/additional-details');
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error processing selection:', error);
        setLoading(false);
      }
    }
  };
  
  const handleBack = () => {
    history.push('/health/medical-info');
  };

  return (
    <Container>
      <Header>
        <Title>Choose Your Health Insurance Plan</Title>
        <Subtitle>
          Select a plan that best fits your healthcare needs. All plans include basic hospitalization coverage with options to add more benefits.
        </Subtitle>
      </Header>

      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            type={plan.id}
            selected={selectedPlan === plan.id}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.id === 'standard' && <PopularBadge>Most Popular</PopularBadge>}
            <PlanHeader>
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                ₹{plan.price}
                <span>/year</span>
              </PlanPrice>
            </PlanHeader>
            <PlanFeatures>
              {plan.coverage.map((item, index) => (
                <FeatureItem key={index}>
                  <FaCheck />
                  {item.name}
                </FeatureItem>
              ))}
            </PlanFeatures>
            <SelectButton 
              selected={selectedPlan === plan.id}
              onClick={(e) => {
                e.stopPropagation();
                handlePlanSelect(plan.id);
              }}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </SelectButton>
          </PlanCard>
        ))}

        <CustomPlanCard onClick={handleCustomPlan}>
          <CustomPlanIcon>
            <FaCog />
          </CustomPlanIcon>
          <CustomPlanTitle>Create Custom Plan</CustomPlanTitle>
          <CustomPlanDescription>
            Design your own health insurance plan with custom coverage, add-ons, and benefits tailored to your specific needs.
          </CustomPlanDescription>
        </CustomPlanCard>
      </PlansGrid>
    </Container>
  );
};

export default HealthPlans;