import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";
import Teachereventreducer from "./Teachereventreducer";
import Categoryreducer from "./Categoryreducer";

const rootReducer=combineReducers({
      authReducer:Authreducer,
      eventReducer:Eventreducer,
      teacherEventReducer:Teachereventreducer,
      categoryReducer:Categoryreducer,
})

export default rootReducer;