import style from "./owndamageplan1.module.css";
import "./owndamageplan1.css";
import ecosport from "./ecosport.png"
import { useState, useEffect } from "react";

export const OwnDamagePlan1 = () => {
    const [carname, setCarName] = useState("Ford Ecosport 2020");
    const [premium, setPremium] = useState(0);
    const [policyType, setPolicyType] = useState("Own Damage Plan");
    const [customPolicyOptions, setCustomPolicyOptions] = useState([]);
    const [policyStartDate, setPolicyStartDate] = useState("");
    const [policyEndDate, setPolicyEndDate] = useState("");
    const [policyDuration, setPolicyDuration] = useState("1 Year");

    useEffect(() => {
        setPremium(localStorage.getItem("currentPremium"));
        
        // Check if a custom policy was selected
        const storedPolicyType = localStorage.getItem("policyType");
        if (storedPolicyType) {
            setPolicyType(storedPolicyType);
        }
        
        // Get custom policy options if available
        const storedCustomPolicyOptions = localStorage.getItem("customPolicyOptions");
        if (storedCustomPolicyOptions) {
            setCustomPolicyOptions(JSON.parse(storedCustomPolicyOptions));
        }
        
        // Get policy duration information if available
        const storedStartDate = localStorage.getItem("policyStartDate");
        if (storedStartDate) {
            setPolicyStartDate(storedStartDate);
        }
        
        const storedEndDate = localStorage.getItem("policyEndDate");
        if (storedEndDate) {
            setPolicyEndDate(storedEndDate);
        }
        
        const storedDuration = localStorage.getItem("policyDuration");
        if (storedDuration) {
            setPolicyDuration(storedDuration);
        }
    }, []);
    
    // Format date for display
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="owndamageplandiv11">
            <div className="oneone">
                <p className="titleOne">{policyType}</p>
                <p className="yourcarname">For your {carname}</p>
            </div>
            <div className="twotwo">
                <img 
                    style={{
                        width: "135px",
                        height: "60px",
                    }}
                    src={ecosport}
                    alt=""
                />
            </div>
            
            {/* Policy Duration Section */}
            {policyStartDate && policyEndDate && policyType === "Custom" && (
                <div style={{ 
                    padding: "12px", 
                    marginTop: "16px", 
                    backgroundColor: "#f8f9fa", 
                    borderRadius: "4px",
                    border: "1px solid #e9ecef"
                }}>
                    <div style={{ fontWeight: "500", marginBottom: "8px" }}>
                        Policy Duration: {policyDuration}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                        <div>
                            <span style={{ color: "#6c757d" }}>From:</span> {formatDateForDisplay(policyStartDate)}
                        </div>
                        <div>
                            <span style={{ color: "#6c757d" }}>To:</span> {formatDateForDisplay(policyEndDate)}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Policy Details Section */}
            <div className="policy-details" style={{ marginTop: "20px" }}>
                <div style={{ fontWeight: "500", marginBottom: "10px" }}>
                    Policy Details:
                </div>
                
                {/* First item - always show */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                        <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#4CAF50" />
                        <path d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                        {policyType === "Custom" ? "Customized coverage as per your selection" : "Covers damages to your car"}
                    </span>
                </div>
                
                {policyType === "Custom" && customPolicyOptions.length > 0 ? (
                    // Display custom policy options
                    <div>
                        {customPolicyOptions.map((option, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px", marginLeft: "24px" }}>
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                                    <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#4CAF50" />
                                    <path d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>
                                    {option.name}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Display standard policy details
                    <>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                                <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#4CAF50" />
                                <path d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>
                                Covers damages due to accidents
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                                <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#4CAF50" />
                                <path d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>
                                Covers damages due to natural calamities
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                                <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#4CAF50" />
                                <path d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>
                                Covers damages due to man-made disasters
                            </span>
                        </div>
                    </>
                )}
                
                {/* Premium Display */}
                <div style={{ 
                    marginTop: "16px", 
                    padding: "12px", 
                    backgroundColor: "#f4f5f7", 
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "500"
                }}>
                    <span>Total Premium:</span>
                    <span style={{ color: "#e74d31" }}>₹{premium}</span>
                </div>
            </div>
        </div>
    )
}