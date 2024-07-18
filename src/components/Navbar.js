import React, { useEffect, useState, useContext, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const checkAdminStatus = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        setIsAdmin(false);
        return;
      }

      const response = await fetch(
        "https://make-my-trip-backend.vercel.app/api/admin",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = await response.json();
      setIsAdmin(data.isAdmin);
      localStorage.setItem("isAdmin", data.isAdmin);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (state && !isAdmin) {
      checkAdminStatus();
    }
  }, [state, isAdmin, checkAdminStatus]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };

  const renderList = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/userdashboard">
              <i className="fas fa-user fa-lg"></i>
              <span className="nav-text">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/flights">
              <i className="fas fa-plane-departure fa-lg"></i>
              <span className="nav-text">Flights</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/hotels">
              <i className="fas fa-hotel fa-lg"></i>
              <span className="nav-text">Hotels</span>
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
              <i class="fas fa-cogs fa-lg"></i>
                <span className="nav-text">Admin</span>
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-lg"></i>
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signin">
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={state ? "/" : "/signin"} activeClassName="inactive">
            <img
              src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
              height="40"
              alt="Make My Trip"
              className="logo"
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">{renderList()}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
