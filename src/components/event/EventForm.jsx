import React,{useState} from "react";
import styled from "styled-components";
import { GlobalStyle } from "../auth/login/Styles/globalStyles";
import { Field, useFormik,Formik,useField } from "formik";
import { eventSchema } from "./schemas/eventSchema.js";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import EventAdded from "./EventAdded";
import marketplace1 from "../../assets/marketplace1.png"

const initialValues = {
  event_name: "",
  teacher_email: "",
  hosting_clg: "",
  participating_clg: [],
  venue: "",
  sports_category: [],
};

const EventForm = (props) => {
  // // const [checkboxTick,setCheckboxTick]=useState(1);
  // const [displayForm,setDisplayForm]=useState(true);
  console.log("props ki value in EventForm:",props);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: eventSchema,
      onSubmit: async (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        axios.defaults.withCredentials = true
        let toBeStoredObj={
          eventName: values.event_name,
          TeacherEmail: values.teacher_email,
          hostingCollege:values.hosting_clg,
          participatingColleges:values.participating_clg,
          sportsCategory:values.sports_category,
          venue:values.venue,
        };
        const loginRes = await axios.post(
          `http://localhost:5000/event/add`,toBeStoredObj,{credentials:true}
        );
        toBeStoredObj={...toBeStoredObj,image:marketplace1};
        props.addEvent(toBeStoredObj);
        console.log("loginRes received is:", loginRes);
        action.resetForm({values:{  event_name: "",
        teacher_email: "",
        hosting_clg: "",
        participating_clg: [],
        venue: "",
        sports_category: [],}});
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
                <h1 className="modal-title">Welcome Teacher</h1>
                <p className="modal-desc">
                  Add event and relax...
                </p>
                <form onSubmit={handleSubmit}>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    <label htmlFor="event_photo" className="input-label">
                       Event Photo
                    </label>
                        <input
                      type="file"
                      name="event_photo"
                      id="event_photo"
                      // value={values.event_photo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                      
                    {errors.sports_category && touched.sports_category ? (
                      <p className="form-error">{errors.sports_category}</p>
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
