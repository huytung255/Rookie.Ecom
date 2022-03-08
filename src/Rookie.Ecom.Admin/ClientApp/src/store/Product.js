import axiosClient from "../axios/axiosClient";
const requestProductType = "REQUEST_PRODUCTS";
const receiveProductType = "RECEIVE_PRODUCTS";
const receiveProductDetailType = "RECEIVE_PRODUCT_DETAIL";
const initialState = { products: [], isLoading: false, productDetail: {} };

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const actionCreators = {
  requestProducts: (page) => async (dispatch, getState) => {
    dispatch({ type: requestProductType, page });

    const url = `api/product/find?page=${page + 1}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    const products = data.items;
    const { totalPages } = data;
    dispatch({ type: receiveProductType, page, products, totalPages });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProductType) {
    return {
      ...state,
      currentPage: action.page,
      isLoading: true,
    };
  }

  if (action.type === receiveProductType) {
    return {
      ...state,
      currentPage: action.page,
      products: action.categories,
      isLoading: false,
      totalPages: action.totalPages,
    };
  }

  if (action.type === receiveProductDetailType) {
    return {
      ...state,
      productDetail: action.data,
    };
  }

  return state;
};
