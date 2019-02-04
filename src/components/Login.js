import React, { Component } from 'react';
import './Login.css';
class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleLogin = e => {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    loginUser(username, password);
  };
  handleChangeUsername = e => {
    this.setState({ username: e.target.value });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <>
        {this.props.login ? (
          <p>You're logged in!</p>
        ) : (
          <form className="login-container" onSubmit={this.handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={this.handleChangeUsername}
              value={this.state.username}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.handleChangePassword}
              value={this.state.password}
            />
            <button type="submit">Log in</button>
          </form>
        )}
      </>
    );
  }
}

export default Login;
