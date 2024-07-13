import React, { useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import "./css/Flights.css"; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";
import FlightModal from './modals/FlightModal'; // Import the FlightModal component

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
      console.log(`https://make-my-trip-backend.onrender.com/api/flight?${queryParams}`)
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
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log('Booking confirmed:', response.data);
      handleCloseModal();
      navigate("/userdashboard"); // Redirect to a success page or show a success message
    } catch (error) {
      console.log('Error confirming booking:', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 style={{color:"white"}} className="form-title text-center mb-4">Book Your Flight</h2>
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
            </div>
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="departureDate" className="form-label">Departure Date</label>
                <input
                  type="date"
                  className="form-control custom-input"
                  id="departureDate"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <label htmlFor="departureTime" className="form-label">Departure Time</label>
                <input
                  type="time"
                  className="form-control custom-input"
                  id="departureTime"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>
            </div>
            {tripType === "Round Trip" && (
              <div className="col-md-6 mb-3">
                <div style={translucent} className="card custom-card p-3">
                  <label htmlFor="returnDate" className="form-label">Return Date</label>
                  <input
                    type="date"
                    className="form-control custom-input"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <label htmlFor="returnTime" className="form-label">Return Time</label>
                  <input
                    type="time"
                    className="form-control custom-input"
                    id="returnTime"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="numberOfSeats" className="form-label">Number of Seats</label>
                <input
                  type="number"
                  className="form-control custom-input"
                  id="numberOfSeats"
                  value={numberOfSeats}
                  min="1"
                  onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary custom-button">Search Flights</button>
          </div>
        </form>
      </div>
{flights.length >0 &&
      <div className="container mt-5">
        <h2 style={{color:"white"}} className="form-title text-center mb-4">Available Flights</h2>
        <div className="row">
          {flights.map((flight) => (
            <div className="col-md-4 mb-4" key={flight._id}>
              <div style={translucent} className="card custom-card p-3">
                <h5 className="card-title">Flight Number: {flight.flightNumber}</h5>
                <p className="card-text">Airline: {flight.airline}</p>
                <p className="card-text">From: {flight.from}</p>
                <p className="card-text">To: {flight.to}</p>
                <p className="card-text">Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
                <p className="card-text">Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p className="card-text">Price: ${flight.price}</p>
                <p className="card-text">Seats Available: {flight.seatsAvailable}</p>
                <p className="card-text">Seat Type: {flight.seatType}</p>
                <p className="card-text">Status: {flight.status}</p>
                <button
                  className="btn btn-primary custom-button"
                  onClick={() => handleBookFlight(flight)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>}
      <div style={{ backgroundColor: "#dfdfdf" }}>
        <div
          style={{ backgroundColor: "white" }}
          className="container rounded m"
        >
          <h1 className="form-title text-center my-5">
            Handpicked Collections for You
          </h1>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <img
                  src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Collection 1</h5>
                  <p className="card-text">
                    Explore amazing destinations and deals.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img
                  src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Collection 2</h5>
                  <p className="card-text">
                    Exclusive offers on luxury stays.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img
                  src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Collection 3</h5>
                  <p className="card-text">
                    Discover budget-friendly travel options.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlightModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        flight={selectedFlight} 
        numberOfSeats={numberOfSeats} 
        handleConfirmBooking={handleConfirmBooking}
      />
    </>
  );
}

export default Flights;
