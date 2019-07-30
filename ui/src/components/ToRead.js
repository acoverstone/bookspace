import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";
import Results from "../components/Results.js"
import {Col} from 'react-bootstrap';
import SearchBar from '../components/SearchBar'

export default class ToRead extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      toReadList:[],

      searchType: "title",        // options are "title", "author"
      searchString: "",
    }
  }

  componentWillMount() {
    this.getBooks();
  }

  // Check for press of Enter Key
  onEnter = e => {
    if(e.keyCode === 13){
      // console.log("ENTER")
    }
  }

  onSearchChange = async event => {
    await this.setState({
        [event.target.name]: event.target.value
    });
    this.getBooks();
  } 

  searchTitle = () => {
    this.setState({searchType:"title"});
  }

  searchAuthor = () => {
    this.setState({searchType:"author"});
  }

  // Get's book info for each book in to-read list, returns empty array if anything goes wrong
  // Updates state every 3/4 frames to reduce number of state changes (and signals doen loading) - set's cache at the end 
  async getBooks() {
    if(this.props.currentUser) {
      var bookIdList = this.props.currentUser["library"]["to_read_list"];
      if(bookIdList === null) {
        bookIdList = [];
        this.setState({isLoading: false});
      }

      var bookList = [];

      // Get details from Cache or API and add to list - skip if not available
      for (let i = 0; i < bookIdList.length; i++) {
        var book = await this.props.getBookDetails(bookIdList[i]);
        if(book === null) {
            continue;
        }

        if(this.state.searchString === "" || (this.state.searchString !== "" && ((book.Title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1) || book.Authors.join("").toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1))) {
          bookList.push(book);
        }

      }
      await this.setState({toReadList: bookList, isLoading: false});

      // Add books to cache
      this.props.addBooksToCache(bookList);
    } else {
      this.setState({isLoading: false});
    }

  }

  // remove book from to-read list by bookID
  removeFromToRead = bookID => {
    if(this.props.currentUser) {

      // Remove from current user
      var toReadCopy = [...this.props.currentUser["library"]["to_read_list"]]
      var index = -1;

      for (let i = 0; i < toReadCopy.length; i++) {
        if(toReadCopy[i] === bookID) {
          index = i
        } 
      }

      if(index !== -1) {
        toReadCopy.splice(index, 1);

        this.props.setCurrentUser({
          ...this.props.currentUser,
          library: {
            ...this.props.currentUser.library,
            to_read_list: toReadCopy
          }
        });
      }
    }

    // Remove from current state
    var toReadCopyOuter = [...this.state.toReadList]
    var indexOuter = -1;

    for (let i = 0; i < toReadCopyOuter.length; i++) {
      if(toReadCopyOuter[i]["BookID"] && toReadCopyOuter[i]["BookID"] === bookID) {
        indexOuter = i
      } 
    }

    if(indexOuter !== -1) {
      toReadCopyOuter.splice(indexOuter, 1);
      this.setState({toReadList:toReadCopyOuter});
    }
  }

  render() {

    return (
      <Col xs={{span:12}}  >
        <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
          <SearchBar searchType={this.state.searchType} searchAuthor={this.searchAuthor} searchTitle={this.searchTitle} onInputChange={this.onSearchChange} onEnter={this.onEnter} autoFocus={false}/>
          {(this.props.currentUser==null)
              ?  <div><p className="not-logged-in-msg no-select" ><span><a href="/login">Login</a></span> or <span><a href="/signup">Signup</a></span> to start your own Library.</p></div>
              :  <p className="not-logged-in-msg no-select" ></p>
            }
        </Col>
        {this.state.isLoading ? 
          <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> :
          (this.state.toReadList.length === 0 && this.state.searchString === "") ? 
            <div className="loaded">There are no books in your 'To-Read' list.</div>
          : (this.state.toReadList.length === 0 && this.state.searchString !== "") ? 
            <div className="loaded">
              <p>There are no books that match the search '{this.state.searchString}'.</p>
              <p >Clear Search</p>
            </div>
          : 
          <Results removeResult={this.removeFromToRead} results={this.state.toReadList} currentUser={this.props.currentUser} showAlertModal={this.props.showAlertModal} resultType="to-read" />
        } 
      </Col>
    )
  }
}

