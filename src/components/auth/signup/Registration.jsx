import React,{useState,useRef} from "react";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/globalStyles";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../App";

const initialValues = {
  name: "",
  email: "",
  college_name:"",
  designation:"",
  gender:"",
  password: "",
  confirm_password: "",
  profile_pic:""
};

const Registration = () => {
  const navigate=useNavigate();
  const [err,setErr]=useState(false);
  const fileRef=useRef(null);
  const users=["teacher","student"];
  const gender=["Male","Female"];
  const notifySendVerificationMail = () => toast.success('Verification mail has been sent,Check your inbox', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }); 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        const configObj={
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
        
        // const resAfterSavingInUser=await axios.post(`${API_URL}/user/add`,{
        //   name:values.name,
        //   email:values.email,
        //   designation:values.designation
        // })
        // console.log("received from user collection is:",resAfterSavingInUser);
        
        const res=await axios.post(`${API_URL}/auth/${values.designation}/signup`,{
        // const res=await axios.post(`https://sprots-event-api-2.onrender.com/auth/${values.designation}/signup`,{

           name:values.name,
           email:values.email,
           collegeName:values.college_name,
           gender:values.gender,
           password:values.password,
           confirmPassword:values.confirm_password,
           profilePic:values.profile_pic,
        },configObj)
        console.log("response received is:",res);//res.data will show the teacher returned info
        // if(!res.data.myError){//encoutner hoga ki nehi dubara cross check karna re..
		    //   const addToUserDB=await axios.post(`${API_URL}/user/add`,{name:values.name,email:values.email,designation:values.designation});
        //   console.log("Val of addToUserDB, inside registration is:",addToUserDB);
        //   navigate("/login")
        // }else{
        //   setErr(true);
        // }
        if(!res.data.myError){
       
        notifySendVerificationMail();
        navigate("/login")
      }else{
          setErr(true);
        }
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
              {err? <h1 style={{color:"red"}}>Invalid Credentials</h1>:<></>}
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">
                  To the Sports Event Management Platform.
                </p>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="input-block">
                    <label htmlFor="name" className="input-label">
                      Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>
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
                  <div className="input-block">
                    <label htmlFor="college_Name" className="input-label">
                      College Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="college_name"
                      id="college_Name"
                      placeholder="College Name"
                      value={values.college_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.college_name && touched.college_name ? (
                      <p className="form-error">{errors.college_name}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
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
                  </div>
                  <div className="input-block">
                    <label htmlFor="gender" className="input-label ">
                      Gender:
                    </label>
                    <div className="input-radio">
                   {
                    gender.map((g,idx)=>{
                        return(
                          <>
                            <input
                              type="radio"
                              key={idx}
                              name="gender"
                              id="gender"
                              value={g}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{g}
                          </>
                        )
                    })
                   }</div> 
                    {errors.gender && touched.gender ? (
                      <p className="form-error">{errors.gender}</p>
                    ) : null}
                  </div>
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
                  <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                  </div>
                  <input ref={fileRef}  type="file" name="profilePic" onChange={(event) => {setFieldValue("profile_pic", event.currentTarget.files[0])}}/>
                    <label className="input-label" style={{border:"2px solid black"}}>Upload Profile Picture</label>
                    {/* <button onClick={()=>{fileRef.current.click()}}>Upload Profile Pic</button> */}
                    {errors.profile_pic && touched.profile_pic ? (
                      <p className="form-error">{errors.profile_pic}</p>
                    ) : null}
                  <div className="modal-buttons">
                    <a href="#" className="">
                      Want to register using Gmail?
                    </a>
                    <motion.button whileHover={{ scale: 1.2 }} className="input-button" type="submit">
                      Registration
                    </motion.button>
                  </div>
                </form>
                <p className="sign-up">
                  Already have an account? <Link to="/login">Sign In now</Link>
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
    position: relative;
    top: 45rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;//original
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
     color:#232835;
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
    background:#232835;
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
    color:#232835;
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

export default Registration;
