import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Vote.css';

const Vote = ({ score, login, handleVote }) => {
  // state hook used to clean up vote function
  const [voted, setVoted] = useState(null);
  const sendVote = (points, dir) => {
    handleVote(voted === dir ? -points : voted ? points * 2 : points);
    setVoted(voted === dir ? null : dir);
  };
  return (
    <div className="vote-container">
      <button
        className={`vote-button up ${voted === 'up' && 'active'}`}
        onClick={() => sendVote(1, 'up')}
      >
        {!login ? 'Login to vote' : 'Like!'}
      </button>
      <i className={score > 0 ? 'positive' : 'negative'}>Score: {score}</i>
      <button
        className={`vote-button down ${voted === 'down' && 'active'}`}
        onClick={() => sendVote(-1, 'down')}
      >
        {!login ? 'Login to vote' : 'dislike!'}
      </button>
    </div>
  );
};
Vote.propTypes = {
  score: PropTypes.number.isRequired,
  login: PropTypes.string,
  handleVote: PropTypes.func.isRequired
};
export default Vote;
