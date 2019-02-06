import React, { Component } from 'react';
import { Link } from '@reach/router';
import Vote from './Vote';
import { patchData } from '../api';
import '../css//CommentCard.css';

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
  sendDeletion = e => {
    this.setState({ deleting: 'deleting' });
    const {
      handleDelete,
      comment: { comment_id }
    } = this.state;
    handleDelete(comment_id, `comments/${comment_id}`);
  };

  render() {
    const { comment, article_id, login, handleDelete } = this.props;
    const { score, voted } = this.state;
    console.log(login, comment);
    return (
      <div className="comment-card">
        <i>
          <Link to={`/users/${comment.author}`}>{comment.author}</Link> said:{' '}
        </i>
        {login === comment.author && (
          <button
            className="delete-button"
            onClick={() => handleDelete(comment.comment_id)}
          >
            Delete comment
          </button>
        )}
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
