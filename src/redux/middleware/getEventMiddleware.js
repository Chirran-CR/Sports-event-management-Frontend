import axios from "axios";
import { API_URL } from "../../App";
import marketplace1 from "../../assets/sports3-min.png"
// const getEventMiddleware=()=>{
//     return async (dispatch) => {
//         try{
          
//             const resp=await axios.get("http://localhost:5000/event/",{credentials:true});
//               let eventData=resp.data.allEventsDetails;
          
//             // console.log("Received EventData:",eventData);
//             let imageWithEventData=eventData?.map((ev)=>{ return{
//                 id:ev._id,
//                 image:marketplace1,
//                 name:ev.eventName,
//                 host:ev.hostingCollege,
//                 participate:ev.participatingColleges,
//                 sports:ev.sportsCategory,
//                 venue:ev.venue
//             }
//             })
//             console.log("image with data in middleware:",imageWithEventData);
//             dispatch({
//                 type:"get-events",
//                 payload:imageWithEventData,
//             })
              
//         }catch(err){
//             console.log("Error in middleware:",err);
//         }
//     }
// }
// export function someFunction() {
//     return(dispatch) => {
//         axios.get("http://localhost:5000/event/",{credentials:true})
//           .then((response) => {dispatch({
//             type:"get-events",
//             payload:imageWithEventData,
//         });})
//           .catch((response) => {return Promise.reject(response);});
//       };
//   }
// async function getEventMiddleware(dispatch){
//     const resp=await axios.get("http://localhost:5000/event/",{credentials:true});
//                   let eventData=resp.data.allEventsDetails;
              
//                 // console.log("Received EventData:",eventData);
//                 let imageWithEventData=eventData?.map((ev)=>{ return{
//                     id:ev._id,
//                     image:marketplace1,
//                     name:ev.eventName,
//                     host:ev.hostingCollege,
//                     participate:ev.participatingColleges,
//                     sports:ev.sportsCategory,
//                     venue:ev.venue
//                 }
//                 })
//                 console.log("image with data in middleware:",imageWithEventData);
//                 dispatch({
//                     type:"get-events",
//                     payload:imageWithEventData,
//                 })
// }
// const getEventMiddleware=()=>{
//     return dispatch =>{
//          return axios.get("http://localhost:5000/event/")
//              .then(res=>{
//                   dispatch({
//                     type:"get-events",
//                     payload:res.data.allEventDetails
//                   });
//              })
//              .catch(err=>{
//                 dispatch({
//                      type:"error"
//                 })
//              })
//     }
// }
export const getEventMiddleware=()=>{
     return (dispatch)=>{
         axios.get(`${API_URL}/event/`)
        // axios.get("https://sprots-event-api-2.onrender.com/event")
              .then(resp=>{
                    let eventData=resp.data.allEventsDetails;
            
                    console.log("Received EventData:",eventData);
                    let imageWithEventData=eventData?.map((ev)=>
                    { 
                        
                        return{
                        id:ev._id,
                        // image:marketplace1,
                        eventBanner:ev.eventBanner,
                        eventName:ev.eventName,
                        hostingCollege:ev.hostingCollege,
                        participatingColleges:ev.participatingColleges,
                        sportsCategory:ev.sportsCategory,
                        venue:ev.venue
                    }
                    })
                    dispatch(fetchEventSuccess(imageWithEventData))
                })
                .catch(error=>{
                     dispatch(fetchEventFailure(error.message))
                })
     }
}

export const fetchEventSuccess= events=>{
     return {
        type:"get-events",
        payload:events
     }
}
export const fetchEventFailure=error=>{
    return {
        type:"error",
        payload:error
    }
}