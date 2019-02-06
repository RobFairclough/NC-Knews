import React from 'react';
import { Link } from '@reach/router';

const UserCard = ({ user: { username, avatar_url, name } }) => (
  <li className="user-card">
    <Link to={`/users/${username}`}>
      <img
        className="user-avatar"
        alt={`${name}'s avatar`}
        src={
          avatar_url ||
          'http://atlas-content-cdn.pixelsquid.com/stock-images/brown-egg-lOwYmVA-600.jpg'
        }
      />
    </Link>
    <span>
      Username: {username} <br /> Name: {name}
    </span>
    <br />
  </li>
);
export default UserCard;
