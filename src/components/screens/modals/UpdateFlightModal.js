import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function UpdateFlightModal({ flight, show, handleClose, handleUpdate }) {
  const [updatedFlight, setUpdatedFlight] = useState({});

  useEffect(() => {
    if (flight) {
      setUpdatedFlight({
        ...flight,
        departureTime: new Date(flight.departureTime),
        arrivalTime: new Date(flight.arrivalTime),
      });
    }
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedFlight);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      style={{ color: "black" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Flight</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  type="text"
                  name="flightNumber"
                  value={updatedFlight.flightNumber || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Airline</Form.Label>
                <Form.Control
                  type="text"
                  name="airline"
                  value={updatedFlight.airline || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="text"
                  name="from"
                  value={updatedFlight.from || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  name="to"
                  value={updatedFlight.to || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="departureTime"
                  value={
                    updatedFlight.departureTime
                      ? new Date(updatedFlight.departureTime)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="arrivalTime"
                  value={
                    updatedFlight.arrivalTime
                      ? new Date(updatedFlight.arrivalTime)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  value={updatedFlight.duration || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={updatedFlight.price || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Seats Available</Form.Label>
                <Form.Control
                  type="number"
                  name="seatsAvailable"
                  value={updatedFlight.seatsAvailable || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Seat Type</Form.Label>
            <Form.Select
              name="seatType"
              value={updatedFlight.seatType || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Seat Type</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Flight
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateFlightModal;
