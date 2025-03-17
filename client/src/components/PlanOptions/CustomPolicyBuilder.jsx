import styled from "styled-components";
import Header from "../Header/Header";
import styles from "./CustomPolicyBuilder.module.css";
import {
  accidentsSvg,
  calendarSvg,
  carBurnSvg,
  carFloodSvg,
  carSvg,
  carTheftSvg,
  consumablesSvg,
  emiSvg,
  mapSvg,
  ncbProtectSvg,
  needHelpSvg,
  passengerAccidentSvg,
  personalAccidentSvg,
} from "./assets/svgs";
import { images } from "./assets/imgs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 752px;
  margin: auto;
  margin-top: 64px;
  display: flex;
  grid-gap: 16px;
`;

const InContleft = styled.div`
  background-color: #ffffff;
  height: auto;
  width: 368px;
  border: 1px solid #dcdee9;
`;

const InContright = styled.div`
  background-color: #ffffff;
  width: 368px;
  border: 1px solid #dcdee9;
`;

const CustomCoverOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #dcdee9;
`;

const CoverageSlider = styled.input`
  width: 100%;
  margin: 16px 0;
`;

const CoverageAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const BuilderContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dcdee9;
  padding: 16px;
  margin-top: 16px;
`;

const BuilderTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
  color: #253858;
`;

const BuilderDescription = styled.p`
  font-size: 14px;
  color: #505f79;
  margin-bottom: 24px;
`;

const CoverageOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CoverageCheckbox = styled.input`
  margin-right: 12px;
`;

const CoverageLabel = styled.label`
  font-size: 14px;
  flex: 1;
`;

const CoveragePrice = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #253858;
`;

const CoverageDescription = styled.p`
  font-size: 12px;
  color: #505f79;
  margin-left: 24px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const TotalPremium = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #f4f5f7;
  font-weight: 500;
  margin-top: 24px;
`;

const ContinueButton = styled.button`
  background-color: #e74d31;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  &:hover {
    background-color: #d43e23;
  }
`;

const DateContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #dcdee9;
`;

const DateTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const DateDescription = styled.div`
  font-size: 12px;
  color: #505f79;
  margin-bottom: 16px;
`;

const DateInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DateInputContainer = styled.div`
  width: 48%;
`;

const DateLabel = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #505f79;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdee9;
  border-radius: 4px;
`;

const DurationSelector = styled.div`
  margin-top: 16px;
`;

const DurationTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const DurationOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const DurationOption = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.selected ? '#e74d31' : '#dcdee9'};
  background-color: ${props => props.selected ? '#fff8f7' : 'white'};
  color: ${props => props.selected ? '#e74d31' : '#253858'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    border-color: #e74d31;
  }
`;

const PriceAdjustment = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  border-top: 1px dashed #dcdee9;
  margin-top: 8px;
`;

export const CustomPolicyBuilder = () => {
  var data;
  const [carDetails, setCarDetails] = useState({
    liscencePlate: "",
    vehicleName: "",
    NCB: "",
    registrationMonthYear: "",
    pincode: "",
    carValue: 12.55,
  });

  useEffect(() => {
    try {
      let id = localStorage.getItem("ackoid");
      const res = axios
        .get(`https://acko.herokuapp.com/cars/${id}`)
        .then((res) => {
          console.log(res.data);
          data = res.data;
          console.log(data);
          setCarDetails({
            liscencePlate: data.number,
            vehicleName: data.name,
            NCB: data.ncb,
            registrationMonthYear: data.month + "," + data.year,
            pincode: data.pincode,
            carValue: 12.55,
            mobile: data.mobile,
          });
        });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const history = useHistory();
  
  // Base coverage amount (IDV)
  const [insuredValue, setInsuredValue] = useState(
    localStorage.getItem("currentIDV") ? Number(localStorage.getItem("currentIDV")) : 6.28
  );
  
  // Base premium calculation
  const [basePremium, setBasePremium] = useState(
    localStorage.getItem("currentPremium") ? Number(localStorage.getItem("currentPremium")) : 3450
  );

  // Policy duration state
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(nextYear));
  const [selectedDuration, setSelectedDuration] = useState("1 Year");
  const [durationFactor, setDurationFactor] = useState(1.0);
  
  // Duration options
  const durationOptions = [
    { label: "1 Week", value: "1 Week", factor: 0.1 },
    { label: "2 Weeks", value: "2 Weeks", factor: 0.15 },
    { label: "1 Month", value: "1 Month", factor: 0.2 },
    { label: "3 Months", value: "3 Months", factor: 0.4 },
    { label: "6 Months", value: "6 Months", factor: 0.6 },
    { label: "1 Year", value: "1 Year", factor: 1.0 },
    { label: "2 Years", value: "2 Years", factor: 1.8 },
    { label: "3 Years", value: "3 Years", factor: 2.5 },
  ];

  // Coverage options with their prices
  const [coverageOptions, setCoverageOptions] = useState([
    { id: 1, name: "Third-Party Liability", price: 1500, isRequired: true, isSelected: true, description: "Covers damages to third parties (mandatory by law)" },
    { id: 2, name: "Own Damage", price: 2500, isRequired: false, isSelected: true, description: "Covers damages to your own vehicle due to accidents" },
    { id: 3, name: "Zero Depreciation", price: 1200, isRequired: false, isSelected: false, description: "Get full claim without depreciation deduction" },
    { id: 4, name: "Engine Protection", price: 800, isRequired: false, isSelected: false, description: "Covers damages to engine due to water ingression or leakage of lubricating oil" },
    { id: 5, name: "Return to Invoice", price: 600, isRequired: false, isSelected: false, description: "Get invoice value of the car in case of total loss or theft" },
    { id: 6, name: "Roadside Assistance", price: 300, isRequired: false, isSelected: false, description: "24/7 assistance for breakdowns, towing, and emergencies" },
    { id: 7, name: "Personal Accident Cover", price: 400, isRequired: false, isSelected: false, description: "Covers injuries to the driver/owner of the vehicle" },
    { id: 8, name: "Passenger Cover", price: 350, isRequired: false, isSelected: false, description: "Covers injuries to passengers in your vehicle" },
    { id: 9, name: "NCB Protection", price: 500, isRequired: false, isSelected: false, description: "Protects your No Claim Bonus even after making a claim" },
    { id: 10, name: "Consumables Cover", price: 250, isRequired: false, isSelected: false, description: "Covers cost of consumables like engine oil, coolant, etc." },
  ]);

  // Calculate total premium based on selected options and duration
  const calculateTotalPremium = () => {
    const baseTotalPremium = coverageOptions
      .filter(option => option.isSelected)
      .reduce((total, option) => total + option.price, 0);
    
    return Math.round(baseTotalPremium * durationFactor);
  };

  // Handle checkbox change for coverage options
  const handleCoverageChange = (id) => {
    setCoverageOptions(
      coverageOptions.map(option => 
        option.id === id && !option.isRequired 
          ? { ...option, isSelected: !option.isSelected } 
          : option
      )
    );
  };

  // Handle slider change for insured value
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value).toFixed(2);
    setInsuredValue(newValue);
    
    // Recalculate base premium based on new insured value
    const newBasePremium = (newValue * 0.549322709 * 1000).toFixed(0);
    setBasePremium(newBasePremium);
    
    // Update prices of coverage options based on new insured value
    setCoverageOptions(
      coverageOptions.map(option => {
        const factor = option.id === 1 ? 0.2 : 
                      option.id === 2 ? 0.4 : 
                      option.id === 3 ? 0.19 : 
                      option.id === 4 ? 0.13 : 
                      option.id === 5 ? 0.1 : 
                      option.id === 6 ? 0.05 : 
                      option.id === 7 ? 0.06 : 
                      option.id === 8 ? 0.06 : 
                      option.id === 9 ? 0.08 : 0.04;
        
        return {
          ...option,
          price: Math.round(newBasePremium * factor)
        };
      })
    );
  };
  
  // Handle duration selection
  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration.value);
    setDurationFactor(duration.factor);
    
    // Update end date based on duration
    const newEndDate = new Date(startDate);
    if (duration.value === "1 Week") {
      newEndDate.setDate(newEndDate.getDate() + 7);
    } else if (duration.value === "2 Weeks") {
      newEndDate.setDate(newEndDate.getDate() + 14);
    } else if (duration.value === "1 Month") {
      newEndDate.setMonth(newEndDate.getMonth() + 1);
    } else if (duration.value === "3 Months") {
      newEndDate.setMonth(newEndDate.getMonth() + 3);
    } else if (duration.value === "6 Months") {
      newEndDate.setMonth(newEndDate.getMonth() + 6);
    } else if (duration.value === "1 Year") {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    } else if (duration.value === "2 Years") {
      newEndDate.setFullYear(newEndDate.getFullYear() + 2);
    } else if (duration.value === "3 Years") {
      newEndDate.setFullYear(newEndDate.getFullYear() + 3);
    }
    
    setEndDate(formatDate(newEndDate));
  };
  
  // Handle start date change
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Update end date based on selected duration
    const selectedDurationOption = durationOptions.find(option => option.value === selectedDuration);
    if (selectedDurationOption) {
      const newEndDate = new Date(newStartDate);
      if (selectedDuration === "1 Week") {
        newEndDate.setDate(newEndDate.getDate() + 7);
      } else if (selectedDuration === "2 Weeks") {
        newEndDate.setDate(newEndDate.getDate() + 14);
      } else if (selectedDuration === "1 Month") {
        newEndDate.setMonth(newEndDate.getMonth() + 1);
      } else if (selectedDuration === "3 Months") {
        newEndDate.setMonth(newEndDate.getMonth() + 3);
      } else if (selectedDuration === "6 Months") {
        newEndDate.setMonth(newEndDate.getMonth() + 6);
      } else if (selectedDuration === "1 Year") {
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      } else if (selectedDuration === "2 Years") {
        newEndDate.setFullYear(newEndDate.getFullYear() + 2);
      } else if (selectedDuration === "3 Years") {
        newEndDate.setFullYear(newEndDate.getFullYear() + 3);
      }
      
      setEndDate(formatDate(newEndDate));
    }
  };
  
  // Handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    
    // Calculate and set duration based on start and end dates
    const start = new Date(startDate);
    const end = new Date(e.target.value);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      setSelectedDuration("1 Week");
      setDurationFactor(0.1);
    } else if (diffDays <= 14) {
      setSelectedDuration("2 Weeks");
      setDurationFactor(0.15);
    } else if (diffDays <= 31) {
      setSelectedDuration("1 Month");
      setDurationFactor(0.2);
    } else if (diffDays <= 92) {
      setSelectedDuration("3 Months");
      setDurationFactor(0.4);
    } else if (diffDays <= 183) {
      setSelectedDuration("6 Months");
      setDurationFactor(0.6);
    } else if (diffDays <= 366) {
      setSelectedDuration("1 Year");
      setDurationFactor(1.0);
    } else if (diffDays <= 731) {
      setSelectedDuration("2 Years");
      setDurationFactor(1.8);
    } else {
      setSelectedDuration("3 Years");
      setDurationFactor(2.5);
    }
  };

  // Continue to next step
  const handleContinue = () => {
    // Save selected options and premium to localStorage
    localStorage.setItem("customPolicyOptions", JSON.stringify(
      coverageOptions.filter(option => option.isSelected)
    ));
    localStorage.setItem("currentPremium", calculateTotalPremium());
    localStorage.setItem("currentIDV", insuredValue);
    localStorage.setItem("policyType", "Custom");
    localStorage.setItem("policyStartDate", startDate);
    localStorage.setItem("policyEndDate", endDate);
    localStorage.setItem("policyDuration", selectedDuration);
    
    try {
      // Send data to server
      axios
        .post(`https://acko.herokuapp.com/user`, {
          selectedPlan: "Custom Policy",
          mobile: carDetails.mobile,
          premium: calculateTotalPremium(),
          paCover: coverageOptions.find(o => o.name === "Personal Accident Cover" && o.isSelected) ? 
                  coverageOptions.find(o => o.name === "Personal Accident Cover").price : 0,
          ncbDiscountAmount: (+basePremium * 20) / 80,
          customPolicy: coverageOptions.filter(option => option.isSelected).map(o => o.name),
          policyStartDate: startDate,
          policyEndDate: endDate,
          policyDuration: selectedDuration
        })
        .then((res) => {
          localStorage.setItem("ackoUserId", res.data._id);
          history.push("/addtional-details");
        })
        .catch((error) => {
          console.error("Error saving policy data:", error);
          // Even if the API call fails, still navigate to the next page
          history.push("/addtional-details");
        });
    } catch (error) {
      console.error("Error in try-catch block:", error);
      // If any error occurs, still navigate to the next page
      history.push("/addtional-details");
    }
  };

  return (
    <div className="App">
      <Header></Header>
      <Container>
        <InContleft>
          <div
            style={{
              border: "1px solid #dcdee9",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
            >
              <div
                style={{
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {carSvg}
                  <span className={styles.vehicle}>
                    {carDetails.liscencePlate} {carDetails.vehicleName}
                  </span>
                </div>
              </div>
              <div
                style={{
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ display: "flex", color: "#8A909F" }}>
                  {calendarSvg}
                  <span className={styles.vehicle}>
                    NCB - {carDetails.NCB}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ display: "flex", color: "#8A909F" }}>
                  {calendarSvg}
                  <span className={styles.vehicle}>
                    Registration in {carDetails.registrationMonthYear}
                  </span>
                </div>
              </div>
              <div
                style={{
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ display: "flex", color: "#8A909F" }}>
                  {mapSvg}
                  <span className={styles.vehicle}>{carDetails.pincode}</span>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  float: "right",
                  paddingRight: "18px",
                  paddingTop: "16px",
                  paddingBottom: "4px",
                  fontSize: "12px",
                }}
                className={styles.editLink}
              >
                <a href="" style={{ textDecoration: "none" }}>
                  <span style={{ color: "#528ae2" }}>Edit</span>
                </a>
              </div>
              <div>
                <img
                  style={{
                    width: "135px",
                    height: "60px",
                    marginTop: "16px",
                    float: "right",
                  }}
                  src={images.ecosport}
                  alt=""
                />
              </div>
            </div>
          </div>
          
          {/* IDV Slider */}
          <div style={{ border: "1px solid #dcdee9", padding: "16px" }}>
            <div style={{ fontWeight: "500", marginBottom: "8px" }}>
              Insured Declared Value (IDV)
            </div>
            <div style={{ fontSize: "12px", color: "#505f79", marginBottom: "16px" }}>
              Adjust the IDV to customize your premium. Higher IDV means higher coverage but also higher premium.
            </div>
            <CoverageSlider
              type="range"
              min={carDetails.carValue * 0.3}
              max={carDetails.carValue}
              step="0.01"
              value={insuredValue}
              onChange={handleSliderChange}
            />
            <CoverageAmount>
              <span>₹{(carDetails.carValue * 0.3).toFixed(2)} Lakhs</span>
              <span>₹{insuredValue} Lakhs</span>
              <span>₹{carDetails.carValue.toFixed(2)} Lakhs</span>
            </CoverageAmount>
          </div>
          
          {/* Policy Duration Section */}
          <DateContainer>
            <DateTitle>Policy Duration</DateTitle>
            <DateDescription>
              Select how long you want your insurance coverage to last. Shorter durations cost less but need to be renewed more frequently.
            </DateDescription>
            
            <DurationOptions>
              {durationOptions.map((option) => (
                <DurationOption 
                  key={option.value}
                  selected={selectedDuration === option.value}
                  onClick={() => handleDurationSelect(option)}
                >
                  {option.label}
                </DurationOption>
              ))}
            </DurationOptions>
            
            <DateInputGroup>
              <DateInputContainer>
                <DateLabel>Start Date</DateLabel>
                <DateInput 
                  type="date" 
                  value={startDate}
                  min={formatDate(today)}
                  onChange={handleStartDateChange}
                />
              </DateInputContainer>
              
              <DateInputContainer>
                <DateLabel>End Date</DateLabel>
                <DateInput 
                  type="date" 
                  value={endDate}
                  min={startDate}
                  onChange={handleEndDateChange}
                />
              </DateInputContainer>
            </DateInputGroup>
          </DateContainer>
        </InContleft>
        
        <InContright>
          <BuilderContainer>
            <BuilderTitle>Build Your Custom Policy</BuilderTitle>
            <BuilderDescription>
              Select the coverage options you need to create a policy that perfectly fits your requirements.
            </BuilderDescription>
            
            {coverageOptions.map((option) => (
              <div key={option.id}>
                <CoverageOption>
                  <CoverageCheckbox
                    type="checkbox"
                    id={`coverage-${option.id}`}
                    checked={option.isSelected}
                    onChange={() => handleCoverageChange(option.id)}
                    disabled={option.isRequired}
                  />
                  <CoverageLabel htmlFor={`coverage-${option.id}`}>
                    {option.name} {option.isRequired && "(Required)"}
                  </CoverageLabel>
                  <CoveragePrice>₹{option.price}</CoveragePrice>
                </CoverageOption>
                <CoverageDescription>{option.description}</CoverageDescription>
              </div>
            ))}
            
            <PriceAdjustment>
              <span>Base Premium (Annual)</span>
              <span>₹{coverageOptions
                .filter(option => option.isSelected)
                .reduce((total, option) => total + option.price, 0)}</span>
            </PriceAdjustment>
            
            <PriceAdjustment>
              <span>Duration Adjustment ({selectedDuration})</span>
              <span>x{durationFactor.toFixed(1)}</span>
            </PriceAdjustment>
            
            <TotalPremium>
              <span>Total Premium</span>
              <span>₹{calculateTotalPremium()}</span>
            </TotalPremium>
            
            <ContinueButton onClick={handleContinue}>
              Continue
            </ContinueButton>
          </BuilderContainer>
        </InContright>
      </Container>
    </div>
  );
}; 