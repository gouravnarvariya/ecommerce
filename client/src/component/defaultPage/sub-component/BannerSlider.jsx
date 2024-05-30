import React, { useState } from 'react';

const Slider = ({ images }) => {
    console.log("sdf")
    console.log(images)
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      {images.map((image, index) => (
        <div key={index} className={index === currentIndex ? 'slide active' : 'slide'}>
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
