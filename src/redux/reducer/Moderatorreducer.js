let initialState = {
    email:"",
    name:"",
    eventId:"",
    selectedSport:"",
  };
  const Moderatorreducer = (state = initialState, action) => {
    switch (action.type) {
      case "set-moderator":
          return action.payload
      default:
        return state;
    }
  };
  
  export default Moderatorreducer;
  