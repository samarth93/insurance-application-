import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Hamburger from 'hamburger-react';
import { FaUser, FaChevronDown, FaTachometerAlt, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import Nav2 from "./Nav2";
import AuthService from "../../services/auth.service";
import "./navbar.css";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const accountMenuRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        // Check if user is logged in
        const loggedIn = AuthService.isLoggedIn();
        setIsLoggedIn(loggedIn);
        
        if (loggedIn) {
            setUser(AuthService.getCurrentUser());
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        AuthService.logout();
        setIsLoggedIn(false);
        setUser(null);
        setShowAccountMenu(false);
        history.push('/');
    };

    const toggleAccountMenu = (e) => {
        e.preventDefault();
        setShowAccountMenu(!showAccountMenu);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setShowAccountMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className='navbar-container'>
                <nav className='navbar-main'>
                    <div className="navbar-logo">
                        <Link to="/">
                            <img 
                                src="/default.png" 
                                alt="Insuretech Insurance" 
                                className="logo-image"
                            />
                        </Link>
                    </div>
                    
                    <div className="navbar-links">
                        <Link to="/cars/useofcar" className="navbar-link">Car Insurance</Link>
                        <Link to="/bikes/pincode" className="navbar-link">Bike Insurance</Link>
                        <Link to="/health/profile" className="navbar-link">Health Insurance</Link>
                        <Link to="/about" className="navbar-link">About Us</Link>
                    </div>
                    
                    <div className="navbar-actions">
                        {isLoggedIn ? (
                            <div className="navbar-account" ref={accountMenuRef}>
                                <button 
                                    className="navbar-account-button"
                                    onClick={toggleAccountMenu}
                                >
                                    {user?.name || 'Account'} 
                                    <FaChevronDown className="dropdown-icon" />
                                </button>
                                
                                {showAccountMenu && (
                                    <div className="navbar-dropdown">
                                        <Link to="/dashboard" className="dropdown-item">
                                            <FaTachometerAlt style={{ marginRight: '8px' }} /> Dashboard
                                        </Link>
                                        <Link to="/profile" className="dropdown-item">
                                            <FaUserEdit style={{ marginRight: '8px' }} /> Profile
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button 
                                            onClick={handleLogout} 
                                            className="dropdown-item logout-item"
                                        >
                                            <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="navbar-contact-button">
                                Login
                            </Link>
                        )}
                    </div>
                    
                    <div className="hamburger-menu">
                        <Hamburger toggled={isOpen} toggle={setOpen} duration={0.8} size={20} color="#FFFFFF" />
                    </div>
                </nav>
            </div>
            
            {isOpen ? <Nav2 isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : null}
        </div>
    );
};

export default Navbar;
