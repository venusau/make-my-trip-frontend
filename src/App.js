import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from "./context";
import Navbar from './components/Navbar'; // Adjust the import path as necessary
import Dashboard from "./components/screens/Dashboard"; // Adjust the import path as necessary
import Flights from './components/screens/Flights'; // Adjust the import path as necessary
import Hotels from './components/screens/Hotels'; // Adjust the import path as necessary
import Register from './components/screens/Register';
import Signin from './components/screens/Signin';
import Home from './components/screens/Home';
import { useEffect } from 'react';
import { useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Footer from './components/Footer';



function Routing(){
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/userdashboard"  element={<Dashboard/>} />
        <Route path="/flights" element={<Flights/>} />
        <Route path="/hotels" element={<Hotels/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
  );
}

function App() {
  return (
    <>
    
    <Router>
      <Navbar />
      
      <Routing/>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
