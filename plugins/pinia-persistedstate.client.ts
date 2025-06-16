import { defineNuxtPlugin } from "#app";
import type { Pinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  pinia.use(piniaPluginPersistedstate);

  // Set hydrated flag after hydration
  setTimeout(() => {
    const auth = useAuthStore();
    auth.hydrated = true;
  }, 0);
});
