import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
// import { studentEventSchema } from "./schemas/studentEventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import {Avatar} from "antd";
import EventAdded from "./EventAdded";
import { API_URL } from "../../../App";


const initialValues = {
  // student_email: "",
  college_name: "",
  participating_sports:  "",
};

const EventForm = (props) => {
  const [participatedSportsArray,setParticipatedSportsArray]=useState([]);
  const [update,setUpdate]=useState(false);
  const [showResult,setShowResult]=useState(false);
  const [showFeedbackBlock,setShowFeedbackBlock]=useState(false);
  const [textAreaVal,setTextAreaVal]=useState("");
  const [resultData,setResultData]=useState([]);
  const [selectedSportForResult,setSelectedSportForResult]=useState("");
  const [winnerInfo,setWinnerInfo]=useState({});
  const [runnersUpInfo,setRunnersUpInfo]=useState({});
  const registrationDeadline = moment(props?.eventReducer?.sportEvent?.registrationDeadline, 'YYYY-MM-DD');
  const now = moment()
  // const [isBtnDisabled,setIsBtnDisabled]=useState(now.isAfter(registrationDeadline,"day","month","year"));
  let tempSport;
useEffect(()=>{
  setUpdate(false);
},[props.eventReducer.update])
  // // const [checkboxTick,setCheckboxTick]=useState(1);
  // const [displayForm,setDisplayForm]=useState(true);
  // console.log("props in eventForm of student:",props);
  let event_id=props?.eventReducer?.sportEvent?.id;
  // console.log("event_id is:",event_id);
  // console.log("val of props.studentEventReducer.participatedEvents[0] is:",props.studentEventReducer.participatedEvents[0]);
  
  // let participatedSportsArray;
  console.log("Val of update is:",update);
  if(update==false){
    console.log("inside update is false");
    let singleParticipatedEvent=props.studentEventReducer?.participatedEvents[0]?.eventsArray?.filter((singleEvent)=>{
      // console.log("Val of singleEvent.eventId",singleEvent.eventId);
      // console.log("val of props.eventReducer.sportEvent.id:",props.eventReducer.sportEvent.id);
      return singleEvent.eventId == props.eventReducer.sportEvent.id;
    })
    console.log("Val of singleParticipatedEvent is:",singleParticipatedEvent);
    if(typeof(singleParticipatedEvent) != "undefined"){
      // console.log("inside i.e not undefined");
      // participatedSportsArray=singleParticipatedEvent[0]?.participatingSports;
      // console.log("participatedSportsArray.length is:",participatedSportsArray.length);
    console.log("Val of singleParticipatedEvent inside undefined if block is:",singleParticipatedEvent[0]?.participatingSports);
    console.log("participatedSportsArray.length is:",participatedSportsArray.length);
  
      if(typeof(singleParticipatedEvent[0]?.participatingSports)!= "undefined"){
        console.log("inside if block..");
      const tempArrayForParticipatedSportsArray=[...singleParticipatedEvent[0]?.participatingSports];
  
        setParticipatedSportsArray([...tempArrayForParticipatedSportsArray]);
      }
    } 
    setUpdate(true);
    props.setUpdate(true);
    console.log("Val of participated Sports array is:",participatedSportsArray);
  }
  
  // const participatedSportsArray=singleParticipatedEvent == "undefined" ? "true":"false";
function handleParticipatedSportsArray(){
  console.log("Click on checkbox having sport is:",tempSport);
  if(participatedSportsArray.includes(tempSport)){
    const tempArrayForParticipatedSportsArray=[...participatedSportsArray];
    const index = tempArrayForParticipatedSportsArray.indexOf(tempSport);
    if (index > -1) { // only splice array when item is found
      tempArrayForParticipatedSportsArray.splice(index, 1); // 2nd parameter means remove one item only
      
      // const newArry=[...participatedSportsArray];
      setParticipatedSportsArray([...tempArrayForParticipatedSportsArray]);
    }
  }else{
    const tempArrayForParticipatedSportsArray=[...participatedSportsArray,tempSport];
    setParticipatedSportsArray([...tempArrayForParticipatedSportsArray]);
  }
  setUpdate(true);
  props.setUpdate(true);

}
async function handleRemoveParticipation(){
  console.log("Inside handleRemoveParticipation function...");
  const studentDeleteEventRes = await axios.delete(
      `${API_URL}/event/student/${props.userReducer.id}`,
      // `https://sprots-event-api-2.onrender.com/event/student/add`,
      // {event_id:event_id},{credentials:true}
      {data:{event_id:event_id},credentials:true}
  );
  console.log("Val of studentDeleteEventRes is:",studentDeleteEventRes);
  const allParticipatedEvent=props.studentEventReducer.participatedEvents.map((ev)=>{
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
async function handleShowResult(){
  setWinnerInfo({});
  setRunnersUpInfo({});
  console.log("Handle show reslult is called..");
  //* from the event id, i will get the teacher mail, then send to that mailId...
  const resultRes=await axios.get(`${API_URL}/event/getresult/${event_id}`);
  console.log("Val of resultRes is:",resultRes);
  setResultData([...resultRes.data.resultOfEvent]);

}
console.log("Val of resultData is:",resultData);

async function handleSendFeedback(){
  console.log("Val of feeback is:",textAreaVal);
  console.log("Val of student id is:",props.userReducer.id);
  console.log("Val of event id is:",event_id);
  console.log("val of sportEvent inside eventReducer is:",props?.eventReducer?.sportEvent);
  // const studentEmail=props?.userReducer?.userEmail;
  const studentName=props?.userReducer?.userName;
  const teacherEmail=props?.eventReducer?.sportEvent?.TeacherEmail;
  const eventName=props?.eventReducer?.sportEvent?.name;
  const sportName=selectedSportForResult;
  const sendFeedbackRes= await axios.post(`${API_URL}/event/student/sendfeedback`,{studentName,teacherEmail,eventName,sportName,feedback:textAreaVal});
  console.log("Val of sendFeedbackRes is:",sendFeedbackRes);
  setTextAreaVal("");
  setShowFeedbackBlock(false);
  setShowResult(false);
}
function handleSelectedSportForResult(val){
  setSelectedSportForResult(val);
  resultData.map((resultObj)=>{
     if(resultObj.selectedSport == val){
      setWinnerInfo(resultObj.winnerStudentInfo);
      setRunnersUpInfo(resultObj.runnersUpStudentInfo);
     }
  })
}
console.log("Val of winnerInfo:",winnerInfo);
console.log("Val of runnersUpInfo:",runnersUpInfo);

  console.log("Val of participatedSportsArray is:",participatedSportsArray);
  // console.log("initial values in eventForm:",initialValues);
  console.log("Val of studentEventReducer inside eventForm of myEvent is:",props.studentEventReducer);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: studentEventSchema,
      onSubmit: async (values, action) => {
        axios.defaults.withCredentials = true
        const sendingDataDetails={
          eventId:event_id,
          studentEmail:props.userReducer.userEmail,
          hostingClg:props.eventReducer.sportEvent.host,
          collegeName:values.college_name,
          participatingSports:[...participatedSportsArray]
        }
        console.log("values of form in EventForm of student",values);
        console.log("val of sending data details is:",sendingDataDetails);
        console.log("Val of removeParticipated event is:",true);
      // let studentEventRes;
      //  if(removeParticipatedEvent==true){
      //   console.log("Inside true of removeParticipation...");
      //      studentEventRes = await axios.post(
      //       `http://localhost:5000/event/student/delete/${props.userReducer.id}`,
      //       // `https://sprots-event-api-2.onrender.com/event/student/add`,
      //       sendingDataDetails,{credentials:true}
      //     );
      //  }else{
           const studentEventRes = await axios.put(
            `${API_URL}/event/student/${props.userReducer.id}`,
            // `https://sprots-event-api-2.onrender.com/event/student/add`,
            sendingDataDetails,{credentials:true}
          );
      //  }
        console.log("studentEventRes received is:", studentEventRes);
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
      {showResult ? 
        <Wrapper>
          <div className="container" >
              <div className="modal">
                <div className="modal-container">
                  <div className="modal-left">
                  { console.log("image result is:",props.userReducer.profileImage)}
                  {props.userReducer.profileImage != "" ? <Avatar src={<img src={`${API_URL}/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
                  
                    <h1  style={{marginLeft:"20%"}}>Result of Event</h1>
                    <p className="modal-desc">
                    </p>
                    <form onSubmit={handleSubmit} >
                    <h1 className="modal-title">Event Name:{props?.eventReducer?.sportEvent?.name}</h1>
                      <h1 className="modal-title">Hosted By:{props?.eventReducer?.sportEvent?.host}</h1>
                      
                      <div className="input-block">
                        <label htmlFor="select_sports" className="input-label">
                        </label>
                        <select className="select_sports"  name="selectSports" id="selectSports"  onClick={(ev)=>{handleSelectedSportForResult(ev.target.value)}}>
                        { resultData ? (
                            <>
                              {
                                resultData?.map((resultObj,idx)=>{
                                    return(<option value={resultObj.selectedSport} key={idx}>{resultObj.selectedSport}</option>)
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
                        <label htmlFor="winner_block" className="input-label" style={{marginTop:"10px"}}>
                          <h2>Winner:-</h2>
                        </label>
                        <div style={{display:"flex"}}>
                          <Avatar src={<img src={`${API_URL}/images/profilePics/${winnerInfo.profilePic}`}  alt="avatar" />}style={{marginLeft:"35%",marginTop:"-12%",marginBottom:"5%"}} size={50} />
                          <h2 style={{marginTop:"-7%",marginLeft:"5%"}}>{winnerInfo.name}</h2>
                        </div>
                        <label htmlFor="runners_up_block" className="input-label" style={{marginTop:"10px"}}>
                          <h2>Runner Up:-</h2>
                        </label>
                        <div style={{display:"flex"}}>
                          <Avatar src={<img src={`${API_URL}/images/profilePics/${runnersUpInfo.profilePic}`}  alt="avatar" />}style={{marginLeft:"52%",marginTop:"-12%",marginBottom:"5%"}} size={50} />
                          <h2 style={{marginTop:"-7%",marginLeft:"5%"}}>{runnersUpInfo.name}</h2>
                        </div>
                      </div>
                      <h1 className="modal-title">No of Participants:{props?.eventReducer?.sportEvent?.participatingStudents?.length}</h1>
                      {showFeedbackBlock? 
                        <div className="input-block">
                          <label htmlFor="comment_block" className="input-label">
                            Give your feedback:-
                          </label>
                          <textarea rows={5} cols={10} value={textAreaVal} onChange={(e)=>{setTextAreaVal(e.target.value)}}></textarea>                     
                        </div>
                      :
                      (<div className="modal-buttons">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="input-button"
                        // type="submit"
                        type="button"
                        style={{marginLeft:"5px",marginRight:"2px"}}
                        // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                        onClick={()=>{setShowFeedbackBlock(true)}}
                      >
                        Want to Say Something
                      </motion.button>
                    </div>)}
                      {showFeedbackBlock? (<div className="modal-buttons">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className="input-button"
                            // type="submit"
                            type="button"
                            style={{marginLeft:"80px",marginRight:"2px",marginTop:"10px"}}
                            // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                            onClick={()=>{handleSendFeedback();}}
                        >
                           Send Feedback
                          </motion.button>
                      </div>)
                      :(<div className="modal-buttons">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className="input-button"
                            // type="submit"
                            type="button"
                            style={{marginLeft:"80px",marginRight:"2px",marginTop:"10px"}}
                            // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                            onClick={()=>{setShowResult(false)}}
                        >
                           OK
                          </motion.button>
                      </div>)}
                    </form>
                  </div>
                </div>
              </div>
          </div>
        </Wrapper>
      :
          (props.authReducer.dispalyStudentFromState ? <Wrapper>
            <div className="container">
              <div className="modal">
                <div className="modal-container">
                  <div className="modal-left">
                  { console.log("image result is:",props.userReducer.profileImage)}
                  {props.userReducer.profileImage != "" ? <Avatar src={<img src={`${API_URL}/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
                  
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
                        <label htmlFor="participating_sports" className="input-label">
                          Selected Sports
                        </label>
                        { props?.eventReducer?.sportEvent?.sports?.map((sport,idx)=>{
                          console.log();//here checkbox's checked val ko true set krenge
                          return(<>
                            <input
                          type="checkbox"
                          key={idx}
                          name="participating_sports"
                          id="participating_sports"
                          value={sport}
                          checked={participatedSportsArray.includes(sport)}
                          onChange={handleChange}
                          onClick={(value)=>{ tempSport=sport;console.log("sport is",tempSport);handleParticipatedSportsArray()}}
                          onBlur={handleBlur}
                        />{sport}</>
                          )
                        })}
                        {errors.sports_category && touched.sports_category ? (
                          <p className="form-error">{errors.sports_category}</p>
                        ) : null}
                      </div>
                      <h1 className="modal-title">No of Participants:{props?.eventReducer?.sportEvent?.participatingStudents?.length}</h1>
                      {now.isAfter(registrationDeadline,"day","month","year")? (  <div className="input-block"><p>Registration Deadline is over,unable to update or remove</p></div>) :""}
                      <div className="modal-buttons">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className={now.isAfter(registrationDeadline,"day","month","year")?  "input-button blur-button":"input-button"}
                          type="submit"
                          // onClick={(removeParticipatedEvent)=>{setRemoveParticipatedEvent(false);}}
                          disabled={now.isAfter(registrationDeadline,"day","month","year")}
                        >
                          Update Participation
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className={now.isAfter(registrationDeadline,"day","month","year")? "input-button blur-button":"input-button"}
                          // type="submit"
                          type="button"
                          style={{marginLeft:"5px",marginRight:"2px"}}
                          // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                          onClick={()=>{handleRemoveParticipation()}}
                          disabled={now.isAfter(registrationDeadline,"day","month","year")}
                        >
                          Remove Participation
                        </motion.button>
                      </div>
                      <div className="modal-buttons">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className={props?.eventReducer?.sportEvent?.result?.length == 0 ? "input-button blur-button":"input-button"}
                            // type="submit"
                            type="button"
                            style={{marginLeft:"80px",marginRight:"2px",marginTop:"10px"}}
                            // onClick={(removeParticipatedEvent)=>{console.log("remove participation is clicked...");setRemoveParticipatedEvent(true);}}
                            onClick={()=>{setShowResult(true);handleShowResult();}}
                            disabled={props?.eventReducer?.sportEvent?.result?.length == 0 }
                        >
                            View Result
                          </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper> :<EventAdded/>)
       }
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
  .blur-button{
    background:gray;
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
