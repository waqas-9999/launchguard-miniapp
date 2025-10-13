import React, { useState } from "react";
import "./PoweredBy.css";

const PoweredBy = ({ logos = [], leftIcon, rightIcon, logosPerSlide = 5 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the total number of slides based on the number of logos and logos per slide
  const maxIndex = Math.ceil(logos.length / logosPerSlide) - 1;

  const showPrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const showNextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const translateXValue = -(currentIndex * 100);

  return (
    <div className="PoweredBy">
      <button
        className="PoweredBy__arrow PoweredBy__arrow-left"
        onClick={showPrevSlide}
      >
        <img src={leftIcon} alt="Previous" />
      </button>

      <div className="PoweredBy__slider-wrapper">
        <div
          className="PoweredBy__slider"
          style={{
            transform: `translateX(${translateXValue}%)`,
          }}
        >
          {logos.map((logo, index) => (
            <div className="PoweredBy__logo-block" key={index}>
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="PoweredBy__logo"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="PoweredBy__arrow PoweredBy__arrow-right"
        onClick={showNextSlide}
      >
        <img src={rightIcon} alt="Next" />
      </button>
    </div>
  );
};

export default PoweredBy;
