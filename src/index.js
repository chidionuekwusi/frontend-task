import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElem = document.getElementById("root");

render(
  <Router>
    <App />
  </Router>,
  rootElem
);
