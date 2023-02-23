import React, { useEffect, useState } from 'react'
import {connect} from "react-redux";
import axios from "axios";
import {CSVLink} from "react-csv";
import "./selectParticipant.css";

const SelectParticipant = (props) => {
  console.log("Val of props inside selectParticipant is:",props);
  //wo sare student ki data chahiye jo iss logged in wale teacher ko dwara upload kiya gaya 
  //event mai participate kar rahe hai...
  const headers=[
    {label:"Name",key:"name"},
    {label:"EmailId",key:"email"},
    {label:"Gender",key:"gender"},
    {label:"College",key:"collegeName"},
    {label:"Participating Sports",key:"participatingSports"}
  ]
  const [allTheUploadedEvent,setAllTheUploadedEvent]=useState([]);
  const [selectedEvent,setSelectedEvent]=useState("");
  const [displayedEvent,setDisplayedEvent]=useState("");
  const [selectedGender,setSelectedGender]=useState("All");
  const [selectedSport,setSelectedSport]=useState("All");
  const [selectedClg,setSelectedClg]=useState("All");
  const [noOfStudent,setNoOfStudent]=useState("All");
  const [selectionBasis,setSelectionBasis]=useState("FCFS");
  const allGender=["All","Male","Female"];
  const allSelectionBasis=["FCFS","Random"];


  let id=props.userReducer.id;
  function handleSelectedEvent(ev){
    // ev.preventDefault();
    console.log("Val of selected Event is:",ev.target.value);
    allTheUploadedEvent.map((eventObj)=>{
      if(eventObj.eventId == ev.target.value){
        setSelectedEvent(eventObj);
        setDisplayedEvent(eventObj);
      }
    })
    console.log("Val of selectedEvent is:",selectedEvent);
  }
  console.log("Val of selectedEvent outer is:",selectedEvent);
  function handleSelectedGender(ev){
    setSelectedGender(ev.target.value);
    let eventSelected={...selectedEvent};
    if(ev.target.value != "All"){
      eventSelected.participatingStudents=selectedEvent.participatingStudents.filter((sObj)=>{
        return sObj.gender == ev.target.value;
      });
    }
        
    //for college
    if(selectedClg != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.collegeName == selectedClg;
      });
    }
    //for sport
    if(selectedSport != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.participatingSports.includes(selectedSport);
      });
    }
   //for no of student
   if(noOfStudent == "All"){
    setNoOfStudent(eventSelected.participatingStudents.length);
   }else{
    setNoOfStudent(noOfStudent);
   }
    setDisplayedEvent(eventSelected);
  }
  console.log("Val of displayedEvent is:",displayedEvent);
  function handleSelectedCollege(ev){
    setSelectedClg(ev.target.value);
    console.log("Val of clg is:",ev.target.value);
    let eventSelected={...selectedEvent};
    //for college
    if(ev.target.value != "All"){
      eventSelected.participatingStudents=selectedEvent.participatingStudents.filter((sObj)=>{
        return sObj.collegeName == ev.target.value;
      });
    }
        
    //for gender
    if(selectedGender != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.gender == selectedGender;
      });
    }
    //for sport
    if(selectedSport != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.participatingSports.includes(selectedSport);
      });
    }
    //for no of student
    if(noOfStudent == "All"){
      setNoOfStudent(eventSelected.participatingStudents.length);
     }else{
      setNoOfStudent(noOfStudent);
     }
   setDisplayedEvent(eventSelected);
  }
  function handleNoOfStudent(ev){
   setNoOfStudent(ev.target.value);
   console.log("Val of no of student is:",ev.target.value);
  }
  function handleSelectedSport(ev){
    setSelectedSport(ev.target.value);
    console.log("Val of spprt is:",ev.target.value);
    let eventSelected={...selectedEvent};
    //for sports
    if(ev.target.value != "All"){
      eventSelected.participatingStudents=selectedEvent.participatingStudents.filter((sObj)=>{
        return sObj.participatingSports.includes(ev.target.value);
      });
    }
    ////jan all kar raha hun toh no of student set nehi ho rahe ahi
    //for college
  
    if(selectedClg != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.collegeName == selectedClg;
      });
    }
    //for gender
    if(selectedGender != "All"){
      eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
        return sObj.gender == selectedGender;
      });
    }
    //for no of student
   if(noOfStudent == "All"){
    setNoOfStudent(eventSelected.participatingStudents.length);
   }else{
    setNoOfStudent(noOfStudent);
   }
   setDisplayedEvent(eventSelected);
  }
  function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

  function handleSelectionBasis(ev){
    setSelectionBasis(ev.target.value);
    console.log("Val of selection basis is:",ev.target.value);
    let eventSelected={...selectedEvent};
    if(ev.target.value=="Random"){
      //set the displayed event value on the basis of algorithm
      //for college
      if(selectedClg != "All"){
        eventSelected.participatingStudents=selectedEvent.participatingStudents.filter((sObj)=>{
          return sObj.collegeName == selectedClg;
        });
      }
          
      //for gender
      if(selectedGender != "All"){
        eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
          return sObj.gender == selectedGender;
        });
      }
      //for sport
      if(selectedSport != "All"){
        eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
          return sObj.participatingSports.includes(selectedSport);
        });
      }
      //get randomly noOfStudent 
      let noToPassIntoRandomFn=noOfStudent=="All"? eventSelected.participatingStudents.length: noOfStudent
      const randomlyGeneratedStudentArray=getRandom(eventSelected.participatingStudents,noToPassIntoRandomFn);
      console.log("Val of randomlyGeneratedStudentArray is:",randomlyGeneratedStudentArray);
      eventSelected.participatingStudents=[...randomlyGeneratedStudentArray];
      setDisplayedEvent(eventSelected);
    }else{
       //for college
       if(selectedClg != "All"){
        eventSelected.participatingStudents=selectedEvent.participatingStudents.filter((sObj)=>{
          return sObj.collegeName == selectedClg;
        });
      }
          
      //for gender
      if(selectedGender != "All"){
        eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
          return sObj.gender == selectedGender;
        });
      }
      //for sport
      if(selectedSport != "All"){
        eventSelected.participatingStudents=eventSelected.participatingStudents.filter((sObj)=>{
          return sObj.participatingSports.includes(selectedSport);
        });
      }
      //get randomly noOfStudent 
      // let noToPassIntoRandomFn=noOfStudent=="All"? eventSelected.participatingStudents.length: noOfStudent
      // const randomlyGeneratedStudentArray=getRandom(eventSelected.participatingStudents,noToPassIntoRandomFn);
      // console.log("Val of randomlyGeneratedStudentArray is:",randomlyGeneratedStudentArray);
      // eventSelected.participatingStudents=[...randomlyGeneratedStudentArray];
      setDisplayedEvent(eventSelected);
    }
  }
  console.log("Val of selectedGender is:",selectedGender);
  useEffect(()=>{
    (async function (){
      console.log("inside async fn of useEffect of selectParticipant..");
      const allTheUploadedEventRes=await axios.get(`http://localhost:5000/selectparticipant/${id}`)
      console.log("Val of allTheUploadedEventRes is:",allTheUploadedEventRes);
      setAllTheUploadedEvent(allTheUploadedEventRes.data.sendDetailsObj);
      // setDisplayedEvent(allTheUploadedEventRes.data.sendDetailsObj);
      console.log("Val of allTheUploadedEvent is:",allTheUploadedEvent);
    })()
  },[])
 console.log("Val of displayed event is:",displayedEvent);
  return (
    <div className="container" style={{paddingTop:"90px"}}>
      <div className="event_selection">
        <div>
          <label className="select_student_label" htmlFor="event">Select Event:</label>
          <select className="select_student"  name="event" id="event"  onChange={(ev)=>{handleSelectedEvent(ev)}}>
            { 
              allTheUploadedEvent?.map((obj,idx)=>{
                // console.log("Val of obj.eventName is:",obj.eventName);
                
                    return(<option value={obj.eventId} key={idx}>{obj.eventName}</option>
                )
              })
            }
          </select> 
        </div>
      </div>     
      <div className="other_component_selection">
        <div className="gender_selection">
        <label className="select_student_label" htmlFor="gender">Select Gender:</label>
          <select  className="select_student" name="gender" id="gender"  onChange={(ev)=>{handleSelectedGender(ev)}}>
            { 
              allGender?.map((g,idx)=>{
                // console.log("Val of obj.eventName is:",obj.eventName);
                return(<option value={g} key={idx}>{g}</option>
                )
              })
            }
          </select> 
        </div>
        <div className="college_selection">
        <label className="select_student_label" htmlFor="college">Select College:</label>
          <select className="select_student"  name="college" id="college"  onChange={(ev)=>{handleSelectedCollege(ev)}}>
            { selectedEvent ? (
                 <>
                  <option value="All" key="All">All</option>
                  {
                    selectedEvent.participatingColleges.map((clg,idx)=>{
                        return(<option value={clg} key={idx}>{clg}</option>)
                    })
                  }
                </>
              ):( 
                <option value="All" key="All">All</option>
              )
            }
          </select>
        </div>
        <div className="sports_selection">
        <label className="select_student_label" htmlFor="sports">Select sport:</label>
          <select className="select_student"  name="sports" id="sports"  onChange={(ev)=>{handleSelectedSport(ev)}}>
            { selectedEvent ? (
                 <>
                  <option value="All" key="All">All</option>
                  {
                    selectedEvent.sportsCategory.map((sport,idx)=>{
                        return(<option value={sport} key={idx}>{sport}</option>)
                    })
                  }
                </>
              ):( 
                <option value="All" key="All">All</option>
              )
            }
          </select>
        </div>
        <div className="student_no_selection">
        <label className="select_student_label" htmlFor="student_no">No. of student:</label>
          <select className="select_student"  name="student_no" id="student_no"  onChange={(ev)=>{handleNoOfStudent(ev)}}>
          { displayedEvent ? (
                 <>
                  <option value="All" key="All">All</option>
                  {
                    displayedEvent.participatingStudents.map((std,idx)=>{
                        return(<option value={idx+1} key={idx}>{idx+1}</option>)
                    })
                  }
                </>
              ):( 
                <option value="All" key="All">All</option>
              )
            }
          </select> 
        </div>
        <div className="basis_selection">
         <label className="select_student_label" htmlFor="basis_selection">Select Basis:</label>
          <select className="select_student" name="basis_selection" id="basis_selection"  onChange={(ev)=>{handleSelectionBasis(ev)}}>
            { 
              allSelectionBasis?.map((g,idx)=>{
                // console.log("Val of obj.eventName is:",obj.eventName);
                return(<option value={g} key={idx}>{g}</option>
                )
              })
            }
          </select> 
        </div>
        {
          displayedEvent? <CSVLink data={displayedEvent?.participatingStudents} headers={headers} filename="Sports_event_data.csv">
          <button className="export_button">Export to CSV</button>
       </CSVLink>: <button>First Select Data</button>
        }
        
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
                    <th>College</th>
                    <th>Participating Sports</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                  displayedEvent?.participatingStudents?.map((studentObj,idx)=>{
                    console.log("No Of Student is:",noOfStudent)
                    if(idx+1 <= (noOfStudent=="All"? 100:noOfStudent))
                    return(
                      <tr key={idx}>
                          <td>{idx+1}</td>
                          <td><img src={`http://localhost:5000/images/profilePics/${studentObj.profilePic}`}_ /></td>
                          <td>{studentObj.name}</td>
                          <td>{studentObj.email}</td>
                          <td>{studentObj.gender}</td>
                          <td>{studentObj.collegeName}</td>
                          <td>{studentObj.participatingSports.map((sport)=>{
                            return <>{sport}&#44;&nbsp;</>
                          })}</td>
                      </tr>
                    )
                  })
                }
                
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