import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import Result from './Result'
import "./Results.css"

export default class Results extends Component {

  render() {


    const results = this.props.results.map((item, key) =>
      <Col key={item.BookID}  xl={{span:6, offset:0}} lg={{span:10, offset:1}} xs={{span:12, offset:0}} className="search-result-col">
        <Result removeResult={this.props.removeResult} result={item} currentUser={this.props.currentUser} showModal={this.props.showModal} resultType={this.props.resultType}></Result>
      </Col>
    );  

    return (
      <div className="results-outer">
        <Container>
          <Row>
            { results }
          </Row>
        </Container>
        <br/>
      </div> 
    )
  }

}