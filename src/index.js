import React from "react";
import ReactDOM from "react-dom";

import App from "./App";


ReactDOM.render(
  React.createElement(React.StrictMode, {}, React.createElement(App)),
  document.getElementById("react-target"));
