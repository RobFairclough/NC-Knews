import React, { Component } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import './Articles.css';
import TopicBar from './TopicBar';
class Articles extends Component {
  state = {
    articles: '',
    topics: '',
    page: 1,
    activeTopic: ''
  };
  async componentDidMount() {
    const { page } = this.state;
    const { articles } = await fetchData(`api/articles?p=${page}`);
    const { topics } = await fetchData('api/topics');
    this.setState({ articles });
    this.setState({ topics });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { activeTopic, page } = this.state;
    if (activeTopic !== prevState.activeTopic || page !== prevState.page) {
      const { articles } = await fetchData(
        `api/topics/${activeTopic}/articles?p=${page}`
      );
      this.setState({ articles });
    }
  }

  updateTopic = newTopic => this.setState({ activeTopic: newTopic });

  render() {
    const { articles, topics, activeTopic } = this.state;

    return (
      <div>
        {topics ? (
          <TopicBar
            topics={topics}
            activeTopic={activeTopic}
            updateTopic={this.updateTopic}
          />
        ) : (
          <p className="loading-text">Loading topics...</p>
        )}
        {topics && articles ? (
          <ul className="articles-list">
            {articles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        ) : (
          <p className="loading-text">There's nothing here...</p>
        )}
      </div>
    );
  }
}

export default Articles;
