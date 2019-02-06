import React, { Component } from 'react';
import '../css//Registration.css';
import { postData } from '../api';

class Registration extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    avatar_url: '',
    registered: false,
    err: ''
  };
  handleChange = (criteria, { target: { value } }) => {
    this.setState({ [criteria]: value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const {
      username,
      name,
      password,
      confirmPassword,
      avatar_url
    } = this.state;
    if (password !== confirmPassword) console.log('passwords dont match');
    else {
      const body = { username, name, password };
      if (avatar_url) body.avatar_url = avatar_url;
      const data = await postData('api/users', body);
      if (data.new_user) this.setState({ registered: 'true' });
      else {
        const errCode = data.response.status;
        console.log(errCode);
        if (+errCode === 422) this.setState({ err: 'Username already taken' });
      }
    }
  };
  render() {
    const {
      username,
      name,
      password,
      confirmPassword,
      avatar_url,
      registered,
      err
    } = this.state;
    return (
      <div className="registration-container">
        <h2 className="registration-heading">Sign up</h2>
        <span className="close-button" onClick={this.props.handleShowRegister}>
          X
        </span>
        {registered && (
          <p>
            You're all signed up! You can now log in with your username and
            password.
          </p>
        )}
        {!registered && (
          <form
            className="registration-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <label htmlFor="username">Username </label>
            <input
              value={username}
              type="text"
              onChange={e => this.handleChange('username', e)}
              required
            />
            <label htmlFor="name">Name </label>
            <input
              value={name}
              type="text"
              onChange={e => this.handleChange('name', e)}
              required
            />
            <label htmlFor="password">Password </label>
            <input
              value={password}
              type="password"
              onChange={e => this.handleChange('password', e)}
              required
            />
            <label htmlFor="password">Confirm Password </label>
            <input
              value={confirmPassword}
              type="password"
              onChange={e => this.handleChange('confirmPassword', e)}
              required
            />
            <label htmlFor="avatar_url">
              Avatar URL (optional, image upload not supported)
            </label>
            <input
              value={avatar_url}
              type="url"
              onChange={e => this.handleChange('avatar_url', e)}
            />
            <button type="submit">Register your account</button>
            {err && <span className="error-text">{err}</span>}
          </form>
        )}
      </div>
    );
  }
}

export default Registration;
