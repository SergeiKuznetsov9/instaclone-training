import { api } from "../../api";
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

export const mutatePhotoThunk = (userId, photoId) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());

    
    const targetPhoto = getState().photos.photos.find(
      (photo) => photo.id === photoId
      );
      const newPhoto = {
        ...targetPhoto,
        likes: [...targetPhoto.likes],
      };
      
      if (newPhoto.likes.includes(userId)) {
        newPhoto.likes = newPhoto.likes.filter((like) => like !== userId);
      } else {
        newPhoto.likes.push(userId);
      }

    try {

      const response = await api.photos.mutatePhoto({
        data: newPhoto,
        url: `/${photoId}`
      });

      const newPhotos = [...getState().photos.photos]
      const photoIndex = newPhotos.findIndex(photo => photo.id === photoId)
      newPhotos[photoIndex] = response.data

      dispatch(getPhotosSuccess(newPhotos))

      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};
