import axios from 'axios';
import React, { useEffect,useState } from 'react'

const SingleLiveScore = (props) => {
    const eventId= props.eventId;
    const selectedSport=props.selectedSport;
    let resultOfSelectedSportPresent=false;
    const [liveScoreArrayObj,setLiveScoreArrayObj]=useState([]);//[{sport:"",score:{}},{sport:"",score:{}},....]
    useEffect(()=>{
        (async function (){
            console.log("Val of event id inside singleLiveScore :",props.eventId);
            console.log("Val of selected sport  inside singleLiveScore is:",props.selectedSport);
            // const liveScoreRes=await axios.get(`http://localhost:5000/event/getlivescore/${props.eventId}`);
            const liveScoreRes=await axios.get(`/event/getlivescore/${props.eventId}`);
            console.log("Val of liveScoreRes is:",liveScoreRes.data.liveScoreOfSingleEvent);
            setLiveScoreArrayObj([...liveScoreRes.data.liveScoreOfSingleEvent])
        })();
   },[props.eventId])

   console.log("Val of liveScoreObj is:",liveScoreArrayObj);

   async function handleRefresh(){
    // const liveScoreRes=await axios.get(`http://localhost:5000/event/getlivescore/${props.eventId}`);
    const liveScoreRes=await axios.get(`/event/getlivescore/${props.eventId}`);
    console.log("Val of liveScoreRes inside handleRefresh is:",liveScoreRes.data.liveScoreOfSingleEvent);
    setLiveScoreArrayObj([...liveScoreRes.data.liveScoreOfSingleEvent])
   }

  return (
    <div style={{border:"2px solid #BEBEBE",height:"auto",width:"30rem"}}>
        {liveScoreArrayObj?.length>0 ? (<>
          
            { 
            liveScoreArrayObj.map((liveScorObj)=>{
                  if(liveScorObj.sport == props.selectedSport){
                    resultOfSelectedSportPresent=true;
                    return(
                        <>
                         <div style={{display:"flex",padding:"2rem"}}>
                            <div>
                                <h2>{liveScorObj.score.matchBetween.team1}</h2>
                                <h2>{liveScorObj.score.matchBetween.team2}</h2>
                            </div>
                            <div style={{marginLeft:"4rem"}}>
                                <h2>{liveScorObj.score.presentScore.team1Score}</h2>
                                <h2>{liveScorObj.score.presentScore.team2Score}</h2>
                            </div>
                            <div style={{marginLeft:"4rem",fontSize:"2rem",cursor:"pointer"}} onClick={()=>{handleRefresh()}}>
                            <i class='bx bxs-sun bx-spin'></i>
                            </div>
                         </div>
                         <div style={{padding:"2rem"}}>
                            <h4>{liveScorObj.score.commentary}</h4>
                         </div>
                        </>
                    )
                  }
            })}
            {
                resultOfSelectedSportPresent? "":"This sports has not started yet.We will update when it starts.."
            }
        </>):(<h3 style={{}}>Event hasn't started...</h3>)}
    </div>
  )
}

export default SingleLiveScore