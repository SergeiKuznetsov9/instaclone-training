import classNames from "classnames";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./styles.css";

export const Card = ({
  imgUrl,
  className,
  likes,
  comments,
  isLikedByYou,
  onLikeClick,
}) => {
  return (
    <div className={classNames("card-root", className)}>
      <img src={imgUrl} alt="cardImg" className="card-image" />
      <div className="card-hover" />
      <div className="card-icons">
        {isLikedByYou ? (
          <FavoriteIcon
            sx={{ cursor: "pointer", color: "white" }}
            onClick={onLikeClick}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            sx={{ cursor: "pointer", color: "white" }}
            onClick={onLikeClick}
          />
        )}
        <span className="card-number first">{likes}</span>
        <ChatBubbleOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        <span className="card-number">{comments}</span>
      </div>
    </div>
  );
};
