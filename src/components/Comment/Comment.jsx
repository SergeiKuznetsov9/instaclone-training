import "./styles.css";

export const Comment = ({ nickname, text }) => {
  return (
    <div className="comment-root">
      <span className="comment-name">{nickname}</span>
      <span>{text}</span>
    </div>
  );
};
