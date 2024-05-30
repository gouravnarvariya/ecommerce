import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PaymentSuccessPopup from "./PaymentSuccessPopup";
import { CardIcon } from "../../../images";

const  PayementMethod = () => {
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);

  const handlePaymentSuccessPopup = () => {
    setShowPaymentSuccessPopup((p) => !p);
  };



  const optionsCardType = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
  ];
  const optionsBankType = [
    { value: "Union Bank Of India", label: "Union Bank Of India" },
    { value: "Bank Of Baroda", label: "Bank Of Baroda" },
    { value: "State BAnk Of India", label: "State BAnk Of India" },
  ];

    const navigate = useNavigate()
    const [paymentStatus, setPaymentStatus] = useState({
    afterProceed: false,
    afterAddCardBtn: false,
    paynowBtn: true,
  });



  const clickOnAddCardBtn = () => {
    setPaymentStatus((p) => ({ ...p, afterAddCardBtn: true, paynowBtn: false }));
  };




  const closePaymentBox = () => {
    setPaymentStatus({
      afterProceed: true,
      afterAddCardBtn: false,
      paynowBtn: true,
    });
  };
  const clickOnPay =() =>{
    const role = localStorage.getItem('userType')
    const isHr = role === "HR" 
    isHr && navigate('/payment-success')
  }

  return (
    <>
      <div className="card wthdrwlamnt-card">
        <div className="wthdrwlamnt-sec">
            <div className="cardtls-sec">
              <div className="wthdrwl-wraper">
                <div className="wthdrwa-heading">
                  <h3>Payment Method</h3>
                  <div className="adnew-crdbtn">
                    <span className="adcrdbtn-main" onClick={clickOnAddCardBtn}>
                      Add New Card
                    </span>
                  </div>
                </div>
                {/* <div className="savdcard-list">
                  <ul>
                    <li>
                      <div className="savdcard-bx">
                        <label>
                          <input type="radio" name="roles" />
                          <div className="savdcard-bx-inner">
                            <em></em>
                            <div className="role-icon">
                              <span>
                                <img src={CardIcon} alt="" />
                              </span>
                            </div>
                            <h5>********1234</h5>
                          </div>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>

          {paymentStatus.afterAddCardBtn && (
            <div className="addnewcard-sec">
              <div className="wthdrwa-heading">
                <h3>Add Card Details</h3>
              </div>
              <div className="flxcrd-input">
                <div className="flxcrd-input-inner-100">
                  <div className="form-inputs">
                    <div className="select-box">
                      <Select
                        options={optionsCardType}
                        placeholder={<div>Select Card Type</div>}
                      />
                    </div>
                  </div>
                </div>
                <div className="flxcrd-input-inner-100">
                  <div className="form-inputs">
                    <div className="select-box">
                      <Select
                        options={optionsBankType}
                        placeholder={<div>Select Bank</div>}
                      />
                    </div>
                  </div>
                </div>
                <div className="flxcrd-input-inner-100">
                  <div className="form-inputs">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter 14 digit Credit / Debit card number"
                    />
                  </div>
                </div>
                <div className="flxcrd-input-inner-50">
                  <div className="form-inputs">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Exp Date"
                    />
                  </div>
                </div>
                <div className="flxcrd-input-inner-50">
                  <div className="form-inputs">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
              <div className="savecrd-infobtn">
                <button className="btn secondary-btn" >
                  Make payment
                </button>
              </div>
            </div>
          )}

          {/* {paymentStatus.paynowBtn && (
            <div className="prced-btn">
              <button className="btn primary-btn" onClick={handlePaymentSuccessPopup}>Pay Now</button>
            </div>
          )} */}
        </div>
      </div>




      {showPaymentSuccessPopup && <PaymentSuccessPopup handlePopup={handlePaymentSuccessPopup} />}
    </>
  );
};



export default PayementMethod