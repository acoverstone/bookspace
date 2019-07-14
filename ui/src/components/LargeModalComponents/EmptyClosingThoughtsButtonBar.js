import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus } from "react-icons/fa";

const EmptyClosingThoughtsButtonBar = (props) => {

  const addClosingThoughts = () => {
    props.editClosingThoughts();
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="emptyReview" data-offset="{'bottom': 10}" onClick={addClosingThoughts}><FaPlus /></Button>
      <ReactTooltip id='emptyReview' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Add Closing Thoughts</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptyClosingThoughtsButtonBar;