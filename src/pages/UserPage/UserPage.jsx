import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { UserBio } from "../../components/UserBio";
import { toggleLike } from "../../redux/actions/photos";
import "./styles.css";

export const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const dispatch = useDispatch();

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId));
  };
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

        <div className="userPage-content">
          <Card
            imgUrl=""
            className={"userPage-card"}
            likes="10"
            comments="15"
            isLikedByYou={true}
            onLikeClick={() => onLikeClick("")}
          />
          <Card
            imgUrl=""
            className={"userPage-card"}
            likes="10"
            comments="15"
            isLikedByYou={true}
          />
          <Card
            imgUrl=""
            className={"userPage-card"}
            likes="10"
            comments="15"
            isLikedByYou={true}
          />
        </div>
      </div>
    </Layout>
  );
};
