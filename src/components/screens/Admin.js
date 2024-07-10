import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './css/Admin.css'; // Make sure to create and import your CSS file for custom styles

const Admin = () => {
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    airline: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    price: '',
    seatsAvailable: '',
    seatType: '',
    status: 'Scheduled',
  });
  const [newHotel, setNewHotel] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    rooms: [{ roomNumber: '', type: '', price: 0, amenities: '', availability: true }],
    amenities: '',
    rating: 0,
    reviews: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsRes = await axios.get('https://make-my-trip-backend.onrender.com/api/flight', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        });
        setFlights(flightsRes.data);

        const hotelsRes = await axios.get('https://make-my-trip-backend.onrender.com/api/hotel', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        });
        setHotels(hotelsRes.data.hotels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const newRooms = [...newHotel.rooms];
    newRooms[index][name] = value;
    setNewHotel({ ...newHotel, rooms: newRooms });
  };

  const handleAddRoom = () => {
    setNewHotel(prevState => ({
      ...prevState,
      rooms: [...prevState.rooms, { roomNumber: '', type: '', price: 0, amenities: '', availability: true }]
    }));
  };

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    const formattedFlight = {
      ...newFlight,
      departureTime: new Date(newFlight.departureTime).toISOString(),
      arrivalTime: new Date(newFlight.arrivalTime).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
      await axios.post('https://make-my-trip-backend.onrender.com/api/flight', formattedFlight, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      setNewFlight({
        flightNumber: '',
        airline: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        price: '',
        seatsAvailable: '',
        seatType: '',
        status: 'Scheduled',
      });
      // Refresh flights list
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    const formattedHotel = {
      ...newHotel,
      rooms: newHotel.rooms.map(room => ({
        ...room,
        amenities: room.amenities.split(',').map(a => a.trim())
      })),
      amenities: newHotel.amenities.split(',').map(a => a.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
        console.log(formattedHotel)
      await axios.post('https://make-my-trip-backend.onrender.com/api/hotel', formattedHotel, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      setNewHotel({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
        email: '',
        website: '',
        rooms: [{ roomNumber: '', type: '', price: 0, amenities: '', availability: true }],
        amenities: '',
        rating: 0,
        reviews: []
      });
      // Refresh hotels list
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Panel</h1>
      
      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header">
              <h2>Manage Flights</h2>
            </div>
            <div className="card-body">
              <h3 className="mb-3">Add New Flight</h3>
              <form onSubmit={handleFlightSubmit}>
                <div className="mb-3">
                  <label className="form-label">Flight Number</label>
                  <input type="text" className="form-control" name="flightNumber" value={newFlight.flightNumber} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Airline</label>
                  <input type="text" className="form-control" name="airline" value={newFlight.airline} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input type="text" className="form-control" name="from" value={newFlight.from} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input type="text" className="form-control" name="to" value={newFlight.to} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Departure Time</label>
                  <input type="datetime-local" className="form-control" name="departureTime" value={newFlight.departureTime} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Arrival Time</label>
                  <input type="datetime-local" className="form-control" name="arrivalTime" value={newFlight.arrivalTime} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input type="text" className="form-control" name="duration" value={newFlight.duration} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input type="number" className="form-control" name="price" value={newFlight.price} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Seats Available</label>
                  <input type="number" className="form-control" name="seatsAvailable" value={newFlight.seatsAvailable} onChange={(e) => handleInputChange(e, setNewFlight)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Seat Type</label>
                  <select className="form-control" name="seatType" value={newFlight.seatType} onChange={(e) => handleInputChange(e, setNewFlight)}>
                    <option>Economy</option>
                    <option>Business</option>
                    <option>First</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Flight</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header">
              <h2>Manage Hotels</h2>
            </div>
            <div className="card-body">
              <h3 className="mb-3">Add New Hotel</h3>
              <form onSubmit={handleHotelSubmit}>
                <div className="mb-3">
                  <label className="form-label">Hotel Name</label>
                  <input type="text" className="form-control" name="name" value={newHotel.name} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={newHotel.address} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" name="city" value={newHotel.city} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control" name="state" value={newHotel.state} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" name="country" value={newHotel.country} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Zip Code</label>
                  <input type="text" className="form-control" name="zipCode" value={newHotel.zipCode} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" name="phone" value={newHotel.phone} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={newHotel.email} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Website</label>
                  <input type="text" className="form-control" name="website" value={newHotel.website} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amenities</label>
                  <input type="text" className="form-control" name="amenities" value={newHotel.amenities} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <input type="number" className="form-control" name="rating" value={newHotel.rating} onChange={(e) => handleInputChange(e, setNewHotel)} />
                </div>
                {newHotel.rooms.map((room, index) => (
                  <div key={index} className="mb-3">
                    <h5>Room {index + 1}</h5>
                    <div className="mb-3">
                      <label className="form-label">Room Number</label>
                      <input type="text" className="form-control" name="roomNumber" value={room.roomNumber} onChange={(e) => handleRoomChange(index, e)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Room Type</label>
                      <input type="text" className="form-control" name="type" value={room.type} onChange={(e) => handleRoomChange(index, e)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Room Price</label>
                      <input type="number" className="form-control" name="price" value={room.price} onChange={(e) => handleRoomChange(index, e)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Amenities</label>
                      <input type="text" className="form-control" name="amenities" value={room.amenities} onChange={(e) => handleRoomChange(index, e)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Availability</label>
                      <select className="form-control" name="availability" value={room.availability} onChange={(e) => handleRoomChange(index, e)}>
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={handleAddRoom}>Add Another Room</button>
                <button type="submit" className="btn btn-primary">Add Hotel</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Existing Flights</h3>
          {flights.length > 0 ? (
            <ul className="list-group">
              {flights.map(flight => (
                <li key={flight._id} className="list-group-item">
                  <strong>{flight.airline}</strong> - {flight.flightNumber}
                  <br />
                  From {flight.from} to {flight.to}
                  <br />
                  Departure: {moment(flight.departureTime).format('MMMM Do YYYY, h:mm a')}
                  <br />
                  Arrival: {moment(flight.arrivalTime).format('MMMM Do YYYY, h:mm a')}
                  <br />
                  Duration: {flight.duration}
                  <br />
                  Price: ${flight.price}
                  <br />
                  Seats Available: {flight.seatsAvailable}
                  <br />
                  Seat Type: {flight.seatType}
                  <br />
                  Status: {flight.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No flights available.</p>
          )}
        </div>

        <div className="col-md-6">
          <h3>Existing Hotels</h3>
          {hotels.length > 0 ? (
            <ul className="list-group">
              {hotels.map(hotel => (
                <li key={hotel._id} className="list-group-item">
                  <strong>{hotel.name}</strong>
                  <br />
                  Address: {hotel.address}, {hotel.city}, {hotel.state}, {hotel.country}, {hotel.zipCode}
                  <br />
                  Phone: {hotel.phone}
                  <br />
                  Email: {hotel.email}
                  <br />
                  Website: {hotel.website}
                  <br />
                  Amenities: {hotel.amenities.join(', ')}
                  <br />
                  Rating: {hotel.rating}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hotels available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
