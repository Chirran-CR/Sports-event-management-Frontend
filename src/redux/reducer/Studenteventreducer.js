//used to store all the participated event for a perticular student
let initialState = {
    participatedEvents:[],
  };
  const Studenteventreducer = (state = initialState, action) => {
    switch (action.type) {
      case "get-participated-events"://get from the middleware during login
        console.log("aciton.payload ki value in get-participated-events reducer:",action.payload);
        return {participatedEvents:[...action.payload]}
      case "participation-error":
         console.log("error in studentEventReducer:",action.payload);
         return state; 
      case "add-participated-event":
         return{
          participatedEvents:[action.payload]//payload is an object here
         }
      default:
        return state;
    }
  };
   
  export default Studenteventreducer;
  