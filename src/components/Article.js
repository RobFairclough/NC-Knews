import React, { Component } from 'react';
import { Link } from '@reach/router';
import { fetchData, patchData, deleteData, postData } from '../api';
import AuthorCard from './AuthorCard';
import CommentCard from './CommentCard';
import Vote from './Vote';
import { pluralise } from '../utils';

import '../css//Article.css';
import PostComment from './PostComment';

class Article extends Component {
  state = {
    article: '',
    user: '',
    comments: '',
    commentPage: 1,
    voted: '',
    score: '',
    deleted: '',
    newComment: '',
    commented: false
  };
  async componentDidMount() {
    const { commentPage } = this.state;
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    // page etc
    const { comments } = await fetchData(
      `api/articles/${article_id}/comments?p=${commentPage}`
    );
    this.setState({ article: article || '', comments, score: article.votes });
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
  handleVote = async vote => {
    this.setState({ voted: 'voted' });
    const { voted } = this.state;
    if (!voted) {
      const { article_id } = this.props;
      const inc = vote === 'up' ? 1 : -1;
      const url = `api/articles/${article_id}`;
      const  data  = await patchData(url, {
        inc_votes: inc
      });
      this.setState({ score: this.state.score + inc });
      return data;
    }
  };
  handleDelete = (comment_id = '', url = '') => {
    const { comments } = this.state;
    const { article_id } = this.props;
    const prefix = `api/articles/${article_id}`;
    deleteData(`${prefix}/${comment_id && `comments/${comment_id}`}`);
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
  handleChangeComment = e => {
    this.setState({ newComment: e.target.value });
  };
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
    this.setState({
      comments: [
        { ...comment, author: comment.username },
        ...this.state.comments
      ]
    });
  };
  render() {
    const {
      article,
      comments,
      user,
      voted,
      score,
      deleted,
      commented
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
                <button className="delete-button" onClick={this.handleDelete}>
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
                  voted={voted}
                />
              </article>
              <h3>Comments</h3>
              {login && !commented && (
                <PostComment
                  login={login}
                  handleChangeComment={this.handleChangeComment}
                  handleSubmitComment={this.handleSubmitComment}
                />
              )}
              {comments ? (
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

export default Article;
