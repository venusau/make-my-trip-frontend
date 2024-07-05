import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';



function Notification({ show, onClose, message }) {
  return (
    <Toast
      show={show}
      onClose={onClose}
      className="alert alert-danger"
      style={{
        color:"red",
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999,
        backgroundColor:"rgba()"
      }}
    >
      <Toast.Header>
      </Toast.Header>
      
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

function Signin() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToastMessage("All fields are required");
      setShowToast(true);
      return;
    }

    fetch("https://make-my-trip-backend.onrender.com/api/auth/signin", {
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
          navigate("/flights");
        }
      })
      .catch((err) => {
        console.error("Error:", err.message || err);
        setToastMessage(err.message || "An error occurred. Please try again.");
        setShowToast(true);
      });
  };

  return (
    <div className="container">
      <div
        className="form-container"
        style={{
          maxWidth: "40rem",
          margin: "50px auto",
          padding: "30px",
          borderRadius: "10px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              style={{
                backdropFilter: "blur(1px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              style={{
                backdropFilter: "blur(1px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </form>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Notification
          show={showToast}
          onClose={handleToastClose}
          message={toastMessage}
        />
      </ToastContainer>
    </div>
  );
}

export default Signin;
