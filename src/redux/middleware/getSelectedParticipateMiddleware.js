import axios from "axios";
import { API_URL } from "../../App";
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
export const getSelectedParticipateMiddleware=(eventId)=>{
     return (dispatch)=>{
         axios.get(`${API_URL}/event/getselectedstudent/${eventId}`)
        // axios.get("https://sprots-event-api-2.onrender.com/event")
              .then(resp=>{
                    let selectedStudentData=resp.data.allSelectedStudent;
            
                    console.log("Received selectedStudentData inside the getSelectedParticipateMiddleware is:",selectedStudentData);//array of object
                    // let imageWithEventData=eventData?.map((ev)=>
                    // { 
                        
                    //     return{
                    //     id:ev._id,
                    //     // image:marketplace1,
                    //     eventBanner:ev.eventBanner,
                    //     eventName:ev.eventName,
                    //     hostingCollege:ev.hostingCollege,
                    //     participatingColleges:ev.participatingColleges,
                    //     sportsCategory:ev.sportsCategory,
                    //     venue:ev.venue
                    // }
                    // })
                    dispatch(fetchGetSelectedParticipateMiddlewareSuccess(selectedStudentData))
                })
                .catch(error=>{
                     dispatch(fetchGetSelectedParticipateMiddlewareFailure(error.message))
                })
     }
}

export const fetchGetSelectedParticipateMiddlewareSuccess= selectedStudents=>{
     return {
        type:"set-selected-students",
        payload:selectedStudents
     }
}
export const fetchGetSelectedParticipateMiddlewareFailure=error=>{
    return {
        type:"set-selected-students-error",
        payload:error
    }
}