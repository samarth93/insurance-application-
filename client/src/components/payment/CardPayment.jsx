import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import {
  cardNumberSvg,
  cardSvg,
  justPaySvg,
  netBankSvg,
  upiSvg,
  walletSvg,
} from "./assets/svgs";
import styles from "./cardPayment.module.css";
import { SIdeDiv } from "./SideDiv";

export const CardPayment = () => {
  const [total, setTotal] = useState("");
  
  useEffect(() => {
    try {
      // Get total from localStorage
      const storedTotal = localStorage.getItem("totalacko");
      if (storedTotal) {
        setTotal(storedTotal);
      } else {
        // Fallback to API if localStorage doesn't have the total
        let id = localStorage.getItem("ackoUserId");
        axios.get(`https://acko.herokuapp.com/user/${id}`)
          .then((res) => {
            const data = res.data;
            const totalValue = data.total || "3968";
            setTotal(totalValue.toString());
            localStorage.setItem("totalacko", totalValue.toString());
          })
          .catch(err => {
            console.log("Error fetching user data:", err.message);
            // Set default value
            setTotal("3968");
          });
      }
      
      // Fetch car details and store in localStorage for policy creation
      const fetchCarDetails = async () => {
        try {
          const id = localStorage.getItem("ackoid");
          if (id) {
            const response = await axios.get(`https://acko.herokuapp.com/cars/${id}`);
            const carData = response.data;
            
            // Store car details in localStorage
            localStorage.setItem("carNumber", carData.number || "KA01AB1234");
            localStorage.setItem("carMake", carData.name?.split(' ')[0] || "Ford");
            localStorage.setItem("carModel", carData.gear || "Titanium AT");
            localStorage.setItem("carYear", carData.year || new Date().getFullYear().toString());
            localStorage.setItem("policyType", "Comprehensive Car Insurance");
            
            // Store add-on selections if available
            if (carData.paCover) localStorage.setItem("paCover", carData.paCover);
            if (carData.consumablesCover) localStorage.setItem("consumablesCover", carData.consumablesCover);
            if (carData.zeroDepreciation) localStorage.setItem("zeroDepreciation", carData.zeroDepreciation);
            if (carData.engineProtection) localStorage.setItem("engineProtection", carData.engineProtection);
            if (carData.roadSideAssistance) localStorage.setItem("roadSideAssistance", carData.roadSideAssistance);
            if (carData.ncb) localStorage.setItem("ncbDiscount", carData.ncb);
            
            console.log("Car details stored for policy creation");
          }
        } catch (err) {
          console.log("Error fetching car details:", err.message);
        }
      };
      
      fetchCarDetails();
    } catch (err) {
      console.log("Error in payment setup:", err.message);
      // Set default value
      setTotal("3968");
    }
  }, []);
  
  const [allowPay, setAllowPay] = useState(false);
  
  const cvvChange = (e) => {
    if (e.target.value.length >= 3) {
      setAllowPay(true);
    }
  };
  
  const history = useHistory();
  
  const handlePayClick = () => {
    if (allowPay) {
      history.push("./successfull");
    } else {
      alert("Please fill the details");
    }
  };
  
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div>
          <SIdeDiv svg={cardSvg} text={"Credit/Debit Card"} />
          <SIdeDiv svg={upiSvg} text={"UPI"} />
          <SIdeDiv svg={netBankSvg} text={"Netbanking"} />
          <SIdeDiv svg={walletSvg} text={"Wallets"} />
          <div>
            <div>Powered by {justPaySvg}</div>
          </div>
        </div>
        <div>
          <div>
            <div>Pay using Credit or Debit Card</div>
            <div>
              <div>Card Number</div>
              <div>
                <input
                  placeholder="Enter card number here"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9s]{13,19}"
                />
                {cardNumberSvg}
              </div>
            </div>
            <div>
              <div>
                <div>Expiry Date</div>
                <div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9s]{13,19}"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div>
                <div>CVV</div>
                <div>
                  <input
                    onChange={cvvChange}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9s]{13,19}"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handlePayClick}
                style={{
                  background: allowPay ? "#5A68E7" : "#d6d9e0",
                  color: "white",
                }}
              >
                Pay Now
              </button>
            </div>
            <div>
              <img
                src="https://payments.juspay.in/web/images/theme_light/security_symbol.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.totalAmountCard}>
            <div className={styles.totalAmountHeader}>Payment Summary</div>
            <div className={styles.totalAmountValue}>
              <div>Total Amount</div>
              <div>₹ {total}</div>
            </div>
            <div className={styles.securePaymentNote}>
              <img
                src="https://payments.juspay.in/web/images/theme_light/security_symbol.png"
                alt="Secure"
                width="20"
              />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
