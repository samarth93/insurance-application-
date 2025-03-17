import "./bynow.css";
import thamicon from "./thmb.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ByNow = () => {
  const [total, setTotal] = useState("");

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalacko") || "0";
    setTotal(storedTotal);
  }, []);

  return (
    <div className="bynowmaindiv">
      <Link
        style={{ textDecoration: "none", width: "150px", height: "200px" }}
        to="/cardPayment"
      >
        <div>
          <div>₹{total}</div>
          <div>Buy Now</div>
        </div>
      </Link>
      <div>
        <img src={thamicon} alt="" />
      </div>
      <div>Trusted by 4.45 Crore Indians</div>
    </div>
  );
};
