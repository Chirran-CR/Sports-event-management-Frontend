import React,{useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
import { eventSchema } from "./schemas/eventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import EventAdded from "./EventAdded";
import marketplace1 from "../../assets/sports3-min.png"
import { API_URL } from "../../App";
import {Avatar} from "antd";
import moment from "moment";
// import DatePicker from 'react-date-picker';
import  DatePicker,{ registerLocale } from "react-datepicker";
// import 'react-date-picker/dist/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import el from "date-fns/locale/el"; // the locale you want
registerLocale("el", el); // register it with the name you want

const initialValues = {
  event_name: "",
  teacher_email: "",
  hosting_clg: "",
  participating_clg: [],
  venue: "",
  sports_category: [],
  registration_deadline:new Date(),
  event_date:new Date(),
  amount:0,
  event_banner:""
};

const EventForm = (props) => {
  // // const [checkboxTick,setCheckboxTick]=useState(1);
  // const [displayForm,setDisplayForm]=useState(true);
  axios.defaults.withCredentials=true;
  initialValues.teacher_email=props.userReducer.userEmail;
  initialValues.hosting_clg=props.userReducer.userCollegeName;
  console.log("props ki value in EventForm:",props);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: eventSchema,
      onSubmit: async (values, action) => {
        console.log("form values inside eventForm of teacher is:",values);
        axios.defaults.withCredentials = true
        let toBeStoredObj={
          eventName: values.event_name,
          TeacherEmail: values.teacher_email,
          hostingCollege:values.hosting_clg,
          participatingColleges:values.participating_clg,
          sportsCategory:values.sports_category,
          registrationDeadline:values.registration_deadline,
          eventDate:values.event_date,
          venue:values.venue,
          price:values.amount,
          eventBanner:values.event_banner
        };
        console.log("Val of toBeStoredObj inside the eventForm of teacher Event is:",toBeStoredObj);

        //works good but file has not send to backend
        // const loginRes = await axios.post(
        //   `http://localhost:5000/event/add`,toBeStoredObj,{credentials:true}          
          
        // );

        // const loginRes=await axios({
        //   method:'post',
        //   url:'http://localhost:5000/event/add',
        //   headers:{
        //     "Content-Type":"multipart/form-data"
        //   },
        //   withCredentials:true,
        //   data:toBeStoredObj
        // })
        //solution src:-https://github.com/axios/axios/issues/2149
        //solution:-Try to add withCredentials: true to the request which create cookie in your server.
         // For example when cookie is created when user is try to login, than add flag withCredentials to login request.
        const loginRes=await axios.post(`${API_URL}/event/add`,
        toBeStoredObj,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          },
          credentials:true
        }
        );
        console.log("Val of loginRes is:",loginRes);
        toBeStoredObj.eventId=loginRes.data.addedEventDetails._id;
        const uploadedRes=await axios.post(`${API_URL}/event/teacher/add/${props.userReducer.id}`,
          toBeStoredObj,
          {
            credentials:true
          }
        );
        console.log("Val of uploadedRes is:",uploadedRes);

      //  console.log("loginRes from teacher event(event form) is:",loginRes);
        toBeStoredObj={...toBeStoredObj,eventBanner:loginRes.data.addedEventDetails.eventBanner};
        props.addEvent(toBeStoredObj);
        console.log("loginRes received is:", loginRes);
        action.resetForm({values:{  event_name: "",
        teacher_email: props.userReducer.userEmail,
        hosting_clg: props.userReducer.userCollegeName,
        participating_clg: [],
        venue: "",
        sports_category: [],
        registration_deadline:new Date(),
        event_date:new Date(),
        amount:0,
        event_banner:""
      }});
        // action.setSubmitting(false);
        // document.getElementsByClassName("mycheck").checked = false;
        // setCheckboxTick(checkboxTick+1);
        props.hideForm();//direct ya auth reducer se ayega
      },
    });
  const colleges = [
    { key: "Option 1", value: "NIST" },
    { key: "Option 2", value: "RIT" },
    { key: "Option 3", value: "ITER" },
    { key: "Option 4", value: "IISER" },
    { key: "Option 5", value: "KIT" },
  ];
  const sports = [
    { key: "Option 1", value: "CRICKET" },
    { key: "Option 2", value: "BASKETBALL" },
    { key: "Option 3", value: "FOOTBALL" },
    { key: "Option 4", value: "VOLLEY" },
    { key: "Option 5", value: "BADMINTON" },
  ];
  return (
    <>
      <GlobalStyle />
      {props.authReducer.displayFormState ? <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
              {props.userReducer.profileImage != "" ? <Avatar src={<img src={`${API_URL}/images/profilePics/${props.userReducer.profileImage}`}  alt="avatar" />}style={{marginLeft:"40%",marginTop:"-19%",marginBottom:"5%"}} size={64} /> :<Avatar size={64} style={{marginLeft:"40%",marginTop:"-19%"}} icon={<UserOutlined />} />}
                <h1 className="modal-title">Welcome {props.userReducer.userName}</h1>
                <p className="modal-desc">
                  Add event and relax...
                </p>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="input-block">
                    <label htmlFor="event_name" className="input-label">
                      Event Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="event_name"
                      id="event_name"
                      placeholder="Event Name"
                      value={values.event_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_name && touched.event_name ? (
                      <p className="form-error">{errors.event_name}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="teacher_email" className="input-label">
                      Teacher Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="teacher_email"
                      id="teacher_email"
                      placeholder="Teacher Email"
                      value={values.teacher_email}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.teacher_email && touched.teacher_email ? (
                      <p className="form-error">{errors.teacher_email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="hosting_clg" className="input-label">
                      Hosting College Name:
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="hosting_clg"
                      id="hosting_clg"
                      placeholder="Hosting College Name"
                      value={values.hosting_clg}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.hosting_clg && touched.hosting_clg ? (
                      <p className="form-error">{errors.hosting_clg}</p>
                    ) : null}
                  </div>
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{clg.value}</>
                      )
                    })}
                    {errors.participating_clg && touched.participating_clg ? (
                      <p className="form-error">{errors.participating_clg}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="venue" className="input-label">
                      Venue
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="venue"
                      id="venue"
                      placeholder="Venue"
                      value={values.venue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.venue && touched.venue ? (
                      <p className="form-error">{errors.venue}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="sports_category" className="input-label">
                      Sports Category
                    </label>
                    {sports.map((sport)=>{
                      return(<>
                        <input
                      type="checkbox"
                      autoComplete="off"
                      className="mycheck"
                      key={sport.key}
                      name="sports_category"
                      id="sports_category"
                      value={sport.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{sport.value}</>
                      )
                    })}
                    {errors.sports_category && touched.sports_category ? (
                      <p className="form-error">{errors.sports_category}</p>
                    ) : null}
                  </div>
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
                      minDate={new Date()}                                
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
                  <div className="input-block">
                    <label htmlFor="amount" className="input-label">
                      Participation Charge
                    </label>
                    <input
                      type="number"
                      autoComplete="off"
                      name="amount"
                      id="amount"
                      placeholder="Amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount ? (
                      <p className="form-error">{errors.amount}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="eventBanner" className="input-label">
                       Event Banner
                    </label>
                        <input
                      type="file"
                      name="eventBanner"
                      onChange={(event) => {setFieldValue("event_banner", event.currentTarget.files[0])}}
                    />
                      
                    {errors.event_banner && touched.event_banner ? (
                      <p className="form-error">{errors.event_banner}</p>
                    ) : null}
                  </div>
                  <div className="modal-buttons">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="input-button"
                      type="submit"
                    >
                      Add Event
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
    },
    addEvent:(eventObj)=>{
       return dispatch({type:"add-event",payload:eventObj})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
