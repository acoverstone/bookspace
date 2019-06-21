import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import SearchResult from './SearchResult.js';
import "./Results.css";

export default class Results extends Component {

  render() {

    const searchResults = this.props.searchResults.map((item, key) =>
      <Col key={item.BookID}  xl={{span:6, offset:0}} lg={{span:10, offset:1}} xs={{span:12, offset:0}} className="search-result-col">
        <SearchResult result={item} currentUser={this.props.currentUser} showModal={this.props.showModal}></SearchResult>
      </Col>
    );  

    return (
      <div className="results-outer">
        <Container>
          <Row>
            { searchResults }
          </Row>
        </Container>
      </div> 
    )
  }

}