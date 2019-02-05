import React from 'react';
import { Link } from '@reach/router';
import './CommentCard.css';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <i>
        <Link to={`/users/${comment.author}`}>{comment.author}</Link> said:{' '}
      </i>
      <p>{comment.body}</p>
      <i>on {comment.created_at}</i>
    </div>
  );
};

export default CommentCard;
