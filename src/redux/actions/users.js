import { api } from "../../api";
import {
  getAuthorizedUserSuccess,
  getUserFailed,
  getUserStarted,
  getUserSuccess,
} from "../actionCreators/users";

export const getUserThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());

      const response = await api.users.getUser(id);

      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailed(error));
    }
  };
};

export const getAuthorizedUserThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());
      const response = await api.users.getUser(1);
      dispatch(getAuthorizedUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailed(error));
    }
  };
};
