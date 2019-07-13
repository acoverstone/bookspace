import React from "react";
import NoteButtonBar from "./NoteButtonBar";

const LessonsLearned = (props) => {
    return (
      <div>
        <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><NoteButtonBar type="emptyLessons"/></span></h5>
        <p className="notes-modal-description-section">Summarizing key concepts in your own words is the best way to learn while you read - record lessons learned here.</p>
        {/* <h5 className="notes-modal-description-section-subheader no-select">Don't do drugs.</h5>
        <p className="notes-modal-description-section">Start with what you have, care about your customers more than yourself, and run your business like you don’t need the money.</p>
        <h5 className="notes-modal-description-section-subheader no-select">Blah blsh lorem sapvsd is csasd seev dvsd</h5>
        <p className="notes-modal-description-section">The Alchemist By Paulo Coelho While sleeping near a sycamore tree in the sacristy of an abandoned church, Santiago, a shepherd boy, has a recurring dream about a child who tells him that he will find a hidden treasure if he travels to the Egyptian pyramids.</p> */}
        {/* <br/> */}
      </div>
    );
  }

export default LessonsLearned;