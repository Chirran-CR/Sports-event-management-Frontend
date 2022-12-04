let initialState = {
    choosedCategory:"ALL"
  };
  const Categoryreducer = (state = initialState, action) => {
    switch (action.type) {
      case "change-category":
          return {choosedCategory:action.payload}
      default:
        return state;
    }
  };
  
  export default Categoryreducer;
  