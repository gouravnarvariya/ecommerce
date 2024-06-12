import React from 'react';

const ShimmerCard = ({ count }) => {
  const shimmerCardsArray = Array.from({ length: count });

  return (
    <div className="card-section">
      {shimmerCardsArray.map((_, index) => (
        <div key={index} className="box">
          <h1>category</h1>
          <img src="https://media.istockphoto.com/id/1050482104/photo/business-logistics-concept-businessman-manager-touching-icon-for-logistics-on-modern-trade.jpg?s=612x612&w=0&k=20&c=h8HOBY4jwzOsQIRMgjBVoX6lCCMohMP00aHiJTvDf00=" alt="box1" />
          <span>Shop now</span>
        </div>
      ))}
    </div>
  );
};

export default ShimmerCard;