import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
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
    commented: false,
    bottom: false,
    queries: []
  };
  async componentDidMount() {
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    const { comments } = await fetchData(`api/articles/${article_id}/comments`);
    this.setState({ article: article || '', comments, score: article.votes });
  }
  async componentDidUpdate(prevProps, prevState) {
    const {
      comments,
      commentPage,
      article: { author }
    } = this.state;
    const { article_id } = this.props;
    if (author !== prevState.article.author) {
      const { user } = await fetchData(`api/users/${author}`);
      this.setState({ user });
    }
    if (
      comments &&
      prevState.comments &&
      comments.length !== prevState.comments.length
    ) {
      const { comments } = await fetchData(
        `api/articles/${article_id}/comments?p=${commentPage}`
      );
      this.setState({ comments });
    }
  }
  handleVote = inc_votes => {
    const { article_id } = this.props;
    const url = `api/articles/${article_id}`;
    patchData(url, { inc_votes });
    this.setState({ score: this.state.score + inc_votes });
  };
  handleDelete = (comment_id = '') => {
    const { comments } = this.state;
    const { article_id } = this.props;
    deleteData(
      `api/articles/${article_id}/${comment_id && `comments/${comment_id}`}`
    );
    if (comment_id) {
      // deleted comment
      this.setState({
        comments: comments.filter(
          oldComment => oldComment.comment_id !== comment_id
        )
      });
    } else {
      this.setState({ deleted: true });
      // deleted article
    }
  };
  handleChangeComment = e => this.setState({ newComment: e.target.value });
  handleSubmitComment = async e => {
    this.setState({ commented: true });
    e.preventDefault();
    const { article_id, login } = this.props;
    const { newComment } = this.state;
    const body = { username: login, body: newComment };
    const { comment } = await postData(
      `api/articles/${article_id}/comments`,
      body
    );
    const { comments = [] } = this.state;
    this.setState({
      comments: [{ ...comment, author: comment.username }, ...comments]
    });
  };
  fetchMoreComments = async () => {
    const { commentPage: p } = this.state;
    const { article_id } = this.props;
    const { comments } = await fetchData(
      `api/articles/${article_id}/comments?p=${p + 1}`
    );
    if (comments) {
      this.setState({
        comments: [...this.state.comments],
        commentPage: p + 1
      });
    } else this.setState({ bottom: true });
  };
  render() {
    const {
      article,
      comments,
      user,
      score,
      deleted,
      commented,
      bottom
    } = this.state;
    const { name, avatar_url, username } = user;
    const { login } = this.props;
    //  avg reading speed is 200 words per minute
    const length = article
      ? Math.ceil(article.body.split(' ').length / 200)
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
              {login && !commented && (
                <PostComment
                  login={login}
                  handleChangeComment={this.handleChangeComment}
                  handleSubmitComment={this.handleSubmitComment}
                />
              )}
              {comments && comments.length ? (
                comments.map(comment => (
                  <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    article_id={article.article_id}
                    login={login}
                    handleDelete={this.handleDelete}
                  />
                ))
              ) : (
                <p>No comments</p>
              )}
              {comments && !bottom ? (
                <button
                  className="topic-button"
                  onClick={this.fetchMoreComments}
                >
                  Load more..
                </button>
              ) : (
                comments && <p>No more comments.</p>
              )}
            </>
          ) : (
            <p>No article found</p>
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
