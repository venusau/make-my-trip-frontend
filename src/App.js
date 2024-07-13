import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from "./context";
import Navbar from './components/Navbar'; 
import Dashboard from "./components/screens/Dashboard"; 
import Flights from './components/screens/Flights'; 
import Hotels from './components/screens/Hotels'; 
import Register from './components/screens/Register';
import Signin from './components/screens/Signin';
import Home from './components/screens/Home';
import { useEffect } from 'react';
import { useContext } from 'react';
import "./App.css"
import Footer from './components/Footer';
import Admin from './components/screens/Admin';




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
if(JSON.parse(localStorage.getItem("user"))){
  return (
    <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/userdashboard"  element={<Dashboard/>} />
        <Route path="/flights" element={<Flights/>} />
        <Route path="/hotels" element={<Hotels/>} />
        
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
  );
}
  else{
    return(
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    )
  }
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
