import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaPencilAlt, FaTrashAlt, FaBookReader } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


export default class ReadAlreadyButtonBar extends Component {
    
  removeReadAlready = () => {
    if(this.props.currentUser !== null) {
      this.removeReadAlreadyApi()
    } else {
      console.log("Not authenticated.")
      this.props.showModal("Oops.", "Login or signup to remove a book from your 'Read Already' List")
    }
  }

  removeReadAlreadyApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/library/remove-read-already", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentUser["id"],
            book_id: this.props.result.BookID,
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      if(this.props.result.BookID) {
        this.props.removeResult(this.props.result.BookID);
        this.props.showModal("Done.", "'" + this.props.result.Title + "' has been removed from your Read Already list.")
        return true;
      } else {
        this.props.showModal("Oops.", "There was an error removing '" + this.props.result.Title + "' from your Read Already List. Please refresh and try again.");
        console.log("Invalid bookID - " + this.props.result.BookID);
        return false;
      }
        
    } catch (e) {
      this.props.showModal("Oops.", "Something went wrong - please refresh and try again.")
      console.log(e.message);
      return false;
    }
  }


  render() {
    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.removeReadAlready}><FaTrashAlt /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>Remove From Read Already List</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" ><FaBookReader /></Button>
        <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
          <span>Read Now</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}"><FaPencilAlt /></Button>
        <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
          <span>Take / Edit Notes</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
}