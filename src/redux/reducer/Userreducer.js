let initialState = {
    userEmail:"",
    userName:"",
    userCollegeName:""
  };
  const Userreducer = (state = initialState, action) => {
    switch (action.type) {
      case "set-user":
          return action.payload
      default:
        return state;
    }
  };
  
  export default Userreducer;
  