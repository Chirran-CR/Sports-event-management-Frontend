import React from "react";
import styled from "styled-components";
import choose from "../assets/child2.png";
import Button from "./Button";
import AboutButton from "../components/aboutUs/AboutButton";
export default function Choose() {
  return (
    <Section>
      <div className="image">
        <img src={choose} alt="choose" />
      </div>
      <div className="content">
        <h2>Why should you Choose Our Website ?</h2>
        <p>
          Highly interactive user friendly interface.Already tie up with 20+ colleges and 2000+ students
          are getting benifited through our website.All the things regarding the management of sports in
          a single place.So join the community and keep participating. 
        </p>
        <AboutButton text="Read More" blue />
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 9rem;
  gap: 3rem;
  margin-bottom: 5rem;
  // background-color:black;
  .image {
    img{
      height:25rem;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    h2 {
      font-size: 4rem;
    }
    p {
      color: #7b7e86;
      line-height: 2rem;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    margin: 2rem;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50vw;
      }
    }
    .content {
      gap: 1rem;
      h2 {
        font-size: 1rem;
      }
      p {
        line-height: 1.3rem;
        font-size: 0.9rem;
      }
    }
  }
`;
