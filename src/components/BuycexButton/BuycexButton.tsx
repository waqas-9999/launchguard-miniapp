import React, { useState } from "react";
import "./BuycexButton.css";

interface RemittixButtonProps {
  text: string;
  leftImage?: string | null;
  rightImage?: string | null;
  leftMargine?: number;
  rightMargine?: number;
  showLeftImage?: boolean;
  showRightImage?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  hoverColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  gradientStartColor?: string | null;
  gradientEndColor?: string | null;
  borderColor?: string;
  onClick?: () => void;
}

const RemittixButton: React.FC<RemittixButtonProps> = ({
  text,
  leftImage = null, // Image on the left

  rightImage = null, // Image on the right
  leftMargine = 0,
  rightMargine = 0,
  showLeftImage = true, // Toggle display for left image
  showRightImage = true, // Toggle display for right image
  width = "100%", // Default width is 100%, can be set via props
  height = "44px", // Fixed height
  backgroundColor = "#efb81c", // Default background color - updated to primary
  hoverColor = "#d4a017", // Default hover color - darker shade of primary
  textColor = "#000", // Default text color
  hoverTextColor = "#000", // Text color on hover
  gradientStartColor = null, // Start color for gradient
  gradientEndColor = null, // End color for gradient (optional)
  borderColor = "#000", // Default border color
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if gradient should be applied
  const backgroundStyle =
    gradientStartColor && gradientEndColor
      ? `linear-gradient(90deg, ${gradientStartColor} 0%, ${gradientEndColor} 95%`
      : backgroundColor;

  return (
    <button
      className="remittix__button"
      onClick={onClick}
      style={{
        width: width,
        height: height,
        background: isHovered ? hoverColor : backgroundStyle, // Apply hover color or default background
        color: isHovered ? hoverTextColor : textColor, // Change text color on hover
        borderColor: borderColor, // Apply border color
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showLeftImage && leftImage && (
        <img
          src={leftImage}
          alt="left icon"
          className="remittix__button-left-image"
          style={{ marginLeft: leftMargine }}
        />
      )}
      <span className="remittix__button-text text-xl font-semibold">{text}</span>
      
    </button>
  );
};

export default RemittixButton;
