import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import UserCard from './UserCard';
import '../css/Users.css';
// Implemented a useEffect React Hook for this component 
const Users = () => {
  const [userList, setUsers] = useState(null);
  const fetchUsers = async () => {
    const {users} = await fetchData('api/users');
    setUsers(users);
  }
  // empty array as second param defines variables on which the hook depends
  // ? https://www.robinwieruch.de/react-hooks-fetch-data/
  useEffect(() => {fetchUsers()}, [])
  return (
    <div>
        <h2>Users: </h2>
        <ul className="users-list">
          { userList &&  
            userList.map(user => <UserCard key={user.username} user={user} />)}
        </ul>
      </div>
  )
}

export default Users;
