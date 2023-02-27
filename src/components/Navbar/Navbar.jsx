import { UserBadge } from "../UserBadge";
import "./styles.css";

export const Navbar = ({nickName, avatarUrl, id}) => {
  return (
    <div className="navbar-root">
      <div className="navbar-wrapper">
        <span>Instaclone</span>
        <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id}/>
      </div>
    </div>
  );
};
