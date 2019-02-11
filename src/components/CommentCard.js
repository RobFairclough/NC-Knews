import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Vote from './Vote';
import { patchData } from '../api';

const CommentCard = ({ comment, article_id, login, handleDelete }) => {
  const [score, setScore] = useState(comment.votes);
  const handleVote = inc_votes => {
    const url = `api/articles/${article_id}/comments/${comment.comment_id}`;
    patchData(url, { inc_votes });
    setScore(score + inc_votes);
  };
  return (
    <div className="comment-card">
      <i>
        <Link to={`/users/${comment.author}`}>{comment.author}</Link> said:
      </i>
      {login === comment.author && (
        <button
          type="button"
          className="delete-button"
          onClick={() => handleDelete(comment.comment_id)}
        >
          Delete comment [X]
        </button>
      )}
      <p>{comment.body}</p>
      <i>on {comment.created_at}</i>
      <Vote score={score} login={login} handleVote={handleVote} />
    </div>
  );
};
CommentCard.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    comment_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
  }).isRequired,
  article_id: PropTypes.string.isRequired,
  login: PropTypes.string,
  handleDelete: PropTypes.func.isRequired
};

export default CommentCard;
