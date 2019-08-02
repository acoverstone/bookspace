import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import SmallCenteredModal from './components/SmallCenteredModal'


import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      currentUser: null,
      isAuthenticating: true,
      headerTriggered: false,
      modalShow: false
    };

  }

  async componentWillMount() {
    try {
      window.addEventListener('scroll', this.handleScroll);
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'GET',
        credentials: 'include'
      });
      
      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      if(resJson["email"] !== "") {
        this.setCurrentUser(resJson)
        // console.log(this.state.currentUser)
      } else {
        // console.log("No current user.")
      }
    }
    catch(error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  isUserAuthenticated = () => {
    return this.state.currentUser == null;
  }

  setCurrentUser = (user) => {
    this.setState({currentUser:user});
  }

  deleteCurrentUser = () => {
    this.setState({currentUser:null});
  }

  showLogoutModal = () => {
    this.setState({
      modalShow: true
    })
  }

  handleLogout = async event => {
    try {
      const res = await fetch('http://localhost:8000/api/logout', {
        method: 'GET',
        credentials: 'include'
      });
      
      if(!res.ok) {
        throw Error(res.statusText);
      }

      this.deleteCurrentUser();
      this.showLogoutModal()
      this.props.history.push("/");
     
    }
    catch(error) {
      console.log(error);
      alert("Logout Not successful, pelase try again.");
      this.props.history.push("/");
    }
  }

  closeModal = () => {
    this.setState({ modalShow: false });
  };

  handleScroll = event => {
 
    if(window.scrollY > 20 && !this.state.headerTriggered) {
      
      this.setState({headerTriggered: true});
    } else if(window.scrollY <= 20 && this.state.headerTriggered) {
      
      this.setState({headerTriggered: false});
    }
  }
  
  render() {

    const childProps = {
      currentUser: this.state.currentUser,
      isUserAuthenticated: this.isUserAuthenticated,
      setCurrentUser: this.setCurrentUser,
      deleteCurrentUser: this.deleteCurrentUser,
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar className={this.state.headerTriggered ? "nav-shadow" : ""} fixed="top">
          <Navbar.Brand className="navbar-brand" href="/">Bookcase</Navbar.Brand>
            <Nav className="ml-auto right-nav no-select">
              {(this.props.location.pathname === "/")  
                ? <Nav.Link href="/library" className="library-button">Library</Nav.Link> 
                : <Nav.Link href="/" className="library-button">Search</Nav.Link>
              }
              
              {(this.state.currentUser!=null) ? 
                <Nav.Link href="#" onClick={this.handleLogout}>Logout</Nav.Link> :
                <Nav.Link href="/login">Login</Nav.Link>
              }
            </Nav>
        </Navbar>
        <Routes childProps={childProps} />
        <SmallCenteredModal
            show={this.state.modalShow}
            onHide={this.closeModal}
            modaltitle="Logout Successful."
            modaldescription="See you again soon!"
          />
      </div>
    );
  }
}



export default withRouter(App);