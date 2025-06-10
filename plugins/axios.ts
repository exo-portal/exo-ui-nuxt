import axios, { type AxiosInstance } from "axios";
import { BASE_URL } from "~/config";
import type { InjectionKey } from "vue";

export const axiosKey: InjectionKey<AxiosInstance> = Symbol("axios");

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Important: Send cookies with requests
    timeout: 5000, // Set timeout to 5000ms (5 seconds)
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can add custom headers or modify the request here
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // You can process the response data here
      return response;
    },
    (error) => {
      // Handle response error
      return Promise.reject(error);
    }
  );

  nuxtApp.provide(axiosKey, axiosInstance);
});
