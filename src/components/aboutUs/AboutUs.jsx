import React from 'react'
import "./AboutUs.css";
import chirran from "./images/Chirran.jpg";
import Asish from "./images/Asish Sir.jpeg";
import Dashrathi from "./images/Dashrathi.jpg";


function AboutUs () {
    let message = `Managing the event became easier now by the hardwork and dedication of the team.`;
    return (
      <section class="section-white team-section" style={{paddingTop:"6rem"}}>
 
    <div class="container">
 
        <div class="row">
       
                    <div class="col-md-12 text-center">

                          <h2 class="section-title team-title">The Team Behind Sport Event Management Platform</h2>

                          <p class="section-subtitle about-msg">{message}</p>
                          
                    </div> 
            <div class="team-item-list">
              
            <div class="col-sm-6 col-md-4 team-item-1">

                  <div class="team-item">
                  
                      <img src={Asish}class="team-img" alt="pic" />                   
                      <h3>Prof. Asish Kumar Roy</h3>            
                      <div class="team-info"><p>Head of Team</p></div>
                      <p>Asish Sir is our team lead and has developed strategies for better management of varieties of events from various organisation(school to colleges) for over five years.</p>
                  
                      <ul class="team-icon">
                      
                          <li><a href="#" class="twitter">
                            <i class="fa fa-twitter"></i>
                        </a></li>
                          
                          <li><a href="#" class="pinterest">
                            <i class="fa fa-pinterest"></i>
                        </a></li>
                          
                          <li><a href="#" class="facebook">
                            <i class="fa fa-facebook"></i>
                        </a></li>
                          
                          <li><a href="#" class="dribble">
                            <i class="fa fa-dribbble"></i>
                        </a></li>
                          
                      </ul>
                      
                  
                </div>
            </div> 
              
            <div class="col-sm-6 col-md-4 team-item-2">

                  <div class="team-item">
                  
                      <img src={chirran} class="team-img" alt="pic" />
                     
                      <h3>Chirran</h3>
                      
                      <div class="team-info"><p>Devlopment Specialist</p></div>

                      <p>Graduating with a degree in Computer Science Enginering, Chirran has always loved coding and now he’s lucky enough to do it as part of his new job inside our agency.</p>
                  
                      <ul class="team-icon">
                      
                          <li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>
                          
                          <li><a href="#" class="pinterest"><i class="fa fa-pinterest"></i></a></li>
                          
                          <li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
                          
                          <li><a href="#" class="dribble"><i class="fa fa-dribbble"></i></a></li>
                          
                      </ul>
                      
                  </div>

            </div> 
            <div class="col-sm-6 col-md-4 team-item-3">

                  <div class="team-item">
                  
                      <img src={Dashrathi} class="team-img" alt="pic" />
                     
                      <h3>Dashrathi Pathi</h3>
                      
                      <div class="team-info"><p>Product Development Engineer</p></div>

                      <p>Dashrathi first fell in love with development and desiging at the university. He loves to learn, and looks forward to being part of this new exciting industry for many years.</p>
                  
                      <ul class="team-icon">
                      
                          <li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>
                          
                          <li><a href="#" class="pinterest"><i class="fa fa-pinterest"></i></a></li>
                          
                          <li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
                          
                          <li><a href="#" class="dribble">
                            <i class="fa fa-dribbble"></i>
                        </a></li>
                          
                      </ul>
                      
                  </div>

            </div> 
        </div> 
        </div> 
    
    </div> 

    </section>
    )
}


export default AboutUs