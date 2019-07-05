import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";
import Results from "../components/Results.js"

export default class ReadAlready extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      readList:[]
    }
  }

  async componentWillMount() {
    // TODO: remove timeout?
    setTimeout(async () => {
      await this.getBooks();
      console.log(this.state.readList);
    }, 50)
  }

  // Get's book info for each book in read alreadylist, returns empty array if anything goes wrong
  // Updates state every 3 frames to reduce number of state changes (and signals doen loading) - set's cache at the end 
  async getBooks() {
    if(this.props.currentUser) {
      var initialReadList = this.props.currentUser["library"]["read_list"];
      if(initialReadList === null) {
        initialReadList = [];
      }

      var bookList = [];
      var bookDetailList = [];

      // Get details from Cache or API and add to list - skip if not available
      for (let i = 0; i < initialReadList.length; i++) {
        var bookDetails = await this.props.getBookDetails(initialReadList[i]["id"]);
        if(bookDetails === null) {
            continue;
        }
        
        bookDetailList.push(bookDetails);
        bookList.push({...initialReadList[i], ...bookDetails})

        // Set state after every three books or when all books have been loaded
        if(i % 3 === 0 || i === initialReadList - 1) {
          this.setState({readList: bookList, isLoading: false});
          this.props.doneLoading(); 
        }
      }

      // Add books to cache
      this.props.addBooksToCache(bookDetailList);
    } 
    
    this.setState({ isLoading: false });
    this.props.doneLoading(); 
  }


   // remove book from Read Alreadylist by bookID
   removeFromReadAlready = bookID => {

    if(this.props.currentUser) {
      // Remove from current user
      var readAlreadyCopy = [...this.props.currentUser["library"]["read_list"]]
      var index = -1;

      for (let i = 0; i < readAlreadyCopy.length; i++) {
        if(readAlreadyCopy[i] === bookID) {
          index = i
        } 
      }

      if(index !== -1) {
        readAlreadyCopy.splice(index, 1);

        this.props.setCurrentUser({
          ...this.props.currentUser,
          library: {
            ...this.props.currentUser.library,
            read_list: readAlreadyCopy
          }
        });
      }
    }

    // Remove from current state
    var readAlreadyCopyOuter = [...this.state.readList]
    var indexOuter = -1;

    for (let i = 0; i < readAlreadyCopyOuter.length; i++) {
      if(readAlreadyCopyOuter[i]["BookID"] && readAlreadyCopyOuter[i]["BookID"] === bookID) {
        indexOuter = i
      } 
    }

    if(indexOuter !== -1) {
      readAlreadyCopyOuter.splice(indexOuter, 1);
      this.setState({readList:readAlreadyCopyOuter});
    }
  }




  render() {

    return (
      <div >
        {this.state.isLoading ? 
          <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> :
        (this.state.readList.length === 0) ? 
          <div className="loaded">There are no books in your 'Read Already' list.</div>
          : 
          <Results removeResult={this.removeFromReadAlready} results={this.state.readList} currentUser={this.props.currentUser} showModal={this.props.showModal} resultType="read-already" />
        }
      </div>
    )
  }
}


