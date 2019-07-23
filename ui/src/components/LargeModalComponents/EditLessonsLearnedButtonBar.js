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
        {this.props.editingLesson === -1 
          ? <div/>
          :  <div><Button variant="highlight" data-tip data-for="higlightEditLessons" data-offset="{'bottom': 10}" onClick={toggleHighlight} className={highlighted}><FaHighlighter /></Button>
              <ReactTooltip id='higlightEditLessons' className="tooltip-custom" effect='solid' globalEventOff='click'>
                <span className="note-tooltip">Toggle Highlight Lesson</span>
              </ReactTooltip>
            </div>
        }
        <Button variant="note" data-tip data-for="cancelEditLessons" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
        <ReactTooltip id='cancelEditLessons' className="tooltip-custom" effect='solid' globalEventOff='click'>
          <span className="note-tooltip">Cancel Editing Lessons</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
  
}
