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
      this.props.showAlertModal("Oops.", "Login or Signup to remove a book from your 'Read Already' List.")
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
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been removed from your Read Already list.")
        return true;
      } else {
        this.props.showAlertModal("Oops.", "There was an error removing '" + this.props.result.Title + "' from your Read Already List. Please refresh and try again.");
        console.log("Invalid bookID - " + this.props.result.BookID);
        return false;
      }
        
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please refresh and try again.")
      console.log(e.message);
      return false;
    }
  }

  readNow = () => {
    if(this.props.currentUser !== null) {
      // this.readNowApi();
      // TODO: Figure out how to set for currentUser (not just for this result) for correct behavior without refreshing - possibly refactor "removeResult"
      this.props.result.reading_now = true;
    } else {
      console.log("Not authenticated.")
      this.props.showAlertModal("Oops.", "Login or Signup to add a book to your 'Reading' List.")
    }
  }

  // readNowApi = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/api/library/set-reading-now", {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //           user_id: this.props.currentUser["id"],
  //           book_id: this.props.result.BookID,
  //           reading_now:true
  //       })
  //     });

  //     if(!res.ok) {
  //       throw Error(res.statusText);
  //     }

  //     if(this.props.result.BookID) {
  //       this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Reading list.")
  //       return true;
  //     } else {
  //       this.props.showAlertModal("Oops.", "There was an error adding '" + this.props.result.Title + "' from your Reading List. Please refresh and try again.");
  //       console.log("Invalid bookID - " + this.props.result.BookID);
  //       return false;
  //     }
        
  //   } catch (e) {
  //     this.props.showAlertModal("Oops.", "Something went wrong - please refresh and try again.")
  //     console.log(e.message);
  //     return false;
  //   }
  // }

  showEditModal = () => {
    this.props.showLargeModal(this.props.result);
  }


  render() {
    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.removeReadAlready}><FaTrashAlt /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>Remove From Read Already List</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" onClick={this.readNow}><FaBookReader /></Button>
        <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
          <span>Read Now</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}" onClick={this.showEditModal}><FaPencilAlt /></Button>
        <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
          <span>Take / Edit Notes</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
}