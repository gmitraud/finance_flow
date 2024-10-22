import React from 'react';
import '../App.css';

const ConfirmationModal = ({ message, onConfirm, onCancel, onClose, isConfirmation = true }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{message}</h3>
        <div>
          {isConfirmation ? (
            <>
              <button onClick={onConfirm} style={{ marginRight: '10px' }}>
                Confirm
              </button>
              <button onClick={onCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
