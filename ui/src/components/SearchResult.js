import React, { Component } from "react";
import Card from "react-bootstrap/Card"
import LinesEllipsis from 'react-lines-ellipsis'
import "./SearchResult.css";
import ReactHoverObserver from 'react-hover-observer';

// Serve this inside a col
export default class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHoveringDescription: false
    }
  }

  getAuthors = () => {
    return this.props.result.Authors.join(", ")
  }

  setHoveringDescription = () => {
    
    this.setState({isHoveringDescription: true})
  }
  unsetHoveringDescription = () => {
    this.setState({isHoveringDescription: false})
  }

  render() {
    const Description = ({ isHovering = false }) => {
      return (
        <div className="search-result-body">
          {/* First checks if there is a description (retruns phrase if not), then checks for 'expanded' field, then checks if hovering */}
          {
            this.props.result.Description === "" 
            ? "There is no description for this title - but hopefully you can judge this book by its cover." 
            : this.props.expanded 
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
  
    return (
      <Card className="search-result-outer">
        <Card.Body style={{paddingRight:".5rem", paddingLeft:".5rem"}}>
          <img className="search-result-cover" src={this.props.result.Image} alt={this.props.result.Title}  />
          <Card.Title  className="search-result-title">{this.props.result.Title}</Card.Title>
          <Card.Subtitle  className="search-result-author">{this.getAuthors()}</Card.Subtitle>
          
          <ReactHoverObserver hoverDelayInMs={600} hoverOffDelayInMs={200}>
            <Description></Description>
          </ReactHoverObserver>
        </Card.Body>
      </Card>
    )
  }

}