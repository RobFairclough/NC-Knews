import React, { Component } from 'react';
import '../css//Login.css';
import Registration from './Registration';
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
  componentDidUpdate(prevProps, prevState) {
    const { invalid } = this.state;
    if (invalid !== prevState.invalid) this.setState({ loading: false });
  }
  handleChange = (e, criteria) => this.setState({ [criteria]: e.target.value });
  handleShowRegister = e =>
    this.setState({ showRegister: !this.state.showRegister });

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
                onChange={e => this.handleChangeUser(e, 'username')}
                value={username}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={e => this.handleChangePass(e, 'password')}
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
