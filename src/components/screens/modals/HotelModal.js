import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const HotelModal = ({ show, handleClose, hotel }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);
      const bookingData = {
        bookingType: "hotel",
        hotelDetails: {
          hotelId: hotel._id,
          roomNumber,
          checkInDate,
          checkOutDate,
        },
      };

      const response = await axios.post(
        "https://make-my-trip-backend.onrender.com/api/booking",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("Booking successful:", response.data);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error("Error making booking:", error);
      setLoading(false);
    }
  };

  return (
    <Modal style={{color:"black"}} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRoomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Enter room number"
              required
            />
          </Form.Group>
          <Form.Group controlId="formCheckInDate">
            <Form.Label >Check-In Date</Form.Label>
            <Form.Control
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCheckOutDate">
            <Form.Label>Check-Out Date</Form.Label>
            <Form.Control
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleBooking} disabled={loading}>
          {loading ? "Booking..." : "Book Hotel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HotelModal;
