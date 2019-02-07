import React from 'react';

const TopicBar = ({ topics, activeTopic, updateTopic }) => {
  const handleChangeTopic = ({ target: { textContent: newTopic } }) => {
    if (newTopic !== activeTopic) {
      updateTopic(newTopic !== 'clear' ? newTopic : '');
    }
  };

  return (
    <div className="topics-bar">
      <button className="topic-button" onClick={handleChangeTopic}>
        clear
      </button>
      {topics &&
        topics.map(topic => (
          <button
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

export default TopicBar;
