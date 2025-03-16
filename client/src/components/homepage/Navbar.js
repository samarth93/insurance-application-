import logo from "./images/Logo.png";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import Nav2 from "./Nav2";
import { GiReceiveMoney } from "react-icons/gi";


const  Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div>
        <div className='home_nav'>
         <nav className='main_nav'>
         <a href="/"><img src="/default.png" alt="logo" className="hid"></img></a>
         
         
         <div className="navlinks_div nav_left">
         <ul class="navlinks">
         <li>
  <a href="/">
    <img 
      className="logo" 
      src="/default.png" 
      alt="logo" 
      style={{
        width: "170px", 
        height: "40px", 
        borderRadius: "10px", 
        transition: "transform 0.3s ease-in-out"
      }} 
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
    />
  </a>
</li>
                    <li><a href="#">Product</a></li>
                    <li><a href="#">Resources</a></li>
                </ul>
                </div>
               

                <div className="navlinks_div nav_right">
             <ul class="navlinks">
                    <li><a href="#"><div className="nav_claim">
                        <p style={{marginTop:"3px"}}>Claim, edit, renew & more</p>
                        <button className="nav_login">Login <i class="fas fa-chevron-down"></i></button>
                    </div></a>
                    </li>
                    <li className="nav_help"><a href="#">Help</a></li>
                </ul>
               
                </div>
                <div className="hamburger-menu">
                <Hamburger toggled={isOpen} toggle={setOpen} duration={0.8} size={20}/><a href="#" className="" onClick={()=>setOpen(!setOpen)}></a>
                </div>
         </nav>

        </div>
       {isOpen? <Nav2></Nav2> : null}
        
        </div>
    )
}

export default Navbar
