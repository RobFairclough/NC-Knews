import React, { Component } from 'react';
import { Router } from '@reach/router';
import './css/App.css';
import { fetchData, postData } from './api';
import Home from './components/Home';
import Article from './components/Article';
import Articles from './components/Articles';
import Users from './components/Users';
import Login from './components/Login';
import Header from './components/Header';
import PostArticle from './components/PostArticle';
import NotFound from './components/NotFound';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

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
      this.setState({
        avatar: user.avatar_url
          ? user.avatar_url
          : 'http://atlas-content-cdn.pixelsquid.com/stock-images/brown-egg-lOwYmVA-600.jpg',
        name: user.name
      });
    }
  }
  loginUser = async (username, password) => {
    const data = await postData('login', { username, password });
    const { token } = data;
    if (token) {
      localStorage.setItem('login', username);
      localStorage.setItem('token', token);
      this.setState({ login: username, token, invalid: '' });
    }
    return data;
  };
  logout = () => {
    localStorage.setItem('login', '');
    localStorage.setItem('token', '');
    this.setState({ login: '', username: '', avatar: '', name: '' });
  };
  postNewTopic = async (slug, description) => {
    const { topics } = this.state;
    const body = { slug, description };
    const { topic } = await postData('api/topics', body);
    console.log([topic, ...topics]);
    this.setState({ topics: [body, ...topics] });
  };
  postNewArticle = async (topic, body) => {
    const { article } = await postData(`api/topics/${topic}/articles`, body);
    return article;
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
          <Article path="/articles/:article_id" login={login} />
          <Users path="/users" />
          <UserProfile path="/users/:username" login={login} />
          <PostArticle
            path="/new"
            topics={topics}
            login={login}
            postNewTopic={this.postNewTopic}
            postNewArticle={this.postNewArticle}
          />
          <NotFound default />
        </Router>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
