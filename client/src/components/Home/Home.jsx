import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaMotorcycle, FaArrowRight, FaShieldAlt, FaClock, FaMoneyBillWave, FaHeartbeat } from 'react-icons/fa';
import '../../styles/Home.css';

const Home = () => {
  const [insuranceCards, setInsuranceCards] = useState([
    { id: 1, icon: FaCar, title: 'Car Insurance', description: 'Protect your car with our comprehensive coverage', link: '/cars/pincode' },
    { id: 2, icon: FaMotorcycle, title: 'Bike Insurance', description: 'Complete protection for your two-wheeler', link: '/bikes/pincode' },
    { id: 3, icon: FaHeartbeat, title: 'Health Insurance', description: 'Protect yourself and your family with our health plans', link: '/health/profile' },
  ]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Simple, Affordable Insurance</h1>
        <p>Get the protection you need with our transparent and affordable insurance plans. No hidden fees, no hassle.</p>
        <Link to="/cars/pincode" className="ctaButton">Get a Quote Today</Link>
      </div>
      
      <div className="main">
        <div className="insuranceOptions">
          <h2>Insurance Products</h2>
          <div className="insuranceCards">
            {insuranceCards.map((card) => (
              <div key={card.id} className="insuranceCard">
                <div className="insuranceIcon">
                  <card.icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to={card.link} className="insuranceLink">
                  Get a Quote <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="benefits">
          <h2>Why Choose ACKO</h2>
          <div className="benefitsList">
            <div className="benefitItem">
              <div className="benefitIcon">
                <FaShieldAlt />
              </div>
              <h3>Comprehensive Coverage</h3>
              <p>Get full protection with our extensive insurance plans</p>
            </div>
            <div className="benefitItem">
              <div className="benefitIcon">
                <FaClock />
              </div>
              <h3>Quick Claims</h3>
              <p>Experience hassle-free and speedy claim settlements</p>
            </div>
            <div className="benefitItem">
              <div className="benefitIcon">
                <FaMoneyBillWave />
              </div>
              <h3>Affordable Premiums</h3>
              <p>Save up to 50% on premiums compared to traditional insurers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 