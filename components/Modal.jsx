import React from 'react';
import './Modal.css'

function Modal({ children, onClose }) {
  return (
    <div className="full-screen-modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {children}
        <button>Close</button>
      </div>
    </div>
  );
}

export default Modal;
