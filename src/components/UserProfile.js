import React, { Component } from 'react';
import UserCard from './UserCard';
import { fetchData, patchData } from '../api';
import '../css/UserProfile.css';
class UserProfile extends Component {
  // update backend to allow getting articles, comments by user
  state = {
    articles: '',
    comments: '',
    user: '',
    name: '',
    avatar_url: '',
    updated: false
  };
  async componentDidMount() {
    const { username } = this.props;
    const { user } = await fetchData(`api/users/${username}`);
    this.setState({ user, avatar_url: user.avatar_url, name: user.name });
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
    // patch username / avatar?
    const { user, name, avatar_url, updated } = this.state;
    const { login, username } = this.props;
    return (
      <div>
        {user && (
          <>
            <UserCard user={user} />
            {/* user articles / comments */}
            {/* update user details */}
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
        )}
      </div>
    );
  }
}

export default UserProfile;
