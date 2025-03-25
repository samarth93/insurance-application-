import React from 'react';
import Navbar from '../homepage/Navbar';
import './MainLayout.css';

const MainLayout = ({ children, hideNavbar }) => {
  return (
    <div className="main-layout">
      {!hideNavbar && <Navbar />}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

// Default props
MainLayout.defaultProps = {
  hideNavbar: false
};

export default MainLayout; 