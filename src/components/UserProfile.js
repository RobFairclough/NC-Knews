import React, { Component } from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import { fetchData, patchData } from '../api';
import '../css/UserProfile.css';
import ArticleCard from './ArticleCard';
class UserProfile extends Component {
  state = {
    articles: null,
    comments: null,
    user: null,
    name: '',
    avatar_url: '',
    updated: false
  };
  async componentDidMount() {
    const { username } = this.props;
    const { user } = await fetchData(`api/users/${username}`);
    if (user) {
      this.setState({ user, avatar_url: user.avatar_url, name: user.name });
    } else navigate('/404');
  }
  async componentDidUpdate(_, prevState) {
    if (this.state.user) {
      const {
        user: { username }
      } = this.state;
      if (!prevState.user || username !== prevState.user.username) {
        const { articles } = await fetchData(`api/users/${username}/articles`);
        if (articles && articles.length) this.setState({ articles });
      }
    }
  }
  handleUpdateUser = async e => {
    e.preventDefault();
    const { login } = this.props;
    const { name, avatar_url } = this.state;
    const body = { name, avatar_url };
    const { user } = await patchData(`api/users/${login}`, body);
    this.setState({ updated: true, user });
  };
  handleChange = ({ target: { value } }, criteria) =>
    this.setState({ [criteria]: value });

  render() {
    const { user, name, avatar_url, updated, articles } = this.state;
    const { login, username } = this.props;
    return (
      <div className="user-profile">
        {user ? (
          <>
            <UserCard user={user} />
            {/* user articles / comments */}
            <h2>Articles</h2>
            <ul className="articles-list">
              {articles &&
                articles.map(article => (
                  <ArticleCard key={article.article_id} article={article} />
                ))}
            </ul>
            {login === username && (
              <form
                className="update-user-form"
                onSubmit={this.handleUpdateUser}
              >
                {!updated ? (
                  <>
                    <h2>Update your details: </h2>
                    <label>name: </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => this.handleChange(e, 'name')}
                    />
                    <label>avatar url: </label>
                    <input
                      type="url"
                      value={avatar_url}
                      onChange={e => this.handleChange(e, 'avatar_url')}
                    />
                    <button type="submit">update</button>
                  </>
                ) : (
                  <p>Thanks! We've updated that for you.</p>
                )}
              </form>
            )}
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    );
  }
}
UserProfile.propTypes = {
  username: PropTypes.string,
  login: PropTypes.string
};
export default UserProfile;
