import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from '@reach/router';
import '../css/PostArticle.css';
class PostArticle extends Component {
  state = {
    newTopicSlug: '',
    newTopicDescription: '',
    headline: '',
    body: '',
    topic: 'coding',
    posted: '',
    topicPosted: '',
    article: ''
  };

  handleChange = ({ target: { value } }, criteria) => {
    this.setState({ [criteria]: value });
  };

  sendNewTopic = e => {
    e.preventDefault();
    const { postNewTopic } = this.props;
    const { newTopicSlug, newTopicDescription } = this.state;
    postNewTopic(newTopicSlug, newTopicDescription);
    this.setState({ topicPosted: true });
  };
  sendNewArticle = async e => {
    this.setState({ posted: true });
    e.preventDefault();
    const { postNewArticle, login: username } = this.props;
    const { topic, headline: title, body } = this.state;
    const article = await postNewArticle(topic, { title, body, username });
    this.setState({ article });
  };
  render() {
    const {
      newTopicSlug,
      newTopicDescription,
      topic,
      headline,
      body,
      posted,
      article,
      topicPosted
    } = this.state;
    const { topics, login } = this.props;
    return login ? (
      <div className="new-article">
        {!posted ? (
          <>
            {!topicPosted && (
              <form className="new-topic-form" onSubmit={this.sendNewTopic}>
                <label>Add a new topic</label>
                <input
                  className="input-box"
                  type="text"
                  value={newTopicSlug}
                  onChange={e => this.handleChange(e, 'newTopicSlug')}
                  placeholder="New topic"
                  required
                />
                <input
                  className="input-box"
                  type="text"
                  value={newTopicDescription}
                  onChange={e => this.handleChange(e, 'newTopicDescription')}
                  placeholder="Description of topic"
                  required
                />
                <button
                  type="submit"
                  className="add-button"
                  cy-data="submit-topic"
                >
                  add
                </button>
              </form>
            )}
            <form className="new-article-form" onSubmit={this.sendNewArticle}>
              <select
                value={topic}
                onChange={e => this.handleChange(e, 'topic')}
                required
              >
                <option disabled>Select a topic.</option>
                {topics &&
                  topics.map(topic => (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  ))}
              </select>
              <label>Headline: </label>
              <input
                cy-data="headline"
                type="text"
                value={headline}
                placeholder="headline...!"
                required
                onChange={e => this.handleChange(e, 'headline')}
              />
              <label>Your article: </label>
              <textarea
                cy-data="article-body"
                value={body}
                resize="none"
                rows="15"
                cols="40"
                className="new-article-text"
                required
                onChange={e => this.handleChange(e, 'body')}
              />
              <button type="submit" cy-data="submit-article">
                Post article
              </button>
            </form>
          </>
        ) : (
          <>
            <p>Article posted!</p>
            {article && (
              <Redirect to={`/articles/${article.article_id}`} noThrow />
            )}
          </>
        )}
      </div>
    ) : (
      <Link className="login-link" to="/login">
        Please log in to post articles
      </Link>
    );
  }
}
PostArticle.propTypes = {
  postNewTopic: PropTypes.func.isRequired,
  login: PropTypes.string,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};
export default PostArticle;
