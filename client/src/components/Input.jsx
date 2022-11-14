import React from "react";
import { memo } from "react";
function Input({ placeholder, value, onChange, width, height }) {
  console.log("Load Input");
  return (
    <div>
      <label htmlFor=""></label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          height: `${height !== undefined ? height : "37px"} `,
          width: `${width !== undefined ? width : "auto"}`,
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
}

export default memo(Input);
