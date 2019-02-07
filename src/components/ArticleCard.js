import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => (
  <li className="article-card">
    <span>{article.topic}</span>
    <i className="article-card-text">
      {article.title} <br /> by
      <Link to={`/users/${article.author}`}>{article.author}</Link> <br />
      Written on {article.created_at}
    </i>
    <Link to={`/articles/${article.article_id}`} className="article-button">
      Check it out
    </Link>
  </li>
);

export default ArticleCard;
