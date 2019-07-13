import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import NoteButtonBar from "./NoteButtonBar";
import FiveStarButtonBar from "./FiveStarButtonBar";

import "./LargeCenteredModal.css";

export default class LargeCenteredModal extends Component {

  getAuthors = () => {
    var authors = this.props.result["Authors"]
    if(authors == null || !Array.isArray(authors) || authors.length === 0){
      return "No Author Info"
    }
    return authors.join(", ")
  }


  render() {

    const ClosingThoughts = (props) => {
     
      if(props.empty) {
        return (
          <div>
            <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><NoteButtonBar type="emptyReview"/></span></h5>
            <p className="notes-modal-description-section">Jot down some closing thoughts and rate this book out of 5 stars!</p>
          </div>
        );
      } else {
        return (
          <div>
            <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><NoteButtonBar type="emptyReview"/></span></h5>
            <p className="notes-modal-description-section">And why are the best decisions often those that are impossible to explain to others?In Blink we meet the psychologist who has learned to predict whether a marriage will last, based on a few minutes of observing a couple; the tennis coach who knows when a player will double-fault before the racket even makes contact with the bal.</p>
            <FiveStarButtonBar editing={true} stars={0}/>
          </div>
        );
      }
     
    }

    const BookSummary = (props) => {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><NoteButtonBar type="emptySummary"/></span></h5>
          <p className="notes-modal-description-section">Add a book summary so you can remember what this book was all about!</p>
          {/* <p className="notes-modal-description-section">This unusual school had old railroad cars for classrooms, and it was run by an extraordinary man-its founder and headmaster, Sosaku Kobayashi--who was a firm believer in freedom of expression and activity.In real life, the Totto-chan of the book has become one of Japan's most popular television personalities--Tetsuko Kuroyanagi.</p> */}
          {/* <br/> */}  
        </div> 
      );
    }

    const LessonsLearned = (props) => {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><NoteButtonBar type="emptyLessons"/></span></h5>
          <p className="notes-modal-description-section">Writing down key principles in your own words is the best way to learn while you read - record some lessons learned below!</p>
          {/* <h5 className="notes-modal-description-section-subheader no-select">Don't do drugs.</h5>
          <p className="notes-modal-description-section">Start with what you have, care about your customers more than yourself, and run your business like you don’t need the money.</p>
          <h5 className="notes-modal-description-section-subheader no-select">Blah blsh lorem sapvsd is csasd seev dvsd</h5>
          <p className="notes-modal-description-section">The Alchemist By Paulo Coelho While sleeping near a sycamore tree in the sacristy of an abandoned church, Santiago, a shepherd boy, has a recurring dream about a child who tells him that he will find a hidden treasure if he travels to the Egyptian pyramids.</p> */}
          {/* <br/> */}
        </div>
      );
    }
    const SectionSummaries = (props) => {
      return(
        <div>
          <h5 className="notes-modal-description-section-header no-select">Section Summaries<span className="button-bar"><NoteButtonBar type="emptySectionSummaries"/></span></h5>
          <p className="notes-modal-description-section">Or summarize what you're reading by section!</p>
          {/* <h5 className="notes-modal-description-section-subheader no-select">Chapter 1 - Hi There</h5>
          <p className="notes-modal-description-section">Start with what you have, care about your customers more than yourself, and run your business like you don’t need the money.</p>
          <h5 className="notes-modal-description-section-subheader no-select">Chapter 2 - Blah</h5>
          <p className="notes-modal-description-section">The Alchemist By Paulo Coelho While sleeping near a sycamore tree in the sacristy of an abandoned church, Santiago, a shepherd boy, has a recurring dream about a child who tells him that he will find a hidden treasure if he travels to the Egyptian pyramids.</p> */}
        </div>
      )
    }

    

    const ModalDescription = (props) => {
      return (
        <div className="notes-modal-description">

          <ClosingThoughts empty={true} editing={false}/>
          <BookSummary />
          <LessonsLearned />
          <SectionSummaries />

          {/* <p className="notes-model-test">Add a book summary, jot down your closing thoughts, record a lesson learned or summarize by section!</p> */}
        </div>
      );
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
  