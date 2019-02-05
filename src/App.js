import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import { fetchData, postData } from './api';
import Home from './components/Home';
import Article from './components/Article';
import Articles from './components/Articles';
import Users from './components/Users';
import Login from './components/Login';
import Header from './components/Header';
import PostArticle from './components/PostArticle';

class App extends Component {
  state = {
    login: '',
    token: '',
    avatar: '',
    name: '',
    topics: ''
  };

  async componentDidMount() {
    const { topics } = await fetchData('api/topics');
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');
    if (login) this.setState({ login });
    if (token) this.setState({ token });
    this.setState({ topics });
  }
  async componentDidUpdate(prevProps, prevState) {
    const { login } = this.state;
    if (login && login !== prevState.login) {
      const { user } = await fetchData(`api/users/${login}`);
      this.setState({ avatar: user.avatar_url, name: user.name });
    }
  }
  loginUser = async (username, password) => {
    console.log('running');
    const data = await postData('login', { username, password });

    const { token } = data;
    console.log(data);
    console.log(token);
    if (token) {
      localStorage.setItem('login', username);
      localStorage.setItem('token', token);
      this.setState({ login: username, token, invalid: '' });
    }
    console.log(data);
    return data;
  };
  logout = () => {
    localStorage.setItem('login', '');
    localStorage.setItem('token', '');
    this.setState({ login: '', username: '', avatar: '', name: '' });
  };
  render() {
    const { login, avatar, invalid, topics } = this.state;
    return (
      <div className="App">
        <Header login={login} avatar={avatar} logout={this.logout} />
        <Router className="app-page">
          <Home path="/" />
          <Login
            path="/login"
            invalid={invalid}
            login={login}
            loginUser={this.loginUser}
          />
          <Articles path="/articles" topics={topics} />
          <Article path="/articles/:article_id" />
          <Users path="/users" />
          <PostArticle path="/new" topics={topics} />
        </Router>
      </div>
    );
  }
}

export default App;
