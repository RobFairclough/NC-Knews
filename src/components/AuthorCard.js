import React from 'react';
import { Link } from '@reach/router';
import '../css/AuthorCard.css';
import PropTypes from 'prop-types';

const AuthorCard = ({ username, avatar, name }) => (
  <Link to={`/users/${username}`}>
    <div className="author-bio">
      <img
        src={
          avatar
          || 'http://atlas-content-cdn.pixelsquid.com/stock-images/brown-egg-lOwYmVA-600.jpg'
        }
        alt="portrait of the author"
        className="author-img"
      />
      <div className="author-text">
        <span>{username}</span>
        <br />
        <i>{name}</i>
      </div>
    </div>
  </Link>
);
AuthorCard.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AuthorCard;
