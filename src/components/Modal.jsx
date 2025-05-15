import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button className="modal-close" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default Modal;