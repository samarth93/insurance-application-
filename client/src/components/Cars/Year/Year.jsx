import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./year.module.css";

function Year() {
  const [value, setValue] = useState("");
  const [alreadyClicked, setAlreadyClicked] = useState(null);
  
  const handleClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    
    // Reset border on previously selected button
    if (alreadyClicked) {
      alreadyClicked.style.border = "none";
    }
    
    // Set border on currently selected button
    e.target.parentElement.style.border = "1px solid #8C76DF";
    setAlreadyClicked(e.target.parentElement);
    setValue(name);
  };
  
  const handleContinue = async () => {
    try {
      if (!value) {
        alert("Please select a year");
        return;
      }
      
      const id = localStorage.getItem("ackoid");
      if (!id) {
        console.error("No car ID found in localStorage");
        return;
      }
      
      const data = { year: value };
      await axios.patch(`https://acko.herokuapp.com/cars/${id}`, data);
      console.log("Year updated successfully");
    } catch (error) {
      console.error("Error updating year:", error);
    }
  };

  return (
    <div className={style.yearbody}>
      <h2 className={style.yearTitle}>Which year did you buy your car?</h2>

      <div className={style.yearflexdiv}>
        {[2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006].map((year) => (
          <div key={year} className={style.yearOption}>
            <button 
              name={year.toString()} 
              onClick={handleClick}
              className={value === year.toString() ? style.selectedYear : ""}
            >
              {year}
            </button>
          </div>
        ))}
        <div className={style.yearOption}>
          <button 
            name="Before 2006" 
            onClick={handleClick}
            className={value === "Before 2006" ? style.selectedYear : ""}
          >
            Before 2006
          </button>
        </div>
      </div>
      
      <div className={style.continueButtonContainer}>
        <Link to="/cars/month">
          <button
            className={style.yearbtn}
            onClick={handleContinue}
            disabled={!value}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Year;
