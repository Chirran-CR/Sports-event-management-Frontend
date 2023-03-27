import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import subscribe from "../assets/child3.png";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Subscribe() {
  const [email,setEmail]=useState("");
  const [sport,setSport]=useState("All");
  const [clg,setClg]=useState("All");
  const notifySubscription = () => toast.success('Newsletter subscribed', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  const notifyErrorSubscription = () => toast.warn('Email already present..No Worries', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });  
  const handleEmailChange=(ev)=>{
    setEmail(ev.target.value);
  }
  function handleSport(ev){
    setSport(ev.target.value);
  }
  function handleClg(ev){
    setClg(ev.target.value);
  }
  const handleSubscribe=async (ev)=>{
      console.log("Val of email,sport & clg is:",email," ",sport," ",clg);
      // const subscribeRes=await axios.post("http://localhost:5000/subscribe/add",{
      const subscribeRes=await axios.post("/subscribe/add",{
        emailId:email,
        interestedSport:sport,
        interestedCollege:clg
      }) 
      setEmail("");
      if(subscribeRes.data.successNotification){
        notifySubscription();
      }else{
        notifyErrorSubscription();
      }
      console.log("subscribe response received is:",subscribeRes);
  }
  return (
    <Section>
      <div className="content">
        <h2>Subscribe to Get update about every new events</h2>
        <p>
          Subscribe to get the update when a new event is added.So you don't need to check 
          frequently.
        </p>
        <div className="input-container">
          <input type="text" value={email} onChange={(ev)=>handleEmailChange(ev)}placeholder="Enter Email" />
          <select name="sport" onChange={(ev)=>handleSport(ev)}id="sports-names">
              <option value="All" selected>All</option>
              <option value="CRICKET">CRICKET</option>
              <option value="BASKETBALL">BASKETBALL</option>
              <option value="FOOTBALL">FOOTBALL</option>
              <option value="VOLLEY">VOLLEY</option>
              <option value="BADMINTON">BADMINTON</option>
          </select>
          <select name="college" onChange={(ev)=>{handleClg(ev)}} id="colleges-names">c
              <option value="All" selected>All</option>
              <option value="NIST">NIST</option>
              <option value="RIT">RIT</option>
              <option value="ITER">ITER</option>
              <option value="IISER">IISER</option>
              <option value="KIT">KIT</option>
          </select>
          <button style={{border:"none"}} onClick={(ev)=>{handleSubscribe(ev)}}>
               <BsFillArrowRightCircleFill />
          </button> 
        </div>
      </div>
      <div className="image">
        <img src={subscribe} alt="subscribe" />
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 9rem;
  gap: 10rem;
  margin-bottom: 5rem;
  .image {
    img {
       height:20rem;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    /* width: 50%; */
    h2 {
      font-size: 4rem;
    }
    p {
      color: #7b7e86;
      line-height: 2rem;
    }
    .input-container {
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      gap: 1rem;
      border: 1px solid #c4c4c4;
      border-radius: 3rem;
      input {
        border: none;
        &:focus {
          outline: none;
        }
        padding-left: 2rem;
        padding-right: 5rem;
        font-size: 1.3rem;
      }
      svg {
        color: #2d69fd;
        font-size: 3rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    margin: 0 2rem;
    gap: 2rem;
    margin-bottom: 2rem;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 80vw;
      }
    }
    .content {
      gap: 1rem;
      h2 {
        font-size: 2rem;
      }
      p {
        line-height: 1.4rem;
      }
      .input-container {
        // display: none;
        width: max-content;
        input {
          width: 50%;
        }
      }
    }
  }
`;
