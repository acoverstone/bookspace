import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus, FaList } from "react-icons/fa";

const NotEmptySectionNotesButtonBar = (props) => {

  const addSectionNote = () => {
    props.addSectionNote();
  }

  const editSectionNotes = () => {
    props.editSectionNotes();
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="notEmptySectionNotesEdit" data-offset="{'bottom': 10}" onClick={editSectionNotes}><FaList /></Button>
      <ReactTooltip id='notEmptySectionNotesEdit' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Edit Section Notes </span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="notEmptySectionNotesAdd" data-offset="{'bottom': 10}" onClick={addSectionNote}><FaPlus /></Button>
      <ReactTooltip id='notEmptySectionNotesAdd' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Add New Section Note</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default NotEmptySectionNotesButtonBar;