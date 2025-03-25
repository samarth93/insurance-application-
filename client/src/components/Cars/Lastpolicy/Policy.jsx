import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./policy.module.css";
import thumbsup from "./thumbsup paper.svg";

function Policy({ setpopupp }) {
  const handleYesClick = async () => {
    try {
      const id = localStorage.getItem("ackoid");
      if (!id) {
        console.error("No car ID found in localStorage");
        return;
      }
      
      const data = { ncb: 0 };
      await axios.patch(`https://acko.herokuapp.com/cars/${id}`, data);
      console.log("Policy status updated successfully");
    } catch (error) {
      console.error("Error updating policy status:", error);
    }
  };

  return (
    <div className={style.policybody}>
      <h2 className={style.policyTitle}>
        Did you make a claim in last policy period?
      </h2>
      
      <div className={style.policyButtons}>
        <Link to="/plans">
          <button 
            className={`${style.policyBtn} ${style.yesBtn}`}
            onClick={handleYesClick}
          >
            Yes
          </button>
        </Link>
        
        <button
          className={`${style.policyBtn} ${style.noBtn}`}
          onClick={() => setpopupp(true)}
        >
          No
        </button>
      </div>
      
      <div className={style.policyflexdiv}>
        <img src={thumbsup} alt="Thumbs up" className={style.thumbsIcon} />
        <p>You can get amazing discounts based on your claim history</p>
      </div>
    </div>
  );
}

export default Policy;
