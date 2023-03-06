//store perticular event
let initialState = {
    allEvents:[],
};
//used to set and event when the student click an event
const Adminreducer =  (state = initialState, action) => {
  switch (action.type) {
    case "get-all-admin-events":
      // console.log("set event value in reducer:",action.payload);
      return {
        ...state,
        allEvents:[...action.payload]
      };
    case "error-in-get-admin-events":
      console.log("Error in adminReducer and error is:",action.payload);
      return state;
    default:
      return state;
  }
};

export default Adminreducer;
