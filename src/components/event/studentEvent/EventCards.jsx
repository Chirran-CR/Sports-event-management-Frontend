import axios from "axios";
import React,{useEffect,useState} from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import {connect} from "react-redux";

import styled from "styled-components";
import marketplace1 from "../../../assets/marketplace1.png";
import Button from "../../Button";
function EventCards(props) {
  const [receivedData,setReceivedData]=useState([]);
  console.log("props in Event card of student:",props.eventReducer);//sportsEvent
  const marketPlaceType = [
    "All",
    "Cricket",
    "Football",
    "Basketball",
    "Badminton",
    "Volleyball",
  ];
  let eventData=[];
  let imageWithEventData=[];
  useEffect(()=>{

    (async function (){
          const resp=await axios.get("http://localhost:5000/event/",{credentials:true});
          eventData=resp.data.allEventsDetails;
          
          console.log("Received EventData:",eventData);
          imageWithEventData=eventData?.map((ev,i)=>{
            return{
                id:ev._id,
                image:marketplace1,
                name:ev.eventName,
                host:ev.hostingCollege,
                participate:ev.participatingColleges,
                sports:ev.sportsCategory,
                venue:ev.venue
            }
       })
       
       setReceivedData(imageWithEventData);
        })();
        console.log("Received EventData outer:",eventData);

        
     console.log("image with eventData:",imageWithEventData);
  },[])
  console.log("event dAta:",eventData);
  
  console.log("image with event data:",imageWithEventData);
 console.log("new recevied data:",receivedData);
  return (
    <Section>
      <div className="title">
        <h2>Added Sports Events</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard.
        </p>
      </div>
      <div className="marketPlaceTypes">
        {marketPlaceType.map((text, index) => {
          return <Button text={text} key={index} blue={index === 0} />;
        })}
      </div>
      <div className="marketPlaces">
        {receivedData.map((ev) => {
          return (
            <div  onClick={()=>{props.setEvent(ev)}} className="marketplace" key={ev.id}>
              <div className="image">
                <img src={ev.image} alt="marketplace" />
              </div>
              <div className="name">
                <h4>{ev.eventName}</h4>
                <BsThreeDots />
              </div>
              <h6 className="username">{ev.host}</h6>
              <div className="price-container">
                <h5 className="price">free</h5>
                <FaEthereum />
              </div>
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
`;
function mapStateToProps(store) {
  return store;
}
const mapDispatchToProps = (dispatch) => {
  return {
    setEvent: (eventObj) => {
      return dispatch({ type: "set-event", payload: eventObj });
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(EventCards);
