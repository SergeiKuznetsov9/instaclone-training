import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./styles.css";
import { useState } from "react";
import { UserBadge } from "../UserBadge";
import { Comment } from "../Comment";
import classNames from "classnames";
import { sendComment, toggleLike } from "../../redux/actions/photos";
import { useDispatch, useSelector } from "react-redux";

export const DetailedCard = ({
  userId,
  userName,
  avatarUrl,
  imageUrl,
  likes,
  isLikedByYou,
  comments,
  className,
  authorizedUserId,
  authorizedUserNickname,
  cardId,
}) => {
  const [isShownAllComments, setIsShownAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const isMutateLoading = useSelector((state) => state.photos.isMutateLoading);

  const handlerLike = (authorizedUserId, cardId) => {
    dispatch(toggleLike(authorizedUserId, cardId));
  };

  const handleSendComment = (commentText) => {
    dispatch(sendComment(authorizedUserNickname, cardId, commentText));
  };

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

        {commentsForRender.map((comment, index) => {
          return <Comment key={index} {...comment} />;
        })}
      </>
    );
  };

  return (
    <div className={classNames("detailedCard-root", className)}>
      <div className="detailedCard-header">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div className="detailedCard-img-container">
        <img src={imageUrl} alt="postImg" className="detailedCard-img" />
      </div>
      <div className="detailedCard-buttons">
        {isLikedByYou ? (
          <FavoriteIcon onClick={() => handlerLike(authorizedUserId, cardId)} />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => handlerLike(authorizedUserId, cardId)}
          />
        )}
        <ChatBubbleOutlineIcon />
      </div>
      <div className="detailedCard-likes">{`Оценили ${likes} человек`}</div>
      <div className="detailedCard-comments">{renderComments(comments)}</div>
      <div className="detailedCard-textarea-wrapper">
        <textarea
          placeholder="Введите комментарий"
          className="detailedCard-textarea"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button
          disabled={isMutateLoading || commentText.length === 0}
          className="detailedCard-textarea-sendButton"
          onClick={() => handleSendComment(commentText)}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
