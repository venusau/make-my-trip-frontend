import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer } from "react-bootstrap";

function Notification({ onClose, show, message, bgType }) {
  return (
    <Toast show={show} onClose={onClose} bg={bgType} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBgType, setToastBgType] = useState("danger");
  const handleToastClose = () => setShowToast(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      return;
    }

    fetch("https://make-my-trip-backend.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setToastMessage(data.message);
          setToastBgType("success");
          setShowToast(true);
          setTimeout(() => navigate("/signin"), 2000);
        } else {
          setToastMessage(data.error);
          setToastBgType("danger");
          setShowToast(true);
        }
      })
      .catch((err) => {
        setToastMessage("An error occurred. Please try again.");
        setToastBgType("danger");
        setShowToast(true);
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
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
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

export default Register;
