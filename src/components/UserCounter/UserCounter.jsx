import "./styles.css";

export const UserCounter = ({ text, count, className }) => {
  return (
    <div className={className}>
      <span className="userCounter-count">{count}</span>
      <span className="userCounter-text">{text}</span>
    </div>
  );
};
