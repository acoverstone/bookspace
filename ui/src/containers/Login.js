import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import TermsAndPrivacyModal from "../components/TermsAndPrivacyModal";
import { LinkContainer } from "react-router-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      errorText: "",

      termsAndPrivacyModalShow: false,
      modalType: "terms"                // options are "terms" or "privacy"
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {

      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      if(resJson["email"] !== "") {
        this.setState({ isLoading: false, errorText: "", email:"", password:"" });
        this.props.setCurrentUser(resJson);
        this.props.history.push("/");

      } else {
        this.setState({ isLoading: false, errorText: "Something went wrong, please try again." });
      }

      
    } catch (e) {
      // otherwise alert error
      // console.log(e.message);
      this.setState({ isLoading: false, errorText: "Incorrect email or passord, please try again." });
    }
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

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <p>Please enter your your email and password below.</p>
    
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" >
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <div className="login-button-outer">
            <LoaderButton
              className="login-button"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Loading…"
            />
          </div>
         
          <LinkContainer to="/signup">
            <p className="sign-up no-select">New to BookSpace? Click here to <b>Signup</b>!</p>
          </LinkContainer>
          <p className="error-text-login">{this.state.errorText}</p>
          <p className="footer"><span onClick={this.clickTerms}>Terms of Use</span> | <span onClick={this.clickPrivacy}>Privacy Policy</span></p>
        </form>
        <TermsAndPrivacyModal
          show={this.state.termsAndPrivacyModalShow}
          onHide={this.closeLargeModal}
          modaltype={this.state.modalType}
        />
      </div>
    );
  }
}