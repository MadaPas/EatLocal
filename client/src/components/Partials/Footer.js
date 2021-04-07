/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin, faFacebook, faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container__one">
      <div className="footer__links__container">
        <h6 className="foote__title">Quick Links</h6>
        <ul className="footer-links">
          <li><a className="footer__q-links" href="/contact">Contact Us</a></li>
          <li><a className="footer__q-links" href="/apply">Join As a Member</a></li>
          <li><a className="footer__q-links" href="/#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer__container__two">
        <h6 className="foote__title">
          Sponsored by Salt
          {' '}
          <a href="https://www.linkedin.com/company/applied-technology-stockholm/mycompany/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
        </h6>
      </div>
    </div>
    <hr />
    <div className="footer__container__three">
      <div className="row">
        <div className="col-md-8 col-sm-6 col-xs-12">
          <p className="copyright-text footer__copyright">
            Copyright &copy; 2021 All Rights Reserved by
            {' '}
            <a href="#">Mobsters-4-Justice</a>
            .
          </p>
        </div>

        <div className="footer_socials">
          <ul className="social__icons">
            <li><a className="facebook" href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
            <li><a className="twitter" href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a className="linkedin" href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
