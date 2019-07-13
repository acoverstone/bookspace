import React from "react";
import NoteButtonBar from "./NoteButtonBar";

const BookSummary = (props) => {
  return (
    <div>
      <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><NoteButtonBar type="emptySummary"/></span></h5>
      <p className="notes-modal-description-section">Add a quick recap so you can remember what this book was all about.</p>
      {/* <p className="notes-modal-description-section">This unusual school had old railroad cars for classrooms, and it was run by an extraordinary man-its founder and headmaster, Sosaku Kobayashi--who was a firm believer in freedom of expression and activity.In real life, the Totto-chan of the book has become one of Japan's most popular television personalities--Tetsuko Kuroyanagi.</p> */}
      {/* <br/> */}  
    </div> 
  );
}


export default BookSummary;

