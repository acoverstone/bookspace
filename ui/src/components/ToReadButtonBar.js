import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaBookmark, FaPlus, FaTrash } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


export default class ToReadButtonBar extends Component {
    
  removeFromRead = () => {
    if(this.props.currentUser !== null) {
        // TODO NEXT: Remove from To-Read list in above state (ToRead.js) - finish below function
      this.removeFromToReadApi()
    } else {
      console.log("Not authenticated.")
      this.props.showModal("Oops.", "Login or signup to remove a book from your 'To-Read' List")
    }
    
  }

  removeFromToReadApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/library/remove-to-read", {
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
        this.props.showModal("Done.", "'" + this.props.result.Title + "' has been removed from your To-Read list.")
      } else {
        // TODO: Add some logic to handle invalid book id...
        console.log("Invalid bookID - " + this.props.result.BookID);
      }
        
    } catch (e) {
      this.props.showModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
    }
  }


  render() {
    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.removeFromRead}><FaTrash /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>Remove From To-Read List</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" ><FaBookmark /></Button>
        <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
          <span>Read Already</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}"><FaPlus /></Button>
        <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
          <span>Read Now</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
}