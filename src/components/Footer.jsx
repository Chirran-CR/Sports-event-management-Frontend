import React from "react";
import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import logo from "../assets/logo2.png";

export default function Footer() {
  const servicesLinks = ["Providing Platform", "Easier Payment", "Attractive GUI", "Effective Management"];
  const companyLinks = ["JioTv", "Reliance Digital", "Style Craze", "Sports Arena"];
  const contactInfo = [
    {
      icon: <MdEmail />,
      value: "chittaranjanswain.it.2019@nist.edu",
    },
    {
      icon: <MdEmail />,
      value: "dashrathi.ece.2019@nist.edu",
    },
    {
      icon: <MdPhoneInTalk />,
      value: "+(91)2553456754",
    },
    {
      icon: <IoLocationSharp />,
      value: "Puri,Odisha,India",
    },
  ];
  const socialIcons = [
    <AiFillFacebook />,
    <FaTwitterSquare />,
    <BsLinkedin />,
    <FaInstagramSquare />,
  ];
  return (
    <Container>
      <div className="row">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        <p className="description">Puri,Odisha,India</p>
        <div className="social-icons">
          {socialIcons.map((icon) => {
            return <div className="icon">{icon}</div>;
          })}
        </div>
      </div>
      <div className="row">
        <h3>Our Services</h3>
        <ul className="list">
          {servicesLinks.map((link) => {
            return <li key={link}>{link}</li>;
          })}
        </ul>
      </div>
      <div className="row">
        <h3>Sponsored Company</h3>
        <ul className="list">
          {companyLinks.map((link) => {
            return <li key={link}>{link}</li>;
          })}
        </ul>
      </div>
      <div className="row">
        <h3>Contact Us</h3>
        <ul>
          {contactInfo.map(({ icon, value }) => {
            return (
              <li>
                <div className="icon">{icon}</div>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
const Container = styled.footer`
  background: #443357;
  background: linear-gradient(to right, #443357, #394053);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8rem;
  gap: 7rem;
  .row {
    color: #9ea7ad;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .brand {
    }
    h3 {
      color: white;
    }
    .description {
      color: white;
    }
    .social-icons {
      display: flex;
      gap: 1rem;
      .icon {
        border: 1px solid #2d68fd7f;
        padding: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        cursor: pointer;
        svg {
          color: #2d69fd;
          font-size: 1.5rem;
        }
      }
    }
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      li {
        display: flex;
        gap: 2rem;
        display: flex;
        align-items: center;
        .icon {
          border: 1px solid #2d68fd7f;
          padding: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.3rem;
          cursor: pointer;
          svg {
            color: #2d69fd;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 2rem;
  }
`;
