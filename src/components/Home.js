import React, { Component } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import './Articles.css';
class Home extends Component {
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
  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevPage = prevState.page;
    if (page !== prevPage) {
      const { articles } = await fetchData(`api/articles?p=${page}`);
      this.setState({ articles });
    }
  }
  render() {
    const { articles } = this.state;

    return (
      <div>
        <h1>NC News</h1>
        <h2>The latest.</h2>
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

export default Home;
