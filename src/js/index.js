//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import { TaskList } from "./component/TasksList";

//render your react application
ReactDOM.render(<TaskList />, document.querySelector("#app"));
