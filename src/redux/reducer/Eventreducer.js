//store perticular event
let initialState = {
    sportEvent:{},
    update:false,
};
//used to set and event when the student click an event
const Eventreducer =  (state = initialState, action) => {
  switch (action.type) {
    case "set-event":
      // console.log("set event value in reducer:",action.payload);
      return {
        sportEvent:action.payload,
        update:state.update
      };
    case "set-update":
      return {
        sportEvent:state.sportEvent,
        update:action.payload
      }
    default:
      return state;
  }
};

export default Eventreducer;
