import React, { Component } from "react";
import LoaderButton from './LoaderButton';
import SearchBar from './SearchBar'
import { BookCache } from "../utils/BookCache.js";
import "./BookSearchArea.css";

const surpriseTypes = [
  "recommended",
  "popular"
]

export default class SearchArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Required by search bar
      searchType: "title",        // options are "title", "author"
      searchString: "",

      errorText:"",
      searchIsLoading: false,
      surpriseIsLoading: false,

      bookCache: new BookCache()
    };
  }

  onInputChange = event => {
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

  onEnter = e => {
    if(e.keyCode === 13){
      this.searchBooks();
    }
  }

  surpriseMe = async () => {
    this.setState({ surpriseIsLoading: true });

    const surpriseIndex = Math.floor((Math.random() * surpriseTypes.length));
    var res = await this.getSurpriseList(surpriseTypes[surpriseIndex]);

    if("books" in res && "surprise_type" in res) {
      var bookIdList = res["books"];
      var surpriseType = res["surprise_type"];
      
      this.setSurpriseBooks(bookIdList, surpriseType)
    } else {
      this.setState({ surpriseIsLoading: false, errorText:"Something went wrong getting your surprise, please try again." });
    }
    
  }

  getSurpriseList = async (surpriseType) => {
    try {
      const url = "http://localhost:8000/api/surprise/" + surpriseType;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if(!res.ok) {
        throw Error(res.statusText);
      }

      const resJson = await res.json();
      this.setState({ searchIsLoading: false, errorText:"" });
      return resJson;
    } catch (e) {
      // otherwise alert error
      console.log(e.message);
      this.setState({ surpriseIsLoading: false, errorText:"Something went wrong, please try again." });
    }
  }

  setSurpriseBooks = async (bookList, surpriseType) => {
    var books = []
    for(var i = 0; i < bookList.length; i++) {
      var bookDetails = await this.getBookDetails(bookList[i]);
      books.push(bookDetails);

      // keeps from taking so long to load the first time
      if(i % 3 === 0 || i === bookList.length - 1){
        this.props.setSurpriseResults(books, surpriseType);
        this.setState({ surpriseIsLoading: false });
      }
    }
    this.state.bookCache.addBooksToCache(books);
    return books;
  }

  // Tries to retreive book details from cache - if not present uses the API - if still not present returns null
  getBookDetails = async bookID => {
    // Try to retreive book from cache
    var book = this.state.bookCache.getBookFromCache(bookID);
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

  searchBooks = async () => {
    var searchEndpoint;
    if(this.state.searchType === "author") {
      searchEndpoint = "http://localhost:8000/api/authors";
    } else {
      searchEndpoint  = "http://localhost:8000/api/books";
    }
    
    if(this.searchEndpoint !== "" && this.state.searchString !== "") {

      this.setState({ searchIsLoading: true });

      const strippedSearchString = this.state.searchString.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      
      try {
        const url = searchEndpoint + "?q=" + strippedSearchString;
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
  
        if(!res.ok) {
          throw Error(res.statusText);
        }

        const resJson = await res.json();
        this.props.setSearchResults(resJson);

        this.setState({ searchIsLoading: false, errorText:"" });
      } catch (e) {
        // otherwise alert error
        console.log(e.message);
        this.setState({ searchIsLoading: false, errorText:"Something went wrong, please try again." });
      }
    } else {
      this.setState({ searchIsLoading: false, errorText:"Please enter a book title or author name." });
    }
  }


  render() {
    return (
      <div>
        <SearchBar searchType={this.state.searchType} searchAuthor={this.searchAuthor} searchTitle={this.searchTitle} onInputChange={this.onInputChange} onEnter={this.onEnter} autoFocus={true}/>
        <div className="search-buttons-outer" >
          <div className="search-buttons-inner">
            <LoaderButton
              className = "search-button"
              isLoading={this.state.surpriseIsLoading}
              text="Surprise Me"
              loadingText="Loading…"
              onClick={this.surpriseMe}
            />
            <LoaderButton
              className = "search-button"
              isLoading={this.state.searchIsLoading}
              text="Search Books"
              loadingText="Loading…"
              onClick={this.searchBooks}
            /> 
          </div>
        </div>
        <p className="error-text-login">{this.state.errorText}</p>
      </div> 
    )
  }
}

