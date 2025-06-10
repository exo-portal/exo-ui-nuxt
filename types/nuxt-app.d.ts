import type { AxiosInstance } from 'axios';

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance;
  }
}

declare module 'nuxt/schema' {
  interface NuxtApp {
    $axios: AxiosInstance;
  }
}