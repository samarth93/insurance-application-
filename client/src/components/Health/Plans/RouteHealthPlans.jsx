import React from 'react';
import styled from 'styled-components';
import HealthCommon from '../Common/HealthCommon';
import HealthPlanSimple from './HealthPlanSimple';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
`;

const RouteHealthPlans = () => {
  return (
    <Container>
      <TopSection>
        <HealthCommon />
      </TopSection>
      <ContentWrapper>
        <HealthPlanSimple />
      </ContentWrapper>
    </Container>
  );
};

export default RouteHealthPlans; 