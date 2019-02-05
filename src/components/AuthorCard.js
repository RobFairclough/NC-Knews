import React from 'react';
import { Link } from '@reach/router';
import './AuthorCard.css';

const AuthorCard = ({ username, avatar, name }) => {
  return (
    <Link to={`/users/${username}`}>
      <div className="author-bio">
        <img src={avatar} alt="portrait of the author" className="author-img" />
        <div className="author-text">
          <span>{username}</span>
          <br />
          <i>{name}</i>
        </div>
      </div>
    </Link>
  );
};

export default AuthorCard;
