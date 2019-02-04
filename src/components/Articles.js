import React, { Component } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import './Articles.css';
class Articles extends Component {
  state = {
    articles: '',
    page: 1
  };
  async componentDidMount() {
    const { page } = this.state;
    const { articles } = await fetchData(`api/articles?p=${page}`);
    console.log(articles);
    this.setState({ articles });
    // this.setState({ articles });
  }
  render() {
    const { articles } = this.state;

    return (
      <div>
        {articles && (
          <ul className="articles-list">
            {articles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Articles;
