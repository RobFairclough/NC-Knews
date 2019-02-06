import React, { Component } from 'react';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import '../css//Articles.css';
import TopicBar from './TopicBar';
import QueryBar from './QueryBar';
class Articles extends Component {
  state = {
    articles: '',
    activeTopic: '',
    queries: [],
    p: 1
  };
  // page set but not altered anywhere yet
  async componentDidMount() {
    const { p } = this.state;
    const { articles } = await fetchData(`api/articles?p=${p}`);
    this.setState({ articles });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { activeTopic, queries } = this.state;
    if (
      activeTopic !== prevState.activeTopic ||
      queries.some((query, index) => query !== prevState.queries[index])
    ) {
      const { articles } = await fetchData(
        `api${activeTopic && `/topics/${activeTopic}`}/articles`,
        queries
      );
      this.setState({ articles });
    }
  }
  applyQueries = queries => {
    this.setState({ queries });
  };
  updateTopic = newTopic => this.setState({ activeTopic: newTopic });

  render() {
    const { topics } = this.props;
    const { articles, activeTopic, p } = this.state;

    return (
      <div>
        <h3 className="subheading">pick a topic</h3>
        {topics ? (
          <>
            <TopicBar
              topics={topics}
              activeTopic={activeTopic}
              updateTopic={this.updateTopic}
            />
            <QueryBar p={p} applyQueries={this.applyQueries} />
          </>
        ) : (
          <p className="loading-text">Loading topics...</p>
        )}
        {topics && articles && articles.length ? (
          <>
            <ul className="articles-list">
              {articles.map(article => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
            </ul>
          </>
        ) : (
          <p className="loading-text">There's nothing here...</p>
        )}
      </div>
    );
  }
}

export default Articles;
