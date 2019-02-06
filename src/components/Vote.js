import React from 'react';
import '../css//Vote.css';

const Vote = ({ score, login, handleVote, voted }) => (
  <div className="vote-container">
    <button
      className={`vote-button up ${voted}`}
      disabled={login ? false : true}
      onClick={() => handleVote('up')}
    >
      {!login ? 'Login to vote' : !voted ? 'I love it' : 'vote cast!'}
    </button>
    <i className={'score ' + (score > 0 ? 'positive' : 'negative')}>
      Score: {score}
    </i>
    <button
      className={`vote-button down ${voted}`}
      disabled={login ? false : true}
      onClick={() => handleVote('down')}
    >
      {!login ? 'Login to vote' : !voted ? "I don't care" : 'vote cast!'}
    </button>
  </div>
);

export default Vote;
