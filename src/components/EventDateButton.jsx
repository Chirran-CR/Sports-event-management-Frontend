import React, { useState } from 'react'
import { connect } from 'react-redux';
import styled from "styled-components";
import { motion } from "framer-motion";

const EventDateButton = (props) => {
  const [clickedBtn,setClickedBtn]=useState("All");
  return (
    <div style={{display:"flex",marginLeft:"28rem"}}>
        <Div whileHover={{ scale: 1.2 }}>
            <button className={"All" == clickedBtn ? "blue":""} onClick={()=>{setClickedBtn("All");props.updateEventDateType("All");}}>All</button>
        </Div>
        <Div whileHover={{ scale: 1.2 }}>  
            <button className={"Live" == clickedBtn ? "blue":""}  onClick={()=>{setClickedBtn("Live");props.updateEventDateType("Live")}}>Live</button>
        </Div>
        <Div whileHover={{ scale: 1.2 }}>      
            <button className={"Upcoming" == clickedBtn ? "blue":""}  onClick={()=>{setClickedBtn("Upcoming");props.updateEventDateType("Upcoming")}}>Upcoming</button>
        </Div>
        <Div whileHover={{ scale: 1.2 }}>       
            <button className={"Completed" == clickedBtn ? "blue":""}  onClick={()=>{setClickedBtn("Completed");props.updateEventDateType("Completed")}}>Completed</button>
        </Div>
    </div>
  )
}
const Div = styled(motion.div)`
  button {
    border-radius: 4rem;
    padding: 0.8rem 2rem;
    border: 1px solid black;
    color: black;
    font-size: 1.1rem;
    cursor: pointer;
    margin-right:1rem;
    :not(.blue) {
      background-color: transparent;
      border: 1px solid black;
    }
  }
  .blue {
    background-color: #2d69fd;
  }
`;
function mapStateToProps(store) {
    return store;
  }
const mapDispatchToProps = (dispatch) => {
    return {
    updateEventDateType: (clickedBtn) => {
        return dispatch({ type: "update-event-date-type", payload: clickedBtn });
    }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(EventDateButton);