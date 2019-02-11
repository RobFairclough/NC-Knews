import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { fetchData, patchData, deleteData, postData } from '../api';
import AuthorCard from './AuthorCard';
import CommentCard from './CommentCard';
import Vote from './Vote';
import { pluralise } from '../utils';

import '../css/Article.css';
import PostComment from './PostComment';

class Article extends Component {
  state = {
    article: '',
    user: '',
    comments: '',
    commentPage: 1,
    score: '',
    deleted: '',
    newComment: '',
    queries: []
  };
  async componentDidMount() {
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    const { comments } = await fetchData(`api/articles/${article_id}/comments`);
    if (article) {
      this.setState({
        article,
        comments,
        score: article.votes
      });
    } else navigate('/404', { replace: false });
  }
  async componentDidUpdate(_, prevState) {
    const {
      article: { author }
    } = this.state;
    if (author !== prevState.article.author) {
      const { user } = await fetchData(`api/users/${author}`);
      this.setState({ user });
    }
  }
  handleVote = inc_votes => {
    const { article_id } = this.props;
    const url = `api/articles/${article_id}`;
    patchData(url, { inc_votes });
    this.setState(prevState => ({
      score: prevState.score + inc_votes
    }));
  };
  handleDelete = (comment_id = '') => {
    const { article_id } = this.props;
    deleteData(
      `api/articles/${article_id}/${comment_id && `comments/${comment_id}`}`
    );
    // deleted comment
    if (comment_id) {
      this.setState(prevState => ({
        comments: prevState.comments.filter(
          oldComment => oldComment.comment_id !== comment_id
        ),
        article: {
          ...prevState.article,
          comment_count: +prevState.article.comment_count - 1
        }
      }));
      // deleted article
    } else {
      this.setState({ deleted: true });
    }
  };
  handleChangeComment = ({ target: { value: newComment } }) => {
    this.setState({ newComment });
  };
  handleSubmitComment = async e => {
    e.preventDefault();
    const { article_id, login } = this.props;
    const { newComment } = this.state;
    const body = { username: login, body: newComment };
    const { comment } = await postData(
      `api/articles/${article_id}/comments`,
      body
    );
    const { comments = [] } = this.state;
    this.setState(prevState => ({
      newComment: '',
      comments: [{ ...comment, author: comment.username }, ...comments],
      article: {
        ...prevState.article,
        comment_count: +prevState.article.comment_count + 1
      }
    }));
  };
  fetchMoreComments = async () => {
    const { commentPage: p } = this.state;
    const { article_id } = this.props;
    const { comments } = await fetchData(
      `api/articles/${article_id}/comments?p=${p + 1}`
    );
    if (comments) {
      this.setState(prevState => ({
        comments: [...prevState.comments, ...comments],
        commentPage: p + 1
      }));
    }
  };
  render() {
    const AVG_READING_SPEED = 200;
    const { article, comments, user, score, deleted, newComment } = this.state;
    const { name, avatar_url, username } = user;
    const { login, article_id } = this.props;
    const length = article
      ? Math.ceil(article.body.split(' ').length / AVG_READING_SPEED)
      : '';
    return (
      <div className="main-article">
        {!deleted ? (
          article && username ? (
            <>
              {login === username && (
                <button
                  className="delete-button"
                  onClick={() => this.handleDelete()}
                >
                  Delete article
                </button>
              )}
              <AuthorCard username={username} name={name} avatar={avatar_url} />
              <article className="article-container">
                <h2 className="article-heading">{article.title}</h2>
                <i className="time-to-read">{`time to read - about ${length} ${pluralise(
                  'minute',
                  length
                )}.`}</i>
                <p className="article-body">{article.body}</p>
                <Vote
                  login={login}
                  score={score}
                  handleVote={this.handleVote}
                />
              </article>
              <h3>Comments ({article.comment_count})</h3>
              {login && (
                <PostComment
                  login={login}
                  handleChangeComment={this.handleChangeComment}
                  handleSubmitComment={this.handleSubmitComment}
                  newComment={newComment}
                />
              )}
              {comments && comments.length ? (
                comments.map(comment => (
                  <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    article_id={article_id}
                    login={login}
                    handleDelete={this.handleDelete}
                  />
                ))
              ) : (
                <p>No comments</p>
              )}
              {comments && comments.length < article.comment_count && (
                <button
                  className="topic-button"
                  onClick={this.fetchMoreComments}
                >
                  Load more..
                </button>
              )}
            </>
          ) : (
            <p>Loading article...</p>
          )
        ) : (
          <>
            <p>Article deleted</p>
            <Link to="/articles">Go back?</Link>
          </>
        )}
      </div>
    );
  }
}
Article.propTypes = {
  article_id: PropTypes.string,
  login: PropTypes.string
};
export default Article;
