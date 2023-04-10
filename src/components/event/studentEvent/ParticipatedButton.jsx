import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {connect} from "react-redux";

function ParticipatedButton(props) {
  const text=props.text;
  const blue=props.blue;
  const mycolor=props.mycolor;
  
  return (
    <Div whileHover={{ scale: 1.2 }}>
      <button className={`${blue ? "blue" : mycolor? "blue button-color":""}`}  onClick={()=>{}}>{text}</button>
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
  .button-color {
    background-color:#232835;
    // color:red;
  }
`;

function mapStateToProps(store) {
  return store.categoryReducer;
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => {
      return dispatch({ type: "change-category", payload: category });
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ParticipatedButton);