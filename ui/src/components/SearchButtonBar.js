import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaRegListAlt, FaBookmark, FaPlus } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


// Checks for alphanumeric chars - used to check bookIDs?
// const isAlphaNumeric = ch => {
// 	return ch.match(/^[a-z0-9]+$/i) !== null;
// }

export default class SearchButtonBar extends Component {
    
  addToRead = () => {
    if(this.props.currentUser !== null) {
      this.addToReadApi()
    } else {
      console.log("Not authenticated.")
      this.props.showModal("Oops.", "Login or signup to add a book to your 'To-Read' List")
    }
  }

  // Add book to "To-Read" list
  addToReadApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-to-read", {
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
        this.props.currentUser["library"]["to_read_list"].push(this.props.result.BookID)
        this.props.showModal("Done.", "'" + this.props.result.Title + "' has been added to your To-Read list.")
      } else {
        // TODO: Add some logic to handle invalid book id...
        console.log("Invalid bookID - " + this.props.result.BookID);
      }
      
    } catch (e) {
      this.props.showModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
    }
  }

  addReadAlready = () => {
    if(this.props.currentUser !== null) {
      this.addReadAlreadyApi()
    } else {
      console.log("Not authenticated.")
      this.props.showModal("Oops.", "Login or signup to add a book to your 'Read Already' List")
    }
  }

  // Add book to "Read Already" list
  addReadAlreadyApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-read-already", {
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
        this.props.showModal("Done.", "'" + this.props.result.Title + "' has been added to your Read Already list.")
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
    // TODO: Instead of toggling disabled pret button - toggle green check mark if in To-Read/Read Already/Reading

    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.addToRead} disabled={this.props.currentUser !== null ? this.props.currentUser["library"]["to_read_list"].includes(this.props.result.BookID) : false}><FaRegListAlt /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>To-Read</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" onClick={this.addReadAlready} disabled={false}><FaBookmark /></Button>
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