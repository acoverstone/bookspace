import React, { Component } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { FaRegListAlt, FaBookmark, FaPlus } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
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

  addToRead = () => {
    if(this.props.currentUser !== null) {
      this.addToReadApi()
    } else {
      // TODO: popup for not authenticated
      console.log("Not authenticated.")
      this.props.showModal("Oops.", "Login or signup to add a book to your 'To-Read' List")
    }
    
  }

  addToReadApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/library/add-to-read", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.props.currentUser["id"],
          book_id: this.props.result.BookID,
        })
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      this.props.currentUser["library"]["to_read_list"].push(this.props.result.BookID)
      console.log(this.props.result.BookID + " pushed successfully.")
      // TODO: Add popup for added to To-Read list
      this.props.showModal("Done.", "'" + this.props.result.Title + "' has been added to your To-Read list.")
        
    } catch (e) {
      // TODO: popup for  alert error
      this.props.showModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
    }
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

    const ButtonBar = () => {
      return (
        <div className="search-button-bar">
          <ButtonGroup size="sm">
            <Button variant="search-result" data-tip data-for="toread" data-offset="{'bottom': 10}" onClick={this.addToRead} disabled={this.props.currentUser !== null ? this.props.currentUser["library"]["to_read_list"].includes(this.props.result.BookID) : false}><FaRegListAlt /></Button>
            <ReactTooltip id='toread' className="tooltip-custom" effect='solid' >
              <span>To-Read</span>
            </ReactTooltip>
            <Button variant="search-result" data-tip data-for="readalready" data-offset="{'bottom': 10}" ><FaBookmark /></Button>
            <ReactTooltip id='readalready' className="tooltip-custom" effect='solid' globalEventOff='click' >
              <span>Read Already</span>
            </ReactTooltip>
            <Button variant="search-result" data-tip data-for="reading" data-offset="{'bottom': 10}"><FaPlus /></Button>
            <ReactTooltip id='reading' className="tooltip-custom" effect='solid' >
              <span>Read Now</span>
            </ReactTooltip>
          </ButtonGroup>
        </div>
      );
    }

    return (
      <Card className="search-result-outer">
        <Card.Body style={{paddingRight:".5rem", paddingLeft:".5rem"}}>

          <ButtonBar />
        
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