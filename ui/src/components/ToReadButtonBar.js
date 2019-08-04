import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaBookmark, FaTrashAlt, FaBookReader } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


export default class ToReadButtonBar extends Component {
    
  removeFromToRead = () => {
    if(this.props.currentUser !== null && this.props.currentUser["type"] !== "sample_user") {
      this.removeFromToReadApi()
    } else {
      // console.log("Not authenticated.")
      this.props.showAlertModal("Oops.", "Login or Signup to remove a book from your 'To-Read' List.")
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
        this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been removed from your To-Read list.")
        return true;
      } else {
        this.props.showAlertModal("Oops.", "There was an error removing '" + this.props.result.Title + "' from your To-Read List. Please refresh and try again.");
        // console.log("Invalid bookID - " + this.props.result.BookID);
        return false;
      }
        
    } catch (e) {
      this.props.showAlertModal("Oops.", "Something went wrong - please refresh and try again.")
      // console.log(e.message);
      return false;
    }
  }
  

  addReadAlready = () => {
    if(this.props.currentUser !== null && this.props.currentUser["type"] !== "sample_user") {
      this.addReadAlreadyApi()
    } else {
      // console.log("Not authenticated.")
      this.props.showAlertModal("Oops.", "Login or Signup to add a book to your 'Read Already' List.");
    }
  }

    // Add book to "Read Already" list and remove from "To-Read" list
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
          // Remove from to-read list for current user
          var removedFromToRead = await this.removeFromToReadApi();

          // Add to read already list for current User
          this.props.currentUser["library"]["read_list"].push(resJson);
          if(removedFromToRead)
            this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Read Already list.");
          else {
            this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Read Already list (something went wrong removing from To-Read list).");
          }
        } else {
          this.props.showAlertModal("Oops.", "There was an error adding '" + this.props.result.Title + "' to your Read Already List. Please refresh and try again.");
          // console.log("Invalid bookID - " + this.props.result.BookID);
        }
        
      } catch (e) {
        this.props.showAlertModal("Oops.", "Something went wrong - please try again.")
        // console.log(e.message);
      }
    }

    addReadingNow = () => {
      if(this.props.currentUser !== null && this.props.currentUser["type"] !== "sample_user") {
        this.addReadingApi()
      } else {
        // console.log("Not authenticated.")
        this.props.showAlertModal("Oops.", "Login or Signup to add a book to your 'Reading' List.");
      }
    }
  
      // Add book to "Reading" list and remove from "To-Read" list
      addReadingApi = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/library/add-reading-now", {
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
            // Remove from to-read list for current user
            var removedFromToRead = await this.removeFromToReadApi();
  
            // Add to read already list for current User
            this.props.currentUser["library"]["read_list"].push(resJson);
            if(removedFromToRead)
              this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Reading list.");
            else {
              this.props.showAlertModal("Done.", "'" + this.props.result.Title + "' has been added to your Reading list (something went wrong removing from To-Read list).");
            }
          } else {
            this.props.showAlertModal("Oops.", "There was an error adding '" + this.props.result.Title + "' to your Reading List. Please refresh and try again.");
            // console.log("Invalid bookID - " + this.props.result.BookID);
          }
          
        } catch (e) {
          this.props.showAlertModal("Oops.", "Something went wrong - please try again.")
          // console.log(e.message);
        }
      }
  


  render() {
    return (
      <ButtonGroup size="sm">
        <Button variant="result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.removeFromToRead}><FaTrashAlt /></Button>
        <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
          <span>Remove From To-Read List</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="readalready" data-offset="{'bottom': 10}" onClick={this.addReadAlready} ><FaBookmark /></Button>
        <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
          <span>Read Already</span>
        </ReactTooltip>
        <Button variant="result" data-tip data-for="reading" data-offset="{'bottom': 10}" onClick={this.addReadingNow}><FaBookReader /></Button>
        <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
          <span>Read Now</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
}