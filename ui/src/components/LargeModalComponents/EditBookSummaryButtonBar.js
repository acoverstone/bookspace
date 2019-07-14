import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes } from "react-icons/fa";

const EmptyBookSummaryButtonBar = (props) => {

  const stopEditing = () => {
    props.cancelEditing();
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="editSummary" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
      <ReactTooltip id='editSummary' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Cancel Adding Book Summary</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptyBookSummaryButtonBar;