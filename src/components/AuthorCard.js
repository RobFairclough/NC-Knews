import React from 'react';
import './AuthorCard.css';

const AuthorCard = ({ username, avatar, name }) => {
  return (
    <div className="author-bio">
      <img src={avatar} alt="portrait of the author" className="author-img" />
      <div className="author-text">
        <span>{username}</span>
        <br />
        <i>{name}</i>
      </div>
    </div>
  );
};

export default AuthorCard;
