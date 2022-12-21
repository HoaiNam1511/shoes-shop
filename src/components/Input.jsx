import React from "react";
import { memo } from "react";
import PropTypes from "prop-types";
const Input = ({
  placeholder,
  value,
  onChange,
  width = "auto",
  height = "37px",
}) => {
  console.log("Load Input");
  return (
    <div>
      <label htmlFor=""></label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          height: height,
          width: width,
          borderRadius: "8px",
          border: "1px solid #ced4da",
          lineHeight: "1.5",
          fontSize: "16px",
          fontWeight: "400",
          //outline: "none",
          padding: "0 10px 0 10px",
          marginBottom: "8px",
        }}
      />
    </div>
  );
};
Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default memo(Input);
