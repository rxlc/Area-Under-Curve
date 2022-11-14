import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ContextProvider } from "./Context/contexts";

import './style.css'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  rootElement
);
