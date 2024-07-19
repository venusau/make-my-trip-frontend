import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import HotelModal from "./modals/HotelModal";

import ToastContainer from "react-bootstrap/ToastContainer";

import HandPickedCollections from "./cards/HandPickedCollections";

import Notification from "./toasts/Notification";

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

  const translucent = {
    backdropFilter: "blur(1px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const trimmedCity = city.trim();
      const queryParams = new URLSearchParams({
        city: trimmedCity,
        checkInDate,
        checkOutDate,
      }).toString();

      const response = await axios.get(
        `https://make-my-trip-backend.vercel.app/api/hotel?${queryParams}`,
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
      setHotels(response.data.hotels);
    } catch (error) {
      setToastMessage("No hotels found in that particular City");
      setToastBgType("danger");
      setShowToast(true);
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
      <div className="container-fluid mt-5">
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
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

        <div className="row justify-content-center">
          <div className="col-md-10 mb-5">
            <h2 className="text-center mb-4">Book Your Hotel</h2>
            <form
              onSubmit={handleSearch}
              className="bg-light p-4 rounded shadow"
            >
              <div className="row g-3">
                <div className="col-md-3">
                  <label
                    style={{ color: "black " }}
                    htmlFor="city"
                    className="form-label"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter city"
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
                <div className="col-md-3">
                  <label
                    style={{ color: "black " }}
                    htmlFor="checkInDate"
                    className="form-label"
                  >
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label
                    style={{ color: "black " }}
                    htmlFor="checkOutDate"
                    className="form-label"
                  >
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label style={{ color: "black " }} className="form-label">
                    Rooms & Guests
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1 Room, 2 Adults"
                    readOnly
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Search Hotels
                </button>
              </div>
            </form>
          </div>
        </div>

        {hotels.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="text-center mb-4">Available Hotels</h3>
              <div className="row">
                {hotels.map((hotel) => (
                  <div key={hotel._id} className="col-md-4 mb-4">
                    <div
                      className="card h-100"
                      onClick={() => clickHandlerForHotelCard(hotel)}
                    >
                      <img
                        src={
                          hotel.image ||
                          "https://media.istockphoto.com/id/1165384568/fr/photo/complexe-moderne-europ%C3%A9en-de-b%C3%A2timents-r%C3%A9sidentiels.jpg?s=612x612&w=0&k=20&c=nvoIbiIffCt-nuj47Cc3I261Ke98iMouq_HefNM7Lz0="
                        }
                        className="card-img-top"
                        alt={hotel.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text">
                          {hotel.address}, {hotel.city}, {hotel.state},{" "}
                          {hotel.country}
                        </p>
                        <p className="card-text">Rating: {hotel.rating} / 5</p>
                        <p className="card-text">Phone: {hotel.phone}</p>
                        <p className="card-text">Email: {hotel.email}</p>
                        <a
                          href={hotel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <HandPickedCollections />

        {selectedHotel && (
          <HotelModal
            show={showModal}
            handleClose={handleCloseModal}
            hotel={selectedHotel}
            setToastMessage={setToastMessage}
            setToastBgType={setToastBgType}
            setShowToast={setShowToast}
          />
        )}
      </div>
    </>
  );
}

export default Hotels;
