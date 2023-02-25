//used to store all the Uploaded event for a perticular teacher
let initialState = {
    selectedStudentData:[],//after middleware, it will contain array of objects
  };
  const Selectedstudentreducer = (state = initialState, action) => {
    switch (action.type) {
      case "set-selected-students"://get from the middleware during login
        console.log("aciton.payload ki value in get-selected-student-data reducer:",action.payload);
        return {selectedStudentData:[...action.payload]}
      case "set-selected-students-error":
         console.log("error in selectedStudentReducer:",action.payload);
         return state; 
    //   case "add-uploaded-event":
    //      return{
    //         selectedStudentData:[...action.payload]//payload is an object here
    //      }
    case "get-selected-students":
        console.log("Inside the getSelctedStudent of selectedStudentReducer");
        return state;
    default:
        return state;
    }
  };
  
  export default Selectedstudentreducer;
  