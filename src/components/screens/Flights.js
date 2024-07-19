import React, { useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import "./css/Flights.css"; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";
import FlightModal from "./modals/FlightModal"; // Import the FlightModal component
import HandPickedCollections from "./cards/HandPickedCollections";
import Notification from "./toasts/Notification";
import { ToastContainer } from "react-bootstrap";

function Flights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBgType, setToastBgType] = useState("danger");
  const handleToastClose = () => setShowToast(false);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Trim the from and to values
      let trimmedFrom = from.trim();
      let trimmedTo = to.trim();

      // Set the trimmed values
      setFrom(trimmedFrom);
      setTo(trimmedTo);

      // Format the departure and return date and time
      const formattedDepartureDateTime = moment
        .tz(`${departureDate}T${departureTime}`, "YYYY-MM-DDTHH:mm", "UTC")
        .toISOString();
      const formattedReturnDateTime = returnDate
        ? moment
            .tz(`${returnDate}T${returnTime}`, "YYYY-MM-DDTHH:mm", "UTC")
            .toISOString()
        : undefined;

      // Build query parameters with the trimmed values
      const queryParams = new URLSearchParams({
        from: trimmedFrom,
        to: trimmedTo,
        departureTime: formattedDepartureDateTime,
        returnTime: formattedReturnDateTime,
        seats: numberOfSeats,
      }).toString();

      // Log the constructed URL for debugging
      console.log(
        `https://make-my-trip-backend.vercel.app/api/flight?${queryParams}`
      );

      // Make the API request
      const response = await axios.get(
        `https://make-my-trip-backend.vercel.app/api/flight?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setToastMessage(response.data.message);
      setToastBgType("success");
      setShowToast(true);
      if (!response.data.message) {
        setToastMessage(`No flights from ${from} to ${to} in that particular date.`);
        setToastBgType("danger");
        setShowToast(true);
      }

      // Set the flights state with the response data
      setFlights(response.data);
    } catch (error) {
      setToastMessage(error.message);
      setToastBgType("danger");
      setShowToast(true);
      console.log("Error fetching flights:", error);
    }
  };

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await axios.post(
        "https://make-my-trip-backend.vercel.app/api/booking",
        {
          bookingType: "flight",
          flightDetails: {
            flightId: selectedFlight._id,
            numberOfSeats: numberOfSeats,
            departureDate: selectedFlight.departureTime,
            returnDate: selectedFlight.returnTime, // Include this only if it's a round trip
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("Booking confirmed:", response.data);
      handleCloseModal();
      setToastMessage(response.data.message);
      setToastBgType("success");
      setShowToast(true);
      setTimeout(() => {
        navigate("/userdashboard");
      }, 2000);
    } catch (error) {
      console.log("Error confirming booking:", error);
      setToastMessage(error.message);
      setToastBgType("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="mmt-container mb-2">
        <h2
          style={{ color: "white", fontWeight: "bold" }}
          className="text-center mt-2 mb-4"
        >
          Book Flights
        </h2>
        <div
          className="search-widget mb-5"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <ul
            className="trip-type-tabs"
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              marginBottom: "20px",
              borderBottom: "1px solid #e7e7e7",
            }}
          >
            <li className="trip-type-item" style={{ marginRight: "20px" }}>
              <button
                style={{
                  color: tripType === "One Way" ? "#008cff" : "#4a4a4a",
                  borderBottom:
                    tripType === "One Way" ? "2px solid #008cff" : "none",
                  background: "none",
                  border: "none",
                  padding: "10px 0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setTripType("One Way")}
              >
                <i className="fas fa-plane-departure"></i> One Way
              </button>
            </li>
            <li className="trip-type-item">
              <button
                style={{
                  color: tripType === "Round Trip" ? "#008cff" : "#4a4a4a",
                  borderBottom:
                    tripType === "Round Trip" ? "2px solid #008cff" : "none",
                  background: "none",
                  border: "none",
                  padding: "10px 0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setTripType("Round Trip")}
              >
                <i className="fas fa-exchange-alt"></i> Round Trip
              </button>
            </li>
          </ul>

          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="from"
                    placeholder="From"
                    list="cities"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <label style={{ color: "black" }} htmlFor="from">
                    From
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="to"
                    placeholder="To"
                    list="cities"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                  <label style={{ color: "black" }} htmlFor="to">
                    To
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                  <label htmlFor="departureDate">Departure</label>
                </div>
              </div>
              {tripType === "Round Trip" && (
                <div className="col-md-2">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                    <label htmlFor="returnDate">Return</label>
                  </div>
                </div>
              )}
              <div className="col-md-2">
                <div className="form-floating">
                  <select
                    className="form-control"
                    id="numberOfSeats"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} Traveller{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="numberOfSeats">Travellers</label>
                </div>
              </div>
              <div className="col-md-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    backgroundColor: "#008cff",
                    border: "none",
                    padding: "10px 30px",
                    fontSize: "18px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <datalist id="cities">
          <option value="New York" />
          <option value="Los Angeles" />
          <option value="Chicago" />
          <option value="Houston" />
          <option value="Phoenix" />
          <option value="London" />
          <option value="Paris" />
          <option value="Berlin" />
          <option value="Tokyo" />
          <option value="Delhi" />
        </datalist>

        {flights.length > 0 && (
          <div className="flight-results mt-5">
            <h2
              style={{ color: "white", fontWeight: "bold" }}
              className="text-center mb-4"
            >
              Available Flights
            </h2>
            <div className="row">
              {flights.map((flight) => (
                <div className="col-md-12 mb-3" key={flight._id}>
                  <div
                    className="card"
                    style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  >
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <h5
                            className="card-title"
                            style={{ color: "#000", fontWeight: "bold" }}
                          >
                            {flight.airline}
                          </h5>
                          <p className="card-text text-muted">
                            Flight: {flight.flightNumber}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p
                            className="card-text"
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            {flight.from} → {flight.to}
                          </p>
                          <p className="card-text text-muted">
                            {new Date(
                              flight.departureTime
                            ).toLocaleTimeString()}{" "}
                            -{" "}
                            {new Date(flight.arrivalTime).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p className="card-text">
                            Seats: {flight.seatsAvailable}
                          </p>
                          <p className="card-text">{flight.seatType}</p>
                        </div>
                        <div className="col-md-3 text-end">
                          <h4 style={{ color: "#d63b05", fontWeight: "bold" }}>
                            ₹{flight.price}
                          </h4>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleBookFlight(flight)}
                            style={{
                              backgroundColor: "#008cff",
                              border: "none",
                              padding: "10px 20px",
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <HandPickedCollections />

        <FlightModal
          show={showModal}
          handleClose={handleCloseModal}
          flight={selectedFlight}
          numberOfSeats={numberOfSeats}
          handleConfirmBooking={handleConfirmBooking}
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
    </>
  );
}

export default Flights;
