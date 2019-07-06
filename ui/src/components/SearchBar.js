import React, { Component } from "react";
import { FaBook, FaUser } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip'
import "./SearchBar.css";

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchFocus: false
    }
  }

  onFocus = () => {
    this.setState({searchFocus:true});
  }

  onBlur = () => {
    this.setState({searchFocus:false});
  }

  getClass = () => {
    if(this.state.searchFocus === true)
      return "search-outer search-active";
    else
      return "search-outer";
  }

  render() {
    var outerClass = this.getClass(); 
    return (
     
      <div className={outerClass}>
        <div className="search-mid">
          <div className="search-inner">
            <div className="search-text"></div>
              <input className="search-input" type="text" title="Search" autoCorrect="off" autoCapitalize="off"  autoComplete="off"
                    onFocus={this.onFocus} onBlur={this.onBlur} placeholder="Search by Title or Author" 
                    name="searchString" onChange={this.props.onInputChange} autoFocus={this.props.autoFocus} onKeyDown={this.props.onEnter}></input>
          </div>
          <div className="search-choice-outer">
            <div className="search-choice-inner">
              <FaUser className={this.props.searchType ==="author" ? "search-choice-active" : ""} data-tip data-for="byauthor" onClick={this.props.searchAuthor} />
            </div>
          </div>
          <ReactTooltip id='byauthor' className="tooltip-custom" effect='solid' >
            <span>Search By Author</span>
          </ReactTooltip>
          <div className="search-choice-outer">
            <div className="search-choice-inner">
              <FaBook className={this.props.searchType ==="title" ? "search-choice-active" : ""} data-tip data-for="bytitle" onClick={this.props.searchTitle} />
            </div>
          </div>
          <ReactTooltip id='bytitle' className="tooltip-custom" effect='solid' >
            <span>Search By Title</span>
          </ReactTooltip>
        </div>
      </div>
        
    )
  }
}


