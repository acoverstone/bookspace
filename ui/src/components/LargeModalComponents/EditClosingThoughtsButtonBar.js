import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTimes } from "react-icons/fa";

const EditClosingThoughtButtonBar = (props) => {

  const stopEditing = () => {
    props.cancelEditing()
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="editThoughts" data-offset="{'bottom': 10}" onClick={stopEditing}><FaTimes /></Button>
      <ReactTooltip id='editThoughts' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Cancel Adding Closing Thoughts</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EditClosingThoughtButtonBar;