import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Registration.css';
import { postData } from '../api';
import { passwordScore } from '../utils';
class Registration extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    avatar_url: '',
    registered: false,
    err: '',
    passwordStrength: 0
  };
  handleChange = (criteria, { target: { value } }) =>
    this.setState({ [criteria]: value });

  handleSubmit = async e => {
    e.preventDefault();
    const {
      username,
      name,
      password,
      confirmPassword,
      avatar_url
    } = this.state;
    //! validate
    const errs = [];
    if (password !== confirmPassword) errs.push('passwords dont match');
    if (/[^0-9a-z_-]/gi.test(username))
      errs.push('username must only contain alphanumerics, "-" or "_"');
    if (!errs.length) {
      const body = { username, name, password };
      if (avatar_url) body.avatar_url = avatar_url;
      const data = await postData('api/users', body);
      if (data.new_user) this.setState({ registered: 'true' });
      else {
        const errCode = data.response.status;
        console.log(errCode);
        if (+errCode === 422) this.setState({ err: 'Username already taken' });
      }
    } else {
      this.setState({ err: errs.join(', ') });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { password } = this.state;
    if (prevState.password !== password) {
      const passwordStrength = passwordScore(password);
      this.setState({ passwordStrength });
    }
  }
  render() {
    const {
      username,
      name,
      password,
      confirmPassword,
      avatar_url,
      registered,
      err,
      passwordStrength
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
              cy-data="register-username"
              value={username}
              type="text"
              onChange={e => this.handleChange('username', e)}
              required
            />
            <label htmlFor="name">Name </label>
            <input
              cy-data="register-name"
              value={name}
              type="text"
              onChange={e => this.handleChange('name', e)}
              required
            />
            <label htmlFor="password">Password </label>
            <input
              cy-data="register-password"
              value={password}
              type="password"
              onChange={e => this.handleChange('password', e)}
              required
            />
            <meter
              value={passwordStrength}
              max="7"
              optimum="6"
              low="4"
              min="0"
            />
            <label htmlFor="password">Confirm Password </label>
            <input
              cy-data="register-confirm-password"
              value={confirmPassword}
              type="password"
              onChange={e => this.handleChange('confirmPassword', e)}
              required
            />
            <label htmlFor="avatar_url">
              Avatar URL (optional, image upload not supported)
            </label>
            <input
              cy-data="register-avatar"
              value={avatar_url}
              type="url"
              onChange={e => this.handleChange('avatar_url', e)}
            />
            <button cy-data="register-submit" type="submit">
              Register your account
            </button>
            {err && <span className="error-text">{err}</span>}
          </form>
        )}
      </div>
    );
  }
}
Registration.propTypes = {
  handleShowRegister: PropTypes.func.isRequired
};
export default Registration;
