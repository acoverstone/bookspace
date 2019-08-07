import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaPencilAlt, FaTrashAlt, FaBookmark } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


export default class ReadingNowButtonBar extends Component {
    
  removeReadingNow = () => {
    if(this.props.currentUser !== null && this.props.currentUser["type"] !== "sample_user") {
      this.removeReadingNowApi()
    } else {
      this.props.showAlertModal("Oops.", "Login or Signup to remove a book from your 'Reading' List.")
    }
  }

  removeReadingNowApi = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/api/library/remove-reading-now", {
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
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been removed from your 'Reading' list.")
        return true;
      } else {
        this.props.showAlertModal("Oops.", "There was an error removing '" + this.props.result.Title + "' from your 'Reading' List. Please refresh and try again.");
        // console.log("Invalid bookID - " + this.props.result.BookID);
        return false;
      }
        
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please refresh and try again.")
      // console.log(e.message);
      return false;
    }
  }

  finishReading = () => {
    if(this.props.currentUser !== null && this.props.currentUser["type"] !== "sample_user") {
      this.finishReadingApi();      
    } else {
      this.props.showAlertModal("Oops.", "Login or Signup to add a book to your 'Read Already' List.")
    }
  }


  finishReadingApi = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/api/library/set-reading-now", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentUser["id"],
            book_id: this.props.result.BookID,
            reading_now:false
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      if(this.props.result.BookID) {
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your 'Read Already' list.");
        this.props.result.reading_now = false;
        this.props.refreshResults(this.props.result);
        return true;
      } else {
        this.props.showAlertModal("Oops.", "There was an error adding '" + this.props.result.Title + "' to your 'Read Already' List. Please refresh and try again.");
        // console.log("Invalid bookID - " + this.props.result.BookID);
        return false;
      }
        
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please refresh and try again.")
      // console.log(e.message);
      return false;
    }
  }

  showEditModal = () => {
    this.props.showLargeModal(this.props.result);
  }


  render() {
    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.removeReadingNow}><FaTrashAlt /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>Remove From Reading List</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" onClick={this.finishReading}><FaBookmark /></Button>
        <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
          <span>Finish Reading</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}" onClick={this.showEditModal}><FaPencilAlt /></Button>
        <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
          <span>Take / Edit Notes</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
}