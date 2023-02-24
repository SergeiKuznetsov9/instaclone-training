import { useNavigate } from "react-router-dom";
import "./styles.css";

const UserBadge = ({ nickName, avatarUrl, id }) => {

  const navigate = useNavigate();

  const onUserBadgeClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div className="user-badge-root" onClick={onUserBadgeClick}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="avatar" className="user-badge-avatar" />
      ) : (
        <div className="user-badge-placeholder"></div>
      )}
      <span className="user-bage-name">{nickName}</span>
    </div>
  );
};

export default UserBadge;
