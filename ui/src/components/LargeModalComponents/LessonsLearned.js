import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import EmptyLessonsLearnedButtonBar from "./EmptyLessonsLearnedButtonBar";
import NotEmptyLessonsLearnedButtonBar from "./NotEmptyLessonsLearnedButtonBar";
import AddLessonsLearnedButtonBar from "./AddLessonsLearnedButtonBar";
import LessonButtonBar from "./LessonButtonBar";
import { Col } from "react-bootstrap";
import EditLessonsLearnedButtonBar from "./EditLessonsLearnedButtonBar";

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
      adding:false,
      errorText:"",
      lessonList: this.getLessonList
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
      highlight: !this.state.highlight
    });
  }

  addForm = () => {
    this.setState({
      adding:true
    });
  }
  unaddForm = () => {
    this.setState({
      adding:false
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

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  addLessonLearnedApi = async (title, description, reference, highlight) => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-lesson-learned", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            title: title,
            description: description,
            reference:reference,
            highlight:highlight
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      console.log(resJson);
      if("Timestamp" in resJson) {
        this.props.result.last_updated=resJson.Timestamp;
      }

      return true;

    } catch (e) {

      console.log(e.message);
      return false;
    }
  }

  submitLesson = async () => {
    if(this.state.titleValue === "" || this.state.lessonValue === "") {
      this.setState({errorText:"Please make sure you have a Lesson Title and Description and try again."});
      return;
    }

    if(await this.addLessonLearnedApi(this.state.titleValue, this.state.lessonValue, this.state.refValue, this.state.highlight) === true) {
      const newLesson = {
        title: this.state.titleValue,
        description: this.state.lessonValue,
        reference:this.state.refValue,
        highlight: this.state.highlight
      };
      this.props.result.lessons.push(newLesson);
      this.setState({editing:false, adding:false, errorText:"", titleValue:"", lessonValue:"", refValue:"", lessonList:this.getLessonList});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error submitting your lesson learned, please try again."});
    }
  }

  getLessonList = () => {
    console.log(this.props.result);
    if(this.props.result.lessons && this.props.result.lessons.length > 0){
      var rows = [];
      for(var i = 0; i < this.props.result.lessons.length; i++) {
        if(this.props.result.lessons[i].highlight) {
          rows.push(<div key={i}>
                      {this.state.editing 
                        ? <div className="small-button-bar"><LessonButtonBar cancelEditing={this.uneditForm} toggleHighlight={this.toggleHighlight} highlighting={this.state.highlight}/></div> 
                        : <span></span>
                      }
                      <h5 className="notes-modal-description-section-subheader no-select"><mark className="blue-highlight">{this.props.result.lessons[i].title}<span className="subheader-subheader">&nbsp;&nbsp;{this.props.result.lessons[i].reference}</span></mark></h5>
                      <p className="notes-modal-description-section">{this.props.result.lessons[i].description}</p>
                    </div>)
                     
                      
        } else {
          rows.push(<div key={i}>
                      {this.state.editing 
                        ? <div className="small-button-bar"><LessonButtonBar cancelEditing={this.uneditForm} toggleHighlight={this.toggleHighlight} highlighting={this.state.highlight}/></div> 
                        : <span></span>
                      }
                      <h5 className="notes-modal-description-section-subheader no-select">{this.props.result.lessons[i].title}<span className="subheader-subheader">&nbsp;&nbsp;{this.props.result.lessons[i].reference}</span></h5>  
                      <p className="notes-modal-description-section">{this.props.result.lessons[i].description}</p>
                    </div>)
        }
      }
     return (<div style={{marginTop:"25px"}}>{rows}</div>)
    }
    else {
      return (
        <p className="notes-modal-description-section">Summarizing key concepts in your own words is the best way to learn while you read - record those lessons here.</p>
      )
    }
  }

  render() {

    var Lessons = this.state.lessonList;

    if(this.state.adding) {
      const rows = this.state.lessonValue.length < 250 ? "4" : this.state.lessonValue.length < 450 ? "6" : this.state.lessonValue.length < 650 ? "8" : "12"
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><AddLessonsLearnedButtonBar cancelAdding={this.unaddForm} toggleHighlight={this.toggleHighlight} highlighting={this.state.highlight}/></span></h5>
          
          <Form style={{marginTop:"20px"}}>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Row>
                <Col xs={7}>
                  <Form.Control autoFocus className="form-control-test" size="sm"  value={this.state.titleValue} onChange={this.onTitleChange} placeholder="Lesson Title" />
                </Col>
                <Col xs={5}>
                  <Form.Control className="form-control-test" size="sm"  value={this.state.refValue} onChange={this.onRefChange} placeholder="Chapter / Page" />
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
          <Lessons />
        </div>
      );
    } 
    else if(this.props.justHeader) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><EmptyLessonsLearnedButtonBar addLesson={this.addForm}/></span></h5>
        </div>
      );
    }
    else if(this.props.result.lessons.length === 0) {
      return(
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned<span className="button-bar"><EmptyLessonsLearnedButtonBar addLesson={this.addForm}/></span></h5>
          <p className="notes-modal-description-section">Summarizing key concepts in your own words is the best way to learn while you read - record those lessons here.</p>
        </div>
      );
    }
    else {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Lessons Learned
            <span className="button-bar">
              { this.state.editing 
                ? <EditLessonsLearnedButtonBar cancelEditing={this.uneditForm}/>
                : <NotEmptyLessonsLearnedButtonBar editLessons={this.editForm} addLesson={this.addForm}/>
              }
            </span>
          </h5>
          <Lessons />
        </div>
      );
    }
  }

    
}
