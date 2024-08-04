import React from "react";
import PropTypes from "prop-types";
import "../css/FlightModal.css"; // Import the CSS file for styling

const FlightModal = ({
  show,
  handleClose,
  flight,
  numberOfSeats,
  handleConfirmBooking,
}) => {
  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      tabIndex="-1"
      style={{ display: show ? 'block' : 'none', color:"black" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-plane me-2"></i>
              Confirm Booking
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {flight && (
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-plane me-2 text-primary"></i>Airline:</strong>
                  </div>
                  <div className="col-6">{flight.airline}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-info-circle me-2 text-primary"></i>Flight Number:</strong>
                  </div>
                  <div className="col-6">{flight.flightNumber}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-plane-departure me-2 text-primary"></i>From:</strong>
                  </div>
                  <div className="col-6">{flight.from}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-plane-arrival me-2 text-primary"></i>To:</strong>
                  </div>
                  <div className="col-6">{flight.to}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="far fa-clock me-2 text-primary"></i>Departure:</strong>
                  </div>
                  <div className="col-6">{new Date(flight.departureTime).toLocaleString()}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="far fa-clock me-2 text-primary"></i>Arrival:</strong>
                  </div>
                  <div className="col-6">{new Date(flight.arrivalTime).toLocaleString()}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i class="fa-solid fa-indian-rupee-sign me-2 text-primary"></i>Price:</strong>
                  </div>
                  <div className="col-6">{flight.price}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-chair me-2 text-primary"></i>Seats Available:</strong>
                  </div>
                  <div className="col-6">{flight.seatsAvailable}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-chair me-2 text-primary"></i>Seat Type:</strong>
                  </div>
                  <div className="col-6">{flight.seatType}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-info-circle me-2 text-primary"></i>Status:</strong>
                  </div>
                  <div className="col-6">{flight.status}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong><i className="fas fa-users me-2 text-primary"></i>Number of Seats:</strong>
                  </div>
                  <div className="col-6">{numberOfSeats}</div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FlightModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  flight: PropTypes.object,
  numberOfSeats: PropTypes.number.isRequired,
  handleConfirmBooking: PropTypes.func.isRequired,
};

export default FlightModal;
