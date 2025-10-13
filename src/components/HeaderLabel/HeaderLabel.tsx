import "./HeaderLabel.css";

const HeaderLabel = ({
  text,
  type = "label", // 'label' or 'value'
  fontSize = "20px",
  fontWeight = "400",
  color = "#FFF",
  width = "100%",
  height,
  backgroundColor,
  textAlign = "center", // Default text alignment to center
  showBefore = false, // Show top gradient if true
  showAfter = false, // Show bottom gradient if true
}) => {
  const containerClass =
    type === "label" ? "HeaderLabel__container" : "Value__container";

  return (
    <div
      className={`${containerClass}`}
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        width: width,
        height: height || (type === "label" ? "53px" : "43px"),
        backgroundColor:
          backgroundColor ||
          (type === "label"
            ? "rgba(2, 8, 14, 0.50)"
            : "rgba(255, 255, 255, 0.06)"),
        textAlign: textAlign,
      }}
    >
      {showBefore && <div className="gradient-before" />}
      {text}
      {showAfter && <div className="gradient-after" />}
    </div>
  );
};

export default HeaderLabel;
