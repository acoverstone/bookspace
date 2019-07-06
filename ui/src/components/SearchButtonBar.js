import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaRegListAlt, FaBookmark, FaBookReader, FaCheck } from 'react-icons/fa';
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
      this.props.showAlertModal("Oops.", "Login or signup to add a book to your 'To-Read' List")
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
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your To-Read list.");
      } else {
        // TODO: Add some logic to handle invalid book id...
        console.log("Invalid bookID - " + this.props.result.BookID);
      }
      
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
    }
  }

  addReadAlready = () => {
    if(this.props.currentUser !== null) {
      this.addReadAlreadyApi()
    } else {
      console.log("Not authenticated.")
      this.props.showAlertModal("Oops.", "Login or signup to add a book to your 'Read Already' List");
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
    
      var resJson = await res.json();
      if(this.props.result.BookID && 'id' in resJson && 'library' in this.props.currentUser) {
        
        this.props.currentUser["library"]["read_list"].push(resJson);
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Read Already list.");
      } else {
        this.props.showAlertModal("Oops.", "There was an error adding '" + this.props.result.Title + "' to your Read Already List. Please refresh and try again.");
        console.log("Invalid bookID - " + this.props.result.BookID);
      }
      
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
    }
  }

  // Returns true if book is in Read, To-Read or Reading List, false otherwise
  existsInLibrary = () => {
    if(this.props.currentUser != null ) {

      var existsinReadList = false;
      for (let i = 0; i < this.props.currentUser["library"]["read_list"].length; i++) {
        if(this.props.currentUser["library"]["read_list"][i]["id"] === this.props.result.BookID) {
          existsinReadList = true;
        }
      }

      if(existsinReadList) {
        return "Read Already";
      }
      else if(this.props.currentUser["library"]["to_read_list"].includes(this.props.result.BookID)) {
        return "To-Read";
      }
    }

    return null;  
  }

  render() {
    const existsIn = this.existsInLibrary();
    return (
      <div>
        {(existsIn == null) 
          ?
            <ButtonGroup size="sm">
              <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.addToRead} ><FaRegListAlt /></Button>
              <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
                <span>To-Read</span>
              </ReactTooltip>
              <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" onClick={this.addReadAlready} ><FaBookmark /></Button>
              <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
                <span>Read Already</span>
              </ReactTooltip>
              <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}"><FaBookReader /></Button>
              <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
                <span>Read Now</span>
              </ReactTooltip>
            </ButtonGroup> 
          :
            <ButtonGroup size="sm">
              <Button variant="exists" data-tip data-for={"exists" + this.props.result.BookID} data-offset="{'bottom': 10}" ><FaCheck /></Button>
              <ReactTooltip id={"exists" + this.props.result.BookID} className="tooltip-custom" effect='solid' >
                <span>Added To Your {existsIn} List</span>
              </ReactTooltip>
            </ButtonGroup> 
        }
      </div>
    );
  }
}