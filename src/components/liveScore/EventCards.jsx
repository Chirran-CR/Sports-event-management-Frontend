import axios from "axios";
import React,{useEffect,useState} from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
// import ParticipatedButton from "./ParticipatedButton";
import moment from "moment";


import styled from "styled-components";
import { API_URL } from "../../App";
// import marketplace1 from "../../../assets/sports3-min.png";
import Button from "../Button";
import EventDateButton from "../EventDateButton";
function EventCards(props) {
  const [receivedData,setReceivedData]=useState([]);
  console.log("props in Event card of student:",props);//sportsEvent
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
  let participatedEventData=[];
  let imageWithEventData=[];
  let id=props.userReducer.id;
  console.log("Val of userReducer is:",props.userReducer);
  console.log("Val of id is:",id);
  useEffect(()=>{
    console.log("inside the useEffect of eventCards of event...");
    (async function (){
          // const resp=await axios.get(`http://localhost:5000/event/student/${id}`,{credentials:true});
          
          // const resp=await axios.get("https://sprots-event-api-2.onrender.com/event/",{credentials:true});
          
          // const  receivedParticipatedEventData=resp.data.participatedEventsDetails;
          // console.log("Received participatedEventData is:",receivedParticipatedEventData);
          const respEvents=await axios.get(`${API_URL}/event/`,{credentials:true});
          const allEventData=respEvents.data.allEventsDetails;
          console.log("Received allEventData is:",allEventData);
          // const participatedArray=receivedParticipatedEventData[0].eventsArray;
          // console.log("Val oif participatedArray is:",participatedArray);
          // const participatedEventIds=participatedArray.map((ev)=>{
          //   return ev.eventId;
          // })
          // console.log("val of participatedEventIds is:",participatedEventIds);
          // const participatedEvents=allEventData.filter((event)=>{
          //    return participatedEventIds.includes(event._id);
          // })
          // console.log("Val of participatedEvents is:",participatedEvents);
          
          imageWithEventData=allEventData?.map((ev,i)=>{
              return{
                  id:ev._id,
                  eventBanner:ev.eventBanner,
                  teacherEmail:ev.TeacherEmail,
                  name:ev.eventName,
                  host:ev.hostingCollege,
                  participate:ev.participatingColleges,
                  sports:ev.sportsCategory,
                  registrationDeadline:ev.registrationDeadline,
                  eventDate:ev.eventDate,
                  venue:ev.venue,
                  participatingStudents:ev.participatingStudents,
                  result:ev.result,
                  selectedStudents:ev.selectedStudents
              }
            })
       
          setReceivedData(imageWithEventData);
          // props.addParticipatedEvents(receivedParticipatedEventData[0]);
          
    })();
    // console.log("Received participatedEventData outer:",participatedEventData);

        
    console.log("image with imageWithEventData:",imageWithEventData);
  },[])
 let totalEvents=receivedData;
 if(eventDateType == "All" && selectedCategory == "ALL") totalEvents= receivedData;
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
  }).map((ev)=>{
    ev.name = ev.eventName;
    ev.host= ev.hostingCollege;
    ev.participate=ev.participatingColleges;
    ev.sports=ev.sportsCategory;
    return ev;
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
}).map((ev)=>{
  ev.name = ev.eventName;
  ev.host= ev.hostingCollege;
  ev.participate=ev.participatingColleges;
  ev.sports=ev.sportsCategory;
  return ev;
}); 
  // console.log("event dAta:",participatedEventData);
  
  console.log("image with event data:",imageWithEventData);
//  console.log("new recevied data:",receivedData);
 console.log("value of total event:",totalEvents);
  return (
    <Section >
      <div className="title">
        {/* <h2>Events</h2> */}
       {/* <Link to="/myevent">
          <ParticipatedButton text="Participated Events" blue={true}/>
       </Link>  */}
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
        {totalEvents?.map((ev) => {
          return (
            <div  onClick={()=>{props.setEvent(ev);}} className="marketplace" key={ev.id}>
              <div className="image">
                <img src={`${API_URL}/images/eventPics/${ev.eventBanner}`} height="142" width="252" alt="marketplace" />
              </div>
              <div className="name">
                <h4>Event Name: {ev.name}</h4>
                <BsThreeDots />
              </div>
              <h6 className="username">Hosted By: {ev.host}</h6>
              
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
    margin-top:44rem;
    width:100vw;
    .mycard{
      margin-left:-2rem;
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
    setEvent: (eventObj) => {
      return dispatch({ type: "set-event", payload: eventObj });
    },
    addParticipatedEvents:(eventObj)=>{
      return dispatch({type:"add-participated-event",payload:eventObj})
    },
    setUpdate:(val)=>{
      return dispatch({type:"set-update",payload:val})
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(EventCards);
