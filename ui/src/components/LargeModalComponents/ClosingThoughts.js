import React from "react";
import NoteButtonBar from "./NoteButtonBar";
import FiveStarButtonBar from "./FiveStarButtonBar";


const ClosingThoughts = (props) => {
    if(props.empty) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><NoteButtonBar type="emptyReview"/></span></h5>
          <p className="notes-modal-description-section">Jot down some closing thoughts and rate this book out of 5 stars.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><NoteButtonBar type="notEmptyReview"/></span></h5>
          <p className="notes-modal-description-section">And why are the best decisions often those that are impossible to explain to others?In Blink we meet the psychologist who has learned to predict whether a marriage will last, based on a few minutes of observing a couple; the tennis coach who knows when a player will double-fault before the racket even makes contact with the bal.</p>
          <FiveStarButtonBar editing={true} stars={0}/>
        </div>
      );
    }
  }

export default ClosingThoughts;

