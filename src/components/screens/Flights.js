import React, { useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import "./Flights.css"; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";

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
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const translucent = {
    backdropFilter: "blur(1px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const swapValues = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const formattedDepartureDateTime = moment.tz(`${departureDate}T${departureTime}`, 'YYYY-MM-DDTHH:mm', 'UTC').toISOString();
      const formattedReturnDateTime = returnDate ? moment.tz(`${returnDate}T${returnTime}`, 'YYYY-MM-DDTHH:mm', 'UTC').toISOString() : undefined;

      const queryParams = new URLSearchParams({
        from,
        to,
        departureTime: formattedDepartureDateTime,
        returnTime: formattedReturnDateTime,
        seats: numberOfSeats,
      }).toString();

      const response = await axios.get(`https://make-my-trip-backend.onrender.com/api/flight?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      setFlights(response.data);
    } catch (error) {
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
        'https://make-my-trip-backend.onrender.com/api/booking',
        {
          bookingType: 'flight',
          flightDetails: {
            flightId: selectedFlight._id,
            numberOfSeats: numberOfSeats,
            departureDate: selectedFlight.departureTime,
            returnDate: selectedFlight.returnTime // Include this only if it's a round trip
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      );
      console.log('Booking confirmed:', response.data);
      handleCloseModal();
      navigate("/bookingSuccess"); // Redirect to a success page or show a success message
    } catch (error) {
      console.log('Error confirming booking:', error);
    }
  };
  

  const flightConfirmModal = () => (
    <div  className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none', color:"black" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Booking</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div  className="modal-body">
            {selectedFlight && (
              <>
                <p>Airline: {selectedFlight.airline}</p>
                <p>Flight Number: {selectedFlight.flightNumber}</p>
                <p>From: {selectedFlight.from}</p>
                <p>To: {selectedFlight.to}</p>
                <p>Departure: {new Date(selectedFlight.departureTime).toLocaleString()}</p>
                <p>Arrival: {new Date(selectedFlight.arrivalTime).toLocaleString()}</p>
                <p>Price: ${selectedFlight.price}</p>
                <p>Seats Available: {selectedFlight.seatsAvailable}</p>
                <p>Seat Type: {selectedFlight.seatType}</p>
                <p>Status: {selectedFlight.status}</p>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container mt-5">
        <h2 className="form-title text-center mb-4">Book Your Flight</h2>
        <form onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="from" className="form-label">From</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="from"
                  placeholder="Departure City"
                  list="cities"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
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
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="to" className="form-label">To</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="to"
                  placeholder="Destination City"
                  list="cities"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary mb-3 me-4 swap-button"
              onClick={swapValues}
            >
              &#x21C4; Swap
            </button>
          </div>
          <div style={{ backgroundColor: "white" }} className="flight-dates rounded row">
            <div style={{ padding: "1rem", display: "flex", gap: "2rem" }}>
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="One Way"
                  checked={tripType === "One Way"}
                  onChange={() => setTripType("One Way")}
                />
                One Way
              </label>
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="Round Trip"
                  checked={tripType === "Round Trip"}
                  onChange={() => setTripType("Round Trip")}
                />
                Round Trip
              </label>
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="Multicity"
                  checked={tripType === "Multicity"}
                  onChange={() => setTripType("Multicity")}
                />
                Multicity
              </label>
            </div>
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="departure-date" className="form-label">
                  Departure Date
                </label>
                <input
                  name="departure-date"
                  type="date"
                  className="form-control"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
                <label htmlFor="departure-time" className="form-label mt-2">
                  Departure Time
                </label>
                <input
                  name="departure-time"
                  type="time"
                  className="form-control"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  required
                />
              </div>
            </div>
            {tripType === "Round Trip" && (
              <div className="col-md-6 mb-3">
                <div style={translucent} className="card custom-card p-3">
                  <label htmlFor="return-date" className="form-label">
                    Return Date
                  </label>
                  <input
                    name="return-date"
                    type="date"
                    className="form-control"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                  />
                  <label htmlFor="return-time" className="form-label mt-2">
                    Return Time
                  </label>
                  <input
                    name="return-time"
                    type="time"
                    className="form-control"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="col-md-4 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="number-of-seats" className="form-label">
                  Number of Seats
                </label>
                <select
                  name="number-of-seats"
                  className="form-control"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Search Flights
            </button>
          </div>
        </form>

        {flights.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center">Available Flights</h3>
            <div className="row">
              {flights.map((flight) => (
                <div key={flight._id} className="col-md-4 mb-4" onClick={() => handleBookFlight(flight)}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{flight.airline}</h5>
                      <p className="card-text">
                        Flight Number: {flight.flightNumber}<br />
                        From: {flight.from}<br />
                        To: {flight.to}<br />
                        Departure: {new Date(flight.departureTime).toLocaleString()}<br />
                        Arrival: {new Date(flight.arrivalTime).toLocaleString()}<br />
                        Price: ${flight.price}<br />
                        Seats Available: {flight.seatsAvailable}<br />
                        Seat Type: {flight.seatType}<br />
                        Status: {flight.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: "#dfdfdf" }}>
        <div style={{ backgroundColor: "white" }} className="container rounded m">
          <h1 className="form-title text-center my-5">Handpicked Collections for You</h1>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Collection 1</h5>
                  <p className="card-text">Explore amazing destinations and deals.</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Collection 2</h5>
                  <p className="card-text">Exclusive offers on luxury stays.</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Collection 3</h5>
                  <p className="card-text">Discover budget-friendly travel options.</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {flightConfirmModal()}
    </>
  );
}

export default Flights;
