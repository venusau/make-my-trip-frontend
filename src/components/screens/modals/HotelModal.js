import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Card,
  ListGroup,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

const HotelModal = ({ show, handleClose, hotel, setShowToast, setToastBgType, setToastMessage }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedRoom) {
      alert("Please select a room");
      return;
    }
    try {
      setLoading(true);
      const bookingData = {
        bookingType: "hotel",
        hotelDetails: {
          hotelId: hotel._id,
          roomNumber: selectedRoom.roomNumber,
          checkInDate,
          checkOutDate,
        },
      };

      const response = await axios.post(
        "https://make-my-trip-backend.vercel.app/api/booking",
        bookingData,
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

      console.log("Booking successful:", response.data);
      setLoading(false);
      handleClose();
    } catch (error) {
      setToastMessage(error.message);
      setToastBgType("danger");
      setShowToast(true);
      console.error("Error making booking:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      style={{ color: "black" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{hotel.name} - Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>
              {hotel.name}{" "}
              <Badge bg="warning" text="dark">
                {hotel.rating} ★
              </Badge>
            </Card.Title>
            <Card.Text>
              <i className="bi bi-geo-alt-fill me-2"></i>
              {hotel.address}, {hotel.city}, {hotel.state}, {hotel.country},{" "}
              {hotel.zipCode}
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="bi bi-telephone-fill me-2"></i>
                {hotel.phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-envelope-fill me-2"></i>
                {hotel.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-globe me-2"></i>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hotel.website}
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <h5>Available Rooms</h5>
        <Row xs={1} md={2} className="g-4 mb-4">
          {hotel.rooms.map((room) => (
            <Col key={room._id}>
              <Card
                className={`h-100 ${
                  selectedRoom && selectedRoom._id === room._id
                    ? "border-primary"
                    : ""
                }`}
                onClick={() => setSelectedRoom(room)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <Card.Title>
                    Room {room.roomNumber} - {room.type}
                  </Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{room.price}
                    <br />
                    <strong>Amenities:</strong> {room.amenities.join(", ")}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {room.availability ? "Available" : "Not Available"}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCheckInDate" className="mb-3">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCheckOutDate" className="mb-3">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleBooking}
          disabled={loading || !selectedRoom}
        >
          {loading ? "Booking..." : "Book Hotel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HotelModal;
