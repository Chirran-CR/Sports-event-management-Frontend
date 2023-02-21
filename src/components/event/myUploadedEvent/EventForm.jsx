import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
// import { studentEventSchema } from "./schemas/studentEventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import {Avatar} from "antd";
import EventAdded from "./EventAdded";


const initialValues = {
  // student_email: "",
  // college_name: "",
  uploaded_sports:  "",
  participating_clg:""
};
const sportsCategories = [
  
  "CRICKET",
  "FOOTBALL",
  "BASKETBALL",
  "BADMINTON",
  "VOLLEY",
];
const colleges = [
  { key: "Option 1", value: "NIST" },
  { key: "Option 2", value: "RIT" },
  { key: "Option 3", value: "ITER" },
  { key: "Option 4", value: "IISER" },
  { key: "Option 5", value: "KIT" },
];
const EventForm = (props) => {
  const [uploadedSportsArray,setUploadedSportsArray]=useState([]);
  const [participatedClgArray,setParticipatedClgArray]=useState([]);
  const [update,setUpdate]=useState(false);
  const [clgUpdate,setClgUpdate]=useState(false);

  let tempSport,tempClg;
useEffect(()=>{
  setUpdate(false);
},[props.eventReducer.update])

useEffect(()=>{
  setClgUpdate(false);
},[props.eventReducer.clgUpdate]);
  // // const [checkboxTick,setCheckboxTick]=useState(1);
  // const [displayForm,setDisplayForm]=useState(true);
  // console.log("props in eventForm of student:",props);
  let event_id=props?.eventReducer?.sportEvent?.id;
  // console.log("event_id is:",event_id);
  // console.log("val of props.studentEventReducer.participatedEvents[0] is:",props.studentEventReducer.participatedEvents[0]);
  
  // let uploadedSportsArray;
  console.log("Val of update is:",update);
  if(update==false){
    console.log("inside update is false");
    console.log("Val of props.teacherUploadedEventReducer?.teacherUploadedData[0]?.eventsArray is:",props.teacherUploadedEventReducer?.teacherUploadedData);
      console.log("Val of teacherUploadedEventReducer is:",props.teacherUploadedEventReducer);
    // let singleUploadedEvent;
      let singleUploadedEvent=props.teacherUploadedEventReducer?.teacherUploadedData[0]?.eventsArray?.filter((singleEvent)=>{
      // console.log("Val of singleEvent.eventId",singleEvent.eventId);
      // console.log("val of props.eventReducer.sportEvent.id:",props.eventReducer.sportEvent.id);
      return singleEvent.eventId == props.eventReducer.sportEvent.id;
    })
    console.log("Val of singleUploadedEvent is:",singleUploadedEvent);
    if(typeof(singleUploadedEvent) != "undefined"){
      // console.log("inside i.e not undefined");
      // uploadedSportsArray=singleUploadedEvent[0]?.participatingSports;
      // console.log("uploadedSportsArray.length is:",uploadedSportsArray.length);
    console.log("Val of singleUploadedEvent inside undefined if block is:",singleUploadedEvent[0]?.sportsCategory);
    console.log("uploadedSportsArray.length is:",uploadedSportsArray.length);
  
      if(typeof(singleUploadedEvent[0]?.sportsCategory)!= "undefined"){
        console.log("inside if block..");
      const tempArrayForParticipatedSportsArray=[...singleUploadedEvent[0]?.sportsCategory];
  
        setUploadedSportsArray([...tempArrayForParticipatedSportsArray]);
        setUpdate(true);
        props.setUpdate(true);
      }
    } 
    console.log("Val of uploaded Sports array is:",uploadedSportsArray);
  }
  if(clgUpdate==false){
    console.log("inside clgUpdate is false");
    console.log("Val of props.teacherUploadedEventReducer?.teacherUploadedData[0]?.eventsArray is in clgUpdate:",props.teacherUploadedEventReducer?.teacherUploadedData);
      console.log("Val of teacherUploadedEventReducer is in clgUpdate :",props.teacherUploadedEventReducer);
    // let singleUploadedEvent;
      let singleUploadedEvent=props.teacherUploadedEventReducer?.teacherUploadedData[0]?.eventsArray?.filter((singleEvent)=>{
      // console.log("Val of singleEvent.eventId",singleEvent.eventId);
      // console.log("val of props.eventReducer.sportEvent.id:",props.eventReducer.sportEvent.id);
      return singleEvent.eventId == props.eventReducer.sportEvent.id;
    })
    console.log("Val of singleUploadedEvent is in clgUpdate:",singleUploadedEvent);
    if(typeof(singleUploadedEvent) != "undefined"){
      // console.log("inside i.e not undefined");
      // uploadedSportsArray=singleUploadedEvent[0]?.participatingSports;
      // console.log("uploadedSportsArray.length is:",uploadedSportsArray.length);
    console.log("Val of singleUploadedEvent inside undefined if block is in clgUpdate:",singleUploadedEvent[0]?.participatingClgs);
    console.log("uploadedSportsArray.length is in clgUpdate:",uploadedSportsArray.length);
  
      if(typeof(singleUploadedEvent[0]?.participatingClgs)!= "undefined"){
        console.log("inside if block..in clgUpdate");
      const tempArrayForParticipatedClgsArray=[...singleUploadedEvent[0]?.participatingClgs];
  
      setParticipatedClgArray([...tempArrayForParticipatedClgsArray]);
      setClgUpdate(true);
        props.setClgUpdate(true);
      }
    } 
    console.log("Val of participated clg array is: in clgUpdate",participatedClgArray);
  }
  // const uploadedSportsArray=singleUploadedEvent == "undefined" ? "true":"false";
function handleUploadedSportsArray(){
  console.log("Click on checkbox having sport is:",tempSport);
  if(uploadedSportsArray.includes(tempSport)){
    const tempArrayForParticipatedSportsArray=[...uploadedSportsArray];
    const index = tempArrayForParticipatedSportsArray.indexOf(tempSport);
    if (index > -1) { // only splice array when item is found
      tempArrayForParticipatedSportsArray.splice(index, 1); // 2nd parameter means remove one item only
      
      // const newArry=[...uploadedSportsArray];
      setUploadedSportsArray([...tempArrayForParticipatedSportsArray]);
    }
  }else{
    const tempArrayForParticipatedSportsArray=[...uploadedSportsArray,tempSport];
    setUploadedSportsArray([...tempArrayForParticipatedSportsArray]);
  }
  setUpdate(true);
  props.setUpdate(true);

}
async function handleRemoveParticipation(){
  console.log("Inside handleRemoveParticipation function...");
  const teacherDeleteEventRes = await axios.delete(
      `http://localhost:5000/event/teacher/${props.userReducer.id}`,
      // `https://sprots-event-api-2.onrender.com/event/student/add`,
      // {event_id:event_id},{credentials:true}
      {data:{event_id:event_id},credentials:true}
  );
  console.log("Val of teacherDeleteEventRes is:",teacherDeleteEventRes);
  const allParticipatedEvent=props.teacherUploadedEventReducer.teacherUploadedData.map((ev)=>{
      const eventsArray=ev.eventsArray.filter((event)=>{
        return event.eventId != event_id;
      });
      return {...ev,eventsArray:eventsArray};
  });
  console.log("AllParticipatedEvent value after deleting:",allParticipatedEvent[0]);
  // props.addParticipatedEvent(allParticipatedEvent[0]);
  props.hideStudentForm();
  // props.setEvent();
}
function handleParticipatedClgArray(){
  console.log("Click on checkbox having clg is:",tempClg);
  if(participatedClgArray.includes(tempClg)){
    const tempArrayForParticipatedClgsArray=[...participatedClgArray];
    console.log("Val of participatedClgArray is:",participatedClgArray);
    const index = tempArrayForParticipatedClgsArray.indexOf(tempClg);
    if (index > -1) { // only splice array when item is found
      tempArrayForParticipatedClgsArray.splice(index, 1); // 2nd parameter means remove one item only
      
      // const newArry=[...uploadedSportsArray];
      console.log("Val of tempArrayForParticipatedClgsArray is:",tempArrayForParticipatedClgsArray);
      setParticipatedClgArray([...tempArrayForParticipatedClgsArray]);
    }
  }else{
    const tempArrayForParticipatedClgsArray=[...participatedClgArray,tempClg];
    console.log("Val of tempArrayForParticipatedClgsArray is:",tempArrayForParticipatedClgsArray);
    setParticipatedClgArray([...tempArrayForParticipatedClgsArray]);
  }
  setClgUpdate(true);
  props.setClgUpdate(true);
}

  console.log("Val of uploadedSportsArray is:",uploadedSportsArray);
  // console.log("initial values in eventForm:",initialValues);
  console.log("Val of teacherUploadedEventReducer inside eventForm of myEvent is:",props.teacherUploadedEventReducer);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: studentEventSchema,
      onSubmit: async (values, action) => {
        axios.defaults.withCredentials = true
        const sendingDataDetails={
          eventId:event_id,
          // teacherEmail:props.userReducer.userEmail,
          // hostingClg:props.eventReducer.sportEvent.host,
          // collegeName:values.college_name,
          participatingClgs:[...participatedClgArray],
          sportsCategory:[...uploadedSportsArray],
          
        }
        console.log("values of form in EventForm of myUploadedEvent",values);
        console.log("val of sending data details is:",sendingDataDetails);
        // console.log("Val of removeParticipated event is:",true);
      // let teacherEventRes;
      //  if(removeParticipatedEvent==true){
      //   console.log("Inside true of removeParticipation...");
      //      teacherEventRes = await axios.post(
      //       `http://localhost:5000/event/student/delete/${props.userReducer.id}`,
      //       // `https://sprots-event-api-2.onrender.com/event/student/add`,
      //       sendingDataDetails,{credentials:true}
      //     );
      //  }else{
           const teacherEventRes = await axios.put(
            `http://localhost:5000/event/teacher/${props.userReducer.id}`,
            // `https://sprots-event-api-2.onrender.com/event/student/add`,
            sendingDataDetails,{credentials:true}
          );
      //  }
        console.log("teacherEventRes received inside eventForm of myUploadedEvent is:", teacherEventRes);
        action.resetForm();
        // action.setSubmitting(false);
        // document.getElementsByClassName("mycheck").checked = false;
        // setCheckboxTick(checkboxTick+1);
        // props.hideForm();
        props.hideStudentForm();
      },
    });
  return (
    <>
      <GlobalStyle />
      {props.authReducer.dispalyStudentFromState ? <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
               { console.log("image result is:",props.userReducer.profileImage)}
              {props.userReducer.profileImage != "" ? <Avatar src={<img src={`http://localhost:5000/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
              
                <h1  style={{marginLeft:"20%"}}>Event Details</h1>
                <p className="modal-desc">
                  ..
                </p>
                <form onSubmit={handleSubmit} >
                <h1 className="modal-title">Event Name:{props?.eventReducer?.sportEvent?.name}</h1>
                  {/* <div className="input-block">
                    <label htmlFor="student_email" className="input-label">
                      Student Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="student_email"
                      id="student_email"
                      placeholder="Student Email"
                      value={props.userReducer.userEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.student_email && touched.student_email ? (
                      <p className="form-error">{errors.student_email}</p>
                    ) : null}
                  </div> */}
                  <h1 className="modal-title">Hosted By:{props?.eventReducer?.sportEvent?.host}</h1>
                  <div className="input-block">
                    <label htmlFor="participating_clg" className="input-label">
                      Participating Colleges
                    </label>
                    {colleges.map((clg)=>{
                      return(<>
                        <input
                      type="checkbox"
                      autoComplete="off"
                      key={clg.key}
                      name="participating_clg"
                      id="participating_clg"
                      value={clg.value}
                      checked={participatedClgArray.includes(clg.value)}
                      onClick={(value)=>{ tempClg=clg.value;console.log("college is",tempClg);handleParticipatedClgArray()}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{clg.value}</>
                      )
                    })}
                    
                  </div>
                  <div className="input-block">
                    <label htmlFor="participating_sports" className="input-label">
                      Selected Sports
                    </label>
                    {/* { props?.eventReducer?.sportEvent?.sports?.map((sport,idx)=>{ */}
                    { sportsCategories.map((sport,idx)=>{                      
                      console.log();//here checkbox's checked val ko true set krenge
                      return(<>
                        <input
                      type="checkbox"
                      key={idx}
                      name="uploaded_sports"
                      id="uploaded_sports"
                      value={sport}
                      checked={uploadedSportsArray.includes(sport)}
                      onChange={handleChange}
                      onClick={(value)=>{ tempSport=sport;console.log("sport is",tempSport);handleUploadedSportsArray()}}
                      onBlur={handleBlur}
                    />{sport}</>
                      )
                    })}
                    {errors.sports_category && touched.sports_category ? (
                      <p className="form-error">{errors.sports_category}</p>
                    ) : null}
                  </div>
                  <h1 className="modal-title">No of Participants:{23}</h1>
                  <div className="modal-buttons">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="input-button"
                      type="submit"
                      // onClick={(removeParticipatedEvent)=>{setRemoveParticipatedEvent(false);}}
                    >
                      Update Participation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="input-button"
                      // type="submit"
                      type="button"
                      style={{marginLeft:"5px",marginRight:"2px"}}
                      // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                      onClick={()=>{handleRemoveParticipation()}}
                    >
                      Remove Participation
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper> :<EventAdded/>}
      
    </>
  );
};

const Wrapper = styled.section`
  .container {
    position: relative;
    top: 0rem;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: #efedee; //original
    background-color:#232835;
    // border:2px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    /* height: 60px; */
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top:0rem;
    transition-duration: 0.3s;
    background: #fff;
  }
  .modal-title {
    margin: 0;
    font-weight: 400;
    // color: #55311c;//original
    color: #232835;
  }
  .form-error {
    font-size: 1.4rem;
    color: #b22b27;
  }
  .modal-desc {
    margin: 6px 0 30px 0;
  }
  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .modal-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;
  }
  .modal-right img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    -o-object-fit: cover;
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .modal.is-open .modal-left {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-buttons a {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
  }

  .sign-up {
    margin: 60px 0 0;
    font-size: 14px;
    text-align: center;
  }
  .sign-up a {
    color: #8c7569;
  }

  .input-button {
    padding: 1.2rem 3.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    // background: #8c7569;//original
    background: #232835;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }
  .input-button:hover {
    // background: #55311c;//original color
    color: #2d69fd;
  }

  .input-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    // color: #8c7569;//original
    color: #232835;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: 0.3s;
  }
  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block input::-moz-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input:-ms-input-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input::placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block:focus-within {
    border-color: #8c7569;
  }
  .input-block:focus-within .input-label {
    color: rgba(140, 117, 105, 0.8);
  }

  @media (max-width: 750px) {
    .modal-container {
      max-width: 90vw;
    }

    
  }
`;
function mapStateToProps(store) {
  return store;
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (desigantion) => {
      return dispatch({ type: "login", payload: desigantion });
    },
    hideForm:()=>{//not required here 
      return dispatch({type:"hide-form"});
    },
    hideStudentForm:()=>{
      return dispatch({type:"hide-student-form"})
    },
    setEvent:()=>{
      return dispatch({type:"set-event",payload:{}})
    },
    addParticipatedEvent:(eventObj)=>{
      return dispatch({type:"add-participated-event",payload:eventObj})
    },
    setUpdate:(val)=>{
      return dispatch({type:"set-update",payload:val})
    },
    setClgUpdate:(val)=>{
      return dispatch({type:"set-clg-update",payload:val})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);