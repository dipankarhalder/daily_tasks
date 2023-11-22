import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootelement = document.getElementById("root");
const applicationroot = ReactDOM.createRoot(rootelement);

applicationroot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
