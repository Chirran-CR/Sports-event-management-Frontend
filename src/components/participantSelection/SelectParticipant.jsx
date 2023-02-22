import React, { useEffect, useState } from 'react'
import {connect} from "react-redux";
import axios from "axios";
import "./selectParticipant.css";

const SelectParticipant = (props) => {
  console.log("Val of props inside selectParticipant is:",props);
  //wo sare student ki data chahiye jo iss logged in wale teacher ko dwara upload kiya gaya 
  //event mai participate kar rahe hai...
  const [allTheUploadedEvent,setAllTheUploadedEvent]=useState([]);
  const [selectedEvent,setSelectedEvent]=useState("");
  let id=props.userReducer.id;
  function handleSelectedEvent(ev){
    // ev.preventDefault();
    console.log("Val of selected Event is:",ev.target.value);
    allTheUploadedEvent.map((eventObj)=>{
      if(eventObj.eventId == ev.target.value){
        setSelectedEvent(eventObj);
      }
    })
    console.log("Val of selectedEvent is:",selectedEvent);
  }
  console.log("Val of selectedEvent outer is:",selectedEvent);

  useEffect(()=>{
    (async function (){
      console.log("inside async fn of useEffect of selectParticipant..");
      const allTheUploadedEventRes=await axios.get(`http://localhost:5000/selectparticipant/${id}`)
      console.log("Val of allTheUploadedEventRes is:",allTheUploadedEventRes);
      setAllTheUploadedEvent(allTheUploadedEventRes.data.sendDetailsObj);
      console.log("Val of allTheUploadedEvent is:",allTheUploadedEvent);
    })()
  },[])

  return (
    <div className="container" style={{paddingTop:"90px"}}>
      <div className="event_selection">
          <label htmlFor="membership">Select Event:</label>
          <select name="membership" id="membership"  onChange={(ev)=>{handleSelectedEvent(ev)}}>
            { 
              allTheUploadedEvent?.map((obj,idx)=>{
                // console.log("Val of obj.eventName is:",obj.eventName);
                return(<option value={obj.eventId} key={idx}>{obj.eventName}</option>
                )
              })
            }
          </select> 
      </div>     
      <div className="other_component_selection">
        <div className="gender_selection">
          Gender:
        </div>
        <div className="college_selection">
          College:
        </div>
        <div className="student_no_selection">
          No of student:
        </div>
        <div className="basis_selection">
          Selection Basis:
        </div>
      </div>
    <div class="header_fixed">
        <table>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Participating Sports</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                  selectedEvent?.participatingStudents?.map((studentObj,idx)=>{
                    return(
                      <tr key={idx}>
                          <td>{idx+1}</td>
                          <td><img src={`http://localhost:5000/images/profilePics/${studentObj.profilePic}`}_ /></td>
                          <td>{studentObj.name}</td>
                          <td>{studentObj.email}</td>
                          <td>{studentObj.gender}</td>
                          <td>{studentObj.participatingSports}</td>
                          <td><button>View</button></td>
                      </tr>
                    )
                  })
                }
                <tr>
                    <td>1</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1qw3KUJnYgvnJHQP-yY13u_rXrJO8ZbL"_ /></td>
                    <td>Rakhi Gupta</td>
                    <td>rakhigupta@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1KV8Ob2wXIcobIvayGGDB1qUpQn_iZKIp" /></td>
                    <td>Anjali</td>
                    <td>anjali@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1ock7haLmYaAbHe8yn9H8ZGgkaGY9lcB0" /></td>
                    <td>Vejata Gupta</td>
                    <td>Vejata@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1MbkS3AwaCNaKfMTmCQMHD1okQEubCdnt" /></td>
                    <td>Shweta</td>
                    <td>Shweta@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1oztRYJUSZ5txDbaAAGg0O8_Ek6nzLAId" /></td>
                    <td>Adarsh</td>
                    <td>Adarsh@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1ysB5QChCSLpz3igUoDzalENFsjJEe8H7" /></td>
                    <td>Monti</td>
                    <td>Monti@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1fCtvhYFy1roieanYeXua1jKJyfUhiDS6" /></td>
                    <td>Arpit</td>
                    <td>Arpit@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td><img src="https://drive.google.com/uc?export=view&id=1ZHPBm7fBxfbW2qV8pLTeDvMreXzqcW-x" /></td>
                    <td>Priya</td>
                    <td>priya@gmail.com</td>
                    <td>Engineering</td>
                    <td><button>View</button></td>
                </tr>
            </tbody>
        </table>
    </div>

      
    </div>
  )
}
function mapStateToProps(store){
  return store;
}
const mapDispatchToProps=(dispatch)=>{
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SelectParticipant);