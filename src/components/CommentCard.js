import React, { Component } from 'react';
import { Link } from '@reach/router';
import Vote from './Vote';
import { patchData } from '../api';
import './CommentCard.css';

class CommentCard extends Component {
  state = {
    score: this.props.comment.votes,
    voted: ''
  };
  handleVote = async vote => {
    this.setState({ voted: 'voted' });
    const { voted } = this.state;
    if (!voted) {
      const { article_id, comment } = this.props;
      const inc = vote === 'up' ? 1 : -1;
      const url = `api/articles/${article_id}/comments/${comment.comment_id}`;
      const { data } = await patchData(url, {
        inc_votes: inc
      });
      this.setState({ score: this.state.score + inc });
      return data;
    }
  };
  render() {
    const { comment, article_id, login } = this.props;
    const { score, voted } = this.state;
    return (
      <div className="comment-card">
        <i>
          <Link to={`/users/${comment.author}`}>{comment.author}</Link> said:{' '}
        </i>
        <p>{comment.body}</p>
        <i>on {comment.created_at}</i>
        <Vote
          target={`api/articles/${article_id}/comments/${comment.comment_id}`}
          score={score}
          login={login}
          handleVote={this.handleVote}
          voted={voted}
        />
      </div>
    );
  }
}

export default CommentCard;
