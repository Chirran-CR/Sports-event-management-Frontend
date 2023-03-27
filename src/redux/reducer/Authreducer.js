import axios from "axios";
let initialState = {
  isLoggedIn: false,
  displayFormState:true,
  dispalyStudentFromState:true,
};
const Authreducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("designation", action.payload);
      return {
        ...state,isLoggedIn: true,
      };
    case "logout":
      const designation = localStorage.getItem("designation");
     axios.get(`/auth/${designation}/logout`, {
        credentials: true,
      });
      localStorage.removeItem("designation");

      return {
        ...state,isLoggedIn: false,
      };
    case "display-form":
        return{
            ...state,displayFormState:true
        }
    case "hide-form":
            return{...state,displayFormState:false
            }
    case "display-student-form":
      return{
          ...state,dispalyStudentFromState:true
      }
    case "hide-student-form":
      return{...state,dispalyStudentFromState:false
      }
    default:
      return state;
  }
};

export default Authreducer;
