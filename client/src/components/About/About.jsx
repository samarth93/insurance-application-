import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaHandshake, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #522ED3 0%, #8967E8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MissionSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const MissionCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #522ED3;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  color: #636e72;
  line-height: 1.6;
`;

const ValuesSection = styled.div`
  background: #f8f9ff;
  padding: 60px 40px;
  border-radius: 20px;
  margin-bottom: 60px;
`;

const ValuesTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 40px;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const ValueItem = styled.div`
  text-align: center;
  padding: 20px;
`;

const ValueIcon = styled.div`
  font-size: 2rem;
  color: #522ED3;
  margin-bottom: 15px;
`;

const ValueTitle = styled.h4`
  font-size: 1.2rem;
  color: #2d3436;
  margin-bottom: 10px;
`;

const ValueText = styled.p`
  color: #636e72;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container>
      <HeroSection>
        <Title>About InsureTech</Title>
        <Subtitle>
          We're revolutionizing the insurance industry with technology-driven solutions,
          making insurance simple, transparent, and accessible for everyone.
        </Subtitle>
      </HeroSection>

      <MissionSection>
        <MissionCard>
          <Icon><FaShieldAlt /></Icon>
          <CardTitle>Our Mission</CardTitle>
          <CardText>
            To provide comprehensive insurance solutions that protect what matters most to you,
            with a seamless digital experience and exceptional customer service.
          </CardText>
        </MissionCard>

        <MissionCard>
          <Icon><FaHandshake /></Icon>
          <CardTitle>Our Vision</CardTitle>
          <CardText>
            To become the most trusted insurance platform, known for innovation,
            transparency, and customer-centric approach in the digital insurance space.
          </CardText>
        </MissionCard>

        <MissionCard>
          <Icon><FaChartLine /></Icon>
          <CardTitle>Our Approach</CardTitle>
          <CardText>
            We combine cutting-edge technology with deep insurance expertise to deliver
            personalized solutions that meet your unique needs and budget.
          </CardText>
        </MissionCard>
      </MissionSection>

      <ValuesSection>
        <ValuesTitle>Our Core Values</ValuesTitle>
        <ValuesGrid>
          <ValueItem>
            <ValueIcon><FaShieldAlt /></ValueIcon>
            <ValueTitle>Trust</ValueTitle>
            <ValueText>
              Building long-term relationships based on transparency and reliability.
            </ValueText>
          </ValueItem>

          <ValueItem>
            <ValueIcon><FaLightbulb /></ValueIcon>
            <ValueTitle>Innovation</ValueTitle>
            <ValueText>
              Continuously evolving our technology to enhance your insurance experience.
            </ValueText>
          </ValueItem>

          <ValueItem>
            <ValueIcon><FaUsers /></ValueIcon>
            <ValueTitle>Customer First</ValueTitle>
            <ValueText>
              Putting your needs at the center of everything we do.
            </ValueText>
          </ValueItem>
        </ValuesGrid>
      </ValuesSection>
    </Container>
  );
};

export default About; 