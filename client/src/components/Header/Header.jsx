import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./header.module.css";
import logo from "./Logo.svg";
import AuthService from "../../services/auth.service";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
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

  return (
    <div className={style.headerbody}>
      <div className={style.headerlogodiv}>
        <a href="/">
          <img
            style={{ fontSize: "120px" }}
            className={style.circlelogo}
            src="/default.png" alt=""
          />
        </a>
      </div>
      <div className={style.headerActions}>
        {isLoggedIn ? (
          <div className={style.userMenu}>
            <span className={style.welcomeText}>
              Welcome, {user?.name || 'User'}
            </span>
            <Link to="/dashboard" className={style.dashboardLink}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className={style.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div className={style.authLinks}>
            <Link to="/login" className={style.loginButton}>
              Login
            </Link>
            <Link to="/register" className={style.registerButton}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
