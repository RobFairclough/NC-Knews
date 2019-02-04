import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import { fetchData, postData } from './api';
import Home from './components/Home';
import Articles from './components/Articles';
import Users from './components/Users';
import Login from './components/Login';

class App extends Component {
  state = {
    login: '',
    token: '',
    avatar: '',
    name: '',
    invalid: ''
  };

  async componentDidMount() {
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');
    if (login) this.setState({ login });
    if (token) this.setState({ token });
  }
  loginUser = async (username, password) => {
    const data = await postData('login', { username, password });
    console.dir();
    const { token } = data;
    if (token) {
      localStorage.setItem('login', username);
      localStorage.setItem('token', token);
      this.setState({ login: username, token, invalid: '' });
    }
  };
  logout = () => {
    localStorage.setItem('login', '');
    localStorage.setItem('token', '');
    this.setState({ login: '', username: '', avatar: '', name: '' });
  };
  async componentDidUpdate(prevProps, prevState) {
    const { login } = this.state;
    if (login && login !== prevState.login) {
      const { user } = await fetchData(`api/users/${login}`);
      console.log(user);
      this.setState({ avatar: user.avatar_url, name: user.name });
    }
  }
  render() {
    const links = ['articles', 'users'];
    const { login, avatar, invalid } = this.state;
    return (
      <div className="App">
        <header>
          <div>
            <Link to="/">
              <img
                className="nav-logo nav-brand"
                src="https://cdn3.iconfinder.com/data/icons/lineo-social/100/news-512.png"
                alt="logo"
              />
            </Link>
            <span className="nav-brand">NC News.</span>
          </div>
          {login && (
            <>
              <a href={`/users/${login}`}>
                <img className="nav-avatar" alt="your avatar" src={avatar} />
              </a>
            </>
          )}
          <nav>
            {login ? (
              <Link className="nav-link" to="/" onClick={this.logout}>
                (log out)
              </Link>
            ) : (
              <Link className="nav-link" to="login">
                Log in
              </Link>
            )}
            {links.map(link => (
              <Link className="nav-link" to={`/${link}`}>
                {link}
              </Link>
            ))}
          </nav>
        </header>
        <Router className="app-page">
          <Home path="/" />
          <Login
            path="/login"
            invalid={invalid}
            login={login}
            loginUser={this.loginUser}
          />
          <Articles path="/articles" />
          <Users path="/users" />
        </Router>
      </div>
    );
  }
}

export default App;
