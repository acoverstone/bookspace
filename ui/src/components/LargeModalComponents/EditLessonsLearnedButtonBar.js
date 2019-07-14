import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes, FaHighlighter } from "react-icons/fa";

const EditLessonsLearnedButtonBar = (props) => {

  const stopEditing = () => {
    props.cancelEditing()
  }

  const toggleHighlight = () => {
    
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="highlightLesson" data-offset="{'bottom': 10}" onClick={toggleHighlight}><FaHighlighter /></Button>
      <ReactTooltip id='highlightLesson' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Highlight Lesson</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="editLesson" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
      <ReactTooltip id='editLesson' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Cancel Adding Lesson</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EditLessonsLearnedButtonBar;