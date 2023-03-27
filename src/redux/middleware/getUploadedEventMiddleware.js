import axios from "axios";

export const getUploadedEventMiddleware=(teacherId)=>{

     return (dispatch)=>{
         axios.get(`/event/teacher/${teacherId}`)
        // axios.get("https://sprots-event-api-2.onrender.com/event")
              .then(resp=>{
                    let eventData=resp.data.uploadedEventsDetails;
            
                    console.log("Received EventData:",eventData);
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
                    dispatch(fetchEventSuccess(eventData))
                })
                .catch(error=>{
                     dispatch(fetchEventFailure(error.message))
                })
     }
}

export const fetchEventSuccess= events=>{
     return {
        type:"get-uploaded-data",
        payload:events
     }
}
export const fetchEventFailure=error=>{
    return {
        type:"teacher-upload-error",
        payload:error
    }
}