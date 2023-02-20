import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";
import Teachereventreducer from "./Teachereventreducer";
import Categoryreducer from "./Categoryreducer";
import Userreducer from "./Userreducer";
import Studenteventreducer from "./Studenteventreducer";


const rootReducer=combineReducers({
      authReducer:Authreducer,
      eventReducer:Eventreducer,
      teacherEventReducer:Teachereventreducer,
      categoryReducer:Categoryreducer,
      userReducer:Userreducer,
      studentEventReducer:Studenteventreducer, 
})

export default rootReducer;