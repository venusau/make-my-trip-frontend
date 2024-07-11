import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import "./Navbar.css"

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("https://make-my-trip-backend.onrender.com/api/admin", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          }
        });
        const data = await response.json();
        console.log(data);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    if (state) {
      checkAdminStatus();
    }
  }, [state]);

  function renderList() {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              to="/userdashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              to="/flights"
            >
              Flights
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              to="/hotels"
            >
              Hotels
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                to="/admin"
              >
                Admin Panel
              </NavLink>
            </li>
          )}
          <li className="nav-item">
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
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              to="/signin"
            >
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink className="navbar-brand" to={state ? "/" : "/signin"}>
            <img
              src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
              height="30vh"
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