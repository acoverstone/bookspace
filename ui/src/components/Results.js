import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import Result from './Result'
import "./Results.css"

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export default class Results extends Component {

  render() {
    var usedDay = false;
    var usedYesterday= false;
    var usedWeek = false;
    var usedMonth = false;
    var usedYear = false;
    var usedOver = false;

    var usedSurprise = false;

    const InfoBlock = props  => {
      if((this.props.resultType==="read-already" || this.props.resultType==="reading-now") && props.timestamp) {
        var dateDiffDays;
        try{
          const today = Date.now();
          const timestampDate = Date.parse(props.timestamp.substring(0,19));
          dateDiffDays = Math.floor( Math.abs(today - timestampDate) / _MS_PER_DAY);
        } catch (e) {
          return null;
        }

        if(dateDiffDays > 365 && !usedOver) {
          usedOver = true;
          return (<p className="timestamp no-select">Updated Over a Year Ago</p>);
        } 
        else if(dateDiffDays > 30 && !usedYear) {
          usedYear = true;
          return (<p className="timestamp no-select">Updated This Year</p>);
        } 
        else if(dateDiffDays > 7 && !usedMonth) {
          usedMonth = true;
          return (<p className="timestamp no-select">Updated This Month</p>);
        } 
        else if(dateDiffDays > 1 && !usedWeek) {
          usedWeek = true;
          return (<p className="timestamp no-select">Updated This Week</p>);
        } 
        else if(dateDiffDays === 1 && !usedYesterday) {
          usedYesterday = true;
          return (<p className="timestamp no-select">Updated Yesterday</p>);
        } 
        else if(dateDiffDays === 0 && !usedDay) {
          usedDay = true;
          return (<p className="timestamp no-select">Updated Today</p>);
        }
        else {
          return null;
        }
      } 
      else if(this.props.resultType==="search" && this.props.surpriseType && this.props.surpriseType !== "" && !usedSurprise ) {
        usedSurprise = true;
        return (<p className="timestamp no-select">{this.props.surpriseType}</p>);
      }
      else {
        return null;
      }
    }

    const results = this.props.results.map((item, key) =>
      <Col key={item.BookID}  xl={{span:8, offset:2}} lg={{span:10, offset:1}} xs={{span:12, offset:0}} className="search-result-col">
        <InfoBlock timestamp={item.last_updated}/>
        <Result refreshResults={this.props.refreshResults} removeResult={this.props.removeResult} result={item} currentUser={this.props.currentUser} showAlertModal={this.props.showAlertModal} showLargeModal={this.props.showLargeModal} resultType={this.props.resultType}></Result>
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