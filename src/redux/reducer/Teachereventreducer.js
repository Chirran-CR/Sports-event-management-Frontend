
let initialState = {
  allEvents:[],
};
const Teachereventreducer = (state = initialState, action) => {
  switch (action.type) {
    case "get-events":
      console.log("aciton.payload ki value in get-events reducer:",action.payload);
      return {allEvents:[...action.payload]}
    case "error":
       console.log("error in teacher event reducer:",action.payload);
       return state; 
    case "add-event":
       return{
          allEvents:[...state.allEvents,action.payload]//payload is an object here
       }
    default:
      return state;
  }
};

export default Teachereventreducer;
