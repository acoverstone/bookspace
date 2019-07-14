import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus } from "react-icons/fa";

const EmptySectionNoteButtonBar = (props) => {

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="emptySectionNotes" data-offset="{'bottom': 10}"><FaPlus /></Button>
      <ReactTooltip id='emptySectionNotes' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Add New Section Note</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptySectionNoteButtonBar;