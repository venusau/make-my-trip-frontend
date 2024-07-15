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

  const [showPassword, setShowPassword] = useState(false);

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
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="form-container"
        style={{
          width: "100%",
          maxWidth: "40rem",
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
          Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "white",
                fontWeight: "500",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your Full Name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "white",
                fontWeight: "500",
              }}
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
                transition: "box-shadow 0.3s ease",
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
              padding: "14px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
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
