import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus } from "react-icons/fa";

const EmptySectionNoteButtonBar = (props) => {

  const addSectionNote = () => {
    props.addSectionNote();
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="emptySectionNotes" data-offset="{'bottom': 10}" onClick={addSectionNote}><FaPlus /></Button>
      <ReactTooltip id='emptySectionNotes' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Add New Section Note</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptySectionNoteButtonBar;