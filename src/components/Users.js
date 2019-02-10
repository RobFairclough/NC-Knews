import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import UserCard from './UserCard';
import '../css/Users.css';
const Users = () => {
  const [userList, setUsers] = useState(null);
  const fetchUsers = async () => {
    const { users } = await fetchData('api/users');
    setUsers(users);
  };
  // ? https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users: </h2>
      <ul className="users-list">
        {userList ? (
          userList.map(user => <UserCard key={user.username} user={user} />)
        ) : (
          <p>Fetching users...</p>
        )}
      </ul>
    </div>
  );
};

export default Users;
