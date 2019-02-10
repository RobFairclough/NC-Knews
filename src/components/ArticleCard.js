import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => (
  <li className="article-card">
    <Link to={`/articles/${article.article_id}`} className="article-title">
      <h3
        className="article-card-text
       article-title"
      >
        {article.title.toLowerCase()}
      </h3>
      <img
        className="article-card-img"
        alt="author portrait"
        src={article.avatar_url}
      />
    </Link>
    <i className="article-card-text">
      by
      <Link to={`/users/${article.author}`}> {article.author}</Link> <br />
      Written on {article.created_at}
    </i>
    <Link to={`/articles/${article.article_id}`} className="article-button">
      Check it out
    </Link>
    <p className="article-info">
      {+article.comment_count
        ? `Comments(${article.comment_count})`
        : 'No comments yet'}
    </p>
    <p className="article-info">Score: {article.votes}</p>
    <p className="article-topic-text">{article.topic}</p>
  </li>
);
ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired
  }).isRequired
};

export default ArticleCard;
