import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./Home.css";
import SearchArea from "../components/BookSearchArea.js"
import Results from "../components/Results.js"
import SmallCenteredModal from '../components/SmallCenteredModal'


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],     
      modalShow: false,
      modalTitle: "",
      modalDescription: "",
      surpriseType: "",
    };
  }

  setSearchResults = results => {
    console.log(results);   // For seeing search results
    this.setState({searchResults: results, surpriseType:""});
  }

  setSurpriseResults = (results, surpriseType) => {
    this.setState({searchResults: results, surpriseType:surpriseType});
  }

  showAlertModal = (title, description) => {
    this.setState({
      modalShow: true,
      modalTitle: title,
      modalDescription: description
    })
  }

  closeModal = () => this.setState({ modalShow: false });

  render() {
    
    return (
      <Container>
        <div className="Home">
          <Row>
            <Col>
              <div className={this.state.searchResults.length > 0 ? "lander has-results" : "lander"}>
                <h1>Bookcase</h1>
                {(this.props.currentUser==null)
                  ? <p>A simple way to organize your reading.</p>
                  : <p>Welcome back {this.props.currentUser["first_name"]}, search for books below.</p>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{span:12}}  md={{span:8, offset:2}} lg={{span:6, offset:3}}>
              <SearchArea setSearchResults={this.setSearchResults} setSurpriseResults={this.setSurpriseResults}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Results removeResult={()=>{}} results={this.state.searchResults} currentUser={this.props.currentUser} showAlertModal={this.showAlertModal} resultType="search" surpriseType={this.state.surpriseType}/>
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
    );
  }
}
