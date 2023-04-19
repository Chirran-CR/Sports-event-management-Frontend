import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
// import { studentEventSchema } from "./schemas/studentEventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Avatar} from "antd";
import EventAdded from "./EventAdded";
import { API_URL } from "../../../App";
import moment from "moment";
import  DatePicker,{ registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import el from "date-fns/locale/el"; // the locale you want
import { connect } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
registerLocale("el", el);


const initialValues = {
  // student_email: "",
  // college_name: "",
  uploaded_sports:  "",
  participating_clg:"",
  event_date:new Date(),
  registration_deadline:new Date(),
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
  const [isResultFormVisible,setResultFormVisible]=useState(false);
  const [selectedSport,setSelectedSport]=useState("");
  const [selectedStudentArray,setSelectedStudentArray]=useState([]);
  const [selectedOutcome,setSelectOutcome]=useState({
    winner:"",
    runnersUp:"",
  })
  //to check event status
  const eventDate = moment(props?.eventReducer?.sportEvent?.eventDate, 'YYYY-MM-DD');
  const now = moment()
  initialValues.event_date=props?.eventReducer?.sportEvent?.eventDate ? moment(props?.eventReducer?.sportEvent?.eventDate, 'YYYY-MM-DD'):new Date();
  initialValues.registration_deadline=props?.eventReducer?.sportEvent?.registrationDeadline ? moment(props?.eventReducer?.sportEvent?.registrationDeadline, 'YYYY-MM-DD'):new Date();

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
      `${API_URL}/event/teacher/${props.userReducer.id}`,
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
async function handleUploadResult(){
  console.log("Handle Upload result is clicked...");
  console.log(`Winner of the ${selectedSport} is: ${selectedOutcome.winner} & runnersUp is: ${selectedOutcome.runnersUp}`);
  //send mail to winner and runners up
  const sendResultMailObj={eventName:props?.eventReducer?.sportEvent?.name,selectedSport,selectedOutcome};
  const sendResultMailRes=await axios.post(`${API_URL}/event/sendresultmail`,sendResultMailObj);
  console.log("Val of sendResultMailres is:",sendResultMailRes);
    
  //TODO:- remove the sports from the, selected sport dropdown menu..
  //TODO:- send resutl to backend & store it in the respective event..
  let winnerStudentInfo={};
  selectedStudentArray.filter((obj)=>{
    if(obj.selectedSport == selectedSport ){
      // console.log("obj.studentInfo is:",obj.studentInfo);   
      for(let student of obj.studentInfo){
        //  console.log("inside outer");
        if(student.email == selectedOutcome.winner){
          // console.log("inside");
          winnerStudentInfo={...student}
          return true;
        }
       }
     }else{
      return false;
     }
  })
  let runnersUpStudentInfo={};
  selectedStudentArray.filter((obj)=>{
    // console.log("inside true...")
    
    if(obj.selectedSport == selectedSport ){
      for(let student of obj.studentInfo){
       if(student.email == selectedOutcome.runnersUp){
        // console.log("inside true...")
        runnersUpStudentInfo={...student}
         return true;
       }
      }
    }else{
     return false;
    }
 })
 console.log("Val of runnersUpStudentInfoWithSelectedSport is:",runnersUpStudentInfo);
 console.log("Val of winnerStudentInfo is:",winnerStudentInfo);
  const sendingResultData={
    selectedSport:selectedSport,
    winnerStudentInfo:winnerStudentInfo,
    runnersUpStudentInfo:runnersUpStudentInfo,
  }
  console.log("Val of sendingResultData is:",sendingResultData);

  const uploadResultRes=await axios.post(`${API_URL}/event/addresult/${event_id}`,sendingResultData);
  console.log("Val of uploadResultRes is:",uploadResultRes);
  props.hideStudentForm();

}
function handleSelectedSport(ev){
  setSelectedSport(ev.target.value);
  const studentList=props.selectedStudentReducer?.selectedStudentData.filter((studObj)=>{
    return studObj.selectedSport == ev.target.value;
  })
  console.log("Val of studentList is:",studentList);
  setSelectedStudentArray([...studentList]);
}
function handleOutcome(ev){
  console.log("Val of winner is:",ev.target.value);
  setSelectOutcome({
    ...selectedOutcome,
    [ev.target.name]:ev.target.value,
  })
}
console.log("Val of selectedOutcome is:",selectedOutcome);
  console.log("Val of selectedStudentArray is:",selectedStudentArray);
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
          eventDate:values.event_date,
          registrationDeadline:values.registration_deadline,
          
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
            `${API_URL}/event/teacher/${props.userReducer.id}`,
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
              {props.userReducer.profileImage != "" ? <Avatar src={<img src={`${API_URL}/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
              {
                isResultFormVisible ? (<>
                <h1  style={{marginLeft:"20%"}}>Event Details</h1>
                <form>
                   <h1 className="modal-title">Event Name:{props?.eventReducer?.sportEvent?.name}</h1>
                   <div className="input-block">
                      <label htmlFor="Select" className="input-label">
                        Select Sports Category:
                      </label> 
                      <select className="select_sport"  name="sport" id="sport"  onClick={(ev)=>{handleSelectedSport(ev)}}>
                        { props.selectedStudentReducer?.selectedStudentData ? (
                            <>
                              {
                                props.selectedStudentReducer?.selectedStudentData.map((studentObj,idx)=>{
                                    return(<option value={studentObj.selectedSport} key={idx}>{studentObj.selectedSport}</option>)
                                })
                              }
                            </>
                          ):( 
                            <option value="All" key="All">Select an event</option>
                          )
                        }
                      </select>                     
                    </div>
                    <div className="input-block">
                      <label htmlFor="Select" className="input-label">
                        Select Winner:
                      </label> 
                      <select className="select_winner"  name="winner" id="winner"  onClick={(ev)=>{handleOutcome(ev)}}>
                        { selectedStudentArray ? (
                            <>
                              {
                                selectedStudentArray?.map((studentObj,idx)=>{
                                  return studentObj.studentInfo.map((obj,i)=>{
                                    if(selectedOutcome.runnersUp != obj.email)
                                    return(<option value={obj.email} key={i}>{obj.name}</option>)
                                  })
                                })
                              }
                            </>
                          ):( 
                            <option value="All" key="All">NA</option>
                          )
                        }
                      </select>                       
                    </div>
                    <div className="input-block">
                      <label htmlFor="Select" className="input-label">
                        Select Runners-up:
                      </label>  
                      <select className="select_runnersUp"  name="runnersUp" id="runnersUp"  onClick={(ev)=>{handleOutcome(ev)}}>
                        { selectedStudentArray ? (
                            <>
                              {
                                selectedStudentArray?.map((studentObj,idx)=>{
                                  return studentObj.studentInfo.map((obj,i)=>{
                                    if(selectedOutcome.winner != obj.email)
                                       return(<option value={obj.email} key={i}>{obj.name}</option>)
                                  })
                                })
                              }
                            </>
                          ):( 
                            <option value="All" key="All">NA</option>
                          )
                        }
                      </select>                      
                    </div>
                    <div className="upload_result_button">
                      <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="input-button"
                          // type="submit"
                          type="button"
                          style={{marginLeft:"20px",marginRight:"2px",marginTop:"10px"}}
                          // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                          // onClick={()=>{handleUploadResult()}}
                          onClick={()=>handleUploadResult()}
                        >
                          Upload result
                        </motion.button>
                    </div>
                </form>
                </>):(<>
                  <h1  style={{marginLeft:"20%"}}>Event Details</h1>
                  <p className="modal-desc">
                  
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
                    {/* <h1 className="modal-title">No of Participants:{23}</h1> */}
                    <div className="input-block">
                    <label htmlFor="registration_deadline" className="input-label">
                      Registration Deadline
                    </label>
                    <DatePicker
                      
                      // onFocus={() => setFocusStart(true)}
                      // onCalendarClose={() => setFocusStart(false)}
                      name="registration_deadline"
                      value={values.registration_deadline}
                      selected={( new Date(values.registration_deadline)) || null}
                      onChange={(val) => {
                                      // setStartDate(val);
                                      console.log("Val of date inside formik is:",val);
                                      setFieldValue("registration_deadline", val);
                                  }}
                      // onChange={handleChange}
                      dateFormat="dd.MM.yyyy" 
                      selectsStart                            
                      // minDate={new Date()}                                
                      />
                    {errors.registration_deadline && touched.registration_deadline ? (
                      <p className="form-error">{errors.registration_deadline}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="event_date" className="input-label">
                      Event Date
                    </label>
                    <DatePicker
                      //  locale="el"
                      // onFocus={() => setFocusStart(true)}
                      // onCalendarClose={() => setFocusStart(false)}
                      name="event_date"
                      value={values.event_date}
                      selected={( new Date(values.event_date)) || null}
                      onChange={(val) => {
                                      // setStartDate(val);
                                      console.log("Val of date inside formik is:",val);
                                      setFieldValue("event_date", val);
                                  }}
                      // onChange={handleChange}
                      dateFormat="dd.MM.yyyy" 
                      selectsStart                            
                      minDate={values.registration_deadline}                                
                      />
                    {errors.event_date && touched.event_date ? (
                      <p className="form-error">{errors.event_date}</p>
                    ) : null}
                  </div>
                    {now.isSame(eventDate,"day","month","year")? (  <div className="input-block"><p>Event is live now,unable to update or remove...</p></div>) :""}
                    {now.isAfter(eventDate,"day","month","year")? (  <div className="input-block"><p>Event is already over...So can't update or remove...</p></div>) :""}
                    <div className="modal-buttons">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        className={(now.isAfter(eventDate,"day","month","year")) || (now.isSame(eventDate,"day","month","year")) ?  "input-button blur-button":"input-button"}
                        type="submit"
                        // onClick={(removeParticipatedEvent)=>{setRemoveParticipatedEvent(false);}}
                      >
                        Update Event
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        className={(now.isAfter(eventDate,"day","month","year")) || (now.isSame(eventDate,"day","month","year")) ?  "input-button blur-button":"input-button"}
                        // type="submit"
                        type="button"
                        style={{marginLeft:"5px",marginRight:"2px"}}
                        // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                        onClick={()=>{handleRemoveParticipation()}}
                      >
                        Remove Event
                      </motion.button>
                    </div>
                    <div className="add_result_button">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="input-button"
                        // type="submit"
                        type="button"
                        style={{marginLeft:"20px",marginRight:"2px",marginTop:"10px"}}
                        // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                        // onClick={()=>{handleUploadResult()}}
                        onClick={()=>setResultFormVisible(true)}
                      >
                        Want to upload result
                      </motion.button>
                    </div>
                  </form>
                </>)
              }
               
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
  .blur-button{
    background:gray;
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
    @media screen and (max-width: 400px) {
      width:100vw;
      margin-left:-2rem;
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
