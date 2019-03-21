import React, { useState } from 'react';
import { useFormState } from 'react-use-form-state';
import PropTypes from 'prop-types';
import '../css/Registration.css';
import { postData } from '../api';
import { passwordScore, validUsername } from '../utils';

const Registration = ({ handleShowRegister }) => {
  const [formState, { text, password }] = useFormState();
  const [registered, setRegistered] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const {
      username,
      name,
      password,
      confirmPassword,
      avatar_url
    } = formState.values;
    const errs = [];
    if (password !== confirmPassword) errs.push('passwords dont match');
    if (!validUsername(username))
      errs.push('username must only contain alphanumerics, "-" or "_"');
    if (!errs.length) {
      const body = { username, name, password };
      if (avatar_url) body.avatar_url = avatar_url;
      const data = await postData('api/users', body);
      if (data.new_user) setRegistered(true);
      else {
        const errCode = data.response.status;
        if (+errCode === 422) errs.push('username already taken');
      }
    } else {
      setErr(errs.join(','));
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-heading">Sign up</h2>
      <span className="close-button" onClick={handleShowRegister}>
        X
      </span>
      {registered && (
        <p>
          You're all signed up! You can now log in with your username and
          password.
        </p>
      )}
      {!registered && (
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username </label>
          <input {...text('username')} cy-data="register-username" required />
          <label htmlFor="name">Name </label>
          <input cy-data="register-name" {...text('name')} required />
          <label htmlFor="password">Password </label>
          <input
            cy-data="register-password"
            {...password('password')}
            required
          />
          <meter
            value={passwordScore(formState.values.password || '')}
            max="7"
            optimum="6"
            low="4"
            min="0"
          />
          <label htmlFor="password">Confirm Password </label>
          <input
            cy-data="register-confirm-password"
            {...password('confirmPassword')}
            required
          />
          <label htmlFor="avatar_url">
            Avatar URL (optional, image upload not supported)
          </label>
          <input cy-data="register-avatar" {...text('avatarUrl')} />
          <button cy-data="register-submit" type="submit">
            Register your account
          </button>
          {err && <span className="error-text">{err}</span>}
        </form>
      )}
    </div>
  );
};

Registration.propTypes = {
  handleShowRegister: PropTypes.func.isRequired
};
export default Registration;
