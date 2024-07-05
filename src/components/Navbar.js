import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { useContext } from "react";

function Navbar() {
  let { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  function renderList() {
    // state = true
    if (state) {
      return [
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/userdashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/flights">
              Flights
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/hotels">
              Hotels
            </NavLink>
          </li>
          <li className="nav-item ">
            <div className="btn border rounded-pill text-end">
              <button
                className="nav-link"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                  navigate("/signin");
                }}
                style={{height:"4vh", textAlign:"center"}}
              >
               <span className="pb-1">Logout</span> 
              </button>
            </div>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li className="nav-item">
            <NavLink className="nav-link active" to="/signin">
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </>,
      ];
    }
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div
          className="container-fluid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
                height="30vh"
                // width="100vw"
                alt="Make My Trip"
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">{renderList()}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
