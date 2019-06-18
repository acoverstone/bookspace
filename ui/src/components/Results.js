import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import SearchResult from './SearchResult.js';
import "./Results.css";

export default class Results extends Component {

  render() {

    const searchResults = this.props.searchResults.map((item, key) =>
      <Col key={item.BookID}  xl={{span:6, offset:0}} lg={{span:10, offset:1}} xs={{span:12, offset:0}} className="search-result-col">
        <SearchResult result={item}></SearchResult>
        {/* TODO: Add a component for a button bar - see scraps below */}

          {/* <div style={{textAlign: "center",  marginTop:"20px", color:"#777"}}>
            <span style={{fontSize:"25px", verticalAlign:"middle"}}><FaPlus/></span>
            <span style={{fontSize:"25px"}}>Read Now</span>
          </div> */}
          {/* <p style={{textAlign: "center", fontSize:"12px", marginTop:"20px", color:"#777"}}> <FaBookmark style={{fontSize:"130%", verticalAlign:"middle"}} /> Add to Library &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaBook style={{fontSize:"130%", verticalAlign:"middle"}}/> Save For Later</p> */}
          {/* <p style={{textAlign: "center", fontSize:"13px", cursor:"pointer", color:"#999"}}> Read Now | Add to Reading List </p> */}

          {/* <div className="search-result-buttons">
            <ButtonGroup size="sm">
              <Button variant="search-result"><FaBookmark />&nbsp;&nbsp;Read Later</Button>
              &nbsp; &nbsp;
              <Button variant="search-result"><FaBook />&nbsp;&nbsp;Add To Library</Button>
            </ButtonGroup>
          </div> */}

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