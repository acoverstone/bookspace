import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaPlus, FaQuestion } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./ButtonBar.css";


export default class NoteButtonBar extends Component {

  render() {

    const BarByType = () => {
      if(this.props.type === "emptySummary") {
        return (
          <ButtonGroup size="sm">
            <Button variant="note" data-tip data-for="emptySummary" data-offset="{'bottom': 10}"><FaPlus /></Button>
            <ReactTooltip id='emptySummary' className="tooltip-custom" effect='solid' >
              <span className="note-tooltip">Add Book Summary</span>
            </ReactTooltip>
          </ButtonGroup>
        )
      } 
      else if(this.props.type === "emptyReview") {
        return (
          <ButtonGroup size="sm">
            <Button variant="note" data-tip data-for="emptyReview" data-offset="{'bottom': 10}"><FaPlus /></Button>
            <ReactTooltip id='emptyReview' className="tooltip-custom" effect='solid' >
              <span className="note-tooltip">Add Final Thoughts</span>
            </ReactTooltip>
          </ButtonGroup>
        )
      }
      else if(this.props.type === "emptyLessons") {
        return (
          <ButtonGroup size="sm">
            <Button variant="note" data-tip data-for="emptyLessons" data-offset="{'bottom': 10}"><FaPlus /></Button>
            <ReactTooltip id='emptyLessons' className="tooltip-custom" effect='solid' >
              <span className="note-tooltip">Add New Lesson</span>
            </ReactTooltip>
          </ButtonGroup>
        )
      }
      else if(this.props.type === "emptySectionSummaries"){
        return (
          <ButtonGroup size="sm">
            <Button variant="note" data-tip data-for="emptySectionSummaries" data-offset="{'bottom': 10}"><FaPlus /></Button>
            <ReactTooltip id='emptySectionSummaries' className="tooltip-custom" effect='solid' >
              <span className="note-tooltip">Add New Section Summary</span>
            </ReactTooltip>
          </ButtonGroup>
        )
      }
      else {
        return (
          <ButtonGroup size="sm">
            <Button variant="note" data-tip data-for="idk" data-offset="{'bottom': 10}"><FaQuestion /></Button>
            <ReactTooltip id='idk' className="tooltip-custom" effect='solid' >
              <span className="note-tooltip">Who knows?</span>
            </ReactTooltip>
          </ButtonGroup>
        )
      }
    }

    return (
      <BarByType />
    );
  }
}