import React, { Component } from "react";
import LoaderButton from './LoaderButton';
import SearchBar from './SearchBar'
import { BookCache } from "../utils/BookCache.js";
import "./BookSearchArea.css";

const surpriseTypes = [
  "recommended",
  "popular",
  "popular-author",
  "popular-author",   // two for increased chance in random generator
  "fiction",
  "science",
  "biography",
  "nonfiction",
  "sci-fi",
  "classic",
  "finance"
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
    const surprise = surpriseTypes[surpriseIndex];
    var res;
    if(surprise === "popular-author") {
      const author = this.getSurpriseAuthor();
      res = {
        "books": await this.getBooks("author", author),
        "surprise_type": "Popular Author: " + author
      }

      if(res["books"] === null) {
        this.setState({ surpriseIsLoading: false, errorText:"Something went wrong getting your surprise, please try again." });
      }
      else {
        this.props.setSurpriseResults(res["books"], res["surprise_type"]);
        this.setState({ surpriseIsLoading: false, errorText:"" });
      }
    } else {
      res = await this.getSurpriseList(surpriseTypes[surpriseIndex]);
    
      if(res && "books" in res && "surprise_type" in res) {
        var bookIdList = res["books"];
        var surpriseType = res["surprise_type"];
        
        this.setSurpriseBooks(bookIdList, surpriseType)
        this.setState({ surpriseIsLoading: false, errorText:"" });
      } else {
        this.setState({ surpriseIsLoading: false, errorText:"Something went wrong getting your surprise, please try again." });
      }
    }
      
  }
  
  getSurpriseAuthor = () => {
    const authors = [
      "J.K Rowling",
      "Tim Ferriss",
      "James Patterson",
      "Stephen King",
      "J.R.R. Tolkien",
      "Mark Twain",
      "Dr. Seuss",
      "Jack Kerouac",
      "Oscar Wilde",
      "Ernest Hemingway",
      "C.S Lewis",
      "Walt Whitman",
      "Robert Frost",
      "Yuval Noah Harari",
      "Tony Robbins",
      "Nicholas Taleb",
      "George Orwell",
      "Ayn Rand",
      "Robert Penn Warren",
      "John Steinbeck",
      "Aldous Huxley",
      "Paulo Coelho",
      "Mark Edwards",
      "Nora Roberts",
      "Brene Brown",
      "Agatha Christie"
    ]
    const authorIndex = Math.floor((Math.random() * authors.length));
    return authors[authorIndex];
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
      return resJson;
    } catch (e) {
      console.log(e.message);
      return null;
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
    if(this.state.searchString === "") {
      this.setState({ searchIsLoading: false, surpriseIsLoading: false, errorText:"Please enter a book title or author name." });
      return;
    }

    this.setState({ searchIsLoading: true });
    var res = await this.getBooks(this.state.searchType, this.state.searchString);

    if(res === null) {
      this.setState({ searchIsLoading: false, errorText:"Something went wrong, please try again." });
    } else if(res.length === 0) {
      this.setState({ searchIsLoading: false, errorText:"There were no results for search '" + this.state.searchString + "', please check your spelling or try another title."});
    } else {
      this.setState({ searchIsLoading: false, errorText:"" });
      this.props.setSearchResults(res);
    }
  }

  getBooks = async (searchType, searchString) => {
    var searchEndpoint;
    if(searchType === "author") {
      searchEndpoint = "http://localhost:8000/api/authors";
    } else {
      searchEndpoint  = "http://localhost:8000/api/books";
    }
    
    const strippedSearchString = searchString.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
    
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
      return resJson;
    } catch (e) {
      console.log(e.message);
      return null;
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

