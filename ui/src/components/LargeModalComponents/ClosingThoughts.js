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

  addClosingThoughtApi = async (review, rating) => {
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

  submitClosingThought = async () => {
    if(await this.addClosingThoughtApi(this.state.inputValue, this.state.numberStars) === true) {
      this.props.result.closing_thoughts.review=this.state.inputValue
      this.props.result.closing_thoughts.rating=this.state.numberStars
      this.setState({editing:false, errorText:""});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error submitting your closing thoughts, please try again."});
    }
  }

  deleteClosingThought = async () => {
    if(await this.addClosingThoughtApi("", 0) === true) {
      this.props.result.closing_thoughts.review=""
      this.props.result.closing_thoughts.rating=0
      this.setState({inputValue:"", editing:false, numberStars:0, errorText:""});
      this.props.updateModalDescription();
    }
    else {
      this.setState({errorText:"There was an error deleting your closing thoughts, please try again."});
    }
  }


  setStars = stars => {
    this.setState({numberStars:stars});
  }
  
  render() {
    if(this.state.editing) {
      const rows = this.state.inputValue.length < 250 ? "4" : this.state.inputValue.length < 450 ? "6" : this.state.inputValue.length < 600 ? "8" : "12"
      return (
        <div>
          <h5 className="notes-modal-description-section-header no-select">Closing Thoughts<span className="button-bar"><EditClosingThoughtButtonBar cancelEditing={this.uneditForm}/></span></h5>
          <Form>
            <Form.Group controlId="closingThoughts" style={{marginBottom:"5px"}}>
              <Form.Control autoFocus className="form-control-test" size="lg" as="textarea" rows={rows} value={this.state.inputValue} onChange={this.onFormChange} placeholder="What did you think about this book? Would you read it again?"/>
            </Form.Group>
            
          </Form>
          <FiveStarButtonBar editing={this.state.editing} stars={this.props.result.closing_thoughts.rating} setStars={this.setStars}/>
          <div style={{textAlign:"center"}}>
            <Button onClick={this.submitClosingThought} className="notes-modal-button" >Submit</Button>
            <p className="error-text-notes">{this.state.errorText}</p>
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
          <p className="error-text-notes">{this.state.errorText}</p>
        </div>
      );
    }
  }
  

}

