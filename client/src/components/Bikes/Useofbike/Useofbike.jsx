import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import personalSvg from "./personal.svg";
import commercialSvg from "./commercial.svg";
import bikeOnHandSvg from "./bike-on-hand.svg";

// Styled components
const Container = styled.div`
  width: 50%;
  padding: 30px;
  font-family: system-ui, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #253858;
  margin-bottom: 32px;
`;

const OptionCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  margin-right: 16px;
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #253858;
`;

const OptionDescription = styled.p`
  font-size: 14px;
  margin: 0;
  color: #8A909F;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
  background-color: #F0EBFF;
  border-radius: 8px;
`;

const InfoImage = styled.img`
  margin-right: 16px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #505f79;
  margin: 0;
`;

function Useofbike() {
  const history = useHistory();

  const handlePersonalUse = async () => {
    try {
      // Store selection in localStorage
      localStorage.setItem('bikeUse', 'Personal use');
      
      // Navigate to the next step after storing data
      history.push('/bikes/bikedetails');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCommercialUse = async () => {
    try {
      // Store selection in localStorage
      localStorage.setItem('bikeUse', 'Commercial use');
      
      // Navigate to the next step after storing data
      history.push('/bikes/bikedetails');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Title>What do you use your bike for?</Title>
      
      <OptionCard onClick={handlePersonalUse}>
        <IconContainer>
          <img src={personalSvg} alt="Personal use" />
        </IconContainer>
        <OptionContent>
          <OptionTitle>Personal Use</OptionTitle>
          <OptionDescription>White Number Plate</OptionDescription>
        </OptionContent>
      </OptionCard>
      
      <OptionCard onClick={handleCommercialUse}>
        <IconContainer>
          <img src={commercialSvg} alt="Commercial use" />
        </IconContainer>
        <OptionContent>
          <OptionTitle>Commercial Use</OptionTitle>
          <OptionDescription>Yellow Number Plate</OptionDescription>
        </OptionContent>
      </OptionCard>
      
      <InfoSection>
        <InfoImage src={bikeOnHandSvg} alt="Bike insurance" />
        <InfoText>
          We've insured more than 3 Lakh bikes in India till date
        </InfoText>
      </InfoSection>
    </Container>
  );
}

export default Useofbike; 