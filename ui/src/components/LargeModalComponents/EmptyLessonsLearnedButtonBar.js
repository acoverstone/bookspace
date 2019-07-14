import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus } from "react-icons/fa";

const EmptyLessonsLearnedButtonBar = (props) => {

  const addLesson = () => {
    props.addLesson();
  }


  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="emptyLessons" data-offset="{'bottom': 10}" onClick={addLesson}><FaPlus /></Button>
      <ReactTooltip id='emptyLessons' className="tooltip-custom" effect='solid' >
        <span className="note-tooltip">Add New Lesson</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default EmptyLessonsLearnedButtonBar;