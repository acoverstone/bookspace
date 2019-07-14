import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ClosingThoughts from "./LargeModalComponents/ClosingThoughts";
import BookSummary from "./LargeModalComponents/BookSummary";
import LessonsLearned from "./LargeModalComponents/LessonsLearned";
import SectionNotes from "./LargeModalComponents/SectionNotes";

import "./LargeCenteredModal.css";

export default class LargeCenteredModal extends Component {

  // returns authors as a displayable string
  getAuthors = () => {
    var authors = this.props.result["Authors"]
    if(authors == null || !Array.isArray(authors) || authors.length === 0){
      return "No Author Info"
    }
    return authors.join(", ")
  }

  // returns true if 'closing thoughts',' book summary', 'lessons learned' and 'section notes' are all empty
  isNotesEmpty = () => {
    return this.isClosingThoughtsEmpty() && this.isBookSummaryEmpty() && this.isLessonsLearnedEmpty() && this.isSectionNotesEmpty();
  }

  isClosingThoughtsEmpty = () => {
    return this.props.result.closing_thoughts.review.length === 0;
  }

  isBookSummaryEmpty = () => {
    return this.props.result.book_summary.length === 0;
  }

  isLessonsLearnedEmpty = () => {
    return this.props.result.lessons_learned.length === 0;
  }

  isSectionNotesEmpty = () => {
    return this.props.result.section_notes.length === 0;
  }

  render() {

    const ModalDescription = (props) => {
      if (this.isNotesEmpty()) {
        return (
          <div className="notes-modal-description">
            <p className="notes-model-test">You don't have any notes for this book yet.</p>
            <ClosingThoughts result={this.props.result} currentuser={this.props.currentuser}/>
            <BookSummary />
            <LessonsLearned />
            <SectionNotes />
          </div>
        );
      } 
      else if (!this.isClosingThoughtsEmpty() && this.isBookSummaryEmpty() && this.isLessonsLearnedEmpty() && this.isSectionNotesEmpty()) {
        return (
          <div className="notes-modal-description">
            <ClosingThoughts result={this.props.result}  currentuser={this.props.currentuser}/>
            <BookSummary justHeader={true}/>
            <LessonsLearned justHeader={true}/>
            <SectionNotes  justHeader={true}/>
          </div>
        );
      }
      else {
        return (
          <div className="notes-modal-description">
            <ClosingThoughts result={this.props.result}/>
            <BookSummary />
            <LessonsLearned />
            <SectionNotes  />
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
            <div style={{textAlign:"center"}}>
              <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
  