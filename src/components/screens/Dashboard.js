import React, { useEffect, useState } from "react";
import CancelBookingModal from "./modals/CancelBookingModal"; // Import the modal
import { NavLink } from "react-router-dom";
import Notification from "./toasts/Notification";
import { ToastContainer } from "react-bootstrap";
import { format } from "date-fns";

function formatDate(dateString) {
  return dateString
    ? format(new Date(dateString), "MMMM d, yyyy, h:mm a")
    : "N/A";
}

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBgType, setToastBgType] = useState("danger");
  const handleToastClose = () => setShowToast(false);

  console.log(bookings);
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
    console.log("Selected booking:", JSON.stringify(booking, null, 2));
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(
        `https://make-my-trip-backend.vercel.app/api/booking/${selectedBooking._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const data = await response.json();
      setToastMessage(data.message);
      setToastBgType("success");
      setShowToast(true);
      setBookings(
        bookings.filter((booking) => booking._id !== selectedBooking._id)
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setToastMessage(err.message);
      setToastBgType("danger");
      setShowToast(true);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div className="container">
        <h2
          className="text-center mb-4"
          style={{ color: "#000", fontWeight: "bold", fontSize: "28px" }}
        >
          Your Trips
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center p-5 bg-white rounded shadow-sm">
            <img
              src="https://png.pngtree.com/png-vector/20221227/ourmid/pngtree-hand-drawn-app-folder-empty-state-vector-illustration-png-image_6507785.png"
              alt="No bookings"
              style={{ width: "150px", marginBottom: "20px" }}
            />
            <h3 style={{ color: "#4a4a4a", marginBottom: "10px" }}>
              No trips booked yet!
            </h3>
            <p style={{ color: "#9b9b9b", marginBottom: "20px" }}>
              Time to pack your bags and start exploring.
            </p>
            <NavLink
              to="/flights"
              className="btn btn-primary"
              style={{
                backgroundColor: "#008cff",
                border: "none",
                borderRadius: "25px",
                padding: "10px 25px",
              }}
            >
              Plan a Trip
            </NavLink>
          </div>
        ) : (
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking._id} className="col-md-6 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <div
                    className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor:
                        booking.bookingType === "flight"
                          ? "#0091ff"
                          : "#008cff",
                      border: "none",
                    }}
                  >
                    <h5 className="mb-0">
                      {booking.bookingType === "flight" ? "Flight" : "Hotel"}{" "}
                      Booking
                    </h5>
                    <span className="badge bg-light text-primary">
                      {booking.status}
                    </span>
                  </div>
                  <div className="card-body">
                    {booking.bookingType === "flight" ? (
                      <>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <p
                              className="mb-0"
                              style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {booking.departureCity}
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontSize: "14px", color: "#4a4a4a" }}
                            >
                              {booking.departureTime}
                            </p>
                          </div>
                          <div className="text-center">
                            <i
                              className="fas fa-plane"
                              style={{ color: "#008cff" }}
                            ></i>
                          </div>
                          <div>
                            <p
                              className="mb-0"
                              style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {booking.arrivalCity}
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontSize: "14px", color: "#4a4a4a" }}
                            >
                              {booking.arrivalTime}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mb-2"
                          style={{ fontSize: "14px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-calendar-alt mr-2"
                            style={{ color: "#008cff" }}
                          ></i>{" "}
                          {formatDate(booking.flightDetails.departureDate)}
                        </p>
                        <p
                          className="mb-0"
                          style={{ fontSize: "14px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-plane-departure mr-2"
                            style={{ color: "#008cff" }}
                          ></i>{" "}
                          {booking.airline || "Emirates" || "Air India"}
                        </p>
                      </>
                    ) : (
                      <>
                        <h6 className="mb-3" style={{ color: "#000" }}>
                          {booking.hotelName}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <p
                              className="mb-0"
                              style={{ fontSize: "14px", color: "#4a4a4a" }}
                            >
                              Check-in
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontWeight: "bold", color: "#000" }}
                            >
                              {formatDate(booking.hotelDetails.checkInDate)}
                            </p>
                          </div>
                          <div className="text-center">
                            <i
                              className="fas fa-arrow-right"
                              style={{ color: "#008cff" }}
                            ></i>
                          </div>
                          <div>
                            <p
                              className="mb-0"
                              style={{ fontSize: "14px", color: "#4a4a4a" }}
                            >
                              Check-out
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontWeight: "bold", color: "#000" }}
                            >
                              {formatDate(booking.hotelDetails.checkOutDate)}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mb-2"
                          style={{ fontSize: "14px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-map-marker-alt mr-2"
                            style={{ color: "#008cff" }}
                          ></i>{" "}
                          {booking.location}
                        </p>
                        <p
                          className="mb-0"
                          style={{ fontSize: "14px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-users mr-2"
                            style={{ color: "#008cff" }}
                          ></i>{" "}
                          {booking.hotelDetails.guests} Guests
                        </p>
                      </>
                    )}
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="btn btn-outline-danger btn-sm"
                      style={{ borderRadius: "20px" }}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CancelBookingModal
          show={showModal}
          handleClose={handleCloseModal}
          booking={selectedBooking}
          handleConfirmCancel={handleConfirmCancel}
        />

        <ToastContainer position="top-end" className="p-3">
          <Notification
            show={showToast}
            onClose={handleToastClose}
            message={toastMessage}
            bgType={toastBgType}
          />
        </ToastContainer>
      </div>
    </div>
  );
}

export default Dashboard;
