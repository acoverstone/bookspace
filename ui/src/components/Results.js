import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchResult from './SearchResult.js';
import "./Results.css";

export default class Results extends Component {

  render() {

    const searchResults = this.props.searchResults.map((item, key) =>
      <Col key={item.BookID} lg={6} xs={12} className="search-result-col">
        <SearchResult result={item}></SearchResult>
      </Col>
    );  

    return (
      <div className="results-outer">
        {/* <p className="results-details">Search results for 'the goal': </p> */}
        <Container>
          <Row>
            { searchResults }
          </Row>
        </Container>
      </div> 
    )
  }

}