import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import LibraryOptions from '../components/LibraryOptions'
import Reading from '../components/Reading'
import ToRead from '../components/ToRead'
import ReadAlready from '../components/ReadAlready'
import SmallCenteredModal from '../components/SmallCenteredModal'
import "./Library.css";
import { BookCache } from "../utils/BookCache.js";

export const BOOKS_PER_PAGE = 8;

export default class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected:"read-already", // optins are "reading-now", "to-read", "read-already"
      smallModalShow: false,
      modalTitle: "",
      modalDescription: "",

      bookCache: new BookCache()
    }
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
              <ToRead showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.state.bookCache.addBooksToCache} getBookDetails={this.getBookDetails} /> :
            (this.state.selected === "read-already") ?
              <ReadAlready showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.state.bookCache.addBooksToCache} getBookDetails={this.getBookDetails} />
            :
              <Reading showAlertModal={this.showAlertModal} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} addBooksToCache={this.state.bookCache.addBooksToCache} getBookDetails={this.getBookDetails}/>
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
