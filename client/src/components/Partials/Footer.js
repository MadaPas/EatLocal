/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer content__column">
        <p className="footer__links">
          <a href="/contact">Contact Us</a>
          <a href="/apply">Join As a Member</a>
          <a href="/faq">FAQ</a>
        </p>
      </div>
      <div className="footer content__column">
        <p className="footer__links">
          Sponsored by Salt
          {' '}
          <a href="https://www.linkedin.com/company/applied-technology-stockholm/mycompany/"><FontAwesomeIcon icon={faLinkedin} /></a>
        </p>
        <p className="footer__policy">
          <a href="/#">
            Privacy Policy
          </a>
        </p>
      </div>
      <p className="footer__copyright">
        Copyright © 2021 Eat Local - All Rights Reserved.
      </p>
    </div>
  </footer>
);
export default Footer;
