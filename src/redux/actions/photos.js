import { api } from "../../api";
import { getPhotosFailed, getPhotosStarted, getPhotosSuccess } from "../actionCreators/photos";

export const getPhotos = () => {
  return async (dispatch) => {
    try {
      dispatch(getPhotosStarted)
      const res = await api.photos.getPhotos({
        params: {
          _page: 0,
          _limit: 5,
        }
      })
      dispatch(getPhotosSuccess(res))
    } catch (error) {
      dispatch(getPhotosFailed(error))
    }
  };
};
