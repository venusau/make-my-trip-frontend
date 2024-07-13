import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { UserContext } from "./context";
import Navbar from './components/Navbar'; 
import Dashboard from "./components/screens/Dashboard"; 
import Flights from './components/screens/Flights'; 
import Hotels from './components/screens/Hotels'; 
import Register from './components/screens/Register';
import Signin from './components/screens/Signin';
import Home from './components/screens/Home';
import "./App.css"
import Footer from './components/Footer';
import Admin from './components/screens/Admin';

function Routing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else if (location.pathname !== "/signin" && location.pathname !== "/register") {
      navigate("/signin");
    }
  }, [dispatch, navigate, location]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (user) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdashboard" element={<Dashboard />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routing />
    </Router>
  );
}

export default App;