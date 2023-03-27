import axios from "axios";

export const getDataFroAdminMiddlewareFn=()=>{
     return (dispatch)=>{
         axios.get(`/event`)
        // axios.get("https://sprots-event-api-2.onrender.com/event")
              .then(resp=>{
                    let allEvents=resp.data.allEventsDetails;
            
                    console.log("Received allEventsData inside the getDataFroAdminMiddleware is:",allEvents);//array of object
                    
                    dispatch(fetchGetDataForAdminMiddlewareSuccess(allEvents))
                })
                .catch(error=>{
                     dispatch(fetchGetDataForAdminMiddlewareFailure(error.message))
                })
     }
}

export const fetchGetDataForAdminMiddlewareSuccess= allEvents=>{
     return {
        type:"get-all-admin-events",
        payload:allEvents
     }
}
export const fetchGetDataForAdminMiddlewareFailure=error=>{
    return {
        type:"error-in-get-admin-events",
        payload:error
    }
}