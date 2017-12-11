import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";
import Home from "./components/Home.js";

// render the main component
ReactDOM.render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('app')
);
