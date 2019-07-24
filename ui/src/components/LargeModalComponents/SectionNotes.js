import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Col } from "react-bootstrap";
import EmptySectionNoteButtonBar from "./EmptySectionNoteButtonBar";
import AddSectionNotesButtonBar from "./AddSectionNotesButtonBar";
import SectionNoteButtonBar from "./SectionNoteButtonBar";
import EditSectionNotesButtonBar from "./EditSectionNotesButtonBar";
import NotEmptySectionNotesButtonBar from "./NotEmptySectionNotesButtonBar";


// Takes params empty, allEmpty, editing, result
export default class SectionNotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titleValue:"",
      notesValue:"",
      adding:false,
      editing:false,
      errorText:"",
      sectionNotesList: this.getSectionNotesList,
      editingSection: -1
    }
  }

  onTitleChange = event => {
    this.setState({
      titleValue:event.target.value
    });
  } 

  onNotesChange = event => {
    this.setState({
      notesValue:event.target.value
    });
  }

  addForm = () => {
    this.setState({
      adding:true
    });
  }
  unaddForm = () => {
    this.setState({
      adding:false,
      errorText:"",
      editing:false,
    });
  }

  editForm = () => {
    this.setState({
      editing:true
    });
  }

  uneditForm = () => {
    this.setState({
      editing:false,
      adding:false,
      editingSection:-1,
      titleValue:"",
      notesValue:"",
      errorText:"",
    });
  }

  getSectionNotesList = () => {
    if(this.props.result.section_notes && this.props.result.section_notes.length > 0){
      var rows = [];
      for(var i = 0; i < this.props.result.section_notes.length; i++) {
        if(this.state.editingSection === i ){
          const numberRows = this.state.notesValue.length < 250 ? "4" : this.state.notesValue.length < 450 ? "6" : this.state.notesValue.length < 650 ? "8" : "12"
          rows.push(
            <div  key={i}>
              <div className="small-button-bar"><EditSectionNotesButtonBar cancelEditing={this.uneditForm}/></div> 
              <Form style={{marginTop:"20px"}}>
                <Form.Group controlId="sectionNotes" style={{marginBottom:"5px"}}>
                  <Form.Row>
                    <Col>
                      <Form.Control autoFocus className="form-control-test" size="sm"  value={this.state.titleValue} onChange={this.onTitleChange} placeholder="Section / Chapter Title" />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Control style={{marginTop:"5px"}} className="form-control-test" size="sm" as="textarea" rows={numberRows} value={this.state.notesValue} onChange={this.onNotesChange} placeholder="Record your favorite quotes, chapter summaries - whatever you want!" />
                    </Col>
                  </Form.Row>
                </Form.Group>
                
              </Form>
              <div style={{textAlign:"center"}}>
                <Button onClick={this.submitEditSectionNote} className="notes-modal-button" >Submit</Button>
                <p className="error-text-notes">{this.state.errorText}</p>
              </div>
            </div>
          );
        }
        else {
          rows.push(
            <div key={i}>
              {this.state.editing 
                ? <div className="small-button-bar"><SectionNoteButtonBar sectionNoteIndex={i} deleteSectionNote={this.deleteSectionNote} editSectionNote={this.editSectionNote}/></div> 
                : <span></span>
              }
              <h5 className="notes-modal-description-section-subheader no-select">{this.props.result.section_notes[i].section_title}</h5>  
              <p className="notes-modal-description-section">{this.props.result.section_notes[i].notes}</p>
            </div>
          )
        }
      }
      return (
        <div style={{marginTop:"20px"}}>
          {rows}
        </div>
      )
    }
    else {
      return (
        <span></span>
      )
    }
  }

  addSectionNoteApi = async (title, notes) => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-section-note", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            section_title: title,
            notes: notes,
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      if("Timestamp" in resJson) {
        this.props.result.last_updated=resJson.Timestamp;
      }

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  deleteSectionNoteApi = async (index) => {
    try {
      const res = await fetch("http://localhost:8000/api/library/delete-section-note", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            index: index
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      if("Timestamp" in resJson) {
        this.props.result.last_updated=resJson.Timestamp;
      }

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  editSectionNoteApi = async (index, title, notes) => {
    try {
      const res = await fetch("http://localhost:8000/api/library/edit-section-note", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            index: index,
            section_title: title,
            notes: notes,
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      if("Timestamp" in resJson) {
        this.props.result.last_updated=resJson.Timestamp;
      }

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  submitNewSectionNote = async () => {
    if(this.state.titleValue === "" || this.state.notesValue === "") {
      this.setState({errorText:"Please make sure you have filled out the Section Title and Notes and try again."});
      return;
    }

    if(await this.addSectionNoteApi(this.state.titleValue, this.state.notesValue) === true) {
      const newSectionNote = {
        section_title: this.state.titleValue,
        notes: this.state.notesValue,
      };
      this.props.result.section_notes.push(newSectionNote);
      this.setState({editing:false, adding:false, errorText:"", titleValue:"", notesValue:"", editingSection:-1, sectionNotesList: this.getSectionNotesList});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error submitting your Section Note, please try again."});
    }
  }

  submitEditSectionNote = async () => {
    if(this.state.titleValue === "" || this.state.notesValue === "") {
      this.setState({errorText:"Please make sure you have filled out the Section Title and Notes and try again."});
      return;
    }
    
    if(await this.editSectionNoteApi(this.state.editingSection, this.state.titleValue, this.state.notesValue) === true) {
      const newSectionNote= {
        section_title: this.state.titleValue,
        notes: this.state.notesValue,
      };
      this.props.result.section_notes[this.state.editingSection] = newSectionNote;
      this.setState({editing:false, adding:false, errorText:"", titleValue:"", notesValue:"", editingSection:-1, sectionNotesList: this.getSectionNotesList});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error submitting your Section Note, please try again."});
    }
  }

  editSectionNote = async (index) => {
    this.setState({
      editingSection:index,
      titleValue:this.props.result.section_notes[index].section_title,
      notesValue:this.props.result.section_notes[index].notes,
    });
  }

  deleteSectionNote = async (index) => {
    if(await this.deleteSectionNoteApi(index) === true) {
      this.props.result.section_notes.splice(index, 1);
      this.setState({sectionNotesList: this.getSectionNotesList});
      this.props.updateModalDescription();
    }
  }

  render() {

    var SectionNotesList = this.state.sectionNotesList;

    if(this.state.adding) {
      const rows = this.state.notesValue.length < 250 ? "4" : this.state.notesValue.length < 450 ? "6" : this.state.notesValue.length < 650 ? "8" : "12"
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Section Notes<span className="button-bar"><AddSectionNotesButtonBar cancelAdding={this.unaddForm} /></span></h5>
          
          <Form style={{marginTop:"20px"}}>
            <Form.Group controlId="sectionNotes" style={{marginBottom:"5px"}}>
              <Form.Row>
                <Col>
                  <Form.Control autoFocus className="form-control-test" size="sm"  value={this.state.titleValue} onChange={this.onTitleChange} placeholder="Section / Chapter Title" />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control style={{marginTop:"5px"}} className="form-control-test" size="sm" as="textarea" rows={rows} value={this.state.notesValue} onChange={this.onNotesChange} placeholder="Record your favorite quotes, chapter summaries - whatever you want!" />
                </Col>
              </Form.Row>
            </Form.Group>
            
          </Form>
          <div style={{textAlign:"center"}}>
            <Button onClick={this.submitNewSectionNote} className="notes-modal-button" >Submit</Button>
            <p className="error-text-notes">{this.state.errorText}</p>
          </div>
          <SectionNotesList />
        </div>
      );
    } 
    else if(this.props.justHeader) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Section Notes<span className="button-bar"><EmptySectionNoteButtonBar addSectionNote={this.addForm}/></span></h5>
        </div>
      );
    }
    else if(this.props.result.section_notes.length === 0) {
      return(
        <div>
          <h5 className="notes-modal-description-section-header no-select">Section Notes<span className="button-bar"><EmptySectionNoteButtonBar addSectionNote={this.addForm}/></span></h5>
          <p className="notes-modal-description-section">Break down what you're reading by section/chapter. Record your favorite quotes, chapter summaries - whatever you want!</p>
        </div>
      );
    }
    else {
      return(
        <div>
          <h5 className="notes-modal-description-section-header no-select">Section Notes
            <span className="button-bar">
              { this.state.editing && this.state.editingSection !== -1 
                ? <div></div> 
                : this.state.editing && this.state.editingSection === -1 
                ? <EditSectionNotesButtonBar cancelEditing={this.uneditForm} />
                : <NotEmptySectionNotesButtonBar editSectionNotes={this.editForm} addSectionNote={this.addForm}/>
              }
            </span>
          </h5>
          <SectionNotesList />
        </div>
      );
    }
  }
  
}
