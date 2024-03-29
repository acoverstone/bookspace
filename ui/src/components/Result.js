import React, { Component } from "react";
import Card from "react-bootstrap/Card"
import LinesEllipsis from 'react-lines-ellipsis'
import "./Result.css";
import ReactHoverObserver from 'react-hover-observer';
import SearchButtonBar from "./SearchButtonBar";
import ToReadButtonBar from "./ToReadButtonBar";
import ReadAlreadyButtonBar from "./ReadAlreadyButtonBar";
import ReadingNowButtonBar from "./ReadingNowButtonBar";


// Serve this inside a col
export default class Result extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHoveringDescription: false
    }
  }

  getAuthors = () => {
    var authors = this.props.result["Authors"]
    if(authors == null || !Array.isArray(authors) || authors.length === 0){
      return "No Author Info"
    }
    return authors.join(", ")
  }

  setHoveringDescription = () => {
    this.setState({isHoveringDescription: true})
  }

  unsetHoveringDescription = () => {
    this.setState({isHoveringDescription: false})
  }

  getAmazonSearchString = () => {
    var queryString = this.props.result.Title.toLowerCase();
    var authorString = this.props.result.Authors.length > 0 ? this.props.result.Authors[0] : "";
    return "https://www.amazon.com/s?k=" + queryString + " " + authorString + "&i=stripbooks";
  }

  render() {
    // console.log(this.props.result);
    const Description = ({ isHovering = false }) => {
      return (
        <div className="result-body">
          {/* First checks if there is a description (retruns phrase if not), then checks for 'expanded' field, then checks if hovering */}
          {
            this.props.result.Description === "" 
            ? "There is no description for this title - but hopefully you can judge this book by its cover." 
            : false
            // : this.props.resultType !== "search" 
              ? this.props.result.Description
              : !isHovering ?
                <LinesEllipsis
                  text={this.props.result.Description}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='words'
                /> 
              : this.props.result.Description
          }
        </div>
      )
    }

    const ButtonBar = () => {
      if(this.props.resultType === "search") {
        return (<SearchButtonBar refreshResults={() => {}} showAlertModal={this.props.showAlertModal} currentUser={this.props.currentUser} result={this.props.result}/>);
      } 
      else if(this.props.resultType === "to-read") {
        return (<ToReadButtonBar refreshResults={() => {}} removeResult={this.props.removeResult} showAlertModal={this.props.showAlertModal} currentUser={this.props.currentUser} result={this.props.result}/>);
      }
      else if(this.props.resultType === "read-already") {
        return (<ReadAlreadyButtonBar refreshResults={this.props.refreshResults} removeResult={this.props.removeResult} showAlertModal={this.props.showAlertModal} showLargeModal={this.props.showLargeModal} currentUser={this.props.currentUser} result={this.props.result}/>);
      } else {
        return (<ReadingNowButtonBar refreshResults={this.props.refreshResults} removeResult={this.props.removeResult} showAlertModal={this.props.showAlertModal} showLargeModal={this.props.showLargeModal} currentUser={this.props.currentUser} result={this.props.result}/>);
      }
      
    }

    return (
      <Card className="result-outer">
        <Card.Body style={{paddingRight:".5rem", paddingLeft:".5rem"}}>

          <div className="button-bar">
            <ButtonBar />
          </div>
        
          <a href={this.getAmazonSearchString()} target="_blank" rel="noopener noreferrer">
            <img className="result-cover" src={this.props.result.Image} alt={this.props.result.Title}  />
            </a>
          <Card.Title  className="result-title">{this.props.result.Title}</Card.Title>
          <Card.Subtitle  className="result-author">{this.getAuthors()}</Card.Subtitle>
          
          <ReactHoverObserver hoverDelayInMs={600} hoverOffDelayInMs={200}>
            <Description></Description>
          </ReactHoverObserver>

        </Card.Body>
      </Card>
    )
  }

}