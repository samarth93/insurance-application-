import React, { useState } from 'react'
import style from "./cartype.module.css"
import car from "./Personel car.svg"
import petrol from "./petrol.svg"
import gear from "./gear.svg"
import downarrow from "./Down arrow.svg"
import Petrolpopup from '../Petrolpopup/Petrolpopup'
import Typecarpopup from '../Typecarpopup/Typecarpopup'
import Gearpopup from '../Gearpopup/Gearpopup'
import axios from "axios"
import {Link} from "react-router-dom"

function Cartype() {

    const [carr, setCar] = useState("Swift");

    const [fuel, setFuel] = useState("Petrol");

    const [gearr, setGear] = useState("Titanium AT")
    
    const [petrolpopup, setPetrolpopup] = useState(false);

    const [carpopup, setCarpopup] = useState(false);

    const [gearpopup,setGearpopup]=useState(false)

    const handleContinue = async () => {
        try {
            const id = localStorage.getItem("ackoid");
            if (!id) {
                console.error("No car ID found in localStorage");
                return;
            }
            
            const data = {
                name: carr,
                fuel: fuel,
                gear: gearr,
            };
            
            await axios.patch(`https://acko.herokuapp.com/cars/${id}`, data);
            console.log("Car details updated successfully");
        } catch (error) {
            console.error("Error updating car details:", error);
        }
    };

    return (
      <div className={style.cartypebody}>
        <h2 className={style.cartypehead}>Which Car do you drive?</h2>
        <div className={style.cartypesection}>
          <div className={style.cartypeflex}>
            <img src={car} alt="Car" className={style.typeIcon} />
            <p>{carr}</p>
            <button 
              onClick={() => {
                setCarpopup(!carpopup);
                setPetrolpopup(false);
                setGearpopup(false);
              }}
              className={style.dropdownButton}
            >
              <img className={style.imagearrow} src={downarrow} alt="Select" />
            </button>
          </div>
          <hr />
          <Typecarpopup
            setCar={setCar}
            carpopup={carpopup}
            setCarpopup={setCarpopup}
          />
        </div>
        
        <div className={style.cartypesection}>
          <div className={style.cartypeflex}>
            <img src={petrol} alt="Fuel" className={style.typeIcon} />
            <p>{fuel}</p>
            <button
              onClick={() => {
                setPetrolpopup(!petrolpopup);
                setCarpopup(false);
                setGearpopup(false);
              }}
              className={style.dropdownButton}
            >
              <img className={style.imagearrow} src={downarrow} alt="Select" />
            </button>
          </div>
          <hr />
          <Petrolpopup
            petrolpopup={petrolpopup}
            setFuel={setFuel}
            setPetrolpopup={setPetrolpopup}
          />
        </div>
        
        <div className={style.cartypesection}>
          <div className={style.cartypeflex}>
            <img src={gear} alt="Transmission" className={style.typeIcon} />
            <p>{gearr}</p>
            <button
              onClick={() => {
                setGearpopup(!gearpopup);
                setPetrolpopup(false);
                setCarpopup(false);
              }}
              className={style.dropdownButton}
            >
              <img className={style.imagearrow} src={downarrow} alt="Select" />
            </button>
          </div>
          <hr />
          <Gearpopup
            gearpopup={gearpopup}
            setGearpopup={setGearpopup}
            setGear={setGear}
          />
        </div>
        
        <div className={style.continueButtonContainer}>
          <Link to="/cars/cardetail">
            <button
              onClick={handleContinue}
              className={style.cartypebtn}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    );
}

export default Cartype
