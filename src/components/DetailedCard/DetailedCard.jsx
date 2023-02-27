import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./styles.css";
import { useState } from "react";
import { UserBadge } from "../UserBadge";
import { Comment } from "../Comment";

export const DetailedCard = ({
  userId,
  userName,
  avatarUrl,
  imageUrl,
  likes,
  isLikedByYou,
  comments,
}) => {
  const [isShownAllComments, setIsShownAllComments] = useState(false);

  const renderComments = (comments) => {
    const commentsForRender = [...comments];

    if (comments.length > 2 && !isShownAllComments) {
      commentsForRender.splice(0, comments.length - 2);
    }

    return (
      <>
        {comments.length === 0 && <span>Комментариев пока нет</span>}
        {comments.length > 2 && (
          <span
            className="detailedCard-showComments"
            onClick={() => setIsShownAllComments(true)}
          >
            Показать еще {comments.length - commentsForRender.length}{" "}
            комментариев
          </span>
        )}

        {commentsForRender.map((comment) => {
          const { id, ...props } = comment;
          return <Comment key={id} {...props} />;
        })}
      </>
    );
  };

  return (
    <div className="detailedCard-root">
      <div className="detailedCard-header">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imageUrl} alt="postImg" className="detailedCard-img" />
      </div>
      <div className="detailedCard-buttons">
        {isLikedByYou ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        <ChatBubbleOutlineIcon />
      </div>
      <div className="detailedCard-likes">{`Оценили ${likes} человек`}</div>
      <div className="detailedCard-comments">{renderComments(comments)}</div>
      <textarea className="detailedCard-textarea" />
    </div>
  );
};
