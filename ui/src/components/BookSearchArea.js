import React, { Component } from "react";
import LoaderButton from './LoaderButton';
import SearchBar from './SearchBar'
import "./BookSearchArea.css";

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
    console.log("SURPRISE!");



    this.setState({ surpriseIsLoading: false });
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
      
      try {
        const url = searchEndpoint + "?q=" + this.state.searchString;
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
        console.log(resJson)
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

