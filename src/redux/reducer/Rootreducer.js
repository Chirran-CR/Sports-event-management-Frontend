import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";
import Teachereventreducer from "./Teachereventreducer";
import Categoryreducer from "./Categoryreducer";
import Userreducer from "./Userreducer";
import Studenteventreducer from "./Studenteventreducer";
import Teacheruploadedeventreducer from "./Teacheruploadedeventreducer";


const rootReducer=combineReducers({
      authReducer:Authreducer,
      eventReducer:Eventreducer,
      teacherEventReducer:Teachereventreducer,
      categoryReducer:Categoryreducer,
      userReducer:Userreducer,
      studentEventReducer:Studenteventreducer, 
      teacherUploadedEventReducer:Teacheruploadedeventreducer,
})

export default rootReducer;