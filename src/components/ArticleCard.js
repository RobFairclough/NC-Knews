import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => (
  <li className="article-card">
    <i className="article-card-text">{article.title}</i>
    <img
      className="article-card-img"
      alt="author portrait"
      src={article.avatar_url}
    />
    <i className="article-card-text">
      by
      <Link to={`/users/${article.author}`}> {article.author}</Link> <br />
      Written on {article.created_at}
    </i>
    <Link to={`/articles/${article.article_id}`} className="article-button">
      Check it out
    </Link>
    <p className="article-topic-text">{article.topic}</p>
  </li>
);
ArticleCard.propTypes = {
  article: PropTypes.object.isRequired
};

export default ArticleCard;
