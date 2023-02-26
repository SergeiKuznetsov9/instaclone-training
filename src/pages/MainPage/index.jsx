import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailedCard from "../../components/DetailedCard";
import Layout from "../../components/Layout";
import { getPhotos } from "../../redux/actions/photos";

const commentsArr = [
  { id: 1, nickname: "Sergei", text: "Ajtxcvsaghcvel vbgj das ilwbavwd" },
  { id: 2, nickname: "Dima", text: "Wvf sdvcedel vbgj das ilwvd vwd" },
  { id: 3, nickname: "Petr", text: "Kcdagsj vcrgxw, cwvgd" },
  { id: 4, nickname: "Nick", text: "K vdsv sj vcrgxw, cwvgd" },
];

export const MainPage = () => {
  const state = useSelector((state) => state);
  console.log(state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotos());
  }, []);

  return (
    <Layout nickName="Sergei" id={1}>
      <div>MainPage</div>
      <DetailedCard
        userId={1}
        userName="Serj"
        avatarUrl=""
        imageUrl="https://pixy.org/src2/649/6499176.jpg"
        likes={5}
        isLikedByYou={false}
        comments={commentsArr}
      />
    </Layout>
  );
};

export default MainPage;
