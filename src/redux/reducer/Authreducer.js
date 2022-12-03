import axios from "axios";
let initialState = {
  isLoggedIn: false,
  displayFormState:true,
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
     axios.get(`http://localhost:5000/auth/${designation}/logout`, {
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
    default:
      return state;
  }
};

export default Authreducer;
