import React from 'react';
import './CancelBookingModal.css'; // Create a CSS file for modal styling

const CancelBookingModal = ({ show, handleClose, booking, handleConfirmCancel }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none', color:"black"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cancel Booking</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {booking && (
              <>
                <p><strong>Booking Type:</strong> {booking.bookingType}</p>
                <p><strong>Details:</strong> {booking.details}</p>
                {/* Add more details as needed */}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmCancel}>Confirm Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CancelBookingModal;
