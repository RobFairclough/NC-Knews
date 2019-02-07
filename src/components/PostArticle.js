import React, { Component } from 'react';
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

  handleChange = ({ target: { value } }, criteria) =>
    this.setState({ [criteria]: value });

  sendNewTopic = e => {
    e.preventDefault();
    const { postNewTopic } = this.props;
    const { newTopicSlug, newTopicDescription } = this.state;
    console.log(newTopicSlug, newTopicDescription);
    postNewTopic(newTopicSlug, newTopicDescription);
    this.setState({ topicPosted: true });
  };
  sendNewArticle = async e => {
    this.setState({ posted: true });
    e.preventDefault();
    const { postNewArticle, login: username } = this.props;
    const { topic, headline: title, body } = this.state;
    // validate
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
                />
                <input
                  className="input-box"
                  type="text"
                  value={newTopicDescription}
                  onChange={e => this.handleChange(e, 'newTopicDescription')}
                  placeholder="Description of topic"
                />
                <button type="submit" className="add-button">
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
                type="text"
                value={headline}
                required
                onChange={e => this.handleChange(e, 'headline')}
              />
              <label>Your article: </label>
              <textarea
                value={body}
                resize="none"
                rows="15"
                cols="40"
                className="new-article-text"
                required
                onChange={e => this.handleChange(e, 'body')}
              />
              <button type="submit">Post article</button>
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

export default PostArticle;
