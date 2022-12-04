import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {Link } from "react-router-dom";

function ContactButton(props) {
  const text=props.text;
  const blue=props.blue;
  return (
    <Div whileHover={{ scale: 1.2 }}>
     
      <button className={`${blue ? "blue" : ""}`} ><Link style={{color:"white"}}to="/contact">{text}</Link></button>
    </Div>
  );
}

const Div = styled(motion.div)`
  button {
    border-radius: 4rem;
    padding: 0.8rem 2rem;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    margin-right:1rem;
    :not(.blue) {
      background-color: transparent;
      border: 1px solid white;
    }
  }
  .blue {
    background-color: #2d69fd;
  }
`;


export default ContactButton;