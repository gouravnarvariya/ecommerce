import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
// import { setLogged } from "../../../assets/store/headerSlice";

const PopupLogOut = ({ handlePopup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const buttonClicked = (type) => {
    console.log("type" , type)
    if (type) {
      dispatch(logout())
      localStorage.clear();
      navigate("/");

    }
    handlePopup();
  };
  return (
    <>
      <div className="logout-modal">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="rlsttpwb-tabs">
              <div className="innerpop-descrp">
                <div className="popbtm-dtl">
                  <div className="logupp-icon">
                    <em>
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </em>
                  </div>
                  <div className="loout-descrp">
                    <h3>Are you sure you want to Logout?</h3>
                  </div>
                  <div className="logouflx-btn">
                    <button
                      className="btn secondary-btn close-pop"
                      onClick={()=>buttonClicked(false)}
                    >
                      No
                    </button>
                    <button className="btn primary-btn" onClick={()=>{
                      buttonClicked(true)
                    //   dispatch(setLogged())
                    }}>
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  );
};

export default PopupLogOut;
