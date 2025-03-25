import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import BikeImage from "./bike.svg";

// Create styled components
const CommonContainer = styled.div`
  width: 25%;
  min-width: 280px;
  background-color: #f7f7f7;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  min-height: calc(100vh - 80px);
`;

const Logo = styled.div`
  margin-bottom: 50px;
  font-size: 24px;
  font-weight: 700;
  color: #522ED3;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  position: relative;
  margin-bottom: 5px;
  background-color: ${props => props.active ? '#F0EAFB' : 'transparent'};
  border-radius: 8px;
`;

const StepNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.completed ? '#522ED3' : props.active ? '#522ED3' : '#ccc'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 15px;
`;

const StepText = styled.div`
  font-size: 16px;
  color: ${props => props.active ? '#522ED3' : '#333'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const Connector = styled.div`
  position: absolute;
  left: 24px;
  top: 42px;
  width: 2px;
  height: 30px;
  background-color: ${props => props.completed ? '#522ED3' : '#ccc'};
  z-index: 0;
`;

const BikeInfo = styled.div`
  margin-top: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const BikeInfoTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const BikeInfoContent = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  color: #777;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const Common = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const steps = [
    { number: 1, text: "Bike Location", path: "/bikes/pincode" },
    { number: 2, text: "Bike Number", path: "/bikes/bikenumber" },
    { number: 3, text: "Bike Use", path: "/bikes/useofbike" },
    { number: 4, text: "Bike Details", path: "/bikes/bikedetails" },
    { number: 5, text: "Policy Expiry", path: "/bikes/bikeexpiry" },
    { number: 6, text: "Select Insurance", path: "/bikes/plans" },
    { number: 7, text: "Personal Details", path: "/bikes/additional-details" }
  ];
  
  // Find current step
  const currentStepIndex = steps.findIndex(step => currentPath.includes(step.path));
  
  // Get bike details from localStorage
  const bikePincode = localStorage.getItem('bikePincode');
  const bikeNumber = localStorage.getItem('bikeNumber');
  const bikeUse = localStorage.getItem('bikeUse');
  
  return (
    <CommonContainer>
      <Logo>ACKO</Logo>
      
      <StepsContainer>
        {steps.map((step, index) => {
          const isActive = currentStepIndex === index;
          const isCompleted = currentStepIndex > index;
          
          return (
            <React.Fragment key={step.number}>
              <StepItem active={isActive}>
                <StepNumber active={isActive} completed={isCompleted}>
                  {isCompleted ? '✓' : step.number}
                </StepNumber>
                <StepText active={isActive}>{step.text}</StepText>
                {index < steps.length - 1 && (
                  <Connector completed={isCompleted} />
                )}
              </StepItem>
            </React.Fragment>
          );
        })}
      </StepsContainer>
      
      {(bikePincode || bikeNumber || bikeUse) && (
        <BikeInfo>
          <BikeInfoTitle>Your Bike Details</BikeInfoTitle>
          <BikeInfoContent>
            {bikePincode && (
              <InfoItem>
                <InfoLabel>Location:</InfoLabel>
                <InfoValue>{bikePincode}</InfoValue>
              </InfoItem>
            )}
            {bikeNumber && (
              <InfoItem>
                <InfoLabel>Registration No:</InfoLabel>
                <InfoValue>{bikeNumber}</InfoValue>
              </InfoItem>
            )}
            {bikeUse && (
              <InfoItem>
                <InfoLabel>Vehicle Usage:</InfoLabel>
                <InfoValue>{bikeUse}</InfoValue>
              </InfoItem>
            )}
          </BikeInfoContent>
        </BikeInfo>
      )}
    </CommonContainer>
  );
};

export default Common; 