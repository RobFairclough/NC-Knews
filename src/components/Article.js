import React, { Component } from 'react';
import { fetchData } from '../api';
import AuthorCard from './AuthorCard';
import './Article.css';

class Article extends Component {
  state = { article: '', user: '' };
  async componentDidMount() {
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    this.setState({ article });
  }
  async componentDidUpdate(prevProps, prevState) {
    const {
      article: { author }
    } = this.state;
    console.log(author);
    console.log(prevState);
    if (author !== prevState.article.author) {
      const { user } = await fetchData(`api/users/${author}`);
      this.setState({ user });
    }
  }
  render() {
    const { article } = this.state;
    const { name, avatar_url, username } = this.state.user;
    return (
      <div className="main-article">
        {article && username && (
          <>
            <AuthorCard username={username} name={name} avatar={avatar_url} />
            <article className="article-container">
              <h2 className="article-heading">{article.title}</h2>
              <p className="article-body">{article.body}</p>
            </article>
          </>
        )}

        {/* article */}
      </div>
    );
  }
}

export default Article;
