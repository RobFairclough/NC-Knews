import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../api';
import ArticleCard from './ArticleCard';
import '../css/Articles.css';
import TopicBar from './TopicBar';
import QueryBar from './QueryBar';
class Articles extends Component {
  state = {
    articles: '',
    activeTopic: '',
    queries: [],
    p: 1,
    bottom: false,
    loadingText: 'Loading articles...'
  };
  async componentDidMount() {
    const { p } = this.state;
    const { articles } = await fetchData(`api/articles?p=${p}`);
    this.setState({ articles });
  }
  async componentDidUpdate(_, prevState) {
    const { activeTopic, queries, p } = this.state;
    if (
      activeTopic !== prevState.activeTopic ||
      queries.some((query, index) => query !== prevState.queries[index])
    ) {
      const { articles } = await fetchData(
        `api${activeTopic && `/topics/${activeTopic}`}/articles`,
        [`p=${p}`, ...queries]
      );
      this.setState({ articles, loadingText: 'No articles found' });
    }
  }

  fetchMoreArticles = async () => {
    const { p, queries, activeTopic } = this.state;
    const { articles } = await fetchData(
      `api${activeTopic && `/topics/${activeTopic}`}/articles`,
      [`p=${p + 1}`, ...queries]
    );
    this.setState(prevState => ({
      articles: [...prevState.articles, ...articles],
      p: prevState.p + 1,
      bottom: articles.length ? false : true
    }));
  };
  applyQueries = queries => {
    this.setState({ queries });
  };
  updateTopic = activeTopic => {
    this.setState({ activeTopic });
  };

  render() {
    const { topics } = this.props;
    const { bottom, articles, activeTopic, p, loadingText } = this.state;
    return (
      <>
        {topics && (
          <div className="topic-query-container">
            <h3 className="options-subheading">options</h3>
            <TopicBar
              topics={topics}
              activeTopic={activeTopic}
              updateTopic={this.updateTopic}
            />
            <QueryBar p={p} applyQueries={this.applyQueries} />
          </div>
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
          <p className="loading-text">{loadingText}</p>
        )}
        {articles && !bottom ? (
          <button className="topic-button" onClick={this.fetchMoreArticles}>
            Load more..
          </button>
        ) : (
          articles && <p>No more articles matching this criteria.</p>
        )}
      </>
    );
  }
}
Articles.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};
export default Articles;
