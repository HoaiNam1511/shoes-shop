import React from "react";
import "../scss/_variables.scss";
import { memo } from "react";
function Button({
  onClick,
  children,
  height,
  width,
  fontSize,
  borderRadius,
  backgroundColor,
}) {
  console.log("Load Button");
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${height !== undefined ? height : "37px"}`,
        width: `${width !== undefined ? width : "130px"}`,
        fontSize: `${fontSize !== undefined ? width : "16px"}`,
        borderRadius: `${borderRadius !== undefined ? borderRadius : "8px"}`,
        border: "0px solid ",
        backgroundColor: `${
          backgroundColor !== undefined ? backgroundColor : "#405cf5"
        }`,
        color: "white",
        fontWeight: "700",
      }}
    >
      {children}
    </button>
  );
}
export default memo(Button);
