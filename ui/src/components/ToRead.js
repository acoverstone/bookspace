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

  async componentDidMount() {
    // TODO: Change this to when search for books finishes...
    setTimeout(() => {
      this.getBooks()
    }, 1000)
  }

  getBooks = () => {
    if(this.props.currentUser) {
      this.props.currentUser["library"]["to_read_list"].forEach(element => {
        this.getBook(element)
      });
    } else {
      this.setState({ isLoading: false });
      this.props.doneLoading();
    }
  }


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
      console.log(resJson)
      this.setState({toReadList: this.state.toReadList.concat(resJson), isLoading: false})
      this.props.doneLoading();
        
    } catch (e) {
      // TODO: popup for  alert error
      // this.props.showModal("Oops.", "Something went wrong - please try again.")
      console.log(e.message);
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
          <Results results={this.state.toReadList} currentUser={this.props.currentUser} showModal={() => {}} resultType="to-read" />
        } 
      </div>
    )
  }
}

