import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {  FaStar } from 'react-icons/fa';
import "./ButtonBar.css";

// TODO: Refactor this lol
export default class NoteButtonBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stars:this.props.stars,
      hovering: -1
    }
  }

  setOneStars = () => {
    this.setState({stars:1});
  }
  setTwoStars = () => {
    this.setState({stars:2});
  }
  setThreeStars = () => {
    this.setState({stars:3});
  }
  setFourStars = () => {
    this.setState({stars:4});
  }
  setFiveStars = () => {
    this.setState({stars:5});
  }

  hoverOneStars = () => {
    this.setState({hovering:1});
  }
  hoverTwoStars = () => {
    this.setState({hovering:2});
  }
  hoverThreeStars = () => {
    this.setState({hovering:3});
  }
  hoverFourStars = () => {
    this.setState({hovering:4});
  }
  hoverFiveStars = () => {
    this.setState({hovering:5});
  }
  
  unHover = () => {
    this.setState({hovering:-1});
  }
  
  render() {

    return (
      <div className="five-star-button-bar">
        { this.state.hovering === 1 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.hovering === 2 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.hovering === 3 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.hovering === 4 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.hovering === 5 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.stars === 0 ?
          <ButtonGroup size="sm">
            <div><Button variant="unselected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup>
        : this.state.stars === 1 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.stars === 2 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.stars === 3 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        : this.state.stars === 4 ?
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="unselected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
        :
          <ButtonGroup size="sm">
            <div><Button variant="selected-star" starnumber="1" onClick={this.setOneStars} onMouseOver={this.hoverOneStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="2" onClick={this.setTwoStars} onMouseOver={this.hoverTwoStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="3" onClick={this.setThreeStars} onMouseOver={this.hoverThreeStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="4"  onClick={this.setFourStars} onMouseOver={this.hoverFourStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
            <div><Button variant="selected-star" starnumber="5" onClick={this.setFiveStars} onMouseOver={this.hoverFiveStars} onMouseLeave={this.unHover}><FaStar /></Button></div>
          </ButtonGroup> 
          
        }
        
      </div>
    );
  }
}