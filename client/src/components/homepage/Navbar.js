import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Hamburger from 'hamburger-react';
import { FaUser, FaChevronDown, FaHeadset, FaUserPlus, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import Nav2 from "./Nav2";
import AuthService from "../../services/auth.service";
import "./navbar.css";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // Check if user is logged in
        const loggedIn = AuthService.isLoggedIn();
        setIsLoggedIn(loggedIn);
        
        if (loggedIn) {
            setUser(AuthService.getCurrentUser());
        }
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setUser(null);
        history.push('/');
    };

    const toggleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showAccountMenu && !event.target.closest('.account-menu-container')) {
                setShowAccountMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAccountMenu]);

    return (
        <div>
            <div className='home_nav'>
                <nav className='main_nav'>
                    <div className="nav-logo-container">
                        <Link to="/">
                            <img 
                                className="logo" 
                                src="/default.png" 
                                alt="ACKO Insurance" 
                                style={{
                                    width: "170px", 
                                    height: "40px", 
                                    borderRadius: "10px", 
                                    transition: "transform 0.3s ease-in-out"
                                }} 
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                            />
                        </Link>
                    </div>
                    
                    <div className="navlinks_div nav_left">
                        <ul className="navlinks">
                            <li><Link to="/cars/useofcar" className="nav-link">Car Insurance</Link></li>
                            <li><Link to="/bikes" className="nav-link">Bike Insurance</Link></li>
                            <li><Link to="/health" className="nav-link">Health Insurance</Link></li>
                            <li><Link to="/about" className="nav-link">About Us</Link></li>
                        </ul>
                    </div>
                    
                    <div className="navlinks_div nav_right">
                        <ul className="navlinks">
                            <li className="account-menu-container">
                                {isLoggedIn ? (
                                    <div className="account-dropdown">
                                        <button 
                                            className="account-button" 
                                            onClick={toggleAccountMenu}
                                        >
                                            <FaUser style={{ marginRight: '5px' }} />
                                            {user?.name || 'Account'} 
                                            <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                                        </button>
                                        
                                        {showAccountMenu && (
                                            <div className="account-dropdown-content">
                                                <Link to="/dashboard" className="dropdown-item">
                                                    <FaTachometerAlt style={{ marginRight: '8px' }} /> Dashboard
                                                </Link>
                                                <Link to="/profile" className="dropdown-item">
                                                    <FaUser style={{ marginRight: '8px' }} /> Profile
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                                <button onClick={handleLogout} className="dropdown-item logout-item">
                                                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="account-dropdown">
                                        <button 
                                            className="account-button" 
                                            onClick={toggleAccountMenu}
                                        >
                                            <FaUser style={{ marginRight: '5px' }} />
                                            Account 
                                            <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                                        </button>
                                        
                                        {showAccountMenu && (
                                            <div className="account-dropdown-content">
                                                <Link to="/login" className="dropdown-item">
                                                    <FaUser style={{ marginRight: '8px' }} /> Login
                                                </Link>
                                                <Link to="/register" className="dropdown-item">
                                                    <FaUserPlus style={{ marginRight: '8px' }} /> Sign Up
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                            <li className="nav_help">
                                <Link to="/help" className="help-link">
                                    <FaHeadset style={{ marginRight: '5px' }} /> Help
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="hamburger-menu">
                        <Hamburger toggled={isOpen} toggle={setOpen} duration={0.8} size={20} color="#5A68E7" />
                    </div>
                </nav>
            </div>
            
            {isOpen ? <Nav2 isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : null}
        </div>
    );
};

export default Navbar;
