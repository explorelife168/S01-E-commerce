import axios from "axios";

export const errInterceptors = axios.create({
  baseURL: "",
  timeout: 5000,
});

errInterceptors.interceptors.request.use(
  function (config) {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    config.headers.Authorization = token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

errInterceptors.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);

export default errInterceptors;
