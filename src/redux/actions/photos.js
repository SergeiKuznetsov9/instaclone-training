import { api } from "../../api";
import { getPhotosFailed, getPhotosStarted, getPhotosSuccess, getPhotosSetTotal } from "../actionCreators/photos";

export const getPhotosThunk = (page = 1) => {
  return async (dispatch, getState) => {
    try {

      if(page === 1) {
        dispatch(getPhotosStarted())
      }

      const res = await api.photos.getPhotos({
        params: {
          _page: page,
          _limit: 5,
        }
      })

      if(page === 1) {
        dispatch(getPhotosSetTotal(res.headers['x-total-count']))
        dispatch(getPhotosSuccess([...res.data]))
      } else {
        dispatch(getPhotosSuccess([...getState().photos.photos, ...res.data]))
      }

    } catch (error) {
      dispatch(getPhotosFailed(error))
    }
  };
};
