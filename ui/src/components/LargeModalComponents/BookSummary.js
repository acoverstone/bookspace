import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import EmptyBookSummaryButtonBar from "./EmptyBookSummaryButtonBar";

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

  submitBookSummary = () => {
    console.log("Submitted.")
  }

  render() {
    if(this.state.editing) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar/></span></h5>
          <Form>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Control autoFocus className="form-control-test" size="lg" as="textarea" rows="4" value={this.state.inputValue} onChange={this.onFormChange}/>
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
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar/></span></h5>
        </div>
      );
    } else if(this.props.result.closing_thoughts.review.length === 0) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar/></span></h5>
          <p className="notes-modal-description-section">Add a quick recap so you can remember what this book was all about.</p>
        </div>
      );
    }
    else {
      return (
          <div>
            <h5 className="notes-modal-description-section-header no-select">Book Summary<span className="button-bar"><EmptyBookSummaryButtonBar/></span></h5>
            <p className="notes-modal-description-section">Here is a book summary.</p>
            {/* <p className="notes-modal-description-section">This unusual school had old railroad cars for classrooms, and it was run by an extraordinary man-its founder and headmaster, Sosaku Kobayashi--who was a firm believer in freedom of expression and activity.In real life, the Totto-chan of the book has become one of Japan's most popular television personalities--Tetsuko Kuroyanagi.</p> */}
            {/* <br/> */}  
          </div> 
        );
      }
    }
    
}

