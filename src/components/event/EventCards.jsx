import axios from "axios";
import React,{useEffect,useState} from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";
import ParticipatedButton from "./ParticipatedButton";
import EventDateButton from "../EventDateButton";

import styled from "styled-components";
import {getEventMiddleware} from "../../redux/middleware/getEventMiddleware";
import Button from "../Button";
import { API_URL } from "../../App";
function EventCards(props) {
  const [receivedData,setReceivedData]=useState([]);
  const selectedCategory=props.categoryReducer.choosedCategory;
  const eventDateType=props.eventDateTypeReducer.eventDateType;
  const sportsCategories = [
    "ALL",
    "CRICKET",
    "FOOTBALL",
    "BASKETBALL",
    "BADMINTON", 
    "VOLLEY",
  ];
  let eventData=[];
  let imageWithEventData=[];
  console.log("props value in eventCards:",props);
  useEffect(()=>{
        imageWithEventData=props.getEvents();
        // setReceivedData(props.allEvents);
        console.log("Received EventData inner:",imageWithEventData);
      },[])
  // imageWithEventData=props.getEvents();
        console.log("Received EventData inner:",imageWithEventData);
  console.log("event dAta:",eventData);
  console.log("image with event data:",imageWithEventData);
  // setReceivedData(props.allEvents);
 console.log("new recevied data:",receivedData);
 let totalEvents=props?.teacherEventReducer.allEvents; 
 if(eventDateType == "All" && selectedCategory == "ALL") totalEvents= props?.teacherEventReducer.allEvents;

 if (eventDateType!="All") {
  const dateType=eventDateType;
  totalEvents=props?.teacherEventReducer.allEvents.filter((ev)=> {
    const dateLimit = moment(ev.eventDate, 'YYYY-MM-DD');
    const now = moment()
     if(dateType=="Live"){
      if (dateLimit.isValid() && now.isSame(dateLimit,"day","month","year")) {
         return true;
      }else return false;
     }else if(dateType=="Upcoming"){
      if (dateLimit.isValid() && now.isBefore(dateLimit,"day","month","year")) {
        return true;
      }else return false;
     }else{
      if (dateLimit.isValid() && now.isAfter(dateLimit,"day","month","year")) {
        return true;
      }else return false;
     }
  });
 }
//  if (selectedCategory!="ALL") totalEvents=props?.teacherEventReducer.allEvents.filter((ev)=>  ev.sportsCategory.includes(selectedCategory));
if (selectedCategory!="ALL") totalEvents=props?.teacherEventReducer.allEvents.filter((ev)=> { 
  const dateLimit = moment(ev.eventDate, 'YYYY-MM-DD');
  const now = moment()
  if(eventDateType == "All"){
    return ev.sportsCategory.includes(selectedCategory);
  }else if(eventDateType=="Live"){
    if ((dateLimit.isValid()) && (now.isSame(dateLimit,"day","month","year") && (ev.sportsCategory.includes(selectedCategory)))) {
      return true;
   }else return false;
  }else if(eventDateType=="Upcoming"){
    if ((dateLimit.isValid()) && (now.isBefore(dateLimit,"day","month","year") && (ev.sportsCategory.includes(selectedCategory)))) {
      console.log("Inside upcoming...",ev.sportsCategory.includes(selectedCategory));
      return true;
    }else return false;
  }else if(eventDateType=="Completed"){
    if ((dateLimit.isValid()) && (now.isAfter(dateLimit,"day","month","year") && (ev.sportsCategory.includes(selectedCategory)))) {
      return true;
    }else return false;
  }
  return false;
}); 
console.log("Total event ki value in 37 line:",totalEvents);
 return (
    <Section>
      <div className="title">
        <h2>Added Sports Events</h2>
       <div  style={{display:"flex"}}>
        <Link to="/myuploadedevent">
          <ParticipatedButton text="My Uploaded Events" blue={false} mycolor="button-color"/>
       </Link> 
       <Link to="/selectparticipant">
          <ParticipatedButton text="Select Participant" blue={false} mycolor="button-color"/>
       </Link>
        </div> 
        <p>
         Add the event and we will manage the event for you...
        </p>
      </div>
      <div className="event-date-mobile">
      <EventDateButton/>  
      </div>
      <div className="marketPlaceTypes">
        {sportsCategories.map((text, index) => {
          return <Button text={text} key={index} blue={text=== selectedCategory} />;
        })}
      </div>
      <div className="marketPlaces mycard">
        {totalEvents?.map((ev,idx) => {
          return (
            <div className="marketplace" key={idx}>
              <div className="image">
                <img src={`${API_URL}/images/eventPics/${ev.eventBanner}`} height="142" width="252" alt="marketplace" />
              </div>
              <div className="name">
                <h4>Event Name:{ev.eventName}</h4>
                <BsThreeDots />
              </div>
              <h6 className="username">Hosted By:{ev.hostingCollege}</h6>
             </div> 
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin: 0 6rem;
  margin-bottom: 5rem;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-direction: column;
    h2 {
      font-size: 3rem;
    }
    p {
      color: #7b7e86;
    }
  }
  .marketPlaceTypes {
    display: flex;
    justify-content: center;
    gap: 2rem;
    button:not(.blue) {
      color: black;
      border-color: #7b7e86;
    }
  }
  .marketPlaces {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    .marketplace {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 0.5rem;
      border-radius: 1rem;
      width: max-content;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
      .image {
        margin-bottom: 1rem;
      }
      .name {
        display: flex;
        color: #222222;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        h4 {
        }
      }
      .username {
        color: #555555;
        font-size: 0.8rem;
        padding: 0 1rem;
        margin-bottom: 0.5rem;
      }
      .price-container {
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        color: #02204e;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 2rem;
    .marketPlaceTypes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    .marketPlaces {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media screen and (max-width: 400px) {
    margin-top:116rem;
    width:100vw;
    .mycard{
      margin-left:-8rem;
    }
    .title{
      margin-left:-7rem;
    }
    .event-date-mobile{
      margin-left:-30rem;
    }
  }
`;
function mapStateToProps(store) {
  return store;
}
const mapDispatchToProps = (dispatch) => {
  return {
    getEvents:  () => {dispatch( getEventMiddleware());
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(EventCards);
