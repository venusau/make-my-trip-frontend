import React, { useState } from "react";
import "./Flights.css"; // Import your CSS file for styles

function Flights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const translucent = {
    backdropFilter: "blur(1px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const swapValues = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="form-title text-center mb-4">Book Your Flight</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <div style={translucent} className="card custom-card p-3">
              <label htmlFor="from" className="form-label">
                From
              </label>
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
              <label htmlFor="to" className="form-label">
                To
              </label>
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
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <span className="checkbox"></span>
              One Way
            </div>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <span className="checkbox"></span>
              Round Trip
            </div>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <span className="checkbox"></span>
              Multicity
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div style={translucent} className="card custom-card p-3">
              <label htmlFor="departure-date" className="form-label">
                Departure
              </label>
              <input name="departure-date" type="date" className="form-control" />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div style={translucent} className="card custom-card p-3">
              <label htmlFor="return-date" className="form-label">
                Return
              </label>
              <input name="return-date" type="date" className="form-control" />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div style={translucent} className="card custom-card p-3">
              <label htmlFor="number-of-seats" className="form-label">
                Number of Seats
              </label>
              <select name="number-of-seats" className="form-control">
                <option value="">---Choose number of seats---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Search Flights
          </button>
        </div>
      </form>

    </div>
    <div style={{backgroundColor:"#dfdfdf"}}>
      <div style={{backgroundColor:"white"}} className="container rounded m">
    <h1 className="form-title text-center my-5">Handpicked Collections for You</h1>
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Collection 1</h5>
            <p className="card-text">Explore amazing destinations and deals.</p>
            <a href="#" className="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Collection 2</h5>
            <p className="card-text">Find exclusive offers and packages.</p>
            <a href="#" className="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Collection 3</h5>
            <p className="card-text">Discover top-rated tours and activities.</p>
            <a href="#" className="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Flights;
