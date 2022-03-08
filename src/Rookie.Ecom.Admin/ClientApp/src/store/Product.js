import axiosClient from "../axios/axiosClient";
const requestProductType = "REQUEST_PRODUCTS";
const receiveProductType = "RECEIVE_PRODUCTS";
const receiveProductDetailType = "RECEIVE_PRODUCT_DETAIL";
const initialState = { products: [], isLoading: false, productDetail: {} };

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const actionCreators = {
  addProduct:
    (name, price, desc, categoryId, isFeatured, isAvailable) =>
    async (dispatch, getState) => {
      const url = `api/product`;
      const res = await axiosClient.post(url, {
        name,
        price,
        desc,
        categoryId,
        isFeatured,
        isAvailable,
      });
      dispatch(actionCreators.requestProducts(getState().products.currentPage));
    },
  requestProducts: (page) => async (dispatch, getState) => {
    dispatch({ type: requestProductType, page });

    const url = `api/product/find?page=${page + 1}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    const products = data.items;
    const { totalPages } = data;
    dispatch({ type: receiveProductType, page, products, totalPages });
  },
  requestProductDetail: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/product/${id}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    dispatch({ type: receiveProductDetailType, data });
  },
  updateProductDetail:
    (id, name, price, desc, categoryId, isFeatured, isAvailable) =>
    async (dispatch, getState) => {
      if (!id) return;
      const url = `api/product`;
      const res = await axiosClient.put(url, {
        id,
        name,
        price,
        desc,
        categoryId,
        isFeatured,
        isAvailable,
      });
      dispatch(actionCreators.requestProductDetail(id));
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
      products: action.products,
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
