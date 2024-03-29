import React from "react";
import { Link } from "react-router-dom";
import Choose from "./components/Choose";
import Clients from "./components/Clients";
import CreateAndSell from "./components/CreateAndSell";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AllEvents from "./components/AllEvents";
import ScrollToTop from "./components/ScrollToTop";
import Subscribe from "./components/Subscribe";

export default function MainPage() {
  return (
    <div>
      <ScrollToTop />
      <Home />
      <Clients />
      <CreateAndSell />
      <Choose />
      <AllEvents />
      <Subscribe />
      <Footer />
    </div>
  );
}
