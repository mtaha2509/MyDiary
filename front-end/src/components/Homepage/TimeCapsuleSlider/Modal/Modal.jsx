import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, title, imageUrl, messageToFutureSelf }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="time-modal-overlay">
      <div className="time-modal-content">
        <div className="time-modal-left">
          <img src={imageUrl} alt={title} className="time-modal-image" />
          <h3 className="time-modal-title">{title}</h3>
        </div>
        <div className="time-modal-right">
          <p className="time-modal-description">{messageToFutureSelf}</p>
        </div>
        <button className="time-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
