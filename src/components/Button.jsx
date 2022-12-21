import React from "react";
import "../scss/_variables.scss";
import { memo } from "react";
import PropTypes from "prop-types";
const Button = ({
  onClick,
  children,
  height = "37px",
  width = "130px",
  fontSize = "16px",
  borderRadius = "8px",
  backgroundColor = "#405cf5",
}) => {
  console.log("Load Button");
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
        fontSize: fontSize,
        borderRadius: borderRadius,
        border: "0px solid ",
        backgroundColor: backgroundColor,
        color: "white",
        fontWeight: "700",
      }}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(Button);
