import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "./SmallCenteredModal.css";

export default class SmallCenteredModal extends Component {


  
  
  render() {
    
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="alert-modal"
      >
        <Modal.Body className="alert-modal-body">
          <h3>{this.props.modaltitle}</h3>
          {(this.props.modaldescription.includes("Login or Signup")) ?
            <p className="not-logged-in-msg-modal no-select">
              <span><a href="/login">Login</a></span> or <span><a href="/signup">Signup</a> {this.props.modaldescription.substring(16)}</span>
            </p>
            :
            <p>{this.props.modaldescription}</p>
          }
          <Button onClick={this.props.onHide} className="alert-modal-button">Close</Button>
        </Modal.Body>
      </Modal>
    );
  }
}  