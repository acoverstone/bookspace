import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";

import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      currentUser: null,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
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
        console.log(this.state.currentUser)
      } else {
        console.log("No current user.")
      }
    }
    catch(error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }
  
  isUserAuthenticated = () => {
    return this.state.currentUser == null;
  }

  setCurrentUser = (user) => {
    this.setState({currentUser:user});
  }

  deleteCurrentUser = () => {
    this.setState({currentUser:null});
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
      alert("Logout successful.");
      this.props.history.push("/");
     
    }
    catch(error) {
      console.log(error);
      alert("Logout Not successful, pelase try again.");
      this.props.history.push("/");
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
        {/* <Navbar bg="light" expand="sm"> */}
        <Navbar bg="light"  variant="light">
          <Navbar.Brand className="navbar-brand" href="/">Bookcase</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="ml-auto right-nav no-select">
              <Nav.Link href="/library" className="library-button">Library</Nav.Link>
              {(this.state.currentUser!=null) ? 
                <Nav.Link href="#" onClick={this.handleLogout}>Logout</Nav.Link> :
                <Nav.Link href="/login">Login</Nav.Link>
              }

              {/* {(this.state.currentUser!=null)
                  ? <NavItem  onClick={this.handleLogout}>Logout</NavItem>
                  : <Fragment >
                      <LinkContainer to="/login" activeClassName="">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                } */}
            </Nav>
          {/* </Navbar.Collapse> */}
    
        </Navbar>
        <Routes childProps={childProps}/>
      </div>
    );
  }
}



export default withRouter(App);