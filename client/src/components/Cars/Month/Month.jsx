import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./month.module.css";

function Month() {
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
        alert("Please select a month");
        return;
      }
      
      const id = localStorage.getItem("ackoid");
      if (!id) {
        console.error("No car ID found in localStorage");
        return;
      }
      
      const data = { month: value };
      await axios.patch(`https://acko.herokuapp.com/cars/${id}`, data);
      console.log("Month updated successfully");
    } catch (error) {
      console.error("Error updating month:", error);
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className={style.monthBody}>
      <h2 className={style.monthTitle}>Which month did you buy your car?</h2>

      <div className={style.monthFlexDiv}>
        {months.map((month) => (
          <div key={month} className={style.monthOption}>
            <button 
              name={month} 
              onClick={handleClick}
              className={value === month ? style.selectedMonth : ""}
            >
              {month}
            </button>
          </div>
        ))}
      </div>
      
      <div className={style.continueButtonContainer}>
        <Link to="/cars/cartype">
          <button
            className={style.monthBtn}
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

export default Month;
