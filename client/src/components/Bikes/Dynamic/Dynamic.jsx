import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import bikeIcon from "./bike-icon.svg";
import calendarIcon from "./calendar-icon.svg";
import editIcon from "./edit-icon.svg";

// Styled components
const DynamicContainer = styled.div`
  width: 25%;
  padding: 20px;
`;

const InfoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: #253858;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #505f79;
  margin: 0;
`;

const EditButton = styled.div`
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SummaryContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
  }
`;

const PriceLabel = styled.span`
  font-size: 14px;
  color: #505f79;
`;

const PriceValue = styled.span`
  font-size: 16px;
  font-weight: ${props => props.bold ? "600" : "400"};
  color: ${props => props.highlighted ? "#522ED3" : "#253858"};
`;

function Dynamic() {
  const [bikeDetails, setBikeDetails] = useState({
    useofbike: "",
    pincode: "",
    number: "",
    year: "",
    month: "",
    biketype: "",
    policyType: "",
    expiryDate: ""
  });
  
  const [premiumDetails, setPremiumDetails] = useState({
    basePremium: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const id = localStorage.getItem("bikoid");
        if (id) {
          const response = await axios.get(`https://acko.herokuapp.com/bikes/${id}`);
          if (response.data) {
            setBikeDetails(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching bike details:", error);
      }
    };
    
    const fetchPremiumDetails = () => {
      const total = localStorage.getItem("totalacko") || "0";
      const basePremium = Math.round(parseInt(total) * 0.85);
      const tax = Math.round(parseInt(total) * 0.15);
      
      setPremiumDetails({
        basePremium,
        tax,
        total: parseInt(total)
      });
    };
    
    fetchBikeDetails();
    fetchPremiumDetails();
  }, []);

  return (
    <DynamicContainer>
      <InfoContainer>
        <SectionTitle>Bike Details</SectionTitle>
        
        {bikeDetails.useofbike && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={bikeIcon} alt="Use" />
              <InfoText>Used for {bikeDetails.useofbike}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/useofbike">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.pincode && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={bikeIcon} alt="Location" />
              <InfoText>Pincode - {bikeDetails.pincode}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/pincode">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.number && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={bikeIcon} alt="Bike" />
              <InfoText>Registration - {bikeDetails.number}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/bikenumber">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.year && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={calendarIcon} alt="Year" />
              <InfoText>Registration Year - {bikeDetails.year}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/yearmonth">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.month && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={calendarIcon} alt="Month" />
              <InfoText>Registration Month - {bikeDetails.month}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/yearmonth">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.biketype && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={bikeIcon} alt="Type" />
              <InfoText>Bike Type - {bikeDetails.biketype}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/biketype">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.policyType && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={bikeIcon} alt="Policy" />
              <InfoText>Last Policy - {bikeDetails.policyType}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/policy">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
        
        {bikeDetails.expiryDate && (
          <InfoItem>
            <InfoContent>
              <InfoIcon src={calendarIcon} alt="Expiry" />
              <InfoText>Policy Expiry - {bikeDetails.expiryDate}</InfoText>
            </InfoContent>
            <EditButton>
              <Link to="/bikes/expiry">
                <EditIcon src={editIcon} alt="Edit" />
              </Link>
            </EditButton>
          </InfoItem>
        )}
      </InfoContainer>
      
      {premiumDetails.total > 0 && (
        <SummaryContainer>
          <SectionTitle>Premium Details</SectionTitle>
          
          <PriceDetail>
            <PriceLabel>Base Premium</PriceLabel>
            <PriceValue>₹{premiumDetails.basePremium}</PriceValue>
          </PriceDetail>
          
          <PriceDetail>
            <PriceLabel>GST (18%)</PriceLabel>
            <PriceValue>₹{premiumDetails.tax}</PriceValue>
          </PriceDetail>
          
          <PriceDetail>
            <PriceLabel>Total Premium</PriceLabel>
            <PriceValue bold highlighted>₹{premiumDetails.total}</PriceValue>
          </PriceDetail>
        </SummaryContainer>
      )}
    </DynamicContainer>
  );
}

export default Dynamic; 