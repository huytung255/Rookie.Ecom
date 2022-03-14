import axios from "axios";
import { store } from "..";
import userManager from "../utils/userManager";
const Signout = () => {
  userManager.signoutRedirect({
    id_token_hint: store.getState().oidc.user.id_token,
  });
  userManager.removeUser(); // removes the user data from sessionStorage
};
const axiosClient = axios.create();
axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      "Bearer " + store.getState().oidc.user.access_token;
    return config;
  },
  (error) => {
    throw error;
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 403) {
      Signout();
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
