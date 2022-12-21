import React from "react";
import "../scss/_modal.scss";
import { memo } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
const Modal = ({
  closeModal,
  children,
  title = "Modal Title",
  height = "520px",
  width = "500px",
}) => {
  console.log("Load Modal");
  const [modal, setModal] = useState(false);
  const handleModalClose = () => {
    setModal(true);
    closeModal(false);
  };
  return (
    <div className="modal__background">
      <div
        className={`modal__container ${modal ? "modal--close" : "modal--open"}`}
        style={{
          height: height,
          width: width,
        }}
      >
        <div className="modal__header">
          <h2>{title}</h2>
          <button className="modal__header__button" onClick={handleModalClose}>
            x
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default memo(Modal);
