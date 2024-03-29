import React,{useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
import { studentEventSchema } from "./schemas/studentEventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import { UserOutlined } from '@ant-design/icons';
import {Avatar} from "antd";
import EventAdded from "./EventAdded";
import { API_URL } from "../../../App";
import EventPayment from "./EventPayment";
import EventPayment2 from "./EventPayment2";



const initialValues = {
  student_email: "",
  college_name: "",
  participating_sports:  "",
};

const EventForm = (props) => {
  // // const [checkboxTick,setCheckboxTick]=useState(1);
  // const [displayForm,setDisplayForm]=useState(true);
  // console.log("props in eventForm of student:",props);
  let event_id=props?.eventReducer?.sportEvent?.id;
  const registrationDeadline = moment(props?.eventReducer?.sportEvent?.registrationDeadline, 'YYYY-MM-DD');
  const now = moment()
  // console.log("initial values in eventForm:",initialValues);
  const isPaidEvent=props?.eventReducer?.sportEvent?.price ? true:false;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: studentEventSchema,
      onSubmit: async (values, action) => {
        axios.defaults.withCredentials = true
        const sendingDataDetails={
          eventId:event_id,
          studentEmail:props.userReducer.userEmail,
          hostingClg:props.eventReducer.sportEvent.host,
          collegeName:props.userReducer.userCollegeName,
          participatingSports:values.participating_sports
        }
        console.log("values of form in EventForm of student inside onSubmit",values);
        console.log("val of sending data details is:",sendingDataDetails);
        if(!isPaidEvent) {
          const studentEventRes = await axios.post(
            `${API_URL}/event/student/add`,
            // `https://sprots-event-api-2.onrender.com/event/student/add`,
            sendingDataDetails,{credentials:true}
          );
          
          console.log("studentEventRes received inside eventForm is:", studentEventRes);
          // action.setSubmitting(false);
          // document.getElementsByClassName("mycheck").checked = false;
          // setCheckboxTick(checkboxTick+1);
          props.hideForm();}        
          action.resetForm();
        },
    });
//  console.log("Val now.isAfter(registrationDeadline) is:",now.isAfter(registrationDeadline,"day","month","year"));
// console.log("value of ",(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName)));

  return (
    <>
      <GlobalStyle />
      {props.authReducer.displayFormState ? <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
               { console.log("image result is:",props.userReducer.profileImage)}
              {props.userReducer.profileImage != "" ? <Avatar src={<img src={`${API_URL}/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
              
                <h1 className="modal-title">Welcome {props.userReducer.userName}</h1>
                <p className="modal-desc">
                  Participate in events and have fun...
                </p>
                <form onSubmit={handleSubmit}>
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
                  <label htmlFor="college_name" className="input-label">
                      Choose your college
                    </label>
                  
                  {props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName)?
                  (props?.eventReducer?.sportEvent?.participate?.map((clg,idx)=>{
                      return(<>
                        <input
                      type="radio"
                      autoComplete="off"
                      key={idx}
                      name="college_name"
                      id="college_name"
                      value={clg}
                      checked={props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName) && clg==props.userReducer.userCollegeName}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                    />{clg}</>
                      )
                    })):<h2>Not Eligible</h2>}
                    {/* {errors.college_name && touched.college_name ? (
                      <p className="form-error">{errors.college_name}</p>
                    ) : null} */}
                  </div>
                  <div className="input-block">
                    <label htmlFor="participating_sports" className="input-label">
                      Available Sports
                    </label>
                    { props?.eventReducer?.sportEvent?.sports?.map((sport,idx)=>{
                      return(<>
                        <input
                      type="checkbox"
                      key={idx}
                      name="participating_sports"
                      id="participating_sports"
                      value={sport}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{sport}</>
                      )
                    })}
                    {errors.sports_category && touched.sports_category ? (
                      <p className="form-error">{errors.sports_category}</p>
                    ) : null}
                  </div>
                  {!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName) ? (  <div className="input-block"><p>Your college is not elligible..</p></div>) :""}
                  {now.isAfter(registrationDeadline,"day","month","year")? (  <div className="input-block"><p>Registration Deadline is over..!Can't Join</p></div>) :""}
                  {(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName)) ? (<div className="modal-buttons">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className={(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName)) ?  "input-button blur-button":"input-button"}
                      type="submit"
                      disabled={(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName))}
                      
                    >
                      Join Event
                    </motion.button>
                  </div>):(isPaidEvent ? (<div className="payment" ><EventPayment myProps={props} myValues={values}/></div>):(
                    
                  <div className="modal-buttons">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className={(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName)) ?  "input-button blur-button":"input-button"}
                      type="submit"
                      disabled={(now.isAfter(registrationDeadline,"day","month","year")) || (!props?.eventReducer?.sportEvent?.participate?.includes(props.userReducer.userCollegeName))}
                      
                    >
                      Join Event
                    </motion.button>
                  </div>))}
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
  .payment{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:1rem;
    margin-left:4rem;
    // background-color:red;
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

    
  }
  @media screen and (max-width: 400px) {
    width:100vw;
    margin-left:-2rem;
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
    hideForm:()=>{
      return dispatch({type:"hide-form"});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
