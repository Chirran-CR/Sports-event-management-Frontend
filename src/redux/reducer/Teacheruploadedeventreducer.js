//used to store all the Uploaded event for a perticular teacher
let initialState = {
    teacherUploadedData:[],
  };
  const Teacheruploadedeventreducer = (state = initialState, action) => {
    switch (action.type) {
      case "get-uploaded-data"://get from the middleware during login
        console.log("aciton.payload ki value in get-participated-events reducer:",action.payload);
        return {teacherUplaodedData:[...action.payload]}
      case "teacher-upload-error":
         console.log("error in studentEventReducer:",action.payload);
         return state; 
      case "add-uploaded-event":
         return{
            teacherUploadedData:[action.payload]//payload is an object here
         }
      default:
        return state;
    }
  };
  
  export default Teacheruploadedeventreducer;
  