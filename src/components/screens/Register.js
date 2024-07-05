import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router-dom";

function Notification({ show, onClose, message }) {
  return (
    <Toast
      show={show}
      onClose={onClose}
      className="alert alert-danger"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please add all the fields");
      return;
    }

    fetch("https://make-my-trip-backend.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          navigate("/signin");
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
    >
      <div
        className="form-container"
        style={{
          maxWidth: "40rem",
          margin: "50px auto",
          padding: "30px",
          borderRadius: "10px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          boxShadow: "100px 100px auto auto rgba(0, 0, 0, 0.5)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your Full Name"
              style={{
                backdropFilter: "blur(1px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
