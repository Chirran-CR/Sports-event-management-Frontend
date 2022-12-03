import { motion } from "framer-motion";
import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Events from "./components/event/Events";
import Login from "./components/auth/login/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/signup/Signup";
import MainPage from "./MainPage";
import StudentEvents from "./components/event/studentEvent/StudentEvents";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar  />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<PrivateRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
const PrivateRoute=()=>{
    const designation=localStorage.getItem("designation");
    if(designation){
       return ( designation=="teacher"? <Events />:<StudentEvents/>)
    }else{
       return ( <Navigate to="/"/>)
    }
}
export default App;
