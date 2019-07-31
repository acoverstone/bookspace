import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import EmptyBookSummaryButtonBar from "./EmptyBookSummaryButtonBar";
import NotEmptyBookSummaryButtonBar from "./NotEmptyBookSummaryButtonBar";
import EditBookSummaryButtonBar from "./EditBookSummaryButtonBar";

// Takes params empty, allEmpty, editing, result
export default class BookSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue:this.props.result.book_summary,
      editing:false,
      errorText:""
    }
  }

  onFormChange = event => {
    this.setState({
      inputValue:event.target.value
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

  addBookSummaryApi = async (summary) => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-book-summary", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            summary: summary,
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

  submitBookSummary = async () => {
    if(await this.addBookSummaryApi(this.state.inputValue) === true) {
      this.props.result.book_summary=this.state.inputValue
      this.setState({editing:false, errorText:""});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error submitting your book summary, please try again."});
    }
  }

  deleteBookSummary = async () => {
    if(await this.addBookSummaryApi("") === true) {
      this.props.result.book_summary=""
      this.setState({inputValue:"", editing:false, errorText:""});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error deleting your book summary, please try again."});
    }
  }

  render() {
    if(this.state.editing) {
      const rows = this.state.inputValue.length < 250 ? "4" : this.state.inputValue.length < 450 ? "6" : this.state.inputValue.length < 650 ? "8" : "12"
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EditBookSummaryButtonBar cancelEditing={this.uneditForm}/></span></h5>
          <Form>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Control autoFocus className="form-control-test" size="lg" as="textarea" rows={rows} value={this.state.inputValue} onChange={this.onFormChange} placeholder="How would you describe this book to a friend in less than a paragraph?"/>
            </Form.Group>
            
          </Form>
          <div style={{textAlign:"center"}}>
            <Button onClick={this.submitBookSummary} className="notes-modal-button" >Submit</Button>
            <p className="error-text-notes">{this.state.errorText}</p>
          </div>
          
        </div>
      );
    } 
    else if(this.props.justHeader) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar editBookSummary={this.editForm}/></span></h5>
        </div>
      );
    } else if(this.props.result.book_summary.length === 0) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar editBookSummary={this.editForm}/></span></h5>
          <p className="notes-modal-description-section">Add a quick recap so you don't forget what this book was about.</p>
        </div>
      );
    }
    else {
      return (
          <div>
            <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><NotEmptyBookSummaryButtonBar editBookSummary={this.editForm} deleteBookSummary={this.deleteBookSummary} /></span></h5>
            <p className="notes-modal-description-section">{this.props.result.book_summary}</p>
            <p className="error-text-notes">{this.state.errorText}</p>
          </div> 
        );
      }
    }
    
}

