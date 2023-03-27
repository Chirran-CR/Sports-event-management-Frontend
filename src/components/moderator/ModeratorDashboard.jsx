import axios from 'axios';
import React, { useState,useEffect } from 'react'
import {connect} from "react-redux";
import "./Moderator.css";

const ModeratorDashboard = (props) => {
  const [selectedSport,setSelectedSport]=useState("");
  const [selectedEvent,setSelectedEvent]=useState({});
  const [matchBetween,setMatchBetween]=useState({
    team1:"",
    team2:""
  });
  const [liveSc,setLiveSc]=useState({
    team1Score:"",
    team2Score:"",
  });
  const [commentary,setCommentary]=useState("");

  useEffect(()=>{
    (async function (){
      // const selectedEventRes=await axios.get(`http://localhost:5000/event/${props.moderatorReducer.eventId}`);
      const selectedEventRes=await axios.get(`/event/${props.moderatorReducer.eventId}`);
      const singleEvent=selectedEventRes?.data?.singleEvent[0];
      console.log("Val of single Event from moderator dashboard is:",singleEvent);
      setSelectedEvent({...singleEvent});
      //add the already added matchbetween & liveSc
      let liveScoreObj=singleEvent.liveScore.filter((singleLS)=>{
         if(singleLS.sport==props.moderatorReducer.selectedSport){
          return true;
         }
         return false;
      });
      console.log("Val of liveScoreObj inside useEffect of moderatorDashboard is:",liveScoreObj);
      if(liveScoreObj.length > 0){
          setCommentary(liveScoreObj[0].score.commentary);
          setMatchBetween({
            team1:liveScoreObj[0].score.matchBetween.team1,
            team2:liveScoreObj[0].score.matchBetween.team2,
          })
          setLiveSc({
            team1Score:liveScoreObj[0].score.presentScore.team1Score,
            team2Score:liveScoreObj[0].score.presentScore.team2Score,
          })
      }
    })()
    setSelectedSport(props.moderatorReducer.selectedSport);
  },[])

  async function handleSendLiveScoreToBackend(){
    console.log("Val of match Between is:",matchBetween);
    console.log("Val of liveScore is:",liveSc);
    console.log("Val of commentary is:",commentary);
    //TODO- send livescore data to backend 
    // const sendLiveScoreRes= await axios.post(`http://localhost:5000/event/addscore/${props.moderatorReducer.eventId}`,{
    const sendLiveScoreRes= await axios.post(`/event/addscore/${props.moderatorReducer.eventId}`,{
      sport:props.moderatorReducer.selectedSport,
      score:{
        matchBetween:{
          team1:matchBetween.team1,
          team2:matchBetween.team2
        },
        presentScore:{
          team1Score:liveSc.team1Score,
          team2Score:liveSc.team2Score
        },
        commentary:commentary
      }
    })
    console.log("Val of sendLiveScoreRes is:",sendLiveScoreRes);
    setCommentary("");
  }
  return (
    <div style={{paddingTop:"7rem"}}>
      {selectedEvent?  <h2>{selectedEvent.eventName}</h2>:<h2>Not assigned any event</h2>}
      {/* event banner rahega */}
      <table>
       <tr>
        <th>Sport</th>
        <th>Match Between</th>
        <th>Live Score</th>
        <th>Commentary</th>
       </tr> 
       <tr>
           <td>{selectedSport}</td>
           <td style={{position:"relative",height:"4rem",width:"25rem"}}>
               {/* <textarea value={matchBetween} onChange={(e)=>{setMatchBetween(e.target.value)}} rows="3" cols="30" style={{caretColor: "#ff0000",caretShape: "underscore",width:"50%",position:"absolute",top: 0, left: 0, right: 0, bottom: 0,}}></textarea>
               <textarea value={matchBetween} onChange={(e)=>{setMatchBetween(e.target.value)}} rows="3" cols="30" style={{caretColor: "#ff0000",caretShape: "underscore",width:"50%",position:"absolute",top: 0, left: 50, right: 0, bottom: 0,}}></textarea> */}
               <input value={matchBetween.team1} onChange={(e)=>{setMatchBetween({...matchBetween,team1:e.target.value})}} style={{width:"49%",height:"4rem"}}/>
               <input value={matchBetween.team2} onChange={(e)=>{setMatchBetween({...matchBetween,team2:e.target.value})}} style={{marginLeft:"0.5%",width:"50%",height:"4rem"}}/>
           </td>
           <td style={{position:"relative",width:"14rem"}}>
             {/* <textarea value={liveSc} onChange={(e)=>{setLiveSc(e.target.value)}} rows="3" cols="30" style={{width:"100%",position:"absolute",top: 0, left: 0, right: 0, bottom: 0,}}></textarea> */}
               <input value={liveSc.team1Score} onChange={(e)=>{setLiveSc({...liveSc,team1Score:e.target.value})}}  style={{width:"49%",height:"4rem"}}/>
               <input value={liveSc.team2Score} onChange={(e)=>{setLiveSc({...liveSc,team2Score:e.target.value})}}  style={{marginLeft:"0.5%",width:"50%",height:"4rem"}}/>
            </td>
           <td style={{position:"relative"}}><textarea value={commentary} onChange={(e)=>{setCommentary(e.target.value)}} rows="3" cols="30" style={{width:"100%",position:"absolute",top: 0, left: 0, right: 0, bottom: 0,}}></textarea></td>
       </tr>
      </table>
      <div style={{width:"100%",display:"flex",justifyContent:"end"}}>
        <button style={{marginRight:80,marginTop:10,height:"2rem",width:"2rem"}} onClick={()=>{handleSendLiveScoreToBackend()}}>ADD</button>
      </div>
      
    </div>
  )
}
function mapStateToProps(store){
  return store;
}
const mapDispatchToProps=(dispatch)=>{
   return{
       logIn:(desigantion)=>{
           return dispatch({type:"login",payload:desigantion});
       },
   }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ModeratorDashboard);