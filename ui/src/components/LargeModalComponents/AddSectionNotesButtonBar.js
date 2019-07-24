import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes } from "react-icons/fa";

export default class AddSectionNotesButtonBar extends Component {

  render() {
    const stopAdding = () => {
      this.props.cancelAdding()
    }
  
    return (
      <ButtonGroup size="sm">
        <Button variant="note" data-tip data-for="cancelAddSectionNote" data-offset="{'bottom': 10}" onClick={stopAdding}><FaTimes /></Button>
        <ReactTooltip id='cancelAddSectionNote' className="tooltip-custom" effect='solid' globalEventOff='click'>
          <span className="note-tooltip">Cancel Adding Section Note</span>
        </ReactTooltip>
      </ButtonGroup>
    );
  }
  
}
