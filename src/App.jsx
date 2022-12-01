import { motion } from "framer-motion";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/auth/login/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/signup/Signup";
import MainPage from "./MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar  />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
