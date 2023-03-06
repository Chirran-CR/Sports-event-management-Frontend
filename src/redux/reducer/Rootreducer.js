import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";
import Teachereventreducer from "./Teachereventreducer";
import Categoryreducer from "./Categoryreducer";
import Userreducer from "./Userreducer";
import Studenteventreducer from "./Studenteventreducer";
import Teacheruploadedeventreducer from "./Teacheruploadedeventreducer";
import Selectedstudentreducer from "./Selectedstudentreducer";
import Adminreducer from "./Adminreducer";
import Moderatorreducer from "./Moderatorreducer";

const rootReducer=combineReducers({
      authReducer:Authreducer,
      eventReducer:Eventreducer,
      teacherEventReducer:Teachereventreducer,
      categoryReducer:Categoryreducer,
      userReducer:Userreducer,
      studentEventReducer:Studenteventreducer, 
      teacherUploadedEventReducer:Teacheruploadedeventreducer,
      selectedStudentReducer:Selectedstudentreducer,
      adminReducer:Adminreducer,
      moderatorReducer:Moderatorreducer,
})

export default rootReducer;