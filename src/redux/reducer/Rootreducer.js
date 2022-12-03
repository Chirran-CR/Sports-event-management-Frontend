import {combineReducers} from "redux";
import Authreducer from "./Authreducer";
import Eventreducer from "./Eventreducer";


const rootReducer=combineReducers({
      authReducer:Authreducer,
      // eventReducer:Eventreducer,
})

export default rootReducer;