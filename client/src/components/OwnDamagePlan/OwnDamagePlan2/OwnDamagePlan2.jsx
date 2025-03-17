import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import "./owndamageplan2.css";
import ticmark from "./ticmark.svg"

export const OwnDamagePlan2 = () => {
  const conspre = 141;
  
  const [paymentValues, setPaymentValues] = useState({
    netPreminum: "",
    gst: "",
    total: "",
    ncbDiscountAmount: "",
    paCover: "",
    subtotal: ""
  });
  
  const [customOptions, setCustomOptions] = useState([]);
  
  useEffect(() => {
    // Get custom policy options from localStorage
    const customPolicyOptions = localStorage.getItem("customPolicyOptions");
    if (customPolicyOptions) {
      try {
        const parsedOptions = JSON.parse(customPolicyOptions);
        setCustomOptions(parsedOptions);
      } catch (err) {
        console.log("Error parsing custom policy options:", err.message);
        setCustomOptions([]);
      }
    }
    
    try {
      let id = localStorage.getItem("ackoUserId");
      axios.get(`https://acko.herokuapp.com/user/${id}`)
        .then((res) => {
          let data = res.data;
          
          // Calculate subtotal (net premium - NCB discount + consumables + PA cover)
          const subtotal = data.premium - data.ncbDiscountAmount + conspre + data.paCover;
          
          // Calculate GST (15% of subtotal)
          const gst = Math.round(subtotal * 0.15);
          
          // Calculate total (subtotal + GST)
          const total = subtotal + gst;
          
          setPaymentValues({
            netPreminum: data.premium.toFixed(0),
            gst: gst,
            total: total,
            ncbDiscountAmount: data.ncbDiscountAmount,
            paCover: data.paCover,
            subtotal: subtotal
          });
          
          // Store total in localStorage
          localStorage.setItem("totalacko", total.toString());
        })
        .catch(err => {
          console.log("Error fetching user data:", err.message);
          // Set default values if data fetch fails
          const defaultNetPremium = 3450;
          const defaultNcbDiscount = 690;
          const defaultPaCover = 400;
          const defaultSubtotal = defaultNetPremium - defaultNcbDiscount + conspre + defaultPaCover;
          const defaultGst = Math.round(defaultSubtotal * 0.15);
          const defaultTotal = defaultSubtotal + defaultGst;
          
          setPaymentValues({
            netPreminum: defaultNetPremium.toString(),
            gst: defaultGst.toString(),
            total: defaultTotal.toString(),
            ncbDiscountAmount: defaultNcbDiscount.toString(),
            paCover: defaultPaCover.toString(),
            subtotal: defaultSubtotal.toString()
          });
          
          // Store default total in localStorage
          localStorage.setItem("totalacko", defaultTotal.toString());
        });
    } catch (err) {
      console.log("Error in premium calculation:", err.message);
      // Set default values if there's an error
      const defaultNetPremium = 3450;
      const defaultNcbDiscount = 690;
      const defaultPaCover = 400;
      const defaultSubtotal = defaultNetPremium - defaultNcbDiscount + conspre + defaultPaCover;
      const defaultGst = Math.round(defaultSubtotal * 0.15);
      const defaultTotal = defaultSubtotal + defaultGst;
      
      setPaymentValues({
        netPreminum: defaultNetPremium.toString(),
        gst: defaultGst.toString(),
        total: defaultTotal.toString(),
        ncbDiscountAmount: defaultNcbDiscount.toString(),
        paCover: defaultPaCover.toString(),
        subtotal: defaultSubtotal.toString()
      });
      
      // Store default total in localStorage
      localStorage.setItem("totalacko", defaultTotal.toString());
    }
  }, []);

  return (
    <div className="owndamageplandiv22">
      <div className="owndamagetopdiv">
        <p className="owndamageplan2title">Premium Breakdown</p>
        <p className="owndamageplan2subtitle">Hide Details</p>
      </div>
      
      <div className="owndamageplanprices1">
        <div>Own Damage Premium</div>
        <div>₹ {paymentValues.netPreminum}</div>

        <div>NCB Discount</div>
        <div style={{ color: "#4CAF50" }}>- ₹ {paymentValues.ncbDiscountAmount}</div>
        
        <div>Consumables Premium</div>
        <div>₹ {conspre}</div>
        
        {/* Display custom policy options if available */}
        {customOptions.length > 0 && customOptions.map((option, index) => {
          // Skip required options that are already shown elsewhere
          if (option.name === "Third-Party Liability" || option.name === "Own Damage" || 
              option.name === "Personal Accident Cover" || option.name === "Consumables Cover") {
            return null;
          }
          return (
            <Fragment key={index}>
              <div>{option.name}</div>
              <div>₹ {option.price}</div>
            </Fragment>
          );
        })}
      </div>
      
      <p className="addonsdivstyle">ADDONS</p>
      
      <div className="owndamageplanprices2">
        <div>
          <img src={ticmark} alt="" style={{ marginRight: "8px" }} />
          <span>PA Cover</span>
        </div>
        <div>₹ {paymentValues.paCover}</div>

        <div className="pricetables">Net Premium</div>
        <div className="pricetables">₹ {paymentValues.subtotal}</div>
        
        <div className="pricetables">GST</div>
        <div className="pricetables">₹ {paymentValues.gst}</div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e9eaf2", margin: "16px 0" }} />

      <div className="owndamageplanfinalprice">
        <div>Total</div>
        <div>₹ {paymentValues.total}</div>
      </div>
    </div>
  );
}

