import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import EmptyLessonsLearnedButtonBar from "./EmptyLessonsLearnedButtonBar";
import EditLessonsLearnedButtonBar from "./EditLessonsLearnedButtonBar";
import { Col } from "react-bootstrap";

// Takes params empty, allEmpty, editing, result
export default class BookSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titleValue:"",
      lessonValue:"",
      refValue:"",
      highlight: false,
      editing:false,
      errorText:""
    }
  }

  onTitleChange = event => {
    this.setState({
      titleValue:event.target.value
    });
  } 

  onLessonChange = event => {
    this.setState({
      lessonValue:event.target.value
    });
  } 

  onRefChange = event => {
    this.setState({
      refValue:event.target.value
    });
  } 

  toggleHighlight = () => {
    this.setState({
      highlight:!this.state.highlight
    });
  }

  editForm = () => {
    this.setState({
      editing:true
    });
  }

  uneditForm = () => {
    this.setState({
      editing:false
    });
  }

  render() {
    if(this.state.editing) {
      const rows = this.state.lessonValue.length < 450 ? "4" : this.state.lessonValue.length < 600 ? "6" : this.state.lessonValue.length < 800 ? "8" : "12"
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><EditLessonsLearnedButtonBar cancelEditing={this.uneditForm}/></span></h5>
          <Form>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Row>
                <Col xs={8}>
                  <Form.Control className="form-control-test" size="sm" placeholder="Lesson Title" />
                </Col>
                <Col xs={4}>
                  <Form.Control className="form-control-test" size="sm" placeholder="Chapter / Page" />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control style={{marginTop:"5px"}} className="form-control-test" size="sm" as="textarea" rows={rows} value={this.state.lessonValue} onChange={this.onLessonChange} placeholder="Summarize what you learned and keep it simple!" />
                </Col>
              </Form.Row>
            </Form.Group>
            
          </Form>
          <div style={{textAlign:"center"}}>
            <Button onClick={this.submitLesson} className="notes-modal-button" >Submit</Button>
            <p className="error-text-notes">{this.state.errorText}</p>
          </div>
        </div>
      );
    } 
    else if(this.props.justHeader) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><EmptyLessonsLearnedButtonBar addLesson={this.editForm}/></span></h5>
        </div>
      );
    }
    else {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><EmptyLessonsLearnedButtonBar addLesson={this.editForm}/></span></h5>
          <p className="notes-modal-description-section">Summarizing key concepts in your own words is the best way to learn while you read - record those lessons here.</p>
          {/* <h5 className="notes-modal-description-section-subheader no-select">Don't do drugs.</h5>
          <p className="notes-modal-description-section">Start with what you have, care about your customers more than yourself, and run your business like you don’t need the money.</p>
          <h5 className="notes-modal-description-section-subheader no-select">Blah blsh lorem sapvsd is csasd seev dvsd</h5>
          <p className="notes-modal-description-section">The Alchemist By Paulo Coelho While sleeping near a sycamore tree in the sacristy of an abandoned church, Santiago, a shepherd boy, has a recurring dream about a child who tells him that he will find a hidden treasure if he travels to the Egyptian pyramids.</p> */}
          {/* <br/> */}
        </div>
      );
    }
  }
    
}
