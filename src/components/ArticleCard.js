import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = props => {
  const { article } = props;
  return (
    <li className="article-card">
      <i className="article-card-text">
        {article.title} <br /> by{' '}
        <Link to={`/users/${article.author}`}>{article.author}</Link> <br />{' '}
        Written on {article.created_at}
      </i>
      <Link to={`/articles/${article.article_id}`} className="article-button">
        Check it out
      </Link>
    </li>
  );
};

export default ArticleCard;
