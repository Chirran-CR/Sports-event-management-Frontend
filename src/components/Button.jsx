import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
export default function Button({ text, blue = false }) {
  return (
    <Div whileHover={{ scale: 1.2 }}>
      <button className={`${blue ? "blue" : ""}`}>{text}</button>
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
