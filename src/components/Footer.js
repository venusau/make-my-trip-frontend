import React from "react";
import { NavLink } from "react-router-dom";


function Footer() {
  return (
    <footer className="pt-5 pb-4" style={{ backgroundColor: '#141823', color: '#ffffff' }}>
  <div className="container">
    <div className="row">
      <div className="col-md-3 col-sm-6 mb-4">
        <h6 className="text-uppercase mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: '#8a98a5' }}>ABOUT THE SITE</h6>
        <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
          This MakeMyTrip clone, created by Vicky Bhattacharya, offers a
          seamless experience for booking flights and hotels. Enjoy planning
          your next adventure with ease!
        </p>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <h6 className="text-uppercase mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: '#8a98a5' }}>QUICK LINKS</h6>
        <ul className="list-unstyled" style={{ fontSize: '12px' }}>
          <li className="mb-2">
            <NavLink to="/" className="text-light text-decoration-none">Home</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/flights" className="text-light text-decoration-none">Flights</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/hotels" className="text-light text-decoration-none">Hotels</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="https://www.linkedin.com/in/vicky-bhattacharya-98535725b/" className="text-light text-decoration-none">Contact Us</NavLink>
          </li>
        </ul>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <h6 className="text-uppercase mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: '#8a98a5' }}>CONTACT</h6>
        <ul className="list-unstyled" style={{ fontSize: '12px' }}>
          <li className="mb-2">P-47, Udayan Abasan, Udayrajpur, Madhyamgram</li>
          <li className="mb-2">vickybhattacharya19@gmail.com</li>
          <li className="mb-2">+91-8240294682</li>
        </ul>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <h6 className="text-uppercase mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: '#8a98a5' }}>FOLLOW US</h6>
        <ul className="list-unstyled d-flex" style={{ gap: "1rem" }}>
          <li>
            <NavLink to="https://github.com/venusau" className="text-light">
              <i className="fab fa-github" style={{ fontSize: '18px' }}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="https://x.com/dj_Vb_rocks4" className="text-light">
              <i className="fab fa-twitter" style={{ fontSize: '18px' }}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="https://www.instagram.com/vicky.bhattacharya/" className="text-light">
              <i className="fab fa-instagram" style={{ fontSize: '18px' }}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="https://www.linkedin.com/in/vicky-bhattacharya-98535725b/" className="text-light">
              <i className="fab fa-linkedin-in" style={{ fontSize: '18px' }}></i>
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
