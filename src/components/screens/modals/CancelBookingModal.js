import React from "react";
import { format } from "date-fns";

function formatDate(dateString) {
  return dateString
    ? format(new Date(dateString), "MMMM d, yyyy, h:mm a")
    : "N/A";
}

const CancelBookingModal = ({
  show,
  handleClose,
  booking,
  handleConfirmCancel,
}) => {
  if (!booking) {
    return null;
  }
  console.log(booking);

  return (
    <div
  className={`modal fade ${show ? "show" : ""}`}
  tabIndex="-1"
  style={{ display: show ? "block" : "none", color: "black" }}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <div className="modal-header" style={{ backgroundColor: '#008cff', color: 'white', border: 'none' }}>
        <h5 className="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Cancel Booking
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body" style={{ padding: '24px' }}>
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div style={{ backgroundColor: '#f2f2f2', padding: '15px', borderRadius: '8px' }}>
                <h6 style={{ color: '#4a4a4a', marginBottom: '10px' }}>Booking Details</h6>
                <p style={{ fontSize: '14px', color: '#000', marginBottom: '5px' }}>
                  <strong>{booking.bookingType === 'flight' ? 'Flight' : 'Hotel'} Booking</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '0' }}>
                  Booked on: {formatDate(booking.bookingDate)}
                </p>
              </div>
            </div>
          </div>

          {booking.bookingType === "flight" && booking.flightDetails && (
            <div className="row mb-3">
              <div className="col-6">
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Departure Date</p>
                <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginBottom: '0' }}>
                  {formatDate(booking.flightDetails.departureDate)}
                </p>
              </div>
              <div className="col-6">
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Number of Seats</p>
                <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginBottom: '0' }}>
                  {booking.flightDetails.numberOfSeats}
                </p>
              </div>
            </div>
          )}

          {booking.bookingType === "hotel" && booking.hotelDetails && (
            <div className="row mb-3">
              <div className="col-6">
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Check-in Date</p>
                <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginBottom: '0' }}>
                  {formatDate(booking.hotelDetails.checkInDate)}
                </p>
              </div>
              <div className="col-6">
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Check-out Date</p>
                <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginBottom: '0' }}>
                  {formatDate(booking.hotelDetails.checkOutDate)}
                </p>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Status</p>
              <span
                className={`badge ${
                  booking.status === "Confirmed" ? "bg-success" : "bg-warning"
                }`}
                style={{ fontSize: '14px', padding: '6px 12px', borderRadius: '4px' }}
              >
                {booking.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer" style={{ borderTop: '1px solid #e0e0e0', padding: '16px 24px' }}>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClose}
          style={{ borderRadius: '25px', padding: '8px 20px' }}
        >
          Keep Booking
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleConfirmCancel}
          style={{ borderRadius: '25px', padding: '8px 20px', backgroundColor: '#d63031', border: 'none' }}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default CancelBookingModal;
