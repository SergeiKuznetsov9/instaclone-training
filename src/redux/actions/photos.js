import { api } from "../../api";
import { buildCardsArrayForDispatch, getCardFromArrayById } from "../../utils";
import {
  getPhotosFailed,
  getPhotosStarted,
  getPhotosSuccess,
  getPhotosSetTotal,
} from "../actionCreators/photos";
import {
  mutatePhotoFailed,
  mutatePhotoStarted,
  mutatePhotoSuccess,
} from "../actionCreators/photos";

export const getPhotosThunk = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      if (page === 1) {
        dispatch(getPhotosStarted());
      }

      const res = await api.photos.getPhotos({
        params: {
          _page: page,
          _limit: 5,
        },
      });

      if (page === 1) {
        dispatch(getPhotosSetTotal(res.headers["x-total-count"]));
        dispatch(getPhotosSuccess([...res.data]));
      } else {
        dispatch(getPhotosSuccess([...getState().photos.photos, ...res.data]));
      }
    } catch (error) {
      dispatch(getPhotosFailed(error));
    }
  };
};

export const toggleLike = (userId, photoId) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());

    const newPhoto = getCardFromArrayById(getState().photos.photos, photoId);

    if (newPhoto.likes.includes(userId)) {
      newPhoto.likes = newPhoto.likes.filter((like) => like !== userId);
    } else {
      newPhoto.likes.push(userId);
    }

    try {
      const response = await api.photos.mutatePhoto({
        data: newPhoto,
        url: `/${photoId}`,
      });

      const newArray = buildCardsArrayForDispatch(
        getState().photos.photos,
        response.data
      );

      dispatch(getPhotosSuccess(newArray));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};

export const sendComment = (nickname, cardId, text) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());

    const newCard = getCardFromArrayById(getState().photos.photos, cardId);
    newCard.comments.push({ nickname, text });

    try {
      const response = await api.photos.mutatePhoto({
        data: newCard,
        url: `/${cardId}`,
      });

      const newArray = buildCardsArrayForDispatch(
        getState().photos.photos,
        response.data
      );

      dispatch(getPhotosSuccess(newArray));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};
