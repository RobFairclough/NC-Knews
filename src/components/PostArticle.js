import React from 'react';

const PostArticle = ({ topics, author }) => {
  return (
    <div>
      <form>
        <select>
          {topics &&
            topics.map(topic => (
              <option value={topic.slug}>{topic.slug}</option>
            ))}
        </select>
        <label>Headline: </label>
        <input type="text" />
        <label>Your article: </label>
        <textarea />
      </form>
    </div>
  );
};

export default PostArticle;
