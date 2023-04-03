//store perticular event
let initialState = {
    eventDateType:"All",
};
//used to set and event when the student click an event
const Eventdatereducer =  (state = initialState, action) => {
  switch (action.type) {
    case "update-event-date-type":
      // console.log("set event value in reducer:",action.payload);
      return {
       eventDateType:action.payload
      };
    default:
      return state;
  }
};

export default Eventdatereducer;
