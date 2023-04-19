import React from 'react'
import styled from "styled-components";
import Category from './Category';
import EventCards from './EventCards';
import EventForm from './EventForm';
import Sliders from './Sliders';

const MyUploadedEvents = () => {
  return (
    <Section>
      
      <div className="grid-item-1" style={{}}> <Sliders/></div>
      <div className="grid-item-2" ><EventForm/></div>
      <div className="grid-item-3" > <EventCards/></div>
      <div className="grid-item-4" ><Category/></div>      
    </Section>
  )
}

const Section=styled.section`
   display:grid;
   grid-template-columns:repeat(4,1fr);
   grid-template-rows:repeat(3,1fr),
   background-color:gray;
   height:100vh;
  border:2px solid red;
   padding-top:6rem;
   gap:0.5rem;
  //  box-sizing:border-box;
   overflow:auto;
   .grid-item-1{
     grid-column:1 / span 3;
    //  background-color:pink;
   };
   .grid-item-2{
    //  background-color:orange;
     
  };
  .grid-item-3{
    //  background-color:yellow;
     grid-column:1 / span 3;
     grid-row:2/span 2;
  };
  .grid-item-4{
    // background-color:cyan;
    grid-row:2/span 2;
  };
  @media screen and (max-width: 400px) {
    grid-template-columns:1fr 1fr;
    grid-template-rows:repeat(7,1fr),
    
    .grid-item-1{
      grid-area:item-1;
    };
    .grid-item-2{
      grid-area:item-2;
   
      
   };
   .grid-item-3{
      grid-area:item-3;
   };
   .grid-item-4{
     grid-area:item-4;
     grid-column:1/span 1;
     grid-row:1/span 1;
   };

  }
`
export default MyUploadedEvents;