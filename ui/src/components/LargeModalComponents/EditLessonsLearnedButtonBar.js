import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes } from "react-icons/fa";

export default class EditLessonsLearnedButtonBar extends Component {

  render() {
    const stopEditing = () => {
      this.props.cancelEditing()
    }

    return (
      <ButtonGroup size="sm">
        <Button variant="note" data-tip data-for="cancelEditLessons" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
        <ReactTooltip id='cancelEditLessons' className="tooltip-custom" effect='solid' globalEventOff='click'>
          <span className="note-tooltip">Cancel Editing Lessons</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
  
}
