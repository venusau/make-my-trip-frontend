import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const UpdateHotelModal = ({ show, handleClose, hotel, handleUpdate }) => {
  const [updateHotel, setUpdateHotel] = useState(null);

  useEffect(() => {
    if (hotel) {
      setUpdateHotel(hotel);
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateHotel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { checked, value } = e.target;
    setUpdateHotel((prevState) => ({
      ...prevState,
      amenities: checked
        ? [...prevState.amenities, value]
        : prevState.amenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updateHotel);
    handleClose();
  };

  if (!updateHotel) {
    return null; // Or you could return a loading spinner here
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" style={{color:"black"}}>
      <Modal.Header closeButton>
        <Modal.Title>Update Hotel: {updateHotel.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleHotelSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updateHotel.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updateHotel.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={updateHotel.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={updateHotel.website}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updateHotel.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={updateHotel.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={updateHotel.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={updateHotel.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={updateHotel.zipCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={updateHotel.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amenities</Form.Label>
            {["Wifi", "AC", "TV", "Gym", "Pool", "Restaurant"].map(
              (amenity) => (
                <Form.Check
                  key={amenity}
                  type="checkbox"
                  label={amenity}
                  value={amenity}
                  checked={updateHotel.amenities.includes(amenity)}
                  onChange={handleAmenitiesChange}
                />
              )
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Hotel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateHotelModal;
