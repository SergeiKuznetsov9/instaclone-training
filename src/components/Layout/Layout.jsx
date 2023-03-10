import { Navbar } from "../Navbar";
import "./styles.css";

export const Layout = ({ nickName, avatarUrl, id, children }) => {
  return (
    <div className="layout-root">
      <div>
        <Navbar nickName={nickName} avatarUrl={avatarUrl} id={id} />
      </div>
      <div className="layout-body">{children}</div>
    </div>
  );
};
