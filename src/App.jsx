import { motion } from "framer-motion";
import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Events from "./components/event/Events";
import Login from "./components/auth/login/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/signup/Signup";
import MainPage from "./MainPage";
import StudentEvents from "./components/event/studentEvent/StudentEvents";
import Contact from "./components/contact/Contact";
import AboutUs from "./components/aboutUs/AboutUs";
import MyEvents from "./components/event/myEvent/MyEvents";
import MyUploadedEvent from "./components/event/myUploadedEvent/MyUploadedEvents";
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
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/myevent" element={<MyEvents/>}/>
          <Route path="/myuploadedevent" element={<MyUploadedEvent/>} />
        </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </>
  );
}
const PrivateRoute=()=>{
    const notify = () => toast.error('Please Login First..!!', {
      toastId: 'success1',
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });;
    const designation=localStorage.getItem("designation");
    if(designation){
       return ( designation=="teacher"? <Events />:<StudentEvents/>)
    }else{
      console.log("Notify called....");
      notify();
       return (<Navigate to="/"/>)
    }
}
export default App;
