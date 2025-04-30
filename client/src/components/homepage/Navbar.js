import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Hamburger from 'hamburger-react';
import { 
    FaChevronDown, 
    FaTachometerAlt, 
    FaUserEdit, 
    FaSignOutAlt, 
    FaMoneyBillWave,
    FaCar,
    FaMotorcycle,
    FaHeartbeat,
    FaAmbulance,
    FaTools,
    FaWrench,
    FaMapMarkerAlt,
    FaPhoneAlt
} from 'react-icons/fa';
import Nav2 from "./Nav2";
import AuthService from "../../services/auth.service";
import "./navbar.css";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showClaimsMenu, setShowClaimsMenu] = useState(false);
    const [activeInsuranceType, setActiveInsuranceType] = useState(null);
    const accountMenuRef = useRef(null);
    const claimsMenuRef = useRef(null);
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
        setShowClaimsMenu(false); // Close claims menu if open
    };

    const toggleClaimsMenu = (e) => {
        e.preventDefault();
        setShowClaimsMenu(!showClaimsMenu);
        setShowAccountMenu(false); // Close account menu if open
    };

    // Handle insurance type hover in claims dropdown
    const handleInsuranceTypeHover = (type) => {
        setActiveInsuranceType(type);
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setShowAccountMenu(false);
            }
            if (claimsMenuRef.current && !claimsMenuRef.current.contains(event.target)) {
                setShowClaimsMenu(false);
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
                        <div className="navbar-link claims-link" onClick={toggleClaimsMenu}>
                            Claims <FaChevronDown className="dropdown-icon" />
                        </div>
                        <Link to="/about" className="navbar-link">About Us</Link>
                    </div>
                    
                    {/* Claims Dropdown Menu */}
                    {showClaimsMenu && (
                        <div className="claims-dropdown-container" ref={claimsMenuRef}>
                            <div className="claims-dropdown">
                                <div className="claims-header">
                                    <FaMoneyBillWave className="claims-icon" />
                                    <h2>Claims</h2>
                                </div>
                                
                                <div className="claims-content">
                                    <div className="insurance-types">
                                        <div 
                                            className={`insurance-type ${activeInsuranceType === 'car' ? 'active' : ''}`}
                                            onMouseEnter={() => handleInsuranceTypeHover('car')}
                                        >
                                            <FaCar className="insurance-type-icon" />
                                            <span className="insurance-full-name">Car Insurance</span>
                                        </div>
                                        
                                        <div 
                                            className={`insurance-type ${activeInsuranceType === 'bike' ? 'active' : ''}`}
                                            onMouseEnter={() => handleInsuranceTypeHover('bike')}
                                        >
                                            <FaMotorcycle className="insurance-type-icon" />
                                            <span className="insurance-full-name">Bike Insurance</span>
                                        </div>
                                        
                                        <div 
                                            className={`insurance-type ${activeInsuranceType === 'health' ? 'active' : ''}`}
                                            onMouseEnter={() => handleInsuranceTypeHover('health')}
                                        >
                                            <FaHeartbeat className="insurance-type-icon" />
                                            <span className="insurance-full-name">Health Insurance</span>
                                        </div>
                                    </div>
                                    
                                    <div className="insurance-submenu">
                                        {activeInsuranceType === 'car' && (
                                            <div className="submenu-items">
                                                <Link to="/claims/car/new" className="submenu-item">
                                                    <FaAmbulance className="submenu-icon" />
                                                    Filing new claim
                                                </Link>
                                                <Link to="/claims/car/how-it-works" className="submenu-item">
                                                    <FaTools className="submenu-icon" />
                                                    How our claims work
                                                </Link>
                                                <Link to="/claims/car/garages" className="submenu-item">
                                                    <FaMapMarkerAlt className="submenu-icon" />
                                                    Nearby car garage
                                                </Link>
                                            </div>
                                        )}
                                        
                                        {activeInsuranceType === 'bike' && (
                                            <div className="submenu-items">
                                                <Link to="/claims/bike/new" className="submenu-item">
                                                    <FaAmbulance className="submenu-icon" />
                                                    Filing new claim
                                                </Link>
                                                <Link to="/claims/bike/how-it-works" className="submenu-item">
                                                    <FaTools className="submenu-icon" />
                                                    How our claim works
                                                </Link>
                                                <Link to="/claims/bike/repair-shops" className="submenu-item">
                                                    <FaWrench className="submenu-icon" />
                                                    Nearby bike repair shop
                                                </Link>
                                            </div>
                                        )}
                                        
                                        {activeInsuranceType === 'health' && (
                                            <div className="submenu-items">
                                                <Link to="/claims/health/new" className="submenu-item">
                                                    <FaAmbulance className="submenu-icon" />
                                                    Filing new claims
                                                </Link>
                                                <Link to="/claims/health/track" className="submenu-item">
                                                    <FaTachometerAlt className="submenu-icon" />
                                                    Track existing plan
                                                </Link>
                                                <Link to="/claims/health/how-it-works" className="submenu-item">
                                                    <FaTools className="submenu-icon" />
                                                    How our claims work
                                                </Link>
                                                <div className="submenu-item contact-item">
                                                    <FaPhoneAlt className="submenu-icon" />
                                                    Need help? contact [91-1140879888]
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
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
