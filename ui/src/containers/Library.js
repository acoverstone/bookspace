import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import LibraryOptions from '../components/LibraryOptions'
import SearchBar from '../components/SearchBar'
import Reading from '../components/Reading'
import ToRead from '../components/ToRead'
import ReadAlready from '../components/ReadAlready'
import SmallCenteredModal from '../components/SmallCenteredModal'
import "./Library.css";


export default class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchType: "title",        // options are "title", "author"
      searchString: "",

      selected:"to-read",     // optins are "reading-now", "to-read", "read-already"
      hasResults:false,

      modalShow: false,
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
  addBooksToCache = books => {
    var bookCache = this.getBookCache();

    books.forEach(book => {
      if(!this.checkBookInList(book.BookID, bookCache)) {
        bookCache.push(book);
      }
    });

    localStorage.setItem("book_cache", JSON.stringify(bookCache));
    this.setState({bookCache: bookCache});
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

  
  // Moves "Your Library " to the top of the page by setting hasResults to True
  doneLoading = () => {
    this.setState({hasResults:true})
  }

  // Check for press of Enter Key
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

  showAlertModal = (title, description) => {
    this.setState({
      modalShow: true,
      modalTitle: title,
      modalDescription: description
    })
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
      // TODO: gracefully handle a bad response...
      console.log(e.message);
      return null;
    }
  }

  closeModal = () => this.setState({ modalShow: false });

  render() {
    return (
      <Container>
        <div className="Library">
          <Row>
            <Col>
              <div className={this.state.hasResults ? "lander has-results" : "lander"}>
              
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
            <Col xs={{span:12}}>
              {(this.props.currentUser==null) ?
                <div>Log in dummy.</div> :
              (this.state.selected === "to-read") ?
                <ToRead showAlertModal={this.showAlertModal} doneLoading={this.doneLoading} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.addBooksToCache} getBookDetails={this.getBookDetails} /> :
              (this.state.selected === "read-already") ?
                <ReadAlready showAlertModal={this.showAlertModal} doneLoading={this.doneLoading} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.addBooksToCache} getBookDetails={this.getBookDetails} />
              :
              <Reading />
            }
            </Col>
          </Row>
        </div>
        <SmallCenteredModal
            show={this.state.modalShow}
            onHide={this.closeModal}
            modaltitle={this.state.modalTitle}
            modaldescription={this.state.modalDescription}
          />
      </Container>
    )
  }

}
