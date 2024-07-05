import React from "react";

function HotelCard({ hotel }) {
  const { name, location, image, price } = hotel;

  return (
    <div className="card mb-3">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{location}</p>
        <p className="card-text"><strong>{price}</strong> per night</p>
        <a href="#" className="btn btn-primary">Book Now</a>
      </div>
    </div>
  );
}

export default HotelCard;
