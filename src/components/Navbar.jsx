import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import logo from "../assets/logo.svg";
import Button from "./Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {connect} from "react-redux";
function Navbar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const html = document.querySelector("html");
  let isLogIn=props.isLoggedIn;
 
  html.addEventListener("click", (e) => setIsNavOpen(false));
  
  let degVal=localStorage.getItem("designation");
    console.log("degVal in useEffect of Navbar:",degVal);
    degVal=="teacher"?isLogIn=true:degVal=="student"? isLogIn=true:isLogIn=false;
  console.log("is log in below useEffect:",isLogIn);
  return (
    <Nav state={isNavOpen ? 1 : 0}>
      <motion.div whileHover={{ scale: 1.2 }} className="brand">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </motion.div>
      <div className="toggle">
        {isNavOpen ? (
          <MdClose onClick={() => setIsNavOpen(false)} />
        ) : (
          <GiHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpen(true);
            }}
          />
        )}
      </div>
      <div className={`links ${isNavOpen ? "show" : ""}`}>
        <ul>
          <motion.li whileHover={{ scale: 1.2 }}>
            <Link to="/home">Home</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }}>
            <Link to="/events">Events</Link>
          </motion.li>
          {console.log("islogin render ho rha h and val is:",isLogIn)}
          {isLogIn? <motion.li whileHover={{ scale: 1.2 }} onClick={props.logOut}> <Link to="/">Logout</Link></motion.li>:
            (<>
              <motion.li whileHover={{ scale: 1.2 }}>
                <Link to="/signup">Registration</Link>
              </motion.li>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link to="/login">Login</Link>
            </motion.li></>
            )
          }
        </ul>
      </div>
      <Button text="Contact" />
    </Nav>
  );
}

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  border:2px solid black;
  background: #232835;
  width: 99vw;
  position: absolute;
  z-index: 1;
  left: -1.5rem;
  .toggle {
    display: none;
  }
  .links {
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    padding: 2.5rem 8rem;
    ul {
      display: flex;
      list-style-type: none;
      gap: 3rem;
      li {
        a {
          color: #002000;
          text-decoration: none;
          transition: 0.4s ease-in-out;
          border: 2px solid white;
          border-radius: 1rem;
          background-color: #232835;
          padding: 1rem;
          color: white;
          font-size: 1.2rem;
          box-shadow: 8px 8px 8px 8px gray;
          // box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
          &:hover {
            color: #2d69fd;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: relative;
    padding: 1rem 2rem;
    z-index: 999;
    margin: 0;
    button {
      display: none;
    }
    .account-info {
      display: none;
    }
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .toggle {
      padding-right: 1rem;
      display: block;
      z-index: 51;
      svg {
        color: #2d69fd;
      }
    }
    .show {
      opacity: 1 !important;
      visibility: visible !important;
    }
    .links {
      z-index: 50;
      position: absolute;
      overflow-x: hidden;
      top: 0;
      right: 0;
      width: ${({ state }) => (state ? "60%" : "0%")};
      height: 100vh;
      background-color: white;
      opacity: 0;
      visibility: hidden;
      transition: 0.7s ease-in-out;
      clip-path: none;
      ul {
        flex-direction: column;
        text-align: center;
        height: 100%;
        justify-content: center;
        li {
          a {
            // color: #2d69fd;
            box-shadow: 5px 2px 5px 5px gray;
          }
        }
      }
    }
  }
`;

function mapStateToProps(store){
  return store.authReducer;
}
const mapDispatchToProps=(dispatch)=>{
   return{
       logOut:()=>{
           return dispatch({type:"logout"});
       }
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
