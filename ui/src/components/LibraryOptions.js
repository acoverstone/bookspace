import React from "react";
import "./LibraryOptions.css";

export default ({
   selected,
    ...props
  }) =>
    <p className="library-options no-select"> 
        <span className={selected === "to-read" ? "library-option-active" : ""} onClick={() => {props.selectOption("to-read")}}>To-Read List</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span className={selected === "read-already" ? "library-option-active" : ""} onClick={() => {props.selectOption("read-already")}}>Read Already</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span className={selected === "reading-now" ? "library-option-active" : ""} onClick={() => {props.selectOption("reading-now")}}>Reading Now</span>  
    </p>