import styled from "styled-components";
import Header from "../Header/Header";
import styles from "./DiffPlanOptions.module.css";
import recommended from "./assets/recommended.svg";
import {
  calendarSvg,
  carSvg,
  emiSvg,
  mapSvg,
  needHelpSvg,
} from "./assets/svgs";
import { images } from "./assets/imgs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cardetail from "../Cars/Cardetail/Cardetail";
import { FaCheck, FaTimes, FaInfoCircle, FaShieldAlt, FaCrown, FaCar } from "react-icons/fa";
import "./plaNoptions.css";

const Container = styled.div`
  //background-color: green;
  //height: 400px;
  width: 752px;
  margin: auto;
  margin-top: 64px;
  display: flex;
  grid-gap: 16px;
`;
const InContleft = styled.div`
  background-color: #ffffff;
  height: 400px;
  width: 368px;
  border: 1px solid #dcdee9;
`;
const InContright = styled.div`
  background-color: #ffffff;
  // height: 400px;
  width: 368px;
  // margin-left: 10.9%;
  border: 1px solid #dcdee9;
`;

export const DifferentPlanOptions = () => {
  const history = useHistory();
  
  const [premium, setPremium] = useState(3121);
  const [data, setData] = useState({});
  const [ownDamagePlan, setOwnDamagePlan] = useState(3121);
  const [thirdPartyPlan, setThirdPartyPlan] = useState(2972);
  const [comprehensivePlan, setComprehensivePlan] = useState(4299);
  const [carInfo, setCarInfo] = useState({});
  
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Get ID from localStorage
      const id = localStorage.getItem("ackoid");
      
      // Fetch car data from API
      const response = await axios.get(`https://acko.herokuapp.com/cars/${id}`);
      setData(response.data);
      
      // Set premiums with some realistic calculation
      const baseValue = Math.floor(Math.random() * 2000) + 2500;
      setPremium(baseValue);
      setOwnDamagePlan(baseValue);
      setThirdPartyPlan(Math.floor(baseValue * 0.85));
      setComprehensivePlan(Math.floor(baseValue * 1.35));
      
      // Store current premium
      localStorage.setItem("currentPremium", baseValue.toString());
      
      // Get car information from localStorage
      const make = localStorage.getItem('carMake') || '';
      const model = localStorage.getItem('carModel') || '';
      const year = localStorage.getItem('carYear') || '';
      
      setCarInfo({ make, model, year });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Car insurance plan details
  const plans = [
    {
      id: 'thirdParty',
      name: 'Third Party Plan',
      icon: <FaShieldAlt />,
      price: thirdPartyPlan,
      originalPrice: Math.floor(thirdPartyPlan * 1.20),
      discount: 20,
      coverage: [
        { name: 'Third-party Liability', included: true, detail: 'Mandatory legal coverage for damage to others' },
        { name: 'Property Damage', included: true, detail: 'Covers damage to third-party property up to ₹7.5 lakh' },
        { name: 'Personal Accident Cover', included: true, detail: 'Coverage up to ₹15 lakh for permanent disability/death' },
        { name: 'Own Damage', included: false, detail: 'No coverage for damages to your own car' },
        { name: 'Natural Calamities', included: false, detail: 'No protection against floods, earthquakes, etc.' },
        { name: 'Man-made Disasters', included: false, detail: 'No coverage for fire, theft, or riots' }
      ],
      benefits: [
        'Legally compliant with Motor Vehicles Act',
        'Lowest premium option',
        'No inspection required',
        'Digital policy issuance'
      ]
    },
    {
      id: 'ownDamage',
      name: 'Own Damage Plan',
      icon: <FaCar />,
      price: ownDamagePlan,
      originalPrice: Math.floor(ownDamagePlan * 1.15),
      discount: 15,
      coverage: [
        { name: 'Third-party Liability', included: true, detail: 'Covers damages to third-party property and injury' },
        { name: 'Own Damage', included: true, detail: 'Repairs for damages to your own vehicle from accidents' },
        { name: 'Natural Calamities', included: true, detail: 'Protection against floods, earthquakes, and storms' },
        { name: 'Man-made Disasters', included: true, detail: 'Coverage for fire, theft, and riots' },
        { name: 'Personal Accident Cover', included: true, detail: 'Up to ₹15 lakh for permanent disability/death' },
        { name: 'Zero Depreciation', included: false, detail: 'Claim amount reduced by depreciation value' }
      ],
      benefits: [
        'Cashless repairs at 4000+ network garages',
        'Quick claim settlement in 3 days',
        'Covers damages from accidents and disasters',
        'Includes towing assistance up to 50km'
      ]
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Plan',
      icon: <FaCrown />,
      price: comprehensivePlan,
      originalPrice: Math.floor(comprehensivePlan * 1.25),
      discount: 25,
      coverage: [
        { name: 'Third-party Liability', included: true, detail: 'Covers damages to third-party property and injury' },
        { name: 'Own Damage', included: true, detail: 'Repairs for damages to your own vehicle from accidents' },
        { name: 'Natural Calamities', included: true, detail: 'Protection against floods, earthquakes, and storms' },
        { name: 'Man-made Disasters', included: true, detail: 'Coverage for fire, theft, and riots' },
        { name: 'Personal Accident Cover', included: true, detail: 'Up to ₹15 lakh for permanent disability/death' },
        { name: 'Zero Depreciation', included: true, detail: 'Get full claim amount without depreciation deduction' },
        { name: 'Engine Protection', included: true, detail: 'Covers engine damage due to water ingression' },
        { name: 'Roadside Assistance', included: true, detail: '24×7 emergency help anywhere in India' }
      ],
      benefits: [
        'Cashless repairs at 5000+ network garages',
        'Priority claim settlement in 24 hours',
        'No inspection for renewal or new cars',
        'Return to invoice cover in case of total loss',
        'Free pick-up and drop service for claims'
      ]
    }
  ];

  return (
    <div className="plans-container">
      <h1 className="plans-title">Choose a plan for your car</h1>
      <p className="plans-subtitle">
        {carInfo.make && carInfo.model 
          ? `For your ${carInfo.year} ${carInfo.make} ${carInfo.model}`
          : 'Select a plan that fits your needs'}
      </p>
      
      <div className="plans-cards">
        {plans.map(plan => (
          <div key={plan.id} className={`plan-card ${plan.id === 'comprehensive' ? 'zero-dep-card' : ''}`}>
            {plan.id === 'comprehensive' && <div className="recommended-badge">Recommended</div>}
            
            <div className="plan-header">
              <div className="plan-header-top">
                <h2>{plan.name}</h2>
                <span className="plan-icon">{plan.icon}</span>
              </div>
              <div className="plan-price-container">
                <div className="price-discount-row">
                  <span className="original-price">₹{plan.originalPrice}</span>
                  <span className="current-price">₹{plan.price}</span>
                  <span className="discount-badge">{plan.discount}% OFF</span>
                </div>
                <p className="price-tax-info">Includes 18% GST</p>
              </div>
            </div>
            
            <div className="plan-coverage">
              <h3 className="coverage-title">What's Covered:</h3>
              {plan.coverage.map((item, index) => (
                <div key={index} className="coverage-item">
                  <span className={`coverage-icon ${item.included ? 'included' : 'excluded'}`}>
                    {item.included ? <FaCheck /> : <FaTimes />}
                  </span>
                  <div className="coverage-text-container">
                    <p className="coverage-name">{item.name}</p>
                    <p className="coverage-detail">{item.detail}</p>
              </div>
                </div>
              ))}
            </div>
            
            <div className="plan-benefits">
              <h3 className="benefits-title">
                <FaInfoCircle style={{marginRight: '8px'}} /> Special Benefits
              </h3>
              {plan.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <span className="benefit-icon">•</span>
                  <p className="benefit-text">{benefit}</p>
                </div>
              ))}
            </div>
            
            <button 
              className={`plan-button ${plan.id === 'comprehensive' ? 'primary' : ''}`} 
              onClick={() => {
                localStorage.setItem("selectedPlan", plan.name);
                localStorage.setItem("totalacko", plan.price.toString());
                history.push("/addtional-details");
              }}
            >
              Select Plan
            </button>
          </div>
        ))}
          </div>

      <div className="custom-plan-option">
        <p>Want to build your own custom plan?</p>
        <button className="custom-plan-button" onClick={() => {
          localStorage.setItem("basePremium", premium.toString());
          history.push("/custom-policy");
        }}>
          Build Custom Plan
        </button>
          </div>
    </div>
  );
};
