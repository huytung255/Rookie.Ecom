import axiosClient from "../axios/axiosClient";
const requestCategoryType = "REQUEST_CATEGORIES";
const receiveCategoryType = "RECEIVE_CATEGORIES";
const receiveCategoryDetailType = "RECEIVE_CATEGORY_DETAIL";
const initialState = { categories: [], isLoading: false, categoryDetail: {} };

export const actionCreators = {
  requestCategories: (page) => async (dispatch, getState) => {
    if (page === getState().categories.page) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestCategoryType, page });

    const url = `api/Category/find?page=${page + 1}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    const categories = data.items;
    const { totalPages } = data;
    dispatch({ type: receiveCategoryType, page, categories, totalPages });
  },
  requestCategoryDetail: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/Category/${id}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    dispatch({ type: receiveCategoryDetailType, data });
  },
  updateCategoryDetail: (id, name, desc) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/Category`;
    const res = await axiosClient.put(url, {
      id,
      name,
      desc,
    });
    actionCreators.requestCategoryDetail(id);
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestCategoryType) {
    return {
      ...state,
      currentPage: action.page,
      isLoading: true,
    };
  }

  if (action.type === receiveCategoryType) {
    return {
      ...state,
      currentPage: action.page,
      categories: action.categories,
      isLoading: false,
      totalPages: action.totalPages,
    };
  }

  if (action.type === receiveCategoryDetailType) {
    return {
      ...state,
      categoryDetail: action.data,
    };
  }

  return state;
};
