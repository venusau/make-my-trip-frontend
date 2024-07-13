import React from 'react';
import '../css/CancelBookingModal.css'; 
import { format } from 'date-fns';

function formatDate(dateString) {
  return dateString ? format(new Date(dateString), 'MMMM d, yyyy, h:mm a') : 'N/A';
}

const CancelBookingModal = ({ show, handleClose, booking, handleConfirmCancel }) => {
  if (!booking) {
    return null; 
  }
  console.log(booking)

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none', color:"black" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title">
              Cancel Booking: <small className="text-muted">{formatDate(booking.bookingDate)}</small>
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-sm-4"><strong>Booking Type:</strong></div>
                <div className="col-sm-8">{booking.bookingType}</div>
              </div>
              
              {booking.bookingType === 'flight' && booking.flightDetails && (
                <>
                  <div className="row mb-2">
                    <div className="col-sm-4"><strong>Departure Date:</strong></div>
                    <div className="col-sm-8">{formatDate(booking.flightDetails.departureDate)}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-4"><strong>Number of Seats:</strong></div>
                    <div className="col-sm-8">{booking.flightDetails.numberOfSeats}</div>
                  </div>
                </>
              )}

              {booking.bookingType === 'hotel' && booking.hotelDetails && (
                <>
                  <div className="row mb-2">
                    <div className="col-sm-4"><strong>Check-in Date:</strong></div>
                    <div className="col-sm-8">{formatDate(booking.hotelDetails.checkInDate)}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-4"><strong>Check-out Date:</strong></div>
                    <div className="col-sm-8">{formatDate(booking.hotelDetails.checkOutDate)}</div>
                  </div>
                  
                </>
              )}

              <div className="row mb-2">
                <div className="col-sm-4"><strong>Status:</strong></div>
                <div className="col-sm-8">
                  <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-warning'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmCancel}>Confirm Cancellation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;