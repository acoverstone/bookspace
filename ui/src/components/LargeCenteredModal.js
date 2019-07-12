import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "./LargeCenteredModal.css";

export default class LargeCenteredModal extends Component {

  getAuthors = () => {
    var authors = this.props.result["Authors"]
    if(authors == null || !Array.isArray(authors) || authors.length === 0){
      return "No Author Info"
    }
    return authors.join(", ")
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="notes-modal"
      >
        <Modal.Body className="notes-modal-body">
          {(this.props.result !== null) ? 
            <div>
              <h4><span id="notes-modal-title">{this.props.result.Title}</span><br/><span id="notes-modal-subtitle">{this.getAuthors()}</span></h4>
              <p>
                Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
                unde commodi aspernatur enim, consectetur. Cumque deleniti
                temporibus ipsam atque a dolores quisquam quisquam adipisci
                possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
                quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
                Mollitia reiciendis porro quo magni incidunt dolore amet atque
                facilis ipsum deleniti rem!
              </p>
              <div style={{textAlign:"center"}}>
                <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
              </div>
            </div>
            :
            <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
  