import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ClosingThoughts from "./LargeModalComponents/ClosingThoughts";
import BookSummary from "./LargeModalComponents/BookSummary";
import LessonsLearned from "./LargeModalComponents/LessonsLearned";
import SectionNotes from "./LargeModalComponents/SectionNotes";

import "./LargeCenteredModal.css";

export default class LargeCenteredModal extends Component {

  getAuthors = () => {
    var authors = this.props.result["Authors"]
    if(authors == null || !Array.isArray(authors) || authors.length === 0){
      return "No Author Info"
    }
    return authors.join(", ")
  }

  isNotesEmpty = () => {
    return false;
  }

  render() {

    const ModalDescription = (props) => {
      if (this.isNotesEmpty()) {
        return (
          <div className="notes-modal-description">
            <p className="notes-model-test">You don't have any notes - add some below.</p>
            <ClosingThoughts empty={true} editing={false}/>
            <BookSummary empty={true} editing={false}/>
            <LessonsLearned empty={true} editing={false}/>
            <SectionNotes empty={true} editing={false}/>
          </div>
        );
      } else {
        return (
          <div className="notes-modal-description">
            <p className="notes-model-test">You don't have any notes - add some below.</p>
            <ClosingThoughts empty={false} editing={false}/>
            <BookSummary empty={false} editing={false}/>
            <LessonsLearned empty={false} editing={false}/>
            <SectionNotes empty={false} editing={false}/>
          </div>
        );
      }
      
    }

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="notes-modal"
      >
        <Modal.Body className="notes-modal-body">
          {(this.props.result !== null) ? 
            <div>
              <h4><span id="notes-modal-title">{this.props.result.Title}</span><br/><span id="notes-modal-subtitle">{this.getAuthors()}</span></h4>

              <ModalDescription />

              <div style={{textAlign:"center"}}>
                <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
              </div>
            </div>
            :
            <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
  