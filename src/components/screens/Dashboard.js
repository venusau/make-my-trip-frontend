import React, { useEffect, useState } from "react";
import BookingCard from "./cards/Bookingcard";
import CancelBookingModal from "./modals/CancelBookingModal"; // Import the modal

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch("https://make-my-trip-backend.vercel.app/api/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { booking } = data;
        setBookings(booking);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const handleCancelBooking = (booking) => {
    console.log('Selected booking:', JSON.stringify(booking, null, 2));
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    try {
      await fetch(`https://make-my-trip-backend.vercel.app/api/booking/${selectedBooking._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setBookings(bookings.filter((booking) => booking._id !== selectedBooking._id));
      handleCloseModal();
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} onCancel={() => handleCancelBooking(booking)} />
        ))
      )}

      <CancelBookingModal
        show={showModal}
        handleClose={handleCloseModal}
        booking={selectedBooking}
        handleConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}

export default Dashboard;
