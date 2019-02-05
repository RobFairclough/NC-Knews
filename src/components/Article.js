import React, { Component } from 'react';
import { fetchData, patchData } from '../api';
import AuthorCard from './AuthorCard';
import CommentCard from './CommentCard';
import Vote from './Vote';
import { pluralise } from '../utils';

import './Article.css';

class Article extends Component {
  state = {
    article: '',
    user: '',
    comments: '',
    commentPage: 1,
    voted: '',
    score: ''
  };
  async componentDidMount() {
    const { commentPage } = this.state;
    const { article_id } = this.props;
    const { article } = await fetchData(`api/articles/${article_id}`);
    // page etc
    const { comments } = await fetchData(
      `api/articles/${article_id}/comments?p=${commentPage}`
    );
    this.setState({ article, comments, score: article.votes });
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
      const { data } = await patchData(url, {
        inc_votes: inc
      });
      this.setState({ score: this.state.score + inc });
      return data;
    }
  };
  render() {
    const { article, comments, user, voted, score } = this.state;
    const { name, avatar_url, username } = user;
    const { login } = this.props;
    const length = article
      ? Math.ceil(article.body.split(' ').length / 200)
      : '';
    return (
      <div className="main-article">
        {article && username && (
          <>
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
            {comments ? (
              comments.map(comment => (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  article_id={article.article_id}
                  login={login}
                />
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
