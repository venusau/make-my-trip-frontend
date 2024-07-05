import React, { useEffect, useState } from "react";

import BookingCard from "./cards/Bookingcard";

function Dashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user bookings
    fetch("https://make-my-trip-backend.onrender.com/api/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>{
        const {booking} = data
        setBookings(booking)})
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))
      )}
      
    </div>
  );
}

export default Dashboard;
