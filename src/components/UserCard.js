import React from 'react';

const UserCard = ({ user }) => {
  const { username, avatar_url, name } = user;
  return (
    <li className="user-card">
      <a href={`/users/${username}`}>
        <img
          className="user-avatar"
          alt={`${name}'s avatar`}
          src={
            avatar_url ||
            'http://atlas-content-cdn.pixelsquid.com/stock-images/brown-egg-lOwYmVA-600.jpg'
          }
        />
      </a>
      <span>
        Username: {username} <br /> Name: {name}
      </span>
      <br />
    </li>
  );
};

export default UserCard;
