import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { DetailedCard } from "../../components/DetailedCard";
import { Layout } from "../../components/Layout";
import { getPhotosThunk } from "../../redux/actions/photos";
import "./styles.css";

export const MainPage = () => {
  const photos = useSelector((state) => state.photos.photos);
  const isLoading = useSelector((state) => state.photos.isPhotosLoading);
  const totalPhotos = useSelector((state) => state.photos.totalPhotos);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);

  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getPhotosThunk(pageNumber));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const nextHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Layout nickName={authorizedUser.nickname} id={1}>
      <div className="mainPage-root">
        {isLoading ? (
          <div className="mainPage-loaderContainer">
            <Bars color="indigo" height={80} width={80} />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={photos.length}
            next={nextHandler}
            hasMore={totalPhotos > photos.length}
            loader={
              <div className="mainPage-loaderContainer">
                <Bars color="indigo" height={15} width={15} />
              </div>
            }
            endMessage={<p className="mainPage-thatsAll">Thats all!</p>}
          >
            {photos.map(({ author, imgUrl, likes, comments, id }) => (
              <DetailedCard
                key={id}
                userId={author.id}
                userName={author.nickname}
                avatarUrl={author.avatarUrl}
                imageUrl={imgUrl}
                likes={likes.length}
                isLikedByYou={likes.includes(authorizedUser.id)}
                comments={comments}
                className="mainPage-card"
                authorizedUserId={authorizedUser.id}
                cardId={id}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};
