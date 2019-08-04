import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";
import Results from "../components/Results.js"
import LargeCenteredModal from '../components/LargeCenteredModal'
import {Col} from 'react-bootstrap';
import SearchBar from '../components/SearchBar'
import { BOOKS_PER_PAGE } from "../containers/Library.js";


export default class Reading extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      readList:[],

      largeModalShow: false,
      largeModalResult: null,

      searchType: "title",        // options are "title", "author"
      searchString: "",

      loadedPage: 1
    }
  }

  componentWillMount() {
    this.getBooks();
  }
 

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
  

  // Get's book info for each book in read alreadylist, returns empty array if anything goes wrong
  // Updates state every 3 frames to reduce number of state changes (and signals doen loading) - set's cache at the end 
  async getBooks() {
    if(this.props.currentUser) {
      var initialReadList = this.sortBooks(this.getReadingNow()).slice(0, this.state.loadedPage * BOOKS_PER_PAGE);
      if(initialReadList === null || initialReadList.length === 0) {
        initialReadList = [];
        this.setState({isLoading: false});
      }

      var bookList = [];
      var bookDetailList = [];

      // Get details from Cache or API and add to list - skip if not available
      for (let i = 0; i < initialReadList.length; i++) {
        if(initialReadList[i]["reading_now"] === true) {
          var bookDetails = await this.props.getBookDetails(initialReadList[i]["id"]);
          if(bookDetails === null) {
              continue;
          }
          if(this.state.searchString === "" || (this.state.searchString !== "" && ((bookDetails.Title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1) || bookDetails.Authors.join("").toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1))) {
            bookDetailList.push(bookDetails);
            bookList.push({...initialReadList[i], BookID:bookDetails.BookID, Authors:bookDetails.Authors, Description:bookDetails.Description, Image:bookDetails.Image, Title:bookDetails.Title, Subtitle:bookDetails.Subtitle})// ...bookDetails})  
          }
        }
        if(i % 3 === 0 || i === initialReadList.length - 1) {
          await this.setState({readList: bookList, isLoading: false});
        }
      }
      

      // Add books to cache
      this.props.addBooksToCache(bookDetailList);
    } else {
      this.setState({isLoading: false});
    }
  }

  sortBooks(booklist) {
    if(booklist)
      return booklist.sort(this.compareValues("last_updated"));
    else return [];
  }

  getReadingNow() {
    var readingNow = [];
    for(var i = 0; i < this.props.currentUser["library"]["read_list"].length; i++) {
      if(this.props.currentUser["library"]["read_list"][i]["reading_now"] === true) {
        readingNow.push(this.props.currentUser["library"]["read_list"][i]);
      }
    }
    return readingNow;
  }


  compareValues(key, order='desc') {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
        let comparison = a[key].localeCompare(b[key]);
    
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
  }

  closeLargeModal = () => {
    this.setState({ largeModalShow: false });
    // BELOW IS A WEIRD FIX: Added to update Book Summary of a book in local copy of Library...
    if(this.props.currentUser) { 
      var readingListCopy = [...this.props.currentUser["library"]["read_list"]]
      var index = -1;

      for (let i = 0; i < readingListCopy.length; i++) {
        if(readingListCopy[i]["id"] === this.state.largeModalResult.id) {
          index = i
        } 
      }

      if(index !== -1) {
        readingListCopy[index] = this.state.largeModalResult;
        this.updateUserReadingCopy(readingListCopy);
      }
    }
  }

  showLargeModal = result => {
    this.setState({
      largeModalShow: true,
      largeModalResult: result
    })
  }

  updateUserReadingCopy = async readingCopy => {
    await this.props.setCurrentUser({
      ...this.props.currentUser,
      library: {
        ...this.props.currentUser.library,
        read_list: readingCopy
      }
    });
  }

  removeFromReading = async bookID => {
    if(this.props.currentUser) {
      // Remove from current user
      var readingListCopy = [...this.props.currentUser["library"]["read_list"]]
      var index = -1;

      for (let i = 0; i < readingListCopy.length; i++) {
        if(readingListCopy[i]["id"] === bookID) {
          index = i
        } 
      }

      if(index !== -1) {
        readingListCopy.splice(index, 1);
        await this.updateUserReadingCopy(readingListCopy);
        
      }
    }

    // Remove from current state
    var readingListCopyOuter = [...this.state.readList]
    var indexOuter = -1;

    for (let i = 0; i < readingListCopyOuter.length; i++) {
      if(readingListCopyOuter[i]["BookID"] && readingListCopyOuter[i]["BookID"] === bookID) {
        indexOuter = i
      } 
    }

    if(indexOuter !== -1) {
      readingListCopyOuter.splice(indexOuter, 1);
      this.setState({readList:readingListCopyOuter});
    }
  }

  replaceReading = async result => {
    if(this.props.currentUser) {
      // Remove from current user
      var readingListCopy = [...this.props.currentUser["library"]["read_list"]]
      var index = -1;

      for (let i = 0; i < readingListCopy.length; i++) {
        if(readingListCopy[i]["id"] === result.id) {
          index = i
        } 
      }

      if(index !== -1) {
        readingListCopy[index] = result;
       await  this.updateUserReadingCopy(readingListCopy);
        
      }
    }

    // Remove from current state
    var readingListCopyOuter = [...this.state.readList]
    var indexOuter = -1;

    for (let i = 0; i < readingListCopyOuter.length; i++) {
      if(readingListCopyOuter[i]["BookID"] && readingListCopyOuter[i]["BookID"] === result.id) {
        indexOuter = i
      } 
    }

    if(indexOuter !== -1) {
      readingListCopyOuter[indexOuter] = result;
      await this.setState({readList:readingListCopyOuter});
    }
    await this.getBooks();
  }

  increasePageCount = async () => {
    await this.setState({
      loadedPage:this.state.loadedPage + 1,
    })
    this.getBooks()
  }


  render() {

    return (
      <Col xs={{span:12}}  >
        <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
          <SearchBar searchType={this.state.searchType} searchAuthor={this.searchAuthor} searchTitle={this.searchTitle} onInputChange={this.onSearchChange} onEnter={this.onEnter} autoFocus={false}/>
          {(this.props.currentUser==null || this.props.currentUser["type"] === "sample_user")
              ?  <div><p className="not-logged-in-msg no-select" ><span><a href="/login">Login</a></span> or <span><a href="/signup">Signup</a></span> to start your own Library.</p></div>
              :  <p className="not-logged-in-msg no-select" ></p>
            }
        </Col>
        {this.state.isLoading  
          ? <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> 
          : (this.state.readList.length === 0 && this.state.searchString === "")  
          ? <div className="loaded">There are no books in your 'Reading' list.</div>
          : (this.state.readList.length === 0 && this.state.searchString !== "")  ? 
          <div className="loaded">
            <p>There are no books that match the search '{this.state.searchString}'.</p>
            <p className="clear-search" onClick={()=>{this.setState({searchString:" "});this.getBooks();}}>Clear Search</p>
          </div>
        : 
            <div>
              <Results refreshResults={this.replaceReading} removeResult={this.removeFromReading} results={this.state.readList} currentUser={this.props.currentUser} showAlertModal={this.props.showAlertModal} showLargeModal={this.showLargeModal} resultType="reading-now" />
              {
                (this.state.loadedPage * BOOKS_PER_PAGE) < this.getReadingNow().length 
                  ? <p className="load-more" onClick={this.increasePageCount}>Load More...</p> 
                  : <br /> 
              }
              <LargeCenteredModal
                show={this.state.largeModalShow}
                onHide={this.closeLargeModal}
                result={this.state.largeModalResult}
                currentuser={this.props.currentUser}
              />
            </div>
        }
      </Col>
    )
  }
}

