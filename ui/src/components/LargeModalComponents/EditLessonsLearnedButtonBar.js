import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes, FaHighlighter } from "react-icons/fa";

export default class EditLessonsLearnedButtonBar extends Component {

  render() {
    const stopEditing = () => {
      this.props.cancelEditing()
    }
  
    const toggleHighlight = () => {
      this.props.toggleHighlight();
    }
  
    const highlighted = this.props.highlighting ? "highlight-blue" : "";
  
    return (
      <ButtonGroup size="sm">
        <Button variant="highlight" data-tip data-for="highlightLesson" data-offset="{'bottom': 10}" onClick={toggleHighlight} className={highlighted}><FaHighlighter /></Button>
        <ReactTooltip id='highlightLesson' className="tooltip-custom" effect='solid' globalEventOff='click'>
          <span className="note-tooltip">Toggle Highlight Lesson</span>
        </ReactTooltip>
        <Button variant="note" data-tip data-for="editLesson" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
        <ReactTooltip id='editLesson' className="tooltip-custom" effect='solid' globalEventOff='click'>
          <span className="note-tooltip">Cancel Adding Lesson</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
  
}

// export default EditLessonsLearnedButtonBar;