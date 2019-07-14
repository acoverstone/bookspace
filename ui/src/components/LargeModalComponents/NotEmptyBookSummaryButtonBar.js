import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const NotEmptyBookSummaryButtonBar = (props) => {

  const startEditing = () => {
    props.editBookSummary();
  }

  const deleteBookSummary = () => {
    props.deleteBookSummary()
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="notEmptyDeleteSummary" data-offset="{'bottom': 10}" onClick={deleteBookSummary}><FaTrashAlt/></Button>
      <ReactTooltip id='notEmptyDeleteSummary' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Delete Book Summary</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="notEmptySummary" data-offset="{'bottom': 10}" onClick={startEditing}><FaPencilAlt/></Button>
      <ReactTooltip id='notEmptySummary' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Edit Book Summary</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default NotEmptyBookSummaryButtonBar;