import Header from "../Header/Header";
import style from "./addtional.details.module.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import calendericon from "./calender.svg"
import noteicon from "./note.svg"
import { OwnDamagePlan1 } from "../OwnDamagePlan/OwnDamagePlan1/OwnDamagePlan1";
import { OwnDamagePlan2 } from "../OwnDamagePlan/OwnDamagePlan2/OwnDamagePlan2";
import { TopProgressBar } from "./TopProgressBar";
import { Pop } from "./Pop";
import axios from "axios";
// import firebase from "./firebase.js"
// import { DropDownPopup } from "./DropDownPopup";
import { useHistory } from "react-router-dom";
export const AddtionalDetails = () => {


    const id = localStorage.getItem("ackoid");
    
    const [droppopup, setDropPopup] = useState(false);

    const [username, setUsername] = useState("");
  const [mail, setMail] = useState("")
  
//  const  configureCaptcha = () => {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//       "sign-in-button",
//       {
//         'size': "invisible",
//         'callback': (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           handleClickk();
//           console.log("recaptcha");
//         },
//         defaultCountry:"IN"
//       }
//     );
//   }
  const history=useHistory()

  const handleClickk = async (e) => {
    try {
      // Save user data
      const data = {
        username: username,
        email: mail
      };
      
      // Try to update the car data with user information
      await axios.patch(`https://acko.herokuapp.com/cars/${id}`, data)
        .catch(error => {
          console.error("Error updating car data:", error);
          // Continue even if the API call fails
        });
      
      // Navigate directly to the payment page
      history.push("/cardPayment");
    } catch (error) {
      console.error("Error in handleClickk:", error);
      // If any error occurs, still try to navigate
      history.push("/cardPayment");
    }
  };





/////////////////////////////////////////////////////

    const [selectDate, setSelectDate] = useState(null);


    const [OtpPopup, setOtpPopup] = useState(false);

    if(OtpPopup){
        return (
            <div>
                <Pop />
            </div>
        )
    }


    return (
      <div className={style.maindiv}>
        {/* <OtpPopup OtpPopup={OtpPopup} setOtpPopup={setOtpPopup} /> */}
        <Header />

        {/* <MoreDetails /> */}

        <div className={style.flexdiv}>
          <div className={style.flexdiv1}>
            <div className={style.detailsmaindiv}>
              <div className={style.topdottedline}>
                {/* <hr className={style.dottedline}/> */}
                <TopProgressBar />
              </div>
              <div className={style.title}>Answer a few more questions</div>
              <div className={style.titlediscription}>
                We ask for minimum information required to issue your policy.
                You can always add additional details like nominee details &
                address post policy issuance
              </div>

              <div className={style.fullnamediv}>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  placeholder="Full Name"
                  className={style.nameinput}
                />
              </div>

              <div className={style.emaildiv}>
                <input
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                  className={style.emailinput}
                />
              </div>

              <div className={style.instuction1}>
                Ensure you never miss out on important policy updates by
                entering you most-used email
              </div>

              <div className={style.mobilediv}>
                <input
                  type='tel'
                  placeholder="Mobile Number"
                  className={style.mobilinput}
                />
              </div>

              <div className={style.instuction2}>
                OTP will be sent to the given number
              </div>

              <div className={style.dropdowndiv}>
                <select name="test" id="insurance" className={style.dropdown}>
                  <option value="" disabled selected>
                    Previous Insurer
                  </option>
                  <option value="Bharti AXA General Insurance Company Limited">
                    Bharti AXA General Insurance Company Limited
                  </option>
                  <option value="Cholamandalam MS General Insurance Co. Ltd.">
                    Cholamandalam MS General Insurance Co. Ltd.
                  </option>
                  <option value="DHFL General Insurance Limited">
                    DHFL General Insurance Limited
                  </option>
                  <option value="Edelweiss General Insurance Company Limited">
                    Edelweiss General Insurance Company Limited
                  </option>
                  <option value="Future General India Insurance Company Limited">
                    Future General India Insurance Company Limited
                  </option>
                </select>
              </div>
                    {/* Drop down popup for Previuos Insurer */}
              {/* <div className={style.dropdownmaindiv} >
                Previous Insurer
              </div>
              <div className={style.dorpdownpopupdiv} onClick={()=> {setDropPopup(!droppopup)}}>
                  <DropDownPopup droppopup={droppopup}/>
              </div> */}
              <div className={style.new}>
                <p>When should your new policy start?</p>

                <div className={style.startoptions}>
                  <div className={style.tomorrowbtndiv}>
                    <button className={style.tomorrowbtn}>Tomorrow</button>
                  </div>

                  <div className={style.calenderdiv}>
                    <DatePicker
                      className={style.calender}
                      placeholderText="Choose Date"
                      selected={selectDate}
                      onChange={(date) => setSelectDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.noticediv}>
              <div>
                <div className={style.divnotice}>
                  <div className={style.notic}>
                    You will recieve your policy instantly as you make the
                    payment, and your policy will start at 12 am, from your
                    choosen date.
                  </div>
                  <div className={style.divnoticicon}>
                    <img src={calendericon} alt="" />
                  </div>
                </div>
                <br />
                {/* <hr /> */}
                <hr
                  style={{
                    width: "90%",
                    margin: "auto",
                    color: "#e9eaf2",
                  }}
                />
                <div className={style.divnote}>
                  <div className={style.divnoteicons}>
                    <img src={noteicon} alt="" />
                  </div>
                  <div className={style.note}>
                    <b className={style.fontwidth}>Please note :</b> Previous
                    year policy document is required in case of claim within 30
                    days of the Acko Policy start date
                  </div>
                </div>
              </div>
            </div>

            <div className={style.termsandconditions}>
              <p>
                {" "}
                By tapping on continue I declare that i have provided correct
                details and have read Acko's <a href="">T&C</a>.
              </p>
            </div>

            <div className={style.continuebtndiv}>
              <button
            
                onClick={handleClickk}
                className={style.continuebtn}
              >
                Continue
              </button>
            </div>
          </div>

          <div className={style.flexdiv2}>
            <div style={{ marginBottom: "16px" }}>
              <OwnDamagePlan1 />
            </div>

            <div>
              <OwnDamagePlan2 />
            </div>
          </div>
        </div>
      </div>
    );
}
