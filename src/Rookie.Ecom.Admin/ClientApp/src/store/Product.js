import { toast } from "react-toastify";
import axiosClient from "../axios/axiosClient";
const requestProductType = "REQUEST_PRODUCTS";
const receiveProductType = "RECEIVE_PRODUCTS";
const receiveProductDetailType = "RECEIVE_PRODUCT_DETAIL";
const initialState = {
  products: [],
  isLoading: false,
  productDetail: { productImages: [] },
};

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
      toast
        .promise(
          axiosClient.put(url, {
            id,
            name,
            price,
            desc,
            categoryId,
            isFeatured,
            isAvailable,
          }),
          {
            pending: "Updating...",
            success: "Product detail is updated.",
            error: "Error!",
          }
        )
        .then(() => {
          dispatch(actionCreators.requestProductDetail(id));
        });
    },
  deleteProduct: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/product/${id}`;
    toast
      .promise(axiosClient.delete(url), {
        pending: "Deleting...",
        success: "Product is deleted.",
        error: "Error!",
      })
      .then(() => {
        dispatch(
          actionCreators.requestProducts(getState().products.currentPage)
        );
      });
  },
  addProductImage:
    (productId, image, caption, isDefault) => async (dispatch, getState) => {
      if (!productId) return;
      const url = `api/product/image`;
      var formData = new FormData();
      formData.append("ProductId", productId);
      formData.append("ImageFile", image);
      formData.append("Caption", caption);
      formData.append("IsDefault", isDefault);
      toast
        .promise(axiosClient.post(url, formData), {
          pending: "Uploading image...",
          success: "A product image is created.",
          error: "Error!",
        })
        .then(() => {
          dispatch(actionCreators.requestProductDetail(productId));
        });
    },
  updateProductImage:
    (id, caption, isDefault) => async (dispatch, getState) => {
      if (!id) return;
      const url = `api/product/image`;
      var formData = new FormData();
      formData.append("Id", id);
      formData.append("Caption", caption);
      formData.append("IsDefault", isDefault);
      toast
        .promise(axiosClient.put(url, formData), {
          pending: "Updating image...",
          success: "A product image is updated.",
          error: "Error!",
        })
        .then(() => {
          dispatch(
            actionCreators.requestProductDetail(
              getState().products.productDetail.id
            )
          );
        });
    },
  deleteProductImage: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/product/image/${id}`;
    toast
      .promise(axiosClient.delete(url), {
        pending: "Deleting image...",
        success: "A product image is deleted.",
        error: "Error!",
      })
      .then(() => {
        dispatch(
          actionCreators.requestProductDetail(
            getState().products.productDetail.id
          )
        );
      });
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
