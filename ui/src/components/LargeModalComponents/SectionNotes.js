import React from "react";
import NoteButtonBar from "./NoteButtonBar";

const SectionNotes = (props) => {
  return(
      <div>
      <h5 className="notes-modal-description-section-header no-select">Section Notes<span className="button-bar"><NoteButtonBar type="emptySectionNotes"/></span></h5>
      <p className="notes-modal-description-section">Break down what you're reading by section/chapter. Record your favorite quotes, chapter summaries - whatever you want!</p>
      {/* <h5 className="notes-modal-description-section-subheader no-select">Chapter 1 - Hi There</h5>
      <p className="notes-modal-description-section">Start with what you have, care about your customers more than yourself, and run your business like you don’t need the money.</p>
      <h5 className="notes-modal-description-section-subheader no-select">Chapter 2 - Blah</h5>
      <p className="notes-modal-description-section">The Alchemist By Paulo Coelho While sleeping near a sycamore tree in the sacristy of an abandoned church, Santiago, a shepherd boy, has a recurring dream about a child who tells him that he will find a hidden treasure if he travels to the Egyptian pyramids.</p> */}
      </div>
  )
}

export default SectionNotes;