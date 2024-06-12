import React, { useState } from "react";
import {
  Breadcrumb,
  Mywallet,
  PayementMethod,
  WithdrawalCard,
} from "./sub-component";
import { useLocation } from "react-router-dom";
const WalletMain = () => {

  const location = useLocation()
  // console.log(location)
  const {totalAmount} = location.state

  const [boxShow, setBoxShow] = useState({
    amount: totalAmount,
    proceedBtn: true,
    cardBox: false,
  });

  return (
    <>
      <main>
        <Breadcrumb />
        <section className="workhistory-section">
          <div className="container">
            <div className="walet-flex">
              <div className="walet-flex-inner">
                <Mywallet totalAmount={totalAmount} />
              </div>
              <div className="walet-flex-inner">
                {boxShow.proceedBtn && <WithdrawalCard boxShow={boxShow} setBoxShow={setBoxShow} />}
                {boxShow.cardBox && <PayementMethod />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WalletMain;
