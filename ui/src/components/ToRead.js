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
    // TODO: remove timeout?
    setTimeout(() => {
      this.getBooks()
    }, 200)
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

      for (let i = 0; i < bookIdList.length; i++) {
        var book = this.props.getBookFromCache(bookIdList[i]);
        if(book === null) {
          book = await this.getBook(bookIdList[i])
          if(book == null) {
            continue;
          }
        }
        
        bookList.push(book);

        if(i % 3 === 0 || i === bookIdList - 1) {
          this.setState({toReadList: bookList, isLoading: false});
          this.props.doneLoading(); 
        }
      }

      this.props.addBooksToCache(bookList);
    } 
    
    this.setState({ isLoading: false });
    this.props.doneLoading(); 
  }

  // use in getBooks.... Be sure to handle null if error
  getBook = async bookID => {
    try {
      const res = await fetch("http://localhost:8000/api/books/" + bookID , {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      var resJson = await res.json();
      return resJson;
        
    } catch (e) {
      // TODO: gracefully handle a bad response...

      console.log(e.message);
      return null;
    }
  }

  // remove book from to-read list by bookID
  removeFromToRead = bookID => {
    var toReadCopy = [...this.state.toReadList]
    var index = -1;

    for (let i = 0; i < toReadCopy.length; i++) {
      if(toReadCopy[i]["BookID"] && toReadCopy[i]["BookID"] === bookID) {
        index = i
      } 
    }

    if(index !== -1) {
      toReadCopy.splice(index, 1);
      this.setState({toReadList:toReadCopy});
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
          <Results removeResult={this.removeFromToRead} results={this.state.toReadList} currentUser={this.props.currentUser} showModal={this.props.showModal} resultType="to-read" />
        } 
      </div>
    )
  }
}

