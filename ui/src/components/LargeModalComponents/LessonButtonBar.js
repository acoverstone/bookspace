import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const LessonButtonBar = (props) => {

  const editLesson = () => {
    props.editLesson(props.lessonIndex);
  }

  const deleteLesson = () => {
    props.deleteLesson(props.lessonIndex)
  }

  return (
    <ButtonGroup size="sm">
      <Button variant="note" data-tip data-for="deleteLesson" data-offset="{'bottom': 10}" onClick={deleteLesson}><FaTrashAlt/></Button>
      <ReactTooltip id='deleteLesson' className="tooltip-custom" effect='solid'  globalEventOff='click'>
        <span className="note-tooltip">Delete Lesson</span>
      </ReactTooltip>
      <Button variant="note" data-tip data-for="editLesson" data-offset="{'bottom': 10}" onClick={editLesson}><FaPencilAlt/></Button>
      <ReactTooltip id='editLesson' className="tooltip-custom" effect='solid'  globalEventOff='click'>
        <span className="note-tooltip">Edit Lesson</span>
      </ReactTooltip>
    </ButtonGroup>
  );
}

export default LessonButtonBar;