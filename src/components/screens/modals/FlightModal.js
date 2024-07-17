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
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: show ? "block" : "none", color: "black" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Booking</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {flight && (
              <>
                <p>
                  <strong>Airline:</strong> {flight.airline}
                </p>
                <p>
                  <strong>Flight Number:</strong> {flight.flightNumber}
                </p>
                <p>
                  <strong>From:</strong> {flight.from}
                </p>
                <p>
                  <strong>To:</strong> {flight.to}
                </p>
                <p>
                  <strong>Departure:</strong>{" "}
                  {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>
                  <strong>Arrival:</strong>{" "}
                  {new Date(flight.arrivalTime).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
                <p>
                  <strong>Seats Available:</strong> {flight.seatsAvailable}
                </p>
                <p>
                  <strong>Seat Type:</strong> {flight.seatType}
                </p>
                <p>
                  <strong>Status:</strong> {flight.status}
                </p>
                <p>
                  <strong>Number of Seats:</strong> {numberOfSeats}
                </p>
              </>
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
