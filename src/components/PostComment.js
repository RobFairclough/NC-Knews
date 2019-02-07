import React from 'react';

const PostComment = ({
  login,
  newComment,
  handleChangeComment,
  handleSubmitComment
}) => (
  <div>
    <h4>Leave a comment...</h4>
    <form className="post-comment-form" onSubmit={handleSubmitComment}>
      <p>Writing as {login}</p>
      <textarea
        className="comment-box"
        placeholder="Your comment..."
        onChange={handleChangeComment}
        value={newComment}
      />
      <button type="submit">Send</button>
    </form>
  </div>
);
export default PostComment;
