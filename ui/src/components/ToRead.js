import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";

export default class ToRead extends Component {


  render() {

    return (
      <div >
        {this.props.isLoading ? 
          <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> :
        (this.props.toReadList.length === 0) ? 
          <div className="loaded">There are no books in your 'To-Read' list.</div>:
        <div>{this.props.toReadList}</div>
        }
      </div>
    )
  }
}

