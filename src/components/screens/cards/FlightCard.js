import React from "react";

function FlightCard({ flight }) {
  const { airline, from, to, departure, arrival, price } = flight;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{airline}</h5>
        <p className="card-text">{from} to {to}</p>
        <p className="card-text">Departure: {departure}</p>
        <p className="card-text">Arrival: {arrival}</p>
        <p className="card-text"><strong>{price}</strong></p>
        <a href="#" className="btn btn-primary">Book Now</a>
      </div>
    </div>
  );
}



export default FlightCard;
