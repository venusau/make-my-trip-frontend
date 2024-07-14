import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Notification({ show, onClose, message, bgType }) {
  return (
    <Toast show={show} onClose={onClose} bg={bgType} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

const Admin = () => {
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airline: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatsAvailable: "",
    seatType: "",
    status: "Scheduled",
  });
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    rooms: [
      { roomNumber: "", type: "", price: 0, amenities: "", availability: true },
    ],
    amenities: "",
    rating: 0,
    reviews: [],
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [toastBgType, setToastBgType] = useState("danger");

  const handleToastClose = () => setShowToast(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsRes = await axios.get(
          "https://make-my-trip-backend.onrender.com/api/flight",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setFlights(flightsRes.data);

        const hotelsRes = await axios.get(
          "https://make-my-trip-backend.onrender.com/api/hotel",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setHotels(hotelsRes.data.hotels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const newRooms = [...newHotel.rooms];
    newRooms[index][name] = value;
    setNewHotel({ ...newHotel, rooms: newRooms });
  };

  const handleAddRoom = () => {
    setNewHotel((prevState) => ({
      ...prevState,
      rooms: [
        ...prevState.rooms,
        {
          roomNumber: "",
          type: "",
          price: 0,
          amenities: "",
          availability: true,
        },
      ],
    }));
  };

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    const formattedFlight = {
      ...newFlight,
      departureTime: new Date(newFlight.departureTime).toISOString(),
      arrivalTime: new Date(newFlight.arrivalTime).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "https://make-my-trip-backend.onrender.com/api/flight",
        formattedFlight,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setNewFlight({
        flightNumber: "",
        airline: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        duration: "",
        price: "",
        seatsAvailable: "",
        seatType: "",
        status: "Scheduled",
      });

      setToastMessage(response.data.message);
      setShowToast(true);
      setToastBgType("success");

      // Refresh flights list
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    const formattedHotel = {
      ...newHotel,
      rooms: newHotel.rooms.map((room) => ({
        ...room,
        amenities: room.amenities.split(",").map((a) => a.trim()),
      })),
      amenities: newHotel.amenities.split(",").map((a) => a.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      console.log(formattedHotel);
      const response = await axios.post(
        "https://make-my-trip-backend.onrender.com/api/hotel",
        formattedHotel,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setNewHotel({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: "",
        email: "",
        website: "",
        rooms: [
          {
            roomNumber: "",
            type: "",
            price: 0,
            amenities: "",
            availability: true,
          },
        ],
        amenities: "",
        rating: 0,
        reviews: [],
      });
      // Refresh hotels list

      setToastMessage(response.data.message);
      setShowToast(true);
      setToastBgType("success");
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };
  const deleteHotelClickHandler = async (hotelId) => {
    try {
      const response = await axios.delete(
        "https://make-my-trip-backend.onrender.com/api/hotel",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: { hotelId },
        }
      );

      console.log(response);

      setToastMessage(response.data.message);
      setShowToast(true);
      setToastBgType("success");
    } catch (error) {
      console.log(error);

      setToastMessage(error.message);
      setShowToast(true);
      setToastBgType("danger");
    }
  };

  const deleteFlightClickHandler = async (flightNumber) => {
    try {
      const response = await axios.delete(
        "https://make-my-trip-backend.onrender.com/api/flight",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: { flightNumber },
        }
      );

      console.log(response);

      setToastMessage(response.data.message);
      setShowToast(true);
      setToastBgType("success");
    } catch (error) {
      console.log(error);

      setToastMessage(error.message);
      setShowToast(true);
      setToastBgType("danger");
    }
  };

  return (
    <>
      
      <div className="container mt-5">
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
        <h1 className="text-center mb-4">Admin Panel</h1>

        <div className="container my-5">
          <div className="col-md-12 mb-4">
            <div
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              className="card shadow"
            >
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Manage Flights</h2>
              </div>
              <div className="card-body">
                <h3 className="mb-4">Add New Flight</h3>
                <form onSubmit={handleFlightSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Flight Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flightNumber"
                        value={newFlight.flightNumber}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Airline</label>
                      <input
                        type="text"
                        className="form-control"
                        name="airline"
                        value={newFlight.airline}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">From</label>
                      <input
                        type="text"
                        className="form-control"
                        name="from"
                        value={newFlight.from}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">To</label>
                      <input
                        type="text"
                        className="form-control"
                        name="to"
                        value={newFlight.to}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Departure Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="departureTime"
                        value={newFlight.departureTime}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Arrival Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="arrivalTime"
                        value={newFlight.arrivalTime}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={newFlight.duration}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={newFlight.price}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Seats Available</label>
                      <input
                        type="number"
                        className="form-control"
                        name="seatsAvailable"
                        value={newFlight.seatsAvailable}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Seat Type</label>
                      <select
                        className="form-control"
                        name="seatType"
                        value={newFlight.seatType}
                        onChange={(e) => handleInputChange(e, setNewFlight)}
                      >
                        <option>Economy</option>
                        <option>Business</option>
                        <option>First</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Add Flight
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12">
              <div
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                className="card shadow"
              >
                <div className="card-header bg-primary text-white">
                  <h2 className="mb-0">Manage Hotels</h2>
                </div>
                <div className="card-body">
                  <h3 className="card-title mb-4">Add New Hotel</h3>
                  <form onSubmit={handleHotelSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="hotelName" className="form-label">
                          Hotel Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelName"
                          name="name"
                          value={newHotel.name}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="hotelAddress" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelAddress"
                          name="address"
                          value={newHotel.address}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelCity" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelCity"
                          name="city"
                          value={newHotel.city}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelState" className="form-label">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelState"
                          name="state"
                          value={newHotel.state}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelCountry" className="form-label">
                          Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelCountry"
                          name="country"
                          value={newHotel.country}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelZipCode" className="form-label">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelZipCode"
                          name="zipCode"
                          value={newHotel.zipCode}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelPhone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="hotelPhone"
                          name="phone"
                          value={newHotel.phone}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="hotelEmail"
                          name="email"
                          value={newHotel.email}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="hotelWebsite" className="form-label">
                          Website
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          id="hotelWebsite"
                          name="website"
                          value={newHotel.website}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hotelAmenities" className="form-label">
                          Amenities
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hotelAmenities"
                          name="amenities"
                          value={newHotel.amenities}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                        />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="hotelRating" className="form-label">
                          Rating
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="hotelRating"
                          name="rating"
                          min="1"
                          max="5"
                          value={newHotel.rating}
                          onChange={(e) => handleInputChange(e, setNewHotel)}
                          required
                        />
                      </div>
                    </div>

                    <h4 className="mt-4 mb-3">Rooms</h4>
                    {newHotel.rooms.map((room, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">Room {index + 1}</h5>
                          <div className="row g-3">
                            <div className="col-md-3">
                              <label
                                htmlFor={`roomNumber${index}`}
                                className="form-label"
                              >
                                Room Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`roomNumber${index}`}
                                name="roomNumber"
                                value={room.roomNumber}
                                onChange={(e) => handleRoomChange(index, e)}
                                required
                              />
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor={`roomType${index}`}
                                className="form-label"
                              >
                                Room Type
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`roomType${index}`}
                                name="type"
                                value={room.type}
                                onChange={(e) => handleRoomChange(index, e)}
                                required
                              />
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor={`roomPrice${index}`}
                                className="form-label"
                              >
                                Room Price
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id={`roomPrice${index}`}
                                name="price"
                                value={room.price}
                                onChange={(e) => handleRoomChange(index, e)}
                                required
                              />
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor={`roomAmenities${index}`}
                                className="form-label"
                              >
                                Amenities
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`roomAmenities${index}`}
                                name="amenities"
                                value={room.amenities}
                                onChange={(e) => handleRoomChange(index, e)}
                              />
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor={`roomAvailability${index}`}
                                className="form-label"
                              >
                                Availability
                              </label>
                              <select
                                className="form-select"
                                id={`roomAvailability${index}`}
                                name="availability"
                                value={room.availability}
                                onChange={(e) => handleRoomChange(index, e)}
                                required
                              >
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddRoom}
                      >
                        Add Another Room
                      </button>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Add Hotel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              className="card shadow-sm"
            >
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Existing Flights</h3>
              </div>
              <div className="card-body">
                {flights.length > 0 ? (
                  <div className="list-group">
                    {flights.map((flight) => (
                      <div
                        key={flight._id}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            {flight.airline} - Flight {flight.flightNumber}
                          </h5>
                          <small
                            className={`badge ${
                              flight.status === "On Time"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {flight.status}
                          </small>
                        </div>
                        <p className="mb-1">
                          <strong>Route:</strong> {flight.from} to {flight.to}
                        </p>
                        <p className="mb-1">
                          <strong>Departure:</strong>{" "}
                          {moment(flight.departureTime).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                        <p className="mb-1">
                          <strong>Arrival:</strong>{" "}
                          {moment(flight.arrivalTime).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                        <p className="mb-1">
                          <strong>Duration:</strong> {flight.duration}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="badge bg-info text-dark me-2">
                              ${flight.price}
                            </span>
                            <span className="badge bg-success">
                              {flight.seatsAvailable} seats
                            </span>
                            <small className="ms-2">{flight.seatType}</small>
                          </div>
                          <div>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil-square"></i> Update
                            </button>
                            <button
                              onClick={() => {
                                deleteFlightClickHandler(flight.flightNumber);
                              }}
                              className="btn btn-sm btn-outline-danger"
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info" role="alert">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              className="card shadow-sm"
            >
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Existing Hotels</h3>
              </div>
              <div className="card-body">
                {hotels.length > 0 ? (
                  <div className="list-group">
                    {hotels.map((hotel) => (
                      <div
                        key={hotel._id}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{hotel.name}</h5>
                          <small>
                            <i className="bi bi-star-fill text-warning"></i>{" "}
                            {hotel.rating}
                          </small>
                        </div>
                        <p className="mb-1">
                          <i className="bi bi-geo-alt-fill me-2"></i>
                          {hotel.address}, {hotel.city}, {hotel.state},{" "}
                          {hotel.country}, {hotel.zipCode}
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-telephone-fill me-2"></i>
                          {hotel.phone}
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-envelope-fill me-2"></i>
                          {hotel.email}
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-globe me-2"></i>
                          <a
                            href={hotel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {hotel.website}
                          </a>
                        </p>
                        <p className="mb-2">
                          <strong>Amenities:</strong>{" "}
                          {hotel.amenities.join(", ")}
                        </p>
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil-square"></i> Update
                          </button>
                          <button
                            onClick={() => {
                              deleteHotelClickHandler(hotel._id);
                            }}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info" role="alert">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
