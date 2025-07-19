// Server-side plugin that provides a $fetch-based axios-like interface
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.baseUrl || "http://localhost:8080";

  // Create an axios-like interface using $fetch for SSR
  const axiosLikeInstance = {
    get: (url: string, options?: any) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return $fetch(fullUrl, {
        method: 'GET',
        ...options,
        params: options?.params,
      });
    },
    post: (url: string, data?: any, options?: any) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return $fetch(fullUrl, {
        method: 'POST',
        body: data,
        ...options,
      });
    },
    put: (url: string, data?: any, options?: any) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return $fetch(fullUrl, {
        method: 'PUT',
        body: data,
        ...options,
      });
    },
    delete: (url: string, options?: any) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return $fetch(fullUrl, {
        method: 'DELETE',
        ...options,
      });
    },
    patch: (url: string, data?: any, options?: any) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return $fetch(fullUrl, {
        method: 'PATCH',
        body: data,
        ...options,
      });
    }
  };

  nuxtApp.provide("axios", axiosLikeInstance);
});
