import React, { Component } from "react";
import "./Read.css";
import { FaSyncAlt } from "react-icons/fa";
import Results from "../components/Results.js"
import LargeCenteredModal from '../components/LargeCenteredModal'

export default class Reading extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      readList:[],

      largeModalShow: false,
      largeModalResult: null
    }
  }

  async componentWillMount() {
    setTimeout(async () => {
      await this.getBooks();
      this.sortBooks();
    }, 30)
  }

  // Get's book info for each book in read alreadylist, returns empty array if anything goes wrong
  // Updates state every 3 frames to reduce number of state changes (and signals doen loading) - set's cache at the end 
  async getBooks() {
    if(this.props.currentUser) {
      var initialReadList = this.props.currentUser["library"]["read_list"].reverse();
      if(initialReadList === null) {
        initialReadList = [];
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
          
          bookDetailList.push(bookDetails);
          bookList.push({...initialReadList[i], BookID:bookDetails.BookID, Authors:bookDetails.Authors, Description:bookDetails.Description, Image:bookDetails.Image, Title:bookDetails.Title, Subtitle:bookDetails.Subtitle})// ...bookDetails})  
        }
       
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

  sortBooks() {
    var readingCopy = [...this.state.readList]
    readingCopy.sort(this.compareValues("last_updated"))
    this.setState({readList: readingCopy, isLoading: false});
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
  }

  showLargeModal = result => {
    console.log(result);
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



  render() {

    return (
      <div >
        {this.state.isLoading  
          ? <div className="loading"> <FaSyncAlt className="spinning"/> Loading...</div> 
          : (this.state.readList.length === 0)  
          ? <div className="loaded">There are no books in your 'Reading' list.</div>
          : 
            <div>
              <Results refreshResults={this.replaceReading} removeResult={this.removeFromReading} results={this.state.readList} currentUser={this.props.currentUser} showAlertModal={this.props.showAlertModal} showLargeModal={this.showLargeModal} resultType="reading-now" />
              <LargeCenteredModal
                show={this.state.largeModalShow}
                onHide={this.closeLargeModal}
                result={this.state.largeModalResult}
                currentuser={this.props.currentUser}
              />
            </div>
        }
      </div>
    )
  }
}

