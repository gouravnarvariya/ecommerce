import React from "react";
const PaymentSuccessPopup = ({ handlePopup }) => {
   
  return (
    <>
      <div className="logout-modal">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="rlsttpwb-tabs">
              <div className="innerpop-descrp">
                <div className="popbtm-dtl">
                 <div className="paymntsucss-msg">
                  <div className="sucse-iconpymnt">
                    <span>
                    <svg width="98" height="90" viewBox="0 0 98 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="35.1483" cy="54.7831" r="35.1483" fill="#3EEDE6"/>
<path d="M22.1539 31.365C21.7635 31.0939 21.2362 31.135 20.8926 31.4633L15.9516 36.1849C15.56 36.5592 15.5344 37.1734 15.8957 37.577C23.1451 45.6756 36.2587 61.7011 40.1799 71.4017C40.5507 72.3192 42.0575 72.4286 42.4528 71.5215C53.3155 46.5967 77.5841 1.70223 97.6917 0H87.7415C87.5437 0 87.3581 0.0533388 87.1939 0.163639C76.2216 7.53691 52.0513 26.6052 41.1588 45.3094C30.5397 63.5443 36.772 53.7632 41.3293 45.7879C41.5856 45.3394 41.4553 44.7701 41.031 44.4754L22.1539 31.365Z" fill="black"/>
</svg>

                    </span>
                  </div>
                  <h3>Payment Successful</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur , sed do eiusmod tempor</p>
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



export default PaymentSuccessPopup