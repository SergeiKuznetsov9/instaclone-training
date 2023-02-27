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

  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getPhotosThunk(pageNumber));
  }, [pageNumber]);

  const nextHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Layout nickName="Sergei" id={1}>
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
            endMessage={<p className="mainPage-loaderContainer">Thats all!</p>}
          >
            {photos.map(({ author, imgUrl, likes, comments, id }) => (
              <DetailedCard
                key={id}
                userId={author.id}
                userName={author.nickname}
                avatarUrl={author.avatarUrl}
                imageUrl={imgUrl}
                likes={likes.length}
                isLikedByYou={false}
                comments={comments}
                className="mainPage-card"
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};
