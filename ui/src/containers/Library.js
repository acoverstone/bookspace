import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import LibraryOptions from '../components/LibraryOptions'
import SearchBar from '../components/SearchBar'
import Reading from '../components/Reading'
import ToRead from '../components/ToRead'
import ReadAlready from '../components/ReadAlready'
import "./Library.css";


export default class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchType: "title",        // options are "title", "author"
      searchString: "",

      selected:"to-read",     // optins are "reading-now", "to-read", "read-already"
      isLoading:true
    }
  }
  
  async componentDidMount() {
    // TODO: Change this to when search for books finishes...
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000)
    
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
              <div className={!this.state.isLoading ? "lander has-results" : "lander"}>
              
                {(this.props.currentUser==null)
                  ? <h1>Sample Library</h1>
                  : <h1>Your Library</h1>
                }
                <LibraryOptions selected={this.state.selected} selectOption={this.selectOption} />
              
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
              <SearchBar searchType={this.state.searchType} searchAuthor={this.searchAuthor} searchTitle={this.searchTitle} onInputChange={this.onSearchChange} onEnter={this.onEnter} autoFocus={false}/>
              {(this.props.currentUser==null)
                  ?  <div><p className="not-logged-in-msg no-select" ><span><a href="/login">Login</a></span> or <span href="/signup"><a href="/signup">Signup</a></span> to start your own Library.</p></div>
                  :  <p className="not-logged-in-msg no-select" ></p>
                }
            </Col>
            
          </Row>
          <Row>
            <Col xs={{span:12}}  md={{span:10, offset:1}}>
              {(this.props.currentUser==null) ?
                <ToRead isLoading={this.state.isLoading} toReadList={[]}/> :
              (this.state.selected === "to-read") ?
                <ToRead isLoading={this.state.isLoading} toReadList={this.props.currentUser["library"]["to_read_list"]}/> :
              (this.state.selected === "read-already") ?
                <ReadAlready />
              :
              <Reading />
            }
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

}
