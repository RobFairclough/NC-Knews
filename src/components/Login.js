import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Login.css';
import Registration from './Registration';
class Login extends Component {
  state = {
    username: '',
    password: '',
    invalid: '',
    loading: '',
    showRegister: false
  };

  handleLogin = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const { token } = await loginUser(username, password);
    this.setState({ invalid: token ? '' : 'true', loading: '' });
  };
  componentDidUpdate(prevProps, prevState) {
    const { invalid } = this.state;
    if (invalid !== prevState.invalid) this.setState({ loading: '' });
  }
  handleChangeUser = e => {
    this.setState({ username: e.target.value });
  };
  handleChangePass = e => {
    this.setState({ password: e.target.value });
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
          <p>You're logged in!</p>
        ) : (
          <>
            <form className="login-container" onSubmit={this.handleLogin}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={this.handleChangeUser}
                value={username}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={this.handleChangePass}
                value={password}
              />
              <button type="submit">Log in</button>
              {loading && <p className="invalid-login-text">Loading...</p>}
              {invalid && <p className="invalid-login-text">Login not found</p>}
            </form>
            <button onClick={this.handleShowRegister}>Register</button>
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

export default Login;
