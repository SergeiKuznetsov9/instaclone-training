import {
    GET_PHOTOS_FAILED,
  GET_PHOTOS_STARTED,
  GET_PHOTOS_SUCCESS,
} from "../actionCreators/photos";

const initialState = {
  photos: [],
  isPhotosLoading: false,
};

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_STARTED:
      return {
        ...state,
        isPhotosLoading: true,
      };

    case GET_PHOTOS_FAILED:
      return {
        ...state,
        isPhotosLoading: false,
      };

    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        isPhotosLoading: false,
      };

    default:
        return {...state}
  }
};
