import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import "./LargeCenteredModal.css";

export default class TermsAndPrivacyModal extends Component {


  getTerms = () => {
    return(
      <div>
        <h4><span id="notes-modal-title">Terms of Use</span><br/><span id="notes-modal-subtitle" style={{fontSize:"50%"}}>Last Updated: August 03, 2019</span></h4>      
        <br />
        <p className="notes-modal-description-section">Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the www.bookspace.app website (the "Service") operated by Bookspace ("us", "we", or "our").</p>
        <p className="notes-modal-description-section">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
        <p className="notes-modal-description-section">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. The Terms and Conditions agreement for Bookspace has been created with the help of <a href="https://www.freeprivacypolicy.com/free-terms-and-conditions-generator/">FreePrivacyPolicy.com Terms and Conditions Generator</a>.</p>

        <h5 className="notes-modal-description-section-subheader">Accounts</h5>
        <p className="notes-modal-description-section">When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
        <p className="notes-modal-description-section">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
        <p className="notes-modal-description-section">You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

        <h5 className="notes-modal-description-section-subheader">Links To Other Web Sites</h5>
        <p className="notes-modal-description-section">Our Service may contain links to third-party web sites or services that are not owned or controlled by Bookspace.</p>
        <p className="notes-modal-description-section">Bookspace has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Bookspace shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
        <p className="notes-modal-description-section">We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>

        <h5 className="notes-modal-description-section-subheader">Termination</h5>
        <p className="notes-modal-description-section">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        <p className="notes-modal-description-section">All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
        <p className="notes-modal-description-section">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        <p className="notes-modal-description-section">Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
        <p className="notes-modal-description-section">All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

        <h5 className="notes-modal-description-section-subheader">Governing Law</h5>
        <p className="notes-modal-description-section">These Terms shall be governed and construed in accordance with the laws of Florida, United States, without regard to its conflict of law provisions.</p>
        <p className="notes-modal-description-section">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>

        <h5 className="notes-modal-description-section-subheader">Changes</h5>
        <p className="notes-modal-description-section">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p className="notes-modal-description-section">By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>

        <h5 className="notes-modal-description-section-subheader">Contact Us</h5>
        <p className="notes-modal-description-section">If you have any questions about these Terms, please contact us: acoverst@gmail.com</p>
      </div>
    );
  }

  getPrivacyPolicy = () => {
    return(
      <div>
        <h4><span id="notes-modal-title">Privacy Policy</span><br/><span id="notes-modal-subtitle" style={{fontSize:"50%"}}>Effective Date: August 03, 2019</span></h4>
        <br />
        <p className="notes-modal-description-section">Bookspace ("us", "we", or "our") operates the www.bookspace.app website (the "Service").</p>
        <p className="notes-modal-description-section">This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy  for Bookspace is created with the help of the <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php">Free Privacy Policy Generator</a>.</p>
        <p className="notes-modal-description-section">We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from www.bookspace.app</p>

        <h5 className="notes-modal-description-section-subheader">Information Collection And Use</h5>
        <p className="notes-modal-description-section">We collect several different types of information for various purposes to provide and improve our Service to you.</p>

        <h5 className="notes-modal-description-section-subheader">Types of Data Collected</h5>
        <h5 className="notes-modal-description-section-subheader">Personal Data</h5>
        <p className="notes-modal-description-section">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
        <ul>
          <li className="notes-modal-description-section">Email address</li><li className="notes-modal-description-section">First name and last name</li><li className="notes-modal-description-section">Cookies and Usage Data</li>
        </ul>

        <h5 className="notes-modal-description-section-subheader">Usage Data</h5>
        <p className="notes-modal-description-section">We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

        <h5 className="notes-modal-description-section-subheader">Tracking & Cookies Data</h5>
        <p className="notes-modal-description-section">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
        <p className="notes-modal-description-section">Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
        <p className="notes-modal-description-section">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
        <p className="notes-modal-description-section">Examples of Cookies we use:</p>
        <ul>
            <li className="notes-modal-description-section"><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
            <li className="notes-modal-description-section"><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
            <li className="notes-modal-description-section"><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
        </ul>

        <h5 className="notes-modal-description-section-subheader">Use of Data</h5>
        <p className="notes-modal-description-section">Bookspace uses the collected data for various purposes:</p>    
        <ul>
            <li className="notes-modal-description-section">To provide and maintain the Service</li>
            <li className="notes-modal-description-section">To notify you about changes to our Service</li>
            <li className="notes-modal-description-section">To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li className="notes-modal-description-section">To provide customer care and support</li>
            <li className="notes-modal-description-section">To provide analysis or valuable information so that we can improve the Service</li>
            <li className="notes-modal-description-section">To monitor the usage of the Service</li>
            <li className="notes-modal-description-section">To detect, prevent and address technical issues</li>
        </ul>

        <h5 className="notes-modal-description-section-subheader">Transfer Of Data</h5>
        <p className="notes-modal-description-section">Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
        <p className="notes-modal-description-section">If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p>
        <p className="notes-modal-description-section">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
        <p className="notes-modal-description-section">Bookspace will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>

        <h5 className="notes-modal-description-section-subheader">Disclosure Of Data</h5>

        <h5 className="notes-modal-description-section-subheader">Legal Requirements</h5>
        <p className="notes-modal-description-section">Bookspace may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
            <li className="notes-modal-description-section">To comply with a legal obligation</li>
            <li className="notes-modal-description-section">To protect and defend the rights or property of Bookspace</li>
            <li className="notes-modal-description-section">To prevent or investigate possible wrongdoing in connection with the Service</li>
            <li className="notes-modal-description-section">To protect the personal safety of users of the Service or the public</li>
            <li className="notes-modal-description-section">To protect against legal liability</li>
        </ul>

        <h5 className="notes-modal-description-section-subheader">Security Of Data</h5>
        <p className="notes-modal-description-section">The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h5 className="notes-modal-description-section-subheader">Service Providers</h5>
        <p className="notes-modal-description-section">We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
        <p className="notes-modal-description-section">These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
        <p className="notes-modal-description-section">We utilize Google Books API for Book Information - any content submitted through the Books API, including your name or nicknames, may be made publicly available on Google services as described by the Books Privacy Policy at https://books.google.com/googlebooks/privacy.html </p>

        <h5 className="notes-modal-description-section-subheader">Links To Other Sites</h5>
        <p className="notes-modal-description-section">Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
        <p className="notes-modal-description-section">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

        <h5 className="notes-modal-description-section-subheader">Children's Privacy</h5>
        <p className="notes-modal-description-section">Our Service does not address anyone under the age of 18 ("Children").</p>
        <p className="notes-modal-description-section">We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

        <h5 className="notes-modal-description-section-subheader">Changes To This Privacy Policy</h5>
        <p className="notes-modal-description-section">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        <p className="notes-modal-description-section">We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
        <p className="notes-modal-description-section">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h5 className="notes-modal-description-section-subheader">Contact Us</h5>
        <p className="notes-modal-description-section">If you have any questions about this Privacy Policy, please contact us:</p>
        <p className="notes-modal-description-section">By email: acoverst@gmail.com</p>

      </div>
    );
  }

  render() {

    const ModalContent = this.props.modaltype === "terms" ? this.getTerms : this.getPrivacyPolicy;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="notes-modal"
      >
        <Modal.Body className="notes-modal-body">
          
          <ModalContent/>
          
          <div style={{textAlign:"center"}}>
            <Button onClick={this.props.onHide} className="notes-modal-button">Close</Button>
          </div>
          
        </Modal.Body>
      </Modal>
    );
  }
}