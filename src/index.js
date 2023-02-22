import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store.js";
import {Provider } from "react-redux";
import "./index.css";
// import ContextProvider from './components/participantSelection/components/context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
    <Provider store={store}>
     <App/>
    </Provider>
    {/* </ContextProvider> */}
  </React.StrictMode>
);
