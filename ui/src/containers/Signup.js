import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { LinkContainer } from "react-router-bootstrap";
import TermsAndPrivacyModal from "../components/TermsAndPrivacyModal";

import "./Signup.css";

const emailRegex = /\S+@\S+\.\S+/;
const nameRegex = /^[a-z0-9]+$/i

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null,
      errorText:"",

      termsAndPrivacyModalShow: false,
      modalType: "terms"                // options are "terms" or "privacy"
    };
  }

  validateForm() {
    return true;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickPrivacy = () => {
    this.setState({
      termsAndPrivacyModalShow:true,
      modalType: "privacy"
    });
  }

  clickTerms= () => {
    this.setState({
      termsAndPrivacyModalShow:true,
      modalType: "terms"
    });
  }

  closeLargeModal= () => {
    this.setState({
      termsAndPrivacyModalShow:false,
      modalType: "terms"
    })
  }


  handleSubmit = async event => {
    event.preventDefault();
    if(this.state.name.length <= 3 || !nameRegex.test(this.state.name) || this.state.name.length > 30) {
      this.setState({errorText: "Please enter an alphanumeric name longer than 3 characters.", isLoading: false });
      return;
    } else if(this.state.email.length <= 0 || !emailRegex.test(this.state.email) || this.state.email.length > 30) {
      this.setState({errorText: "Please enter a valid email.", isLoading: false });
      return;
    } else if(this.state.password.length < 6 || this.state.password !== this.state.confirmPassword || this.state.password.length > 30) {
      this.setState({errorText: "Please enter a password longer than 6 characters and ensure your passwords match.", isLoading: false });
      return;
    }


    
    this.setState({ isLoading: true });

    try {
      const res = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
      });

      if(!res.ok) {
        throw Error(res.status);
      }

      const resJson = await res.json();
      this.setState({ isLoading: false, errorText: "",name: "",email: "",password: "",confirmPassword: "", });
      this.props.setCurrentUser(resJson);
      this.props.history.push("/");
    
    } catch (error) {
      console.log(error.message);
      if(error.message === "422") {
        this.setState({errorText: "This email already exists in the database, please reset your password or choose another email.", isLoading: false });
      } else {
        this.setState({errorText: "Something went wrong, please try again later.", isLoading: false })
      }
    } 
  }


  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="name">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>

        <div className="signup-button-outer">
          <LoaderButton
          className="signup-button"
            block
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Loading…"
          />
        </div>
        <LinkContainer to="/signup">
          <p className="sign-up no-select">Forgot your password?</p>
        </LinkContainer>
        <p className="error-text-login">{this.state.errorText}</p>
        <p className="footer"><span onClick={this.clickTerms}>Terms of Use</span> | <span onClick={this.clickPrivacy}>Privacy Policy</span></p>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        <h1>Welcome!</h1>
        <p>Get started by setting up an account below.</p>
        {this.renderForm()}
        <TermsAndPrivacyModal
          show={this.state.termsAndPrivacyModalShow}
          onHide={this.closeLargeModal}
          modaltype={this.state.modalType}
        />
      </div>
    );
  }
}