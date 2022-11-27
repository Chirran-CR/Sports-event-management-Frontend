import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
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
