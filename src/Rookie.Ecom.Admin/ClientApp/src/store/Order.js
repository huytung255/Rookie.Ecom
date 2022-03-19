import { toast } from "react-toastify";
import axiosClient from "../axios/axiosClient";
const requestOrderType = "REQUEST_ORDERS";
const receiveOrderType = "RECEIVE_ORDERS";
const receiveOrderDetailType = "RECEIVE_ORDER_DETAIL";
const receiveAllOrderType = "RECEIVE_ALL_ORDERS";
const initialState = {
  orders: [],
  isLoading: false,
  orderDetail: {
    orderDetails: [],
    user: {},
  },
};

export const actionCreators = {
  requestOrders: (page) => async (dispatch, getState) => {
    dispatch({ type: requestOrderType, page });

    const url = `api/Order/find?page=${page + 1}`;
    try {
      const res = await axiosClient.get(url);
      const { data } = res;
      const orders = data.items;
      const { totalPages } = data;
      dispatch({ type: receiveOrderType, page, orders, totalPages });
    } catch (error) {
      console.log(error);
    }
  },
  requestOrderDetail: (id) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/Order/${id}`;
    const res = await axiosClient.get(url);
    const { data } = res;
    dispatch({ type: receiveOrderDetailType, data });
  },
  updateCategoryDetail: (id, status) => async (dispatch, getState) => {
    if (!id) return;
    const url = `api/Order`;
    toast
      .promise(
        axiosClient.put(url, {
          id,
          status: parseInt(status),
        }),
        {
          pending: "Updating...",
          success: "Order status is updated.",
          error: "Error!",
        }
      )
      .then(() => {
        dispatch(actionCreators.requestOrderDetail(id));
      });
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestOrderType) {
    return {
      ...state,
      currentPage: action.page,
      isLoading: true,
    };
  }

  if (action.type === receiveOrderType) {
    return {
      ...state,
      currentPage: action.page,
      orders: action.orders,
      isLoading: false,
      totalPages: action.totalPages,
    };
  }

  if (action.type === receiveOrderDetailType) {
    return {
      ...state,
      orderDetail: action.data,
    };
  }

  return state;
};
