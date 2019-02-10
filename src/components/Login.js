import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import Registration from './Registration';
import { Redirect } from '@reach/router';
class Login extends Component {
  state = {
    username: '',
    password: '',
    invalid: '',
    loading: false,
    showRegister: false
  };

  handleLogin = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const { token } = await loginUser(username, password);
    this.setState({ invalid: token ? '' : 'true', loading: false });
  };
  componentDidUpdate(_, prevState) {
    const { invalid } = this.state;
    if (invalid !== prevState.invalid) this.setState({ loading: false });
  }
  handleChange = (e, criteria) => {
    this.setState({ [criteria]: e.target.value });
  };
  handleShowRegister = e => {
    this.setState({ showRegister: !this.state.showRegister });
  };

  render() {
    const { login } = this.props;
    const { invalid, username, password, loading, showRegister } = this.state;
    return (
      <>
        {login ? (
          <>
            <p>You're logged in!</p>
            <Redirect to="/" noThrow />
          </>
        ) : (
          <>
            <form className="login-container" onSubmit={this.handleLogin}>
              <h1>Log in.</h1>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={e => this.handleChange(e, 'username')}
                value={username}
                cy-data="username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={e => this.handleChange(e, 'password')}
                value={password}
                cy-data="password"
              />
              <button cy-data="submit" type="submit">
                Log in
              </button>
              {loading && <p className="invalid-login-text">Loading...</p>}
              {invalid && <p className="invalid-login-text">Login not found</p>}
              <button
                cy-data="show-registration"
                onClick={this.handleShowRegister}
              >
                Register
              </button>
            </form>
            {showRegister && (
              <div className="register-form">
                <Registration handleShowRegister={this.handleShowRegister} />
              </div>
            )}
          </>
        )}
      </>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  login: PropTypes.string
};
export default Login;
