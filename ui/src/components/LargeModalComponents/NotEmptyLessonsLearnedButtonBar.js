import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaPlus, FaPencilAlt } from "react-icons/fa";

const NotEmptyLessonsLearnedButtonBar = (props) => {

  const addLesson = () => {
    props.addLesson();
  }

  const editLessons = () => {
    props.editLessons();
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="notEmptyLessonsEdit" data-offset="{'bottom': 10}" onClick={editLessons}><FaPencilAlt /></Button>
      <ReactTooltip id='notEmptyLessonsEdit' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Edit Lessons Learned</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="notEmptyLessonsAdd" data-offset="{'bottom': 10}" onClick={addLesson}><FaPlus /></Button>
      <ReactTooltip id='notEmptyLessonsAdd' className="tooltip-custom" effect='solid' globalEventOff='click'>
        <span className="note-tooltip">Add New Lesson</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default NotEmptyLessonsLearnedButtonBar;