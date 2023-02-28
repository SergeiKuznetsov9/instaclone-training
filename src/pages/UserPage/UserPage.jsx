import { useSelector } from "react-redux";
import { Layout } from "../../components/Layout";
import { UserBio } from "../../components/UserBio";
import "./styles.css";

export const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  console.log(authorizedUser);
  return (
    <Layout
      nickName={authorizedUser.nickname}
      id={authorizedUser.id}
      avatarUrl={authorizedUser.avatarUrl}
    >
      <div className="userPage-root">
        <UserBio
          avatarUrl={authorizedUser.avatarUrl}
          nickname={authorizedUser.nickname}
          subscribed={authorizedUser.subscribed.length}
          subscribers={authorizedUser.subscribers.length}
          firstName={authorizedUser.firstName}
          lastName={authorizedUser.lastName}
          description={authorizedUser.description}
          url={authorizedUser.url}
        />
      </div>
    </Layout>
  );
};
