const requestCategoryType = "REQUEST_CATEGORIES";
const receiveCategoryType = "RECEIVE_CATEGORIES";
const initialState = { categories: [], isLoading: false };

export const actionCreators = {
  requestCategories: (page) => async (dispatch, getState) => {
    if (page === getState().categories.page) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestCategoryType, page });

    const url = `api/Category/find?page=${page + 1}`;
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.items;
    const { totalPages } = data;
    dispatch({ type: receiveCategoryType, page, categories, totalPages });
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

  return state;
};
