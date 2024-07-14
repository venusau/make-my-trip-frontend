import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function UpdateHotelModal({ hotel, show, handleClose, handleUpdate }) {
  const [updatedHotel, setUpdatedHotel] = useState({});

  useEffect(() => {
    if (hotel) {
      setUpdatedHotel({
        ...hotel,
        
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHotel(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedHotel);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" style={{color:"black"}}>
      <Modal.Header closeButton>
        <Modal.Title>Update Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="hotelName"
                  value={updatedHotel.hotelName || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={updatedHotel.location || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

         

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  name="roomType"
                  value={updatedHotel.roomType || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Price per Night</Form.Label>
                <Form.Control
                  type="number"
                  name="pricePerNight"
                  value={updatedHotel.pricePerNight || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfGuests"
                  value={updatedHotel.numberOfGuests || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Amenities</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="amenities"
              value={updatedHotel.amenities || ''}
              onChange={handleChange}
              placeholder="List amenities separated by commas"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Hotel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateHotelModal;