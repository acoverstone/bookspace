import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import LibraryOptions from '../components/LibraryOptions'
import SearchBar from '../components/SearchBar'
import "./Library.css";


export default class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchType: "title",        // options are "title", "author"
      searchString: "",

      selected:"reading-now"
    }
  }
  
  onEnter = e => {
    if(e.keyCode === 13){
      console.log('value', e.target.value);
    }
  }

  onSearchChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  } 

  searchTitle = () => {
    this.setState({searchType:"title"});
  }

  searchAuthor = () => {
    this.setState({searchType:"author"});
  }

  selectOption = selectedOption => {
    this.setState({selected: selectedOption})
  }

  render() {
    return (
      <Container>
        <div className="Library">
          <Row>
            <Col>
              <div className="lander">
              
                {(this.props.currentUser==null)
                  ? <h1>Sample Library</h1>
                  : <h1>Your Library</h1>
                }
                <LibraryOptions selected={this.state.selected} selectOption={this.selectOption} />
                {(this.props.currentUser==null)
                  ?  <p className="not-logged-in-msg no-select" ><span><a href="/login">Login</a></span> or <span href="/signup"><a href="/signup">Signup</a></span> to start your own Library.</p>
                  :  <p className="not-logged-in-msg no-select" ></p>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
              <SearchBar searchType={this.state.searchType} searchAuthor={this.searchAuthor} searchTitle={this.searchTitle} onInputChange={this.onSearchChange} onEnter={this.onEnter} autoFocus={false}/>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

}
