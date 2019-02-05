import React from 'react';

const TopicBar = ({ topics, activeTopic, updateTopic }) => {
  const handleChangeTopic = e => {
    const newTopic = e.target.textContent;
    if (newTopic !== activeTopic) updateTopic(newTopic);
  };

  return (
    <form className="topics-bar">
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
    </form>
  );
};

export default TopicBar;
