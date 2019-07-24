import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";
import Results from "../components/Results.js"

export default class ToRead extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      toReadList:[]
    }
  }

  async componentWillMount() {
    setTimeout(() => {
      this.getBooks()
    }, 30)
  }

  // Get's book info for each book in to-read list, returns empty array if anything goes wrong
  // Updates state every 3/4 frames to reduce number of state changes (and signals doen loading) - set's cache at the end 
  async getBooks() {
    if(this.props.currentUser) {
      var bookIdList = this.props.currentUser["library"]["to_read_list"];
      if(bookIdList === null) {
        bookIdList = [];
      }

      var bookList = [];

      // Get details from Cache or API and add to list - skip if not available
      for (let i = 0; i < bookIdList.length; i++) {
        var book = await this.props.getBookDetails(bookIdList[i]);
        if(book === null) {
            continue;
        }
        
        bookList.push(book);

        // Set state after every three books or when all books have been loaded
        if(i % 3 === 0 || i === bookIdList - 1) {
          this.setState({toReadList: bookList, isLoading: false});
          this.props.doneLoading(); 
        }
      }

      // Add books to cache
      this.props.addBooksToCache(bookList);
    } 
    
    this.setState({ isLoading: false });
    this.props.doneLoading(); 
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
      <div >
        {this.state.isLoading ? 
          <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> :
        (this.state.toReadList.length === 0) ? 
          <div className="loaded">There are no books in your 'To-Read' list.</div>
          : 
          <Results removeResult={this.removeFromToRead} results={this.state.toReadList} currentUser={this.props.currentUser} showAlertModal={this.props.showAlertModal} resultType="to-read" />
        } 
      </div>
    )
  }
}

