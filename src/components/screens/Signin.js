import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";

import ToastContainer from "react-bootstrap/ToastContainer";
import Notification from "./toasts/Notification";

function Signin() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [toastBgType, setToastBgType] = useState("danger");

  const handleToastClose = () => setShowToast(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToastMessage("All fields are required");
      setShowToast(true);
      return;
    }

    fetch("https://make-my-trip-backend.vercel.app/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          setToastMessage("You're signed in");
          setShowToast(true);
          setToastBgType("success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Error:", err.message || err);
        setToastMessage(err.message || "An error occurred. Please try again.");
        setToastBgType("danger");
        setShowToast(true);
      });
  };

  return (
    <div className="container">
      <div
        className="form-container"
        style={{
          maxWidth: "400px",
          margin: "80px auto",
          padding: "40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{ marginBottom: "30px", textAlign: "center", color: "white" }}
        >
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "8px", color: "white" }}
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "8px", color: "white" }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backdropFilter: "blur(5px)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "18px",
                }}
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{
              width: "100%",
              padding: "12px",
              fontWeight: "bold",
            }}
          >
            Sign in
          </button>
        </form>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Notification
          show={showToast}
          onClose={handleToastClose}
          message={toastMessage}
          bgType={toastBgType}
        />
      </ToastContainer>
    </div>
  );
}

export default Signin;
