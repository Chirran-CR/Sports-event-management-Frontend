import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";
import Teachereventreducer from "./Teachereventreducer";
import Categoryreducer from "./Categoryreducer";
import Userreducer from "./Userreducer";
import Studenteventreducer from "./Studenteventreducer";
import Teacheruploadedeventreducer from "./Teacheruploadedeventreducer";
import Selectedstudentreducer from "./Selectedstudentreducer";

const rootReducer=combineReducers({
      authReducer:Authreducer,
      eventReducer:Eventreducer,
      teacherEventReducer:Teachereventreducer,
      categoryReducer:Categoryreducer,
      userReducer:Userreducer,
      studentEventReducer:Studenteventreducer, 
      teacherUploadedEventReducer:Teacheruploadedeventreducer,
      selectedStudentReducer:Selectedstudentreducer,
})

export default rootReducer;