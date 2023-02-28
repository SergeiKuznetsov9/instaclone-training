import { UserCounter } from "../UserCounter";
import "./styles.css";

export const UserBio = ({
  avatarUrl,
  nickname,
  subscribed,
  subscribers,
  firstName,
  lastName,
  description,
  url,
}) => {
  return (
    <div className="userBio-root">
      <div className="userBio-avatarContainer">
        <img src={avatarUrl} alt="avatar" />
      </div>
      <div className="userBio-info">
        <div className="userBio-row">
          <span className="userBio-nickname">{nickname}</span>
        </div>
        <div className="userBio-row">
          <UserCounter
            count={5}
            text="Публикаций"
            className="userBio-counter"
          />
          <UserCounter
            count={subscribers}
            text="Подписчиков"
            className="userBio-counter"
          />
          <UserCounter count={subscribed} text="Подписок" />
        </div>
        <div className="userBio-row">
          <span className="userBio-name">
            {firstName} {lastName}
          </span>
        </div>
        <div className="userBio-row">
          <span>{description}</span>
        </div>
        <a href={url}>{url}</a>
      </div>
    </div>
  );
};
