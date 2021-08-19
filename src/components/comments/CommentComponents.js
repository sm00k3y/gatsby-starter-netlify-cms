import * as React from "react";

export const SingleComment = ({ comment }) => {
  return (
    <div className="single-comment">
      <div className="comment-info">
        <div className="user-image">
          <img src={comment.photoUrl} alt="avatar" />
        </div>
        <div className="comment-data">
          <div className="comment-author">{comment.name}</div>
          <div className="comment-time">{comment.date}</div>
        </div>
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
};

export const CommentInput = ({ userName, userImage, addComment }) => {
  const [comment, setComment] = React.useState("");

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleSumbitComment = (event) => {
    event.preventDefault();
    var date = new Date();
    var commentDate =
      date.getHours() +
      ":" +
      date.getMinutes() +
      "  " +
      date.toLocaleDateString("pl-PL", { day: "2-digit" }) +
      "." +
      date.toLocaleDateString("pl-PL", { month: "2-digit" }) +
      "." +
      date.getFullYear();
    addComment(comment, commentDate);
    setComment("");
  };

  return (
    <div className="input-comment">
      <form onSubmit={handleSumbitComment}>
        <div className="comment-info">
          <div className="user-image">
            <img src={userImage} alt="avatar" />
          </div>
          <div className="comment-data">
            <div className="comment-author">{userName}</div>
          </div>
        </div>
        <div className="comment-text">
          <textarea
            className="input-comment-text"
            value={comment}
            onChange={handleComment}
            rows={5}
            cols={75}
            placeholder="Napisz co myślisz!"
          />
          <div className="input-comment-button">
            <input type="submit" value="Sumbit" />
          </div>
        </div>
      </form>
    </div>
  );
};
