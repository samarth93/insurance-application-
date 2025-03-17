import React from 'react';
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaUserPlus, FaTachometerAlt, FaUserEdit, 
         FaHeadset, FaCar, FaMotorcycle, FaHeartbeat, FaInfoCircle } from 'react-icons/fa';
import "./nav2.css";

const Nav2 = ({ isLoggedIn, handleLogout }) => {
    return (
        <div className="mobile-nav-container">
            <div className="mobile-nav">
                {isLoggedIn ? (
                    <div className="mobile-nav-section">
                        <h3>Account</h3>
                        <Link to="/dashboard" className="mobile-nav-link">
                            <FaTachometerAlt style={{ marginRight: '10px' }} /> Dashboard
                        </Link>
                        <Link to="/profile" className="mobile-nav-link">
                            <FaUserEdit style={{ marginRight: '10px' }} /> Profile
                        </Link>
                        <button onClick={handleLogout} className="mobile-logout-btn">
                            <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
                        </button>
                        <hr />
                    </div>
                ) : (
                    <div className="mobile-nav-section">
                        <h3>Account</h3>
                        <Link to="/login" className="mobile-nav-link">
                            <FaUser style={{ marginRight: '10px' }} /> Login
                        </Link>
                        <Link to="/register" className="mobile-nav-link">
                            <FaUserPlus style={{ marginRight: '10px' }} /> Register
                        </Link>
                        <hr />
                    </div>
                )}

                <div className="mobile-nav-section">
                    <h3>Products</h3>
                    <Link to="/cars/useofcar" className="mobile-nav-link">
                        <FaCar style={{ marginRight: '10px' }} /> Car Insurance
                    </Link>
                    <Link to="/bikes" className="mobile-nav-link">
                        <FaMotorcycle style={{ marginRight: '10px' }} /> Bike Insurance
                    </Link>
                    <Link to="/health" className="mobile-nav-link">
                        <FaHeartbeat style={{ marginRight: '10px' }} /> Health Insurance
                    </Link>
                    <hr />
                </div>
                
                <div className="mobile-nav-section">
                    <h3>Support</h3>
                    <Link to="/help" className="mobile-nav-link">
                        <FaHeadset style={{ marginRight: '10px' }} /> Help Center
                    </Link>
                    <Link to="/about" className="mobile-nav-link">
                        <FaInfoCircle style={{ marginRight: '10px' }} /> About Us
                    </Link>
                    <hr />
                </div>
                
                <div className="mobile-nav-section">
                    <p className="mobile-nav-disclaimer">Trade logo displayed above belongs to ACKO Technology & Services Pvt Ltd and used by ACKO General insurance Limited under License.</p>
                    <p className="mobile-nav-disclaimer">For more details on risk factors, terms, conditions and exclusions, please read the policy wordings carefully before concluding a sale.</p>
                </div>
            </div>
        </div>
    );
};

export default Nav2;
