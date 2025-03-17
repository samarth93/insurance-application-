import React, { useEffect, useState } from 'react'
import style from "./paysuccessfull.module.css"
import Header from "../Header/Header"
import { Link, useHistory } from "react-router-dom"
import PolicyService from '../../services/policy.service'
import AuthService from '../../services/auth.service'

function Paysuccessfull() {
  const history = useHistory()
  const [policyCreated, setPolicyCreated] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Create policy when component mounts
    const createPolicy = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is logged in
        if (!AuthService.isLoggedIn()) {
          console.log("User not logged in, skipping policy creation");
          setIsLoading(false);
          return;
        }

        // Check if we already created a policy (to prevent duplicates on refresh)
        const policyCreatedFlag = sessionStorage.getItem('policy_created');
        if (policyCreatedFlag === 'true') {
          console.log("Policy already created, skipping creation");
          setPolicyCreated(true);
          setIsLoading(false);
          return;
        }

        // Create the policy
        console.log("Creating policy...");
        const result = await PolicyService.convertExistingPolicy();
        console.log("Policy created successfully:", result);
        
        // Mark as created
        setPolicyCreated(true);
        sessionStorage.setItem('policy_created', 'true');
      } catch (err) {
        console.error("Error creating policy:", err);
        setError(err.message || "Failed to create policy");
      } finally {
        setIsLoading(false);
      }
    };

    createPolicy();
  }, []);

  const handleContinue = () => {
    // Clear only the car data, not the user authentication
    localStorage.removeItem("ackoid");
    localStorage.removeItem("totalacko");
    localStorage.removeItem("carNumber");
    localStorage.removeItem("carMake");
    localStorage.removeItem("carModel");
    localStorage.removeItem("carYear");
    localStorage.removeItem("policyType");
    localStorage.removeItem("paCover");
    localStorage.removeItem("consumablesCover");
    localStorage.removeItem("zeroDepreciation");
    localStorage.removeItem("engineProtection");
    localStorage.removeItem("roadSideAssistance");
    localStorage.removeItem("ncbDiscount");
    localStorage.removeItem("currentPremium");
    localStorage.removeItem("currentIDV");
    
    // Redirect to dashboard if logged in, otherwise to home
    if (AuthService.isLoggedIn()) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      <Header></Header>
     
      <div
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <img
          className={style.payimgg}
          src="https://www.cntraveller.in/wp-content/themes/cntraveller/images/check-circle.gif"
          alt="Payment Successful"
        />
        <h2 className={style.successTitle}>Payment Successful!</h2>
        
        {isLoading ? (
          <p className={style.successMessage}>Processing your policy...</p>
        ) : (
          <>
            <p className={style.successMessage}>
              {AuthService.isLoggedIn() 
                ? `Your policy has been ${policyCreated ? 'created' : 'processed'} successfully.`
                : 'Your policy has been processed successfully.'}
            </p>
            {AuthService.isLoggedIn() && !policyCreated && !error && (
              <p className={style.successMessage}>
                Your policy will be available in your dashboard shortly.
              </p>
            )}
          </>
        )}
        
        {error && (
          <p className={style.errorMessage}>
            Note: {error}. Please contact support if the issue persists.
          </p>
        )}
      </div>
      <div
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleContinue}
          className={style.paybtn}
        >
          {AuthService.isLoggedIn() ? 'View My Policies' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

export default Paysuccessfull
