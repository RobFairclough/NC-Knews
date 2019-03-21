import React from 'react';
import PropTypes from 'prop-types';

const TopicBar = ({ topics, activeTopic, updateTopic }) => {
  const handleChangeTopic = ({ target: { textContent: newTopic } }) => {
    if (newTopic !== activeTopic) {
      updateTopic(newTopic !== 'clear' ? newTopic : '');
    }
  };

  return (
    <div className="topics-bar">
      <button
        className="topic-button"
        onClick={handleChangeTopic}
        type="button"
      >
        clear
      </button>
      {topics &&
        topics.map(topic => (
          <button
            type="button"
            className={`topic-button ${
              topic.slug === activeTopic ? 'active' : ''
            }`}
            key={topic.slug}
            onClick={handleChangeTopic}
          >
            {topic.slug}
          </button>
        ))}
    </div>
  );
};
TopicBar.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  activeTopic: PropTypes.string,
  updateTopic: PropTypes.func.isRequired
};
export default TopicBar;
