import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducer/Rootreducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'persist-root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store=createStore(persistedReducer,composeWithDevTools(applyMiddleware(logger,thunk)));

const persistor = persistStore(store)

export default store;
export {persistor};