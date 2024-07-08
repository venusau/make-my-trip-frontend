import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      
      <header className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title">Welcome to MakeMyTrip</h1>
          <p className="hero-subtitle">
            Book flights and hotels at the best prices.
          </p>
          <Link className="btn btn-primary btn-lg" to="/flights">
            Book a Flight
          </Link>
          <Link className="btn btn-secondary btn-lg ms-3" to="/hotels">
            Book a Hotel
          </Link>
        </div>
      </header>
      <section className="services-section py-5">
        <div className="container text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We offer a wide range of travel services to make your trip enjoyable.
          </p>
          <div className="row">
            <div className="col-md-4">
              <div className="service-card p-3">
                <img src="flight.png" alt="Flights" className="service-icon mb-3" />
                <h3 className="service-title">Flights</h3>
                <p className="service-description">
                  Book domestic and international flights at competitive prices.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-3">
                <img src="hotel.png" alt="Hotels" className="service-icon mb-3" />
                <h3 className="service-title">Hotels</h3>
                <p className="service-description">
                  Find the best deals on hotels worldwide.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-3">
                <img src="package.png" alt="Packages" className="service-icon mb-3" />
                <h3 className="service-title">Packages</h3>
                <p className="service-description">
                  Explore our exclusive travel packages for a complete vacation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Home;
