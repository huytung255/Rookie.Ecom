import axiosClient from "../axios/axiosClient";

const receiveProfileType = "RECEIVE_PROFILE";
const receiveProfileListType = "RECEIVE_PROFILE_LIST";
const requestProfileListType = "REQUEST_PROFILE_LIST";
const initialState = {
  profileList: [],
};

export const actionCreators = {
  requestProfile: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `https://localhost:5001/api/User/${id}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    dispatch({ type: receiveProfileType, data });
  },
  requestProfileList: () => async (dispatch, getState) => {
    dispatch({ type: requestProfileListType });
    const url = `https://localhost:5001/api/User`;
    const res = await axiosClient.get(url);
    const { data } = res;
    console.log(data);
    dispatch({ type: receiveProfileListType, data });
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

  if (action.type === requestProfileListType) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === receiveProfileListType) {
    return {
      ...state,
      profileList: action.data,
      isLoading: false,
    };
  }

  return state;
};
