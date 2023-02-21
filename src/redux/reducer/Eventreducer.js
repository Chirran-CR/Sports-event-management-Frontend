//store perticular event
let initialState = {
    sportEvent:{},
    update:false,
    clgUpdate:false,
};
//used to set and event when the student click an event
const Eventreducer =  (state = initialState, action) => {
  switch (action.type) {
    case "set-event":
      // console.log("set event value in reducer:",action.payload);
      return {
        sportEvent:action.payload,
        update:state.update,
        clgUpdate:state.clgUpdate
      };
    case "set-update":
      return {
        sportEvent:state.sportEvent,
        update:action.payload,
        clgUpdate:state.clgUpdate
      }
    case "set-clg-update":
      return {
        sportEvent:state.sportEvent,
        update:state.update,
        clgUpdate:action.payload
      }
    default:
      return state;
  }
};

export default Eventreducer;
