import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Vote.css';
import { Link } from '@reach/router';

const Vote = ({ score, login, handleVote }) => {
  const [voted, setVoted] = useState(null);
  const sendVote = (points, dir) => {
    handleVote(voted === dir ? -points : voted ? points * 2 : points);
    setVoted(voted === dir ? null : dir);
  };
  return (
    <div className="vote-container">
      {login ? (
        <>
          <button
            className={`vote-button up ${voted === 'up' && 'active'}`}
            onClick={() => sendVote(1, 'up')}
            type="button"
          >
            <span role="img" aria-label="upvote">
              👍🏻
            </span>
          </button>
          <i className={score > 0 ? 'positive' : 'negative'}>
            Score:
            {score}
          </i>
          <button
            className={`vote-button down ${voted === 'down' && 'active'}`}
            onClick={() => sendVote(-1, 'down')}
            type="button"
          >
            <span role="img" aria-label="downvote">
              👎🏻
            </span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="vote-button up" type="button">
              Login to vote
            </button>
          </Link>
          <i className={score > 0 ? 'positive' : 'negative'}>
            Score:
            {score}
          </i>
          <Link to="/login">
            <button className="vote-button down" type="button">
              Login to vote
            </button>
          </Link>
        </>
      )}
    </div>
  );
};
Vote.propTypes = {
  score: PropTypes.number.isRequired,
  login: PropTypes.string,
  handleVote: PropTypes.func.isRequired,
};
export default Vote;
