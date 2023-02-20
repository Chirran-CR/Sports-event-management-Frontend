let initialState = {
    userEmail:"",
    userName:"",
    userCollegeName:"",
    profileImage:"",
    id:""
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
  