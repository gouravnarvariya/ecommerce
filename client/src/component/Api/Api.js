import axios from "axios";
import { checkToken, clearToken, refreshAccessToken, setAccessToken } from "../Tokenhandler/TokenHandler";

const baseURL = import.meta.env.VITE_BASEURL;
const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
});

// Function to add the access token to the headers
export const addAccessToken = (token) => {
  if (!token) {
    const { access_token } = checkToken();
    instance.defaults.headers.common["Authorization"] = `Bearer ${access_token ? access_token : ""}`;
  } else {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  instance.defaults.headers.common["Accept"] = `application/json`;
};

// Axios interceptor for handling 401 responses
const interceptor = instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 && !error.config._isRetry) {
        try {
          // Refresh the access token
          const newToken = await refreshAccessToken();
          console.log("newToken ", newToken);
          
          // Update headers with the new access token
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          error.config.headers["Accept"] = `application/json`;
          
          // Retry the original request after token refresh
          error.config._isRetry = true;
          setAccessToken(newToken);
          return instance(error.config);
        } catch (refreshError) {
          console.log("refresh error ----", refreshError);
          // If token refresh fails, clear the token and handle the error
          clearToken();
          throw refreshError;
        }
      }
    } else {
      // Handle errors without response (e.g., network issues)
      console.error("Network or other error:", error);
    }
    throw error;
  }
);

// Function to remove the interceptor when it's no longer needed
const removeInterceptor = () => {
  instance.interceptors.response.eject(interceptor);
};

// Add the access token to headers
addAccessToken();

const Api = {
  get: async (url, params) => {
    try {
      console.log("GET Request URL:", url);
      const response = await instance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  post: async (url, data, params) => {
    try {
      console.log("POST Request URL:", url);
      const response = await instance.post(url, data, { params });
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },
  put: async (url, data, params) => {
    try {
      console.log("PUT Request URL:", url);
      const response = await instance.put(url, data, { params });
      return response.data;
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },
  delete: async (url, params) => {
    try {
      console.log("DELETE Request URL:", url);
      const response = await instance.delete(url, { params });
      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
  removeInterceptor, // Expose the removeInterceptor function for cleanup
};

export default Api;
