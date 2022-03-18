import { toast } from "react-toastify";
import axiosClient from "../axios/axiosClient";

const receiveProfileType = "RECEIVE_PROFILE";

const initialState = {
  profile: {},
};

export const actionCreators = {
  requestProfile: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `https://localhost:5001/api/User/${id}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    dispatch({ type: receiveProfileType, data });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === receiveProfileType) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
    };
  }

  return state;
};
