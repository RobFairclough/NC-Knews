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
    name: ''
  };

  async componentDidMount() {
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');
    if (login) this.setState({ login });
    if (token) this.setState({ token });
  }
  loginUser = async (username, password) => {
    const { token } = await postData('login', { username, password });
    console.log({ token });
    if (token) {
      localStorage.setItem('login', username);
      localStorage.setItem('token', token);
      this.setState({ login: username, token });
    }
  };
  logout = () => {
    localStorage.setItem('login', '');
    localStorage.setItem('username', '');
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
    const { login, avatar, name } = this.state;
    return (
      <div className="App">
        <header>
          <img
            className="nav-logo nav-brand"
            src="https://cdn3.iconfinder.com/data/icons/lineo-social/100/news-512.png"
            alt="logo"
          />
          <span className="nav-brand">NC News.</span>
          {login ? (
            <>
              <a href={`/users/${login}`}>
                <img className="nav-avatar" alt="your avatar" src={avatar} />
              </a>
              <span onClick={this.logout}>(log out)</span>
            </>
          ) : (
            <Link className="nav-link" to="login">
              Log in
            </Link>
          )}
          <nav>
            {links.map(link => (
              <Link className="nav-link" to={`/${link}`}>
                {link}
              </Link>
            ))}
          </nav>
        </header>
        <Router className="app-page">
          <Home path="/" />
          <Login path="/login" login={login} loginUser={this.loginUser} />
          <Articles path="/articles" />
          <Users path="/users" />
        </Router>
      </div>
    );
  }
}

export default App;
