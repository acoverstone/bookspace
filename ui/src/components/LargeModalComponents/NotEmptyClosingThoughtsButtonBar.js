import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const EmptyClosingThoughtButtonBar = (props) => {

  const startEditing = () => {
    props.editClosingThoughts();
  }

  const deleteClosingThought = () => {
    props.deleteClosingThought()
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="notEmptySectionDelete" data-offset="{'bottom': 10}" onClick={deleteClosingThought}><FaTrashAlt/></Button>
      <ReactTooltip id='notEmptySectionDelete' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Delete Closing Thoughts</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="notEmptySectionNotes" data-offset="{'bottom': 10}" onClick={startEditing}><FaPencilAlt/></Button>
      <ReactTooltip id='notEmptySectionNotes' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Edit Closing Thoughts</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptyClosingThoughtButtonBar;