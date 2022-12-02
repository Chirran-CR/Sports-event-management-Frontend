import {combineReducers} from "redux";
import Authreducer from "./Authreducer";


const rootReducer=combineReducers({
      authReducer:Authreducer,
})

export default rootReducer;