import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./Home.css";
import SearchArea from "../components/BookSearchArea.js"
import Results from "../components/Results.js"

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };
  }

  setSearchResults = results => {
    this.setState({searchResults: results});
  }

  render() {
    return (
      <Container>
        <div className="Home">
          <Row>
            <Col>
              <div className={this.state.searchResults.length > 0 ? "lander has-results" : "lander"}>
                <h1>Bookcase</h1>
                {(this.props.currentUser==null)
                  ? <p>A simple way to organize your reading.</p>
                  : <p>Welcome back {this.props.currentUser["first_name"]}, search for books below.</p>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
              <SearchArea setSearchResults={this.setSearchResults}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Results searchResults={this.state.searchResults}/>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
