import React from 'react';
import PropTypes from 'prop-types';
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
PostComment.propTypes = {
  login: PropTypes.string,
  newComment: PropTypes.string,
  handleChangeComment: PropTypes.func.isRequired,
  handleSubmitComment: PropTypes.func.isRequired
};
export default PostComment;
