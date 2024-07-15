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
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              to="/userdashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              to="/flights"
            >
              Flights
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              to="/hotels"
            >
              Hotels
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
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
                onClick={handleLogout}
                style={{ height: "4vh", textAlign: "center" }}
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
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              to="/signin"
            >
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div
          className="container-fluid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <NavLink
            className={({ isActive }) =>
              "navbar-brand nav-link" + (isActive ? " inactive" : "")
            }
            to={state ? "/" : "/signin"}
            
          >
            <img
              src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
              height="35vh"
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
            style={{ border: "none" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                backgroundSize: "100%",
              }}
            />
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
