import React, { Component } from 'react';
import './Login.css';
class Login extends Component {
  state = {
    username: '',
    password: '',
    invalid: ''
  };

  handleLogin = async e => {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const { token } = loginUser(username, password);
    if (!token) this.setState({ invalid: 'true' });
    else this.setState({ invalid: '' });
  };
  handleChangeUsername = e => {
    this.setState({ username: e.target.value });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    const { login } = this.props;
    const { invalid, username, password } = this.state;
    return (
      <>
        {login ? (
          <p>You're logged in!</p>
        ) : (
          <form className="login-container" onSubmit={this.handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={this.handleChangeUsername}
              value={username}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.handleChangePassword}
              value={password}
            />
            <button type="submit">Log in</button>
            {invalid && (
              <p className="invalid-login-text">
                Invalid login. Please enter correct details.
              </p>
            )}
          </form>
        )}
      </>
    );
  }
}

export default Login;
