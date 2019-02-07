import React from 'react';
import { Link } from '@reach/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Footer.css';
library.add(fab);
const Footer = props => (
  <footer className="footer">
    <ul className="ext-link-list">
      <li>
        Back end:
        <Link
          to="https://github.com/robfairclough/NC-News"
          className="ext-link-text"
        >
          <FontAwesomeIcon icon={['fab', 'github']} />
        </Link>
        {'  '}
        <Link
          to="https://ncknewsrob.herokuapp.com/api"
          className="ext-link-text"
        >
          API
        </Link>
      </li>
      <li>
        <Link className="ext-link-text" to="https://github.com/robfairclough" />
      </li>
      <li>
        Front end:
        <Link
          to="https://github.com/robfairclough/NC-Knews"
          className="ext-link-text"
        >
          <FontAwesomeIcon icon={['fab', 'github']} />
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
