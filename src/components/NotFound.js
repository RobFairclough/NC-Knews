import React from 'react';
import { Link } from '@reach/router';
import '../css/NotFound.css';

const NotFound = () => (
  <div className="notfound-container">
    <p>404 - page not found.</p>
    <Link to="/">Head home?</Link>
    <br />
    <img
      className="notfound-sun"
      alt="sun"
      src="http://pngimg.com/uploads/sun/sun_PNG13449.png"
    />
    <img
      className="notfound-beach"
      alt="desert island"
      src="http://www.pngmart.com/files/4/Island-PNG-Transparent-Image.png"
    />
    <img
      className="notfound-ocean"
      alt="sea"
      src="http://www.myfreephotoshop.com/wp-content/uploads/2014/08/261.jpg"
    />
  </div>
);

export default NotFound;
