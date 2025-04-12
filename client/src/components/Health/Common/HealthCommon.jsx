import React from 'react';
import styled from 'styled-components';

const CommonContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(82, 46, 211, 0.08);
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const TopBanner = styled.div`
  width: 100%;
  background-color: #522ED3;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(82, 46, 211, 0.2);
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const Tagline = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 400;
`;

const InfoSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const InfoCard = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  align-items: center;
  
  h3 {
    margin: 0 0 5px 0;
    font-size: 18px;
    color: #522ED3;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const IconWrapper = styled.div`
  background-color: #f0ebff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #522ED3;
  font-size: 20px;
`;

function HealthCommon() {
  return (
    <CommonContainer>
      <TopBanner>
        <Logo>Insuretech Health Insurance</Logo>
        <Tagline>Comprehensive coverage for your wellbeing</Tagline>
      </TopBanner>
      <InfoSection>
        <InfoCard>
          <IconWrapper>
            <i className="fas fa-headset"></i>
          </IconWrapper>
          <div>
            <h3>24/7 Support</h3>
            <p>Our customer care team is always available to assist you.</p>
          </div>
        </InfoCard>
        <InfoCard>
          <IconWrapper>
            <i className="fas fa-hospital"></i>
          </IconWrapper>
          <div>
            <h3>Cashless Claims</h3>
            <p>Get hassle-free treatment at over 7500+ network hospitals.</p>
          </div>
        </InfoCard>
      </InfoSection>
    </CommonContainer>
  );
}

export default HealthCommon; 