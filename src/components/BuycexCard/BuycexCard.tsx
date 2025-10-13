import React from "react";
import "./BuycexCard.css";

const RemittixCard = ({
  backgroundImage,
  children,
  width = "408px", // Default width
  height = "480px", // Default height
  padding = "30px", // Default padding
}) => {
  const cardStyle = {
    width,
    height,
    padding,
  };

  return (
    <div className="RemittixCard" style={cardStyle}>
      <img
        src={backgroundImage}
        alt="Background"
        className="RemittixCard__background"
      />
      <div className="RemittixCard__gradient-left"></div>
      <div className="RemittixCard__gradient-right"></div>
      <div className="RemittixCard__gradient-top"></div>
      <div className="RemittixCard__gradient-bottom"></div>
      <div className="RemittixCard__content">{children}</div>
    </div>
  );
};

export default RemittixCard;
