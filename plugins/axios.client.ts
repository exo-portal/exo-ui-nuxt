import axios from "axios";
import { useLoadingStore } from "~/stores/useLoadingStore";

// Client-only plugin to avoid SSR issues with form-data
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.baseUrl || "http://localhost:8080";

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Important: Send cookies with requests
    timeout: 5000, // Set timeout to 5000ms (5 seconds)
  });

  const loadingStore = useLoadingStore();

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify the request config here if needed
      loadingStore.setLoading(true);

      return config;
    },
    (error) => {
      // Handle request error
      loadingStore.setLoading(false);

      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // You can process the response data here
      loadingStore.setLoading(false);

      return response;
    },
    (error) => {
      // Handle response error
      loadingStore.setLoading(false);

      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", axiosInstance);
});
