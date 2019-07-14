import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus } from "react-icons/fa";

const EmptyBookSummaryButtonBar = (props) => {

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="emptySummary" data-offset="{'bottom': 10}"><FaPlus /></Button>
      <ReactTooltip id='emptySummary' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Add Book Summary</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptyBookSummaryButtonBar;