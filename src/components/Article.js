import React, { Component } from 'react';
import { fetchData } from '../api';
import AuthorCard from './AuthorCard';
import './Article.css';
import CommentCard from './CommentCard';

class Article extends Component {
  state = { article: '', user: '', comments: '', commentPage: 1 };
  async componentDidMount() {
    const { commentPage } = this.state;
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    // page etc
    const { comments } = await fetchData(
      `api/articles/${article_id}/comments?p=${commentPage}`
    );
    this.setState({ article, comments });
  }
  async componentDidUpdate(prevProps, prevState) {
    const {
      article: { author }
    } = this.state;
    if (author !== prevState.article.author) {
      const { user } = await fetchData(`api/users/${author}`);
      this.setState({ user });
    }
  }
  render() {
    const { article, comments } = this.state;
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
            <h3>Comments</h3>
            {comments ? (
              comments.map(comment => (
                <CommentCard key={comment.comment_id} comment={comment} />
              ))
            ) : (
              <p>No comments</p>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Article;
