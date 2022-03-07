import axios from "axios";

const axiosClient = axios.create();
axiosClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = "Bearer " + store.getState().user.token;
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
    // const { status } = error.response;
    // if (status === 401) {
    //   localStorage.clear();
    //   window.location.href = "/sign-in";
    // }

    return Promise.reject(error);
  }
);
export default axiosClient;
