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
            <p>
                {this.props.modaldescription}
            </p>
            <Button onClick={this.props.onHide} className="alert-modal-button">Close</Button>
          </Modal.Body>
        </Modal>
      );
    }
  }
  