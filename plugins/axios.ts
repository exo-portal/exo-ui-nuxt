import axios from "axios";
import { BASE_URL } from "~/config";
import { useLoadingStore } from "~/stores/useLoadingStore";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Important: Send cookies with requests
    timeout: 5000, // Set timeout to 5000ms (5 seconds)
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify the request config here if needed
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);

      return config;
    },
    (error) => {
      // Handle request error
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(false);

      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // You can process the response data here

      const { setLoading } = useLoadingStore();
      setLoading(false);

      return response;
    },
    (error) => {
      // Handle response error

      const { setLoading } = useLoadingStore();
      setLoading(false);

      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", axiosInstance);
});
