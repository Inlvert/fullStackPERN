import axios from "axios";
import CONSTANTS from "../constants";

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessToken = null;

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
};

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.tokenPair) {
      const { tokenPair } = response.data.data;

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const {
      response: { staus },
    } = error;
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS && staus === 419) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

      error.config.headers["Authorization"] = `Bearer ${accessToken}`;

      return httpClient.request(error.config);
    }

    return Promise.reject(error);
  }
);

export const getProducts = async (productData) => {
  const response = await httpClient.get(`/products`, productData);
  return response;
};

export const addProductToCart = async ({ productId, cartId, quantity }) => {
  if (!cartId) {
    throw new Error("Cart ID is required");
  }
  const response = await httpClient.post(`/products/${productId}`, { cartId, quantity });
  return response;
};

export const registration = async (userData) => {
  const response = await httpClient.post("/auth/registartion", userData);
  return response;
};

export const login = async (userData) => {
  const response = await httpClient.post("/auth/login", userData);
  return response;
};

export const refresh = async (refreshToken) => {
  const response = await httpClient.post("/auth/refresh", { refreshToken });
  return response;
};
