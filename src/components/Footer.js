import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">About Us</h5>
            <p>
              This MakeMyTrip clone, created by Vicky Bhattacharya, offers a
              seamless experience for booking flights and hotels. Enjoy planning
              your next adventure with ease!
            </p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-light">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/flights" className="text-light">
                  Flights
                </NavLink>
              </li>
              <li>
                <NavLink to="/hotels" className="text-light">
                  Hotels
                </NavLink>
              </li>
              <li>
                <NavLink to="https://www.linkedin.com/in/vicky-bhattacharya-98535725b/" className="text-light">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p>
              <i className="fas fa-home mr-3">P-47, Udayan Abasan, Udayrajpur, Madhyamgram</i> 
            </p>
            <p>
              <i className="fas fa-envelope mr-3">vickybhattacharya19@gmail.com</i> 
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> +91-8240294682
            </p>
            
          </div>

          {/* Social Media Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-start">
              <li>
                <NavLink to="#!" className="text-light mr-3">
                  <i className="fab fa-facebook-f"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="#!" className="text-light mr-3">
                  <i className="fab fa-twitter"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="#!" className="text-light mr-3">
                  <i className="fab fa-instagram"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="#!" className="text-light mr-3">
                  <i className="fab fa-linkedin-in"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
