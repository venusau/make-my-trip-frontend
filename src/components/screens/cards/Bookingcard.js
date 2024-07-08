import React from "react";
import { format } from "date-fns";
import PropTypes from 'prop-types';
import "./BookingCard.css";

function BookingCard({ booking, onCancel }) {
  const { bookingType, bookingDate, ...details } = booking;
  const { flightDetails, hotelDetails } = details;

  const formattedBookingDate = format(new Date(bookingDate), "PPPpp");

  const formatDate = (date) => format(new Date(date), "PPPpp");

  return (
    <div className="card booking-card mb-3">
      <div className="card-body">
        <h5 className="card-title">{bookingType}</h5>
        <div className="card-text details">
          {flightDetails ? (
            <>
              <p>Number of Seats: {flightDetails.numberOfSeats}</p>
              <p>Departure Date: {formatDate(flightDetails.departureDate)}</p>
            </>
          ) : (
            <>
              <p>Room Number: {hotelDetails.roomNumber}</p>
              <p>Check-In: {formatDate(hotelDetails.checkInDate)}</p>
              <p>Check-Out: {formatDate(hotelDetails.checkOutDate)}</p>
            </>
          )}
        </div>
        <p className="card-text date">
          <small className="text-muted">{formattedBookingDate}</small>
        </p>
        <button className="btn btn-danger" onClick={() => onCancel(booking)}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BookingCard;
