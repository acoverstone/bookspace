import React, { Component } from "react";
import Card from "react-bootstrap/Card"
// import Button from "react-bootstrap/Button"
// import ButtonGroup from "react-bootstrap/ButtonGroup"
import LinesEllipsis from 'react-lines-ellipsis'
import "./SearchResult.css";
import ReactHoverObserver from 'react-hover-observer';
// import { FaPlus, FaBook, FaBookmark } from "react-icons/fa";

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
          {
            this.props.result.Description === "" 
            ? "There is no description for this title - but hopefully you can judge this book by its cover." 
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
      <div>
      <Card className="search-result-outer">
        
        <Card.Body style={{paddingRight:".5rem", paddingLeft:".5rem"}}>
          <img className="search-result-cover" src={this.props.result.Image} alt={this.props.result.Title}  />
          <Card.Title  className="search-result-title">{this.props.result.Title}</Card.Title>
          <Card.Subtitle  className="search-result-author">{this.getAuthors()}</Card.Subtitle>
          
          <ReactHoverObserver hoverDelayInMs={600} hoverOffDelayInMs={200}>
            <Description></Description>
          </ReactHoverObserver>

          {/* <div style={{textAlign: "center",  marginTop:"20px", color:"#777"}}>
            <span style={{fontSize:"25px", verticalAlign:"middle"}}><FaPlus/></span>
            <span style={{fontSize:"25px"}}>Read Now</span>
          </div> */}
          {/* <p style={{textAlign: "center", fontSize:"12px", marginTop:"20px", color:"#777"}}> <FaBookmark style={{fontSize:"130%", verticalAlign:"middle"}} /> Add to Library &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaBook style={{fontSize:"130%", verticalAlign:"middle"}}/> Save For Later</p> */}
          <p style={{textAlign: "center", fontSize:"13px", marginTop:"20px", cursor:"pointer", color:"#999"}}> Read Now | Add to Reading List </p>

          {/* <div className="search-result-buttons">
          <ButtonGroup size="sm">
            <Button variant="search-result"><FaBookmark />&nbsp;&nbsp;Read Later</Button>
            &nbsp; &nbsp;
            <Button variant="search-result"><FaBook />&nbsp;&nbsp;Add To Library</Button>
          </ButtonGroup>
          </div> */}

        </Card.Body>
      </Card>
      </div>
    )
  }

}