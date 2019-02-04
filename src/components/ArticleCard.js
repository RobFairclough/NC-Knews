import React from 'react';

const ArticleCard = props => {
  const { article } = props;
  return (
    <li className="article-card">
      <i className="article-card-text">
        {article.title} <br /> by{' '}
        <a href={`/users/${article.author}`}>{article.author}</a> <br /> Written
        on {article.created_at}
      </i>
      <a href={`/articles/${article.article_id}`} className="article-button">
        Check it out
      </a>
    </li>
  );
};

export default ArticleCard;
