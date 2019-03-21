/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import { Redirect } from '@reach/router';
import { useFormState } from 'react-use-form-state';
import Registration from './Registration';

const Login = ({ login, loginUser }) => {
  const [formState, { text, password }] = useFormState();
  const [invalid, setInvalid] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    const { username, password } = formState.values;
    const { token } = await loginUser(username, password);
    setInvalid(token ? '' : 'true');
    setLoading(false);
  };
  return (
    <>
      {login ? (
        <>
          <p>You're logged in!</p>
          <Redirect to="/" noThrow />
        </>
      ) : (
        <>
          <form className="login-container" onSubmit={handleLogin}>
            <i>
              A pre-created user is available to log in as with username
              "tickle122" and password "password"
            </i>
            <h1>Log in.</h1>
            <label htmlFor="username">Username</label>
            <input {...text('username')} cy-data="username" />
            <label htmlFor="password">Password</label>
            <input {...password('password')} cy-data="password" />
            <button cy-data="submit" type="submit">
              Log in
            </button>
            {loading && <p className="invalid-login-text">Loading...</p>}
            {invalid && <p className="invalid-login-text">Login not found</p>}
            <button
              type="button"
              cy-data="show-registration"
              onClick={() => setShowRegister(!showRegister)}
            >
              Register
            </button>
          </form>
          {showRegister && (
            <div className="register-form">
              <Registration
                handleShowRegister={() => setShowRegister(!showRegister)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  login: PropTypes.string
};
export default Login;
