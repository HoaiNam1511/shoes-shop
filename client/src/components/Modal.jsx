import React from "react";
import "../scss/_modal.scss";
import { memo } from "react";
function Modal({ closeModal, children, title, height, width }) {
  console.log("Load Modal");
  return (
    <div className="modalBackground">
      <div
        className="modalContainer"
        style={{
          height: `${height !== undefined ? height : "520px"}`,
          width: `${width !== undefined ? width : "500px"}`,
          padding: "25px",
        }}
      >
        <div className="modal__header">
          <h2>{`${title !== undefined ? title : "Modal Title"}`}</h2>
          <button
            className="modal__header__button"
            onClick={() => closeModal(false)}
          >
            x
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
export default memo(Modal);
