import React, { useEffect, useState } from "react";
import CancelBookingModal from "./modals/CancelBookingModal";
import { NavLink } from "react-router-dom";
import Notification from "./toasts/Notification";
import { ToastContainer } from "react-bootstrap";
import { format } from "date-fns";
import axios from "axios";

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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://make-my-trip-backend.vercel.app/api/booking",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const fetchedBookings = response.data.bookings || [];
        console.log(fetchedBookings);
        setBookings(fetchedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setToastMessage("Error fetching bookings. Please try again.");
        setToastBgType("danger");
        setShowToast(true);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (booking) => {
    if (booking) {
      console.log("Selected booking:", JSON.stringify(booking, null, 2));
      setSelectedBooking(booking);
      setShowModal(true);
    } else {
      console.error("Attempted to cancel undefined booking");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking || !selectedBooking._id) {
      console.error("No booking selected for cancellation");
      return;
    }

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
      setToastMessage(data.message || "Booking cancelled successfully");
      setToastBgType("success");
      setShowToast(true);
      setBookings(
        bookings.filter((booking) => booking._id !== selectedBooking._id)
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setToastMessage(
        err.message || "Error cancelling booking. Please try again."
      );
      setToastBgType("danger");
      setShowToast(true);
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#E5E5E5" }}
    >
      <div className="container">
        <h2
          className="text-center mb-4"
          style={{ color: "#000", fontWeight: "bold", fontSize: "24px" }}
        >
          Your Trips
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center p-5 bg-white rounded shadow-sm">
            <img
              src="https://imgak.mmtcdn.com/mima/images/Desktop/upcoming-empty.png"
              alt="No bookings"
              style={{ width: "200px", marginBottom: "20px" }}
            />
            <h3
              style={{
                color: "#4a4a4a",
                marginBottom: "10px",
                fontSize: "18px",
              }}
            >
              You haven't booked any trips yet!
            </h3>
            <p
              style={{
                color: "#9b9b9b",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Explore and book amazing travel experiences.
            </p>
            <NavLink
              to="/flights"
              className="btn"
              style={{
                backgroundColor: "#008CFF",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "bold",
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
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor:
                        booking.bookingType === "flight"
                          ? "#0091EA"
                          : "#00897B",
                      padding: "12px 15px",
                    }}
                  >
                    <h5
                      className="mb-0 text-white"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {booking.bookingType === "flight" ? "Flight" : "Hotel"}{" "}
                      Booking
                    </h5>
                    
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "15px" }}>
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
                              {booking.flightDetails?.flightInfo?.from || "N/A"}
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontSize: "13px", color: "#4a4a4a" }}
                            >
                              {formatDate(
                                booking.flightDetails?.flightInfo?.departureTime
                              ) || "N/A"}
                            </p>
                          </div>
                          <div className="text-center">
                            <i
                              className="fas fa-plane"
                              style={{ color: "#0091EA", fontSize: "20px" }}
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
                              {booking.flightDetails?.flightInfo?.to || "N/A"}
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontSize: "13px", color: "#4a4a4a" }}
                            >
                              {formatDate(
                                booking.flightDetails?.flightInfo?.arrivalTime
                              )}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mb-2"
                          style={{ fontSize: "13px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-calendar-alt mr-2"
                            style={{ color: "#0091EA" }}
                          ></i>
                          {formatDate(booking.flightDetails?.departureDate)}
                        </p>
                        <p
                          className="mb-0"
                          style={{ fontSize: "13px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-plane-departure mr-2"
                            style={{ color: "#0091EA" }}
                          ></i>
                          {booking.flightDetails?.flightInfo?.airline ||
                            "Airline not available"}
                        </p>
                      </>
                    ) : (
                      <>
                        <h6
                          className="mb-3"
                          style={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                         <i class="fa-solid fa-hotel text-success me-2"></i>{booking.hotelDetails?.hotelInfo?.name || "N/A"}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <p
                              className="mb-0"
                              style={{ fontSize: "13px", color: "#4a4a4a" }}
                            >
                              Check-in
                            </p>
                            <p
                              className="mb-0"
                              style={{
                                fontWeight: "bold",
                                color: "#000",
                                fontSize: "15px",
                              }}
                            >
                              {formatDate(booking.hotelDetails?.checkInDate)}
                            </p>
                          </div>
                          <div className="text-center">
                            <i
                              className="fas fa-arrow-right"
                              style={{ color: "#00897B", fontSize: "16px" }}
                            ></i>
                          </div>
                          <div>
                            <p
                              className="mb-0"
                              style={{ fontSize: "13px", color: "#4a4a4a" }}
                            >
                              Check-out
                            </p>
                            <p
                              className="mb-0"
                              style={{
                                fontWeight: "bold",
                                color: "#000",
                                fontSize: "15px",
                              }}
                            >
                              {formatDate(booking.hotelDetails?.checkOutDate)}
                            </p>
                          </div>
                        </div>
                        <p
                          className="mb-2"
                          style={{ fontSize: "13px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-map-marker-alt mr-2"
                            style={{ color: "#00897B" }}
                          ></i>
                          {booking.hotelDetails?.hotelInfo?.city || "N/A"}
                        </p>
                        <p
                          className="mb-0"
                          style={{ fontSize: "13px", color: "#4a4a4a" }}
                        >
                          <i
                            className="fas fa-users mr-2"
                            style={{ color: "#00897B" }}
                          ></i>
                          {booking.hotelDetails?.guests || "2"} Guests
                        </p>
                      </>
                    )}
                  </div>
                  <div
                    className="card-footer bg-white"
                    style={{
                      borderTop: "1px solid #e0e0e0",
                      padding: "12px 15px",
                    }}
                  >
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="btn btn-outline-danger btn-sm"
                      style={{
                        borderRadius: "4px",
                        fontSize: "13px",
                        padding: "5px 10px",
                      }}
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

        <ToastContainer
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
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
