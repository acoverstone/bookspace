import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import LibraryOptions from '../components/LibraryOptions'
import Reading from '../components/Reading'
import ToRead from '../components/ToRead'
import ReadAlready from '../components/ReadAlready'
import SmallCenteredModal from '../components/SmallCenteredModal'
import "./Library.css";


export default class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {

      // TODO: CHANGE BACK
      // selected:"to-read",     // optins are "reading-now", "to-read", "read-already"
      selected:"read-already",

      smallModalShow: false,
      modalTitle: "",
      modalDescription: "",

      bookCache: this.getBookCache()
    }
  }

  // Get list of cached books
  getBookCache = () => {
    var bookCache = JSON.parse(localStorage.getItem("book_cache"));
    if(bookCache != null) {
      if(Array.isArray(bookCache)){
        return bookCache;
      } 
    }

    return [];
  }

  // Add books to cache if each doesn't already exist in cache...
  // TODO: can optimize by limiting cache to 100 books, loop around front if it fills up and don't have to check in list (makes On^2) or only set state on new book...
  addBooksToCache = books => {
    var bookCache = this.getBookCache();
    var count = 0;
    books.forEach(book => {
      if(!this.checkBookInList(book.BookID, bookCache)) {
        bookCache.push(book);
        count++;
      }
    });

    if(count > 0){
      localStorage.setItem("book_cache", JSON.stringify(bookCache));
      this.setState({bookCache: bookCache});
    }
  }

  // Returns book if it exists in cache or null otherwise
  getBookFromCache = bookID => {
    for(var i = 0; i < this.state.bookCache.length; i++) {
      if(this.state.bookCache[i].BookID === bookID) {
        return this.state.bookCache[i]
      }
    }
    return null;
  }

  checkBookInList = (bookID, books) => {
    for(var i = 0; i < books.length; i++) {
      if(books[i].BookID === bookID) {
        return true
      }
    }
    return false;
  }

  selectOption = selectedOption => {
    this.setState({selected: selectedOption})
  }

  showAlertModal = (title, description) => {
    this.setState({
      smallModalShow: true,
      modalTitle: title,
      modalDescription: description
    });
  }

  // Tries to retreive book details from cache - if not present uses the API - if still not present returns null
  getBookDetails = async bookID => {
    // Try to retreive book from cache
    var book = this.getBookFromCache(bookID);
    if(book != null) {
      return book;
    }

    // If not available, retreive from api
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
      console.log(e.message);
      return null;
    }
  }

  closeSmallModal = () => this.setState({ smallModalShow: false });

  render() {
    return (
      <Container>
        <div className="Library">
          <Row>
            <Col>
              <div className="lander has-results">
              
                {(this.props.currentUser==null)
                  ? <h1>Sample Library</h1>
                  : <h1>Your Library</h1>
                }
                <LibraryOptions selected={this.state.selected} selectOption={this.selectOption} />
              
              </div>
            </Col>
          </Row>
          <Row>
            {(this.props.currentUser==null) ?
              <div>Log in dummy.</div> :
            (this.state.selected === "to-read") ?
              <ToRead showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.addBooksToCache} getBookDetails={this.getBookDetails} /> :
            (this.state.selected === "read-already") ?
              <ReadAlready showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.addBooksToCache} getBookDetails={this.getBookDetails} />
            :
              <Reading showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.addBooksToCache} getBookDetails={this.getBookDetails}/>
            }
          </Row>
        </div>
        <SmallCenteredModal
            show={this.state.smallModalShow}
            onHide={this.closeSmallModal}
            modaltitle={this.state.modalTitle}
            modaldescription={this.state.modalDescription}
          />
      </Container>
    )
  }

}
