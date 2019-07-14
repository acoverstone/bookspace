import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FiveStarButtonBar from "./FiveStarButtonBar";
import EmptyClosingThoughtsButtonBar from "./EmptyClosingThoughtsButtonBar";
import EditClosingThoughtButtonBar from "./EditClosingThoughtsButtonBar";
import NotEmptyClosingThoughtsButtonBar from "./NotEmptyClosingThoughtsButtonBar";

// Takes params empty, allEmpty, editing, result
export default class ClosingThoughts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue:this.props.result.closing_thoughts.review,
      editing:false,
      numberStars:this.props.result.closing_thoughts.rating,
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

  addClosingThoughtApi = async (review, rating) => {
    console.log(JSON.stringify({
      user_id: this.props.currentuser["id"],
      book_id: this.props.result.BookID,
      review: this.state.inputValue,
      rating: this.state.numberStars
  }))
    try {
      const res = await fetch("http://localhost:8000/api/library/add-closing-thoughts", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: this.props.currentuser["id"],
            book_id: this.props.result.BookID,
            review: review,
            rating: rating
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      return true;
    } catch (e) {
      // TODO: Add error message if this fails
      console.log(e.message);
      return false;
    }
  }

  submitClosingThought = () => {
    if(this.addClosingThoughtApi(this.state.inputValue, this.state.numberStars)) {
      this.props.result.closing_thoughts.review=this.state.inputValue
      this.props.result.closing_thoughts.rating=this.state.numberStars
      this.setState({editing:false});
    }
    else {
      console.log("Failure submitting closing thought.");
    }
  }

  deleteClosingThought = () => {
    if(this.addClosingThoughtApi("", 0)) {
      this.props.result.closing_thoughts.review=""
      this.props.result.closing_thoughts.rating=0
      this.setState({inputValue:"", editing:false, numberStars:0});
    }
    else {
      console.log("Failure deleting closing thought.");
    }
  }

  setStars = stars => {
    this.setState({numberStars:stars});
  }
  
  render() {
    if(this.state.editing) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><EditClosingThoughtButtonBar cancelEditing={this.uneditForm}/></span></h5>
          <Form>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Control autoFocus className="form-control-test" size="lg" as="textarea" rows="4" value={this.state.inputValue} onChange={this.onFormChange}/>
            </Form.Group>
            
          </Form>
          <FiveStarButtonBar editing={this.state.editing} stars={this.props.result.closing_thoughts.rating} setStars={this.setStars}/>
          <div style={{textAlign:"center"}}>
            <Button onClick={this.submitClosingThought} className="notes-modal-button" >Submit</Button>
          </div>
          
        </div>
      );
    } 
    else if(this.props.justHeader) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><EmptyClosingThoughtsButtonBar editClosingThoughts={this.editForm}/></span></h5>
        </div>
      );
    } 
    else if(this.props.result.closing_thoughts.review.length === 0) {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><EmptyClosingThoughtsButtonBar editClosingThoughts={this.editForm}/></span></h5>
          <p className="notes-modal-description-section">Jot down some closing thoughts and rate this book out of 5 stars.</p>
        </div>
      );
    }
    else {
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><NotEmptyClosingThoughtsButtonBar  deleteClosingThought={this.deleteClosingThought}  editClosingThoughts={this.editForm}/></span></h5>
          <p className="notes-modal-description-section" style={{marginBottom:"0px"}}>{this.props.result.closing_thoughts.review}</p>
          <FiveStarButtonBar editing={this.state.editing} stars={this.props.result.closing_thoughts.rating} setStars={this.setStars}/>
        </div>
      );
    }
  }
  

}

