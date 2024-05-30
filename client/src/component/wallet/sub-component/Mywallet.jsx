import React from "react";

const Mywallet = (props) => {
  console.log(props)
  return (
    <>
      <div className="walet-money-card">
        <div className="waletmny-inner">
          <p>Total Amount</p>
          <h3>{props.totalAmount}</h3>
        </div>
      </div>
    </>
  );
};

export default Mywallet;
