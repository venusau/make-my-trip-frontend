import React from 'react';
import './Footer.css'; // Assuming you have some additional CSS for custom styling

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Reiciendis, nisi! Aliquid, fugit tempora. Dolorem, nostrum.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-light">Home</a>
              </li>
              <li>
                <a href="#!" className="text-light">Flights</a>
              </li>
              <li>
                <a href="#!" className="text-light">Hotels</a>
              </li>
              <li>
                <a href="#!" className="text-light">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p>
              <i className="fas fa-home mr-3"></i> 123, Street Name, City, Country
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> info@example.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print mr-3"></i> + 01 234 567 89
            </p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-start">
              <li>
                <a href="#!" className="text-light mr-3">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="text-light mr-3">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="text-light mr-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="text-light mr-3">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center mt-3">
            <p className="mb-0">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
