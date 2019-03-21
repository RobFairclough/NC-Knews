import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import '../css/Articles.css';

const Home = () => {
  const [latest, setLatest] = useState(null);
  const [top, setTop] = useState(null);
  const fetchNews = async () => {
    const latestNews = await fetchData('api/articles', ['limit=4']);
    const topNews = await fetchData('api/articles', [
      'limit=4',
      'sort_by=votes'
    ]);
    setLatest(latestNews.articles);
    setTop(topNews.articles);
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h1>NC News</h1>
      <h2>The latest.</h2>
      {latest ? (
        <ul className="articles-list">
          {latest.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      ) : (
        <p>loading the latest articles...</p>
      )}
      <h2>The Best.</h2>
      {top ? (
        <ul className="articles-list">
          {top.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      ) : (
        <p>loading the top articles...</p>
      )}
    </div>
  );
};

export default Home;
