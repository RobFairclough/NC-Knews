import React from 'react';

const UserCard = props => {
  const { username, avatar_url, name } = props.user;
  return (
    <li className="user-card">
      <img className="user-avatar" alt={`${name}'s avatar`} src={avatar_url} />
      <span>
        Username: {username} <br /> Name: {name}
      </span>
    </li>
  );
};

export default UserCard;
