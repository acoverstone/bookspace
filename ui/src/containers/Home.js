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
      // searchResults: [{"BookID":"I6iaDAAAQBAJ","Title":"Tools of Titans","Subtitle":"The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers","Authors":["Timothy Ferriss"],"PublishedDate":"","Description":"The guests range from super celebs (Jamie Foxx, Arnold Schwarzenegger, etc.) and athletes (icons of powerlifting, gymnastics, surfing, etc.) to legendary Special Operations commanders and black-market biochemists.","Categories":["Business \u0026 Economics"],"PageCount":736,"Rating":4.5,"Image":"http://books.google.com/books/content?id=I6iaDAAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"gjuvDAEACAAJ","Title":"Tools of Titans","Subtitle":"The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers","Authors":["Tim Ferriss"],"PublishedDate":"","Description":"Here, in the ultimate self-help book, he distills and tests the key insights from these elite athletes and adventurers, entrepreneurs and executives, creative thinkers, researchers, and more, to help readers learn to become healthy, wealthy, and wise.","Categories":["Business \u0026 Economics"],"PageCount":704,"Rating":4.5,"Image":"http://books.google.com/books/content?id=gjuvDAEACAAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"fjr3DAAAQBAJ","Title":"Tools of Titans","Subtitle":"The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers","Authors":["Timothy Ferriss"],"PublishedDate":"","Description":"The guests range from super celebs (Jamie Foxx, Arnold Schwarzenegger, etc.) and athletes (icons of powerlifting, gymnastics, surfing, etc.) to legendary Special Operations commanders and black-market biochemists.","Categories":["Education"],"PageCount":704,"Rating":4.5,"Image":"http://books.google.com/books/content?id=fjr3DAAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"xTk8DwAAQBAJ","Title":"Tribe of Mentors","Subtitle":"Short Life Advice from the Best in the World","Authors":["HOUGHTON MIFFLIN HARCOURT.","Timothy Ferriss"],"PublishedDate":"","Description":"and how you can use the lesson * Why TED curator Chris Anderson thinks \"pursue your passion\" is terrible advice * Why renowned designer Debbie Millman believes in therapy but not in work-life balance * How Yuval Noah Harari's Sapiens went from repeated rejections to global mega-bestseller * The new beliefs, behaviors, and habits that have most helped cryptocurrency icons (founders of Ethereum, Zcash, etc.) in the last five years * Why Arianna Huffington recommends that you regularly scramble apps on your phone * The \"bar complex\" exercise that keeps country star Tim McGraw young * Why bestselling author Steven Pressfield believes college students should drive trucks and become cowboys * Why comedian Patton Oswalt wishes at least one catastrophic failure on anyone in the arts * Astrophysicist Janna Levin's unique reframe that helps her see obstacles as opportunities * Why actor Ben Stiller likes to dunk his head in a bucket of ice in the morning * Why Dropbox co-founder Drew Houston's cheat sheet for his younger self would include a tennis ball, a circle, and the number 30,000.","Categories":["Business \u0026 Economics"],"PageCount":624,"Rating":4.5,"Image":"http://books.google.com/books/content?id=xTk8DwAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"-YVDDgAAQBAJ","Title":"Boundaries Updated and Expanded Edition","Subtitle":"When to Say Yes, How to Say No To Take Control of Your Life","Authors":["Henry Cloud","John Townsend"],"PublishedDate":"","Description":"Now updated and expanded for the digital age, this book continues to help millions of people around the world answer these tough questions: Can I set limits and still be a loving person?","Categories":["Religion"],"PageCount":352,"Rating":5,"Image":"http://books.google.com/books/content?id=-YVDDgAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"W1ymAHgSBRoC","Title":"The 4-hour Chef","Subtitle":"The Simple Path to Cooking Like a Pro, Learning Anything, and Living the Good Life","Authors":["Timothy Ferriss"],"PublishedDate":"","Description":"","Categories":["Cooking"],"PageCount":671,"Rating":4,"Image":"http://books.google.com/books/content?id=W1ymAHgSBRoC\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"yGw3_S-5100C","Title":"Think Twice","Subtitle":"Harnessing the Power of Counterintuition","Authors":["Michael J. Mauboussin"],"PublishedDate":"","Description":"Through vivid stories, the author presents memorable rules for avoiding each error and explains how to recognize when you should “think twice”—questioning your reasoning and adopting decision-making strategies that are far more effective, even if they seem counterintuitive.","Categories":["Business \u0026 Economics"],"PageCount":224,"Rating":5,"Image":"http://books.google.com/books/content?id=yGw3_S-5100C\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"5cskAgAAQBAJ","Title":"One Small Step Can Change Your Life","Subtitle":"The Kaizen Way","Authors":["Robert Maurer"],"PublishedDate":"","Description":"Rooted in the two-thousand-year-old wisdom of the Tao Te Ching—“The journey of a thousand miles begins with a single step”—here is the way to change your life without fear, without failure, and start on a new path of easy, continuous improvement.","Categories":["Self-Help"],"PageCount":228,"Rating":3.5,"Image":"http://books.google.com/books/content?id=5cskAgAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"r9Y6DwAAQBAJ","Title":"Twilight of the Titans","Subtitle":"Great Power Decline and Retrenchment","Authors":["Paul K. MacDonald","Joseph M. Parent"],"PublishedDate":"","Description":"Using case studies that include Great Britain in 1872 and 1908, Russia in 1888 and 1903, and France in 1893 and 1924, Twilight of the Titans offers clear evidence that declining powers have a wide array of options at their disposal and offers guidance on how to use the right tools at the right time.","Categories":["Political Science"],"PageCount":276,"Rating":0,"Image":"http://books.google.com/books/content?id=r9Y6DwAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"FcKGDwAAQBAJ","Title":"Touching the Rock","Subtitle":"An Experience of Blindness","Authors":["John M. Hull"],"PublishedDate":"","Description":"","Categories":["Biography \u0026 Autobiography"],"PageCount":218,"Rating":0,"Image":"http://books.google.com/books/content?id=FcKGDwAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"pPzyCAAAQBAJ","Title":"The Art of X-Ray Reading","Subtitle":"How the Secrets of 25 Great Works of Literature Will Improve Your Writing","Authors":["Roy Peter Clark"],"PublishedDate":"","Description":"In THE ART OF X-RAY READING, Clark invites you to don your X-ray reading glasses and join him on a guided tour through some of the most exquisite and masterful literary works of all time, from The Great Gatsby to Lolita to The Bluest Eye, and many more.","Categories":["Reference"],"PageCount":288,"Rating":5,"Image":"http://books.google.com/books/content?id=pPzyCAAAQBAJ\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"8PvaYZxLD-QC","Title":"Levels of the Game","Subtitle":"","Authors":["John McPhee"],"PublishedDate":"","Description":"This account of a tennis match played by Arthur Ashe against Clark Graebner at Forest Hills in 1968 begins with the ball rising into the air for the initial serve and ends with the final point.","Categories":["Sports \u0026 Recreation"],"PageCount":160,"Rating":4,"Image":"http://books.google.com/books/content?id=8PvaYZxLD-QC\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"1fw8b4F9nwMC","Title":"Crash of the Titans","Subtitle":"Greed, Hubris, the Fall of Merrill Lynch, and the Near-Collapse of Bank of America","Authors":["Greg Farrell"],"PublishedDate":"","Description":"Finally, we meet Bank of America CEO Ken Lewis, a street fighter raised barely above the poverty line in rural Georgia, whose “my way or the highway” management style suffers fools more easily than potential rivals, and who made a $50 billion commitment over a September weekend to buy a business he really didn’t understand, thus jeopardizing his own institution.","Categories":["Business \u0026 Economics"],"PageCount":512,"Rating":4,"Image":"http://books.google.com/books/content?id=1fw8b4F9nwMC\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false},{"BookID":"5Zw4q8bvQfMC","Title":"Buck Up, Suck Up . . . and Come Back When You Foul Up","Subtitle":"12 Winning Secrets from the War Room","Authors":["James Carville","Paul Begala"],"PublishedDate":"","Description":"","Categories":["Business \u0026 Economics"],"PageCount":224,"Rating":4.5,"Image":"http://books.google.com/books/content?id=5Zw4q8bvQfMC\u0026printsec=frontcover\u0026img=1\u0026zoom=1\u0026edge=curl\u0026source=gbs_api","Language":"en","EpubAvailable":false}]
     
      modalShow: false,
      modalTitle: "",
      modalDescription: ""
    };
  }

  setSearchResults = results => {
    this.setState({searchResults: results});
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
              <SearchArea setSearchResults={this.setSearchResults}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Results removeResult={()=>{}} results={this.state.searchResults} currentUser={this.props.currentUser} showAlertModal={this.showAlertModal} resultType="search" />
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
