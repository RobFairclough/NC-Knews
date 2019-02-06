import React from 'react';
import { Link } from '@reach/router';
import '../css/NotFound.css';

const NotFound = () => (
    <div className="notfound-container">
      <p>404 - page not found.</p>
      <Link to="/">Head home?</Link>
    </div>
  );


export default NotFound;
