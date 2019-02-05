import React, { Component } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import './Articles.css';
class Home extends Component {
  state = {
    latestArticles: '',
    topArticles: ''
  };
  async componentDidMount() {
    const { articles: latestArticles } = await fetchData(
      `api/articles?limit=3`
    );
    const { articles: topArticles } = await fetchData(
      `api/articles?sort_by=votes&limit=3`
    );
    console.log(latestArticles);
    console.log(topArticles);
    this.setState({ latestArticles, topArticles });
  }
  async componentDidUpdate(prevProps, prevState) {}
  render() {
    const { latestArticles, topArticles } = this.state;

    return (
      <div>
        <h1>NC News</h1>
        <h2>The latest.</h2>
        {latestArticles ? (
          <ul className="articles-list">
            {latestArticles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        ) : (
          <p>loading...</p>
        )}
        <h2>The Best.</h2>
        {topArticles ? (
          <ul className="articles-list">
            {topArticles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  }
}

export default Home;
