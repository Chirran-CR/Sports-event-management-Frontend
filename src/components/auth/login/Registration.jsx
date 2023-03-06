import React, { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/globalStyles";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";

const initialValues = {
  email: "",
  password: "",
  // designation:"",//received from backend i.e userCollection
};

const Registration = (props) => {
  const navigate=useNavigate();
  const [err,setErr]=useState(false)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        const userObjRes=await axios.post('http://localhost:5000/user/get',{email:values.email});
        console.log("userObjRes is:",userObjRes);
        const receivedDesignation=userObjRes.data.userDetails[0].designation;
        if(receivedDesignation == "admin"){
            console.log("Desugnation is:",receivedDesignation);
            if(values.password == "123456"){
              props.logIn(receivedDesignation);
              // if(receivedDesignation == "moderator"){
              //   const moderatorRes=await axios.post("http://localhost:5000/moderator/get",{email:values.email});
              //   console.log("Val of moderator res is:",moderatorRes);
              //   props.setModerator({...moderatorRes.data.moderatorDetails});
              // } 
              navigate("/dashboard");
            }else{
              setErr(true);
            }
        }else if(receivedDesignation == "moderator"){
            const loginRes=await axios.post("http://localhost:5000/moderator/login",{
              email:values.email,
              password:values.password,
            })
            console.log("Val of loginRes inside login of registraion inside else if block:",loginRes);
            if(!loginRes.data.errorPresent){
              props.setModerator({...loginRes.data.moderatorDetails});
              props.logIn(receivedDesignation);
              navigate("/dashboard");
            }else{
              setErr(true);
            }
        }
        else{ 
                // const loginRes=await axios.post(`http://localhost:5000/auth/${values.designation}/login`,{
            const loginRes=await axios.post(`http://localhost:5000/auth/${receivedDesignation}/login`,{
              // const loginRes=await axios.post(`https://sprots-event-api-2.onrender.com/auth/${values.designation}/login`,{
              
            email:values.email,
              password:values.password,
            },{withCredentials:true})
            if(!loginRes.data.myError){
              const userDetails=receivedDesignation=="student"?loginRes.data.studentDetails:loginRes.data.teacherDetails;
              const userObj={userEmail:userDetails.email,
                userName:userDetails.name,
                userCollegeName:userDetails.collegeName,
                profileImage:userDetails.profilePic,
                id:userDetails._id,
              }
              props.setUser(userObj);
              console.log("inside if block of registration login and response is:",loginRes);
              props.logIn(receivedDesignation);
              navigate("/events")
            }else{
              setErr(true);
            } 
            console.log("loginRes received is:",loginRes);
        }
      
        action.resetForm();
      },
    });
  // console.log(
  //   "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
  //   errors
  // );
  // const users=["teacher","student"];

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                 {err? <h1 style={{color:"red"}}>Invalid Credentials</h1>:<></>}
                <h1 className="modal-title">Welcome back!</h1>
                <p className="modal-desc">
                  To the Sports Event Management Platform.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  {/* <div className="input-block">
                    <label htmlFor="designation" className="input-label ">
                      Are you a:
                    </label>
                    <div className="input-radio">
                   {
                    users.map((user,idx)=>{
                        return(
                          <>
                            <input
                              
                              type="radio"
                              key={idx}
                              name="designation"
                              id="designation"
                              value={user}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{user}
                          </>
                        )
                    })
                   }</div> 
                    {errors.designation && touched.designation ? (
                      <p className="form-error">{errors.designation}</p>
                    ) : null}
                  </div> */}
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="modal-buttons">
                    <a href="#" className="">
                      Want to login using Gmail?
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="input-button"
                      type="submit"
                    >
                      Login
                    </motion.button>
                  </div>
                </form>
                <p className="sign-up">
                  Don't have an account? <Link to="/signup">Sign Up now</Link>
                </p>
              </div>
              <div className="modal-right">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee; //original
    // background-color:#232835;
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
      .input-radio{
        // background-color:red;
         margin:7px;
         display:flex;
         gap:12px;
      }
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

    .modal-right {
      display: none;
    }
  }
`;
function mapStateToProps(store){
  return store;
}
const mapDispatchToProps=(dispatch)=>{
   return{
       logIn:(desigantion)=>{
           return dispatch({type:"login",payload:desigantion});
       },
       setUser:(userObj)=>{
        return dispatch({type:"set-user",payload:userObj})
       },
       setModerator:(moderatorObj)=>{
        return dispatch({type:"set-moderator",payload:moderatorObj})
       }
   }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Registration);
