import React from "react";
const WithdrawalCard = ({ boxShow, setBoxShow }) => {


  const clickOnProceed = () =>{
    setBoxShow(p => ({...p , proceedBtn : false , cardBox : true}))
  }
  return (
    <>
      <div className="card wthdrwlamnt-card">
        <div className="wthdrwlamnt-sec">
          <div className="wthdrwl-frstsec">
            <div className="wthdrwl-wraper">
              <div className="wthdrwa-heading">
                <h3>Payment Amount</h3>
              </div>
              <div className="inputwth-euro">
                <div className="form-inputs-boxx">
                <span>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  </span>
                  <h1>{boxShow.amount}</h1>
                </div>
                
              </div>
            </div>
            
            <div className="prced-btn">
              <button className="btn primary-btn" onClick={clickOnProceed}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalCard;
