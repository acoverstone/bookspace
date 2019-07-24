import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const SectionNoteButtonBar = (props) => {

  const editSectionNote = () => {
    props.editSectionNote(props.sectionNoteIndex);
  }

  const deleteSectionNote = () => {
    props.deleteSectionNote(props.sectionNoteIndex)
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="deleteSectionNote" data-offset="{'bottom': 10}" onClick={deleteSectionNote}><FaTrashAlt/></Button>
      <ReactTooltip id='deleteSectionNote' className="tooltip-custom" effect='solid'  globalEventOff='click'>
        <span className="note-tooltip">Delete Section Note</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="editSectionNote" data-offset="{'bottom': 10}" onClick={editSectionNote}><FaPencilAlt/></Button>
      <ReactTooltip id='editSectionNote' className="tooltip-custom" effect='solid'  globalEventOff='click'>
        <span className="note-tooltip">Edit Section Note</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default SectionNoteButtonBar;