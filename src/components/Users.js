import React, { Component } from 'react';
import { fetchData } from '../api';
import UserCard from './UserCard';
import '../css//Users.css';
class Users extends Component {
  state = {
    users: ''
  };
  async componentDidMount() {
    const { users } = await fetchData('api/users');
    this.setState({ users });
  }
  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Users: </h2>
        <ul className="users-list">
          {users &&
            users.map(user => <UserCard key={user.username} user={user} />)}
        </ul>
      </div>
    );
  }
}

export default Users;
