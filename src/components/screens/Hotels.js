import React, { useState } from "react";
import axios from "axios";
import "./css/Hotels.css";
import { useNavigate } from "react-router-dom";
import HotelModal from "./modals/HotelModal"; 

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

function Hotels() {
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State to manage the selected hotel
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [toastBgType, setToastBgType] = useState("danger");

  const handleToastClose = () => setShowToast(false);

  const translucent = { backdropFilter: 'blur(1px)', backgroundColor: 'rgba(255, 255, 255, 0.5)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px' }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        city,
        checkInDate,
        checkOutDate,
      }).toString();
      
      const response = await axios.get(
        `https://make-my-trip-backend.onrender.com/api/hotel?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      setHotels(response.data.hotels);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  };

  const clickHandlerForHotelCard = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
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
        <h2 style={{ color: "white" }} className="form-title text-center mb-4">
          Book Your Hotel
        </h2>
        <form onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                style={translucent}
                className="card custom-card p-3"
              >
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="city"
                  placeholder="City"
                  list="cities"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label  htmlFor="checkInDate" className="form-label">
                  Check-In Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={translucent} className="card custom-card p-3">
                <label htmlFor="checkOutDate" className="form-label">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Search Hotels
            </button>
          </div>
        </form>

        {hotels.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center">Available Hotels</h3>
            <div className="row">
              {hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="col-md-4 mb-4"
                  onClick={() => clickHandlerForHotelCard(hotel)}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">
                        Address: {hotel.address}, {hotel.city}, {hotel.state},{" "}
                        {hotel.country}
                        <br />
                        Rating: {hotel.rating} / 5
                        <br />
                        Phone: {hotel.phone}
                        <br />
                        Email: {hotel.email}
                        <br />
                        Website:{" "}
                        <a
                          href={hotel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {hotel.website}
                        </a>
                        <br />
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
                  <p className="card-text">Exclusive offers on luxury stays.</p>
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

      {selectedHotel && (
        <HotelModal
          show={showModal}
          handleClose={handleCloseModal}
          hotel={selectedHotel}
        />
      )}
    </>
  );
}

export default Hotels;
