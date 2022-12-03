
let initialState = {
    displayForm:true
};
const Eventreducer = async (state = initialState, action) => {
  switch (action.type) {
    case "show-form":
      return {
        displayForm:true
      };
    case "hide-form":
       return{
        displayForm:false
       }
    default:
      return state;
  }
};

export default Eventreducer;
